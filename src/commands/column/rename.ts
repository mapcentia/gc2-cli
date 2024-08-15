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

export default class Rename extends Command {
  static description = 'Rename column'

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
        description: 'Existing Name of column',
      },
    ),
    name: Args.string(
      {
        required: true,
        description: 'New name for column',
      },
    ),
  }
  async run() {
    const {args} = await this.parse(Rename)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}/columns/${args.column}`, 'PUT', {column: args.name})
    await get(response, 303)
    this.log(`Column relocated to here ${chalk.green(response.headers.get('Location'))}`)
  }
}
