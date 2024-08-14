/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Get extends Command {
  static description = 'Get table definition.'
  static flags = {
    help: Flags.help({char: 'h'}),
    ...ux.table.flags()
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'Name of schema',
      }
    )
  }
  async run() {
    const {args} = await this.parse(Get)
    const {flags} = await this.parse(Get)
    const response = await make('4', `schemas/${args.schema}`, 'GET', null)
    const res = await get(this, response, 200)
    type columns = {
      [key: string]: any
    }
    type column = {
      table: string;
    }
    const data: object[] = []
    const columns: columns = {table: {}}
    for (const c in res.tables) {
      const v: column = res.tables[c]
      data.push({
        table: v.table.split('.').reverse()[0],

      })
    }
    cli.table(data, columns, {
      printLine: this.log.bind(this),
      ...flags
    })
  }
}
