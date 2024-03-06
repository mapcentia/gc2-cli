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

export default class Drop extends Command {
  static description = 'Drop table'
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
        description: 'Name of table to drop',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Drop)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}`, 'DELETE', null)
    await get(this, response, 204)
    this.log(`Table ${chalk.green(args.table)} dropped`)
  }
}
