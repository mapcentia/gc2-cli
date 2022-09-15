'use strict'

process.env.NODE_DEBUG = 'http'

import {Command, flags} from '@oclif/command'
import {exit} from '@oclif/core/lib/errors'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import AdmZip from 'adm-zip'
import * as os from 'os'
import {v4 as uuidv4} from 'uuid'
import FormData from 'form-data'
import * as fs from 'fs'
import fetch from 'node-fetch'
import * as path from 'path'
import {ApiResponse} from '../interfaces/ApiResponse'

import {User} from '../interfaces/User'

export default class Import extends Command {
  static description = 'Run SQL statements. If run without --statement inactive mode will be enabled.'
  static flags = {
    srs: flags.integer({char: 'c', description: 'Output spatial reference system. Use EPSG codes.', default: 4326}),
    inputPath: flags.string({char: 'p', description: 'Input path to file or folder.', required: true}),
    help: flags.help({char: 'h'}),
  }
  static args = [{name: 'options'}]

  async run() {
    const {flags} = this.parse(Import)
    const config: Configstore = new Configstore('gc2-env')
    const user: User = config.all
    const url = user.host + '/api/v3/import'
    let tmpDir
    let tmpFile
    let tmpPath
    const appPrefix = 'gc2-cli-'
    const chunkSize = 1000000

    const inputPath = flags.inputPath
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
          filename: 'blob'
        })
        await fetch(url, {
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          body: form
        }).then(res => {
          // res.text().then(t => console.log(t))
          cli.action.stop()
        })
        chunkCount++
      }
      cli.action.start('Server importing files')
      const response = await fetch(url + '/' + tmpFile, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token
        }
      })
      const data = await response.json()
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
