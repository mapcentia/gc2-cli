/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../centiaClient'

export default class Stat extends Command {
  static description = 'Get usage statistics.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
   // const {flags} = await this.parse(Stat)
    let data: any
    try {
      const client = createCliCentiaAdminClient()
      cli.action.start('Collecting statistics ')
      data = await client.http.request<any>({
        path: 'api/v4/stats',
        method: 'GET',
      })
      cli.action.stop('done')
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
    this.log('')

    //console.log(data)
    type tables = {
      [key: string]: any
    }
    type table = {
      table_name: string;
      schema_name: string;
      total_size: string;
      total_size_bytes: string;
      table_size: string;
      table_size_bytes: string;
      indices_size: string;
      indices_size_bytes: string;
      row_count: number;

    }
    const rows: object[] = []
    const tables: tables = {name: {}, schema:{}, total_size: {}, indices_size: {}, row_count: {}}
    for (const c in data.tables) {
      const v: table = data.tables[c]
      rows.push({
        name: v.table_name,
        schema: v.schema_name,
        total_size: v.total_size,
        indices_size: v.indices_size,
        row_count: v.row_count,
      })
    }
    this.log('Number of tables: ' + data.number_of_tables )
    this.log('Total size of all tables: ' + data.total_size )
    cli.table(rows, tables, {
      printLine: this.log.bind(this)
    })
  }
}
