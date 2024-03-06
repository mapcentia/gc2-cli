/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import make from '../../util/make-request'
import get from '../../util/get-response'

export default class Restore extends Command {
  static description = 'Restore all (mat)views definitions from schema'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    from: Args.string(
      {
        required: true,
        description: 'comma separated list of source schemas',
      }
    ),
    to: Args.string(
      {
        required: false,
        description: 'comma separated list of target schemas',
      }
    ),
    relation: Args.string(
      {
        required: false,
        description: 'single relation',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Restore)
    const from = args.from.split(',').map(s => s.trim())
    const to = args?.to ? args.to.split(',').map(s => s.trim()) : null
    const response = await make('3', `view`, 'PUT', {from, to})
    const res = await get(this, response, 200)
    this.log(`${chalk.green(res.count)} views restored`)
  }
}
