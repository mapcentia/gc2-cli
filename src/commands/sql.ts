'use strict'

import {Command, flags} from '@oclif/command'
import {CliUx} from '@oclif/core'
import base64url from 'base64url'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import * as fs from 'fs'
import fetch from 'node-fetch'

import {User} from '../interfaces/User'

interface Statement {
  q: string,
  srs: number,
  format: string,
  geoformat?: string,
  base64?: boolean,
  allstr?: boolean,
  lifetime?: number,
}

export default class Sql extends Command {
  static description = 'Run SQL statements. If run without --statement inactive mode will be enabled.'
  static flags = {
    statement: flags.string({char: 's', description: 'SQL statement'}),
    srs: flags.integer({char: 'c', description: 'Output spatial reference system. Use EPSG codes.', default: 4326}),
    format: flags.string({char: 'f', description: 'Output file format.', default: 'ogr/GPKG'}),
    path: flags.string({char: 'p', description: 'Output path to file. If omitted file is saved in current folder.'}),
    help: flags.help({char: 'h'}),
  }
  static args = [{name: 'options'}]

  get(user: User, statement: Statement) {
    return fetch(user.host + '/api/v3/sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify(statement)
    })
  }

  async run() {
    const {flags} = this.parse(Sql)
    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    if (flags.statement) {
      const statement: Statement = {
        q: base64url(flags.statement),
        srs: flags.srs,
        format: flags.format,
        base64: true,
      }
      const res = await this.get(user, statement)
      if (res.status !== 200) {
        const data = await res.json()
        this.log(chalk.red(data.message))
        return
      }
      const fileName = res.headers.get('content-disposition')?.split('=')[1].replace(/"/g, '')
      const fileStream = fs.createWriteStream(flags.path || './' + fileName)
      await new Promise((resolve, reject) => {
        res.body.pipe(fileStream)
        res.body.on('error', reject)
        fileStream.on('finish', resolve)
      })

    } else {
      // tslint:disable-next-line:no-constant-condition
      while (true) {
        let sql = await cli.prompt('')
        const statement: Statement = {
          q: base64url(sql),
          srs: 4326,
          format: 'geojson',
          lifetime: 0,
          base64: true
        }
        const res = await this.get(user, statement)
        const data = await res.json()
        if (data.success) {
          if (data?.affected_rows) {
            this.log(chalk.green('Affected rows: ' + data.affected_rows))
          } else {
            type columns = {
              [key: string]: any
            }
            const columns: columns = {}
            data.forStore.forEach((e: { name: string, type: string }) => {
              if (e.type !== 'geometry') {
                columns[e.name] = ({} as string)
              }
            })
            const features: any[] = []
            data.features.forEach((e: { type: string, geometry: object, properties: any }) => {
              features.push(e.properties)
            })
            CliUx.ux.table(features, columns)
          }
        } else {
          this.log(chalk.red(data.message))
        }
      }
    }
  }
}
