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
  static description = 'Drop existing user'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    name: Args.string(
      {
        required: true,
        description: 'Name of user to drop',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Drop)
    const response = await make('4', `users/${args.name}`, 'DELETE', null)
    await get(this, response, 204)
    this.log(`User ${chalk.green(args.name)} dropped`)
  }
}
