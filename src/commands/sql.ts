/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import base64url from 'base64url'
import chalk from 'chalk'
import cli from 'cli-ux'
import * as fs from 'fs'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../centiaClient'
import {outputFormatList} from '../util/lists'


interface Statement {
  q: string,
  srs?: number,
  output_format: string,
  geo_format?: string,
  base64?: boolean,
  allstr?: boolean,
  lifetime?: number,
  convert_types: boolean,
}

export default class Sql extends Command {
  static description = 'Run SQL statements. If run without --statement inactive mode will be enabled.'
  static flags = {
    statement: Flags.string({
      char: 's',
      description: 'SQL statement. Any select, insert, update and delete. No altering of schema is allowed.'
    }),
    srs: Flags.integer({char: 'c', description: 'Output spatial reference system. Use EPSG codes.', default: 4326}),
    format: Flags.string({char: 'f', description: 'Output file format.'}),
    geoformat: Flags.string({char: 'g', description: 'Output geometry in CSV and Excel.', options: ['wkt', 'geojson']}),
    path: Flags.string({
      char: 'p',
      description: 'Output path to file. If omitted file is saved in current folder.',
      default: '.'
    }),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Sql)
    if (flags.statement) {

      const statementText = flags.statement.toLowerCase()
      let format: string | undefined = flags.format

      if (!format) {
        if (!statementText.includes('select') && !statementText.includes('returning')) {
          // Skip prompting for format if statement has 'select' or 'returning'
          format = 'geojson' // or any preferred default format here
        } else {
          format = await outputFormatList()
        }
      }

      const statement: Statement = {
        q: base64url(flags.statement),
        srs: flags.srs,
        output_format: format,
        base64: true,
        geo_format: flags.geoformat,
        convert_types: false
      }

      try {
        const client = createCliCentiaAdminClient()
        const res = await client.http.requestFull<any>({
          path: 'api/v4/sql',
          method: 'POST',
          body: statement,
        })

        // If we get JSON, show affected rows
        const contentType = res.getHeader('content-type') || ''
        if (contentType.startsWith('application/json')) {
          this.log(chalk.green('Affected rows: ' + res.body.affected_rows))
          return
        }

        // We get a file
        let filePath: string
        let fileName: string;

        if (flags.format === 'ccsv' || flags.format === 'ndjson') {
          fileName = 'file.' + flags.format
        } else {
          fileName = res.getHeader('content-disposition')?.split('=')[1].replace(/"/g, '') || 'output'
        }
        if (flags.path) {
          try {
            const stat = fs.lstatSync(flags.path + '')
            if (stat.isDirectory()) {
              filePath = flags.path + '/' + fileName // existing dir
            } else {
              filePath = flags.path + '' // existing file
            }
            // tslint:disable-next-line:no-unused
          } catch (e) {
            filePath = flags.path + '' // non existing file
          }
        } else {
          filePath = fileName + '' // No use of path
        }

        fs.writeFileSync(filePath, res.body as string)
        this.log(chalk.green(fileName) + ` downloaded to ` + flags.path)
      } catch (error) {
        logCentiaErrorAndExit(error)
      }

    } else {
      // tslint:disable-next-line:no-constant-condition
      while (true) {
        let sql = await cli.prompt('')
        const statement: Statement = {
          q: base64url(sql),
          srs: 4326,
          output_format: 'json',
          convert_types: false,
          lifetime: 0,
          base64: true
        }
        try {
          const client = createCliCentiaAdminClient()
          const data = await client.http.request<any>({
            path: 'api/v4/sql',
            method: 'POST',
            body: statement,
          })
          if (data?.affected_rows) {
            this.log(chalk.green('Affected rows: ' + data.affected_rows))
          } else {
            cli.table(data.data, data.schema)
          }
        } catch {
          // On error in interactive mode, continue to next prompt
          continue
        }
      }
    }
  }
}
