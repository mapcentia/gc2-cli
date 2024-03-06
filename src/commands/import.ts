process.env.NODE_DEBUG = 'http'

import {Command, Flags} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import cli from 'cli-ux'
import Configstore from 'configstore'
import AdmZip from 'adm-zip'
import * as os from 'os'
import {v4 as uuidv4} from 'uuid'
import FormData from 'form-data'
import * as fs from 'fs'
import * as path from 'path'

import User from '../common/user'
import get from '../util/get-response'
import make from '../util/make-request'

export default class Import extends Command {
  static description = 'Import files to GC2. Set path to a file or folder, which will be compressed, uploaded and imported into GC2'
  static flags = {
    srs: Flags.integer({char: 'c', description: 'Output spatial reference system. Use EPSG codes.', default: 4326}),
    input: Flags.string({char: 'p', description: 'Input path to file or folder.', required: true}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Import)
    const config: Configstore = new Configstore('gc2-env')
    const user: User = config.all
    const url = user.host + '/api/v4/import'
    let tmpDir
    let tmpFile
    let tmpPath
    const appPrefix = 'gc2-cli-'
    const chunkSize = 1000000

    const inputPath = flags.input
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix))
      tmpFile = uuidv4() + '.zip'
      tmpPath = tmpDir + '/' + tmpFile
      console.log(tmpPath)

      cli.action.start('Compressing files')
      await this.createZipArchive(inputPath, tmpPath)
      cli.action.stop()

      cli.action.start('Uploading')
      const file = fs.readFileSync(tmpPath)
      const stats = fs.statSync(tmpPath)
      const fileSizeInBytes: number = stats.size

      const chunks = Math.ceil(fileSizeInBytes / chunkSize)
      let chunkCount = 0
      for (let start = 0; start < fileSizeInBytes; start += chunkSize) {
        const form = new FormData()
        const chunk = file.slice(start, start + chunkSize)
        form.append('name', tmpFile)
        form.append('chunk', chunkCount)
        form.append('chunks', chunks)
        form.append('file', chunk, {
          // @ts-ignore
          name: 'file',
          filename: 'file'
        })
        const res = await make('4', `import`, 'POST', form, true, 'ss')
        const data = await get(this, res, 200)
        console.log(data)
        chunkCount++
      }
      cli.action.stop()
      cli.action.start('Server importing files')
      const res = await make('4', `import/${tmpFile}`, 'GET', null)
      const data = await get(this, res, 200)
      // this.log(data)
      cli.action.stop()
    } catch (e) {
      console.log(e)
      exit(1)
    } finally {
      try {
        if (tmpDir) {
          // @ts-ignore
          fs.rmSync(tmpDir, {recursive: true, force: true})
        }
      } catch (e) {
        console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`)
      }
    }
    exit(0)
  }

  async createZipArchive(path: string, outputFile: string) {
    const zip = new AdmZip()
    if (fs.statSync(path).isDirectory()) {
      zip.addLocalFolder(path)
    } else {
      zip.addLocalFile(path)
    }
    zip.writeZip(outputFile)
  }
}
