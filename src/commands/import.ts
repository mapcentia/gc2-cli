/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import cli from 'cli-ux'
import AdmZip from 'adm-zip'
import * as os from 'os'
import {v4 as uuidv4} from 'uuid'
import FormData from 'form-data'
import * as fs from 'fs'
import * as path from 'path'
import get from '../util/get-response'
import make from '../util/make-request'

export default class Import extends Command {
  static description = 'Import files to GC2. Set path to a file or folder, which will be compressed, uploaded and imported into GC2'
  static flags = {
    srs: Flags.integer({char: 'c', description: 'Output spatial reference system. Use EPSG codes.', default: 4326}),
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'Upload to this schema.',
      },
    ),
    path: Args.string(
      {
        required: true,
        description: 'Input path to file or folder.',
      },
    ),
  }

  async run() {
    const {flags, args} = await this.parse(Import)
    let tmpDir
    let tmpFile
    let tmpPath
    const appPrefix = 'gc2-cli-'
    const chunkSize = 1000000
    const inputPath = args.path
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix))
      tmpFile = uuidv4() + '.zip'
      tmpPath = tmpDir + '/' + tmpFile

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
        const res = await make('4', `import/${args.schema}`, 'POST', form, true, 'ss')
        await get(res, 200)
        chunkCount++
      }
      cli.action.stop()
      cli.action.start('Server importing files')
      const res = await make('4', `import/${args.schema}/${tmpFile}`, 'GET', null)
      const data = await get(res, 200)
      type tables = {
        [key: string]: any
      }
      type table = {
        driver: string;
        featureCount: number;
        type: string;
        layerIndex: number;
        layerName: string;
        hasWkt: boolean;
        authStr: string;
        error: string;
      }
      const rows: object[] = []
      const tables: tables = {driver: {}, count: {}, type: {}, index: {}, name: {}, hasWkt: {}, authStr: {}, error: {}, }
      for (const c in data.data) {
        const v: table = data.data[c]
        rows.push({
          driver: v.driver,
          count: v.featureCount,
          type: v.type,
          index: v.layerIndex,
          name: v.layerName,
          hasWkt: v.hasWkt,
          authStr: v.authStr,
          error: v.error,

        })
      }
      cli.action.stop()
      this.log('')
      cli.table(rows, tables, {
        printLine: this.log.bind(this)
      })
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
