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
    job: Args.string(
      {
        required: true,
        description: 'job id to start. Can also be a schema name and all jobs for that schema will be started',
      },
    ),
    include: Args.string(
      {
        required: false,
        description: 'only include jobs for named tables. Comma separated. Will only have effect id schema is used in "job" option',
      }
    )

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
    const job = args.job
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    const {flags} = await this.parse(Start)
    const payload = {
      job,
      include,
      name: flags.name,
      force: flags.force
    }
    const response = await make('3', `scheduler`, 'POST', payload)
    await get(this, response, 202)
    this.log(`See status here: ${chalk.green(response.headers.get('Location'))}`)
  }
}
