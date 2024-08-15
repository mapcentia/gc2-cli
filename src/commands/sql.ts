import {Command, Flags} from '@oclif/core'
import base64url from 'base64url'
import chalk from 'chalk'
import cli from 'cli-ux'
import * as fs from 'fs'
import get from '../util/get-response'
import make from '../util/make-request'

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
    statement: Flags.string({char: 's', description: 'SQL statement'}),
    srs: Flags.integer({char: 'c', description: 'Output spatial reference system. Use EPSG codes.', default: 4326}),
    format: Flags.string({char: 'f', description: 'Output file format.', default: 'ogr/GPKG'}),
    path: Flags.string({char: 'p', description: 'Output path to file. If omitted file is saved in current folder.'}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Sql)
    if (flags.statement) {
      const statement: Statement = {
        q: base64url(flags.statement),
        srs: flags.srs,
        format: flags.format,
        base64: true,
      }

      const res = await make('4', `sql`, 'POST', statement)
      const data = await get(res, 200)

      // If we get JSON, when affected rows
      if (res.headers.get('content-type')?.startsWith('application/json')) {
        this.log(chalk.green('Affected rows: ' + data.affected_rows))
        return
      }

      // We get a file
      let fileStream: any
      const fileName = res.headers.get('content-disposition')?.split('=')[1].replace(/"/g, '')
      if (flags.path) {
        try {
          const stat = fs.lstatSync(flags.path + '')
          if (stat.isDirectory()) {
            fileStream = fs.createWriteStream(flags.path + '/' + fileName) // existing dir
          } else {
            fileStream = fs.createWriteStream(flags.path + '') // existing file
          }
          // tslint:disable-next-line:no-unused
        } catch (e) {
          fileStream = fs.createWriteStream(flags.path + '') // non existing file
        }
      } else {
        fileStream = fs.createWriteStream(fileName + '') // No use of path
      }

      await new Promise((resolve, reject) => {
        res.body.pipe(fileStream)
        res.body.on('error', reject)
        fileStream.on('error', (e: any) => {
          this.log(chalk.red(e.message))
        })
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
        const response = await make('4', `sql`, 'POST', statement)
        const data = await get(response, 200)
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
            cli.table(features, columns)
          }
        } else {
          this.log(chalk.red(data.message))
        }
      }
    }
  }
}
