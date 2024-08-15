/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Add column'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'Name of schema',
      },
    ),
    table: Args.string(
      {
        required: true,
        description: 'Name of table',
      },
    ),
    column: Args.string(
      {
        required: true,
        description: 'Name of new column',
      },
    ),
    type: Args.string(
      {
        required: true,
        description: 'Type of new column',
      },
    ),
  }
  async run() {
    const {args} = await this.parse(Add)
    const body = {
      column: args.column,
      type: args.type,
    }
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}/columns`, 'POST', body)
    await get(response, 201)
    this.log(`Column created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
