/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import get from '../util/get-response'
import make from '../util/make-request'

export default class Stat extends Command {
  static description = 'Get usage statistics.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
   // const {flags} = await this.parse(Stat)
    cli.action.start('Collecting statistics ')
    const response = await make('4', `stats`, 'GET')
    const data  = await get(response, 200)
    cli.action.stop('done')
    this.log('')

    //console.log(data)
    type tables = {
      [key: string]: any
    }
    type table = {
      tableName: string;
      schemaName: string;
      totalSize: string;
      totalSizeIndices: string;
      rowCount: number;

    }
    const rows: object[] = []
    const tables: tables = {name: {}, schema:{}, total_size: {}, size_indices: {}, row_count: {}}
    for (const c in data.tables) {
      const v: table = data.tables[c]
      rows.push({
        name: v.tableName,
        schema: v.schemaName,
        total_size: v.totalSize,
        size_indices: v.totalSizeIndices,
        row_count: v.rowCount,
      })
    }
    this.log('Number of tables: ' + data.numberOfTables )
    this.log('Total size of all tables: ' + data.totalSizePretty )
    this.log('')
    cli.table(rows, tables, {
      printLine: this.log.bind(this)
    })
  }
}
