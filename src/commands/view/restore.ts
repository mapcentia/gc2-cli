/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Restore extends Command {
  static description = 'Restore all (mat)views definitions from schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    from: Args.string(
      {
        required: true,
        description: 'Comma separated list of source schemas.',
      }
    ),
    to: Args.string(
      {
        required: false,
        description: 'Comma separated list of target schemas.',
      }
    ),
    include: Args.string(
      {
        required: false,
        description: 'Only include named views in restore. Comma separated.',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Restore)
    const from = args.from.split(',').map(s => s.trim())
    const to = args?.to ? args.to.split(',').map(s => s.trim()) : null
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    try {
      const client = createCliCentiaAdminClient()
      const res = await client.http.request<any>({
        path: 'api/v3/view',
        method: 'PATCH',
        body: {from, to, include},
      })
      this.log(`${chalk.green(res.count)} views restored.`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
