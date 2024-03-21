/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2023 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Start extends Command {
  static description = 'Starts a scheduler job'
  static args = {
    id: Args.string(
      {
        required: true,
        description: 'job id to start. Can also be a schema name and all jobs for that schema will be started',
      },
    ),

  }
  static flags = {
    help: Flags.help({char: 'h'}),
    name: Flags.string(
      {
        char: 'n',
        description: 'Name the started job(s). The name will be listed in the progress status',
        required: false
      }),
    force: Flags.boolean(
      {
        char: 'f',
        description: 'force table to be recreated',
        required: false,
      },
    ),
  }

  async run() {
    const {args} = await this.parse(Start)
    const {flags} = await this.parse(Start)
    const response = await make('3', `scheduler/${args.id}`, 'POST', flags)
    await get(this, response, 202)
    this.log(`See status here: ${chalk.green(response.headers.get('Location'))}`)
  }
}
