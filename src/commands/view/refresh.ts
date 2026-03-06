/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Refresh extends Command {
  static description = 'Refresh all materialized views in schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schemas: Args.string(
      {
        required: true,
        description: 'Comma separated list of schemas.',
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
    const {args} = await this.parse(Refresh)
    const schemas = args.schemas.split(',').map(s => s.trim())
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    try {
      const client = createCliCentiaAdminClient()
      const res = await client.http.request<any>({
        path: 'api/v3/view/refresh',
        method: 'PATCH',
        body: {schemas, include},
      })
      this.log(`${chalk.green(res.count)} views refreshed`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
