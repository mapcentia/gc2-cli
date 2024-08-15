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
  static description = 'Rename table'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'Name of schema',
      }
    ),
    table: Args.string(
      {
        required: true,
        description: 'Name of table',
      }
    ),
    name: Args.string(
      {
        required: true,
        description: 'New name for table',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Rename)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}`, 'PUT', {table: args.name})
    await get(response, 303)
    this.log(`Table relocated to here ${chalk.green(response.headers.get('Location'))}`)
  }
}
