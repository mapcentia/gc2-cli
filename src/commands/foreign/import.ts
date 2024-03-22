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

export default class Import extends Command {
  static description = 'Import schema from foreign server'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    server: Args.string(
      {
        required: true,
        description: 'name of foreign server',
      }
    ),
    from: Args.string(
      {
        required: true,
        description: 'comma separated list of foreign schemas',
      }
    ),
    to: Args.string(
      {
        required: true,
        description: 'comma separated list of local schemas',
      }
    ),
    include: Args.string(
      {
        required: false,
        description: 'only include named relations in import. Comma separated',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Import)
    const from = args.from.split(',').map(s => s.trim())
    const to = args?.to ? args.to.split(',').map(s => s.trim()) : null
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    const server = args.server
    const response = await make('3', `foreign`, 'POST', {from, to, server, include})
    await get(this, response, 201)
    this.log(`${chalk.green('Schemas imported')}`)
  }
}
