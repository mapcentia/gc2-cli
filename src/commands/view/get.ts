/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import make from '../../util/make-request'
import get from '../../util/get-response'

export default class Get extends Command {
  static description = 'Get "*" definitions from backup for schema'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'get star views for schema',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Get)
    const response = await make('3', `view/${args.schema}`, 'GET', null)
    const res = await get(response, 200)
    type Columns = {
      [key: string]: any
    }
    type Column = {
      definition: string;
      name: string;
      schemaname: string;
      ismat: boolean;
    }
    const data: object[] = []
    const columns: Columns = {name: {}, schemaname: {}, definition: {}, ismat: {}}
    for (const c in res.views) {
      const v: Column = res.views[c]
      data.push({
        definition: v.definition,
        name: v.name,
        schemaname: v.schemaname,
        ismat: v.ismat,
      })
    }
    cli.table(data, columns, {
      printLine: this.log.bind(this)
    })
  }
}
