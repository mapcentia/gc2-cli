/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Drop extends Command {
  static description = 'Drop all foreign tables in schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schemas: Args.string(
      {
        required: true,
        description: 'Schemas for dropping (comma separated).',
      }
    ),
    include: Args.string(
      {
        required: false,
        description: 'Only drop named foreign tables. Comma separated.',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Drop)
    const schemas = args.schemas.split(',').map(s => s.trim())
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    try {
      const client = createCliCentiaAdminClient()
      const res = await client.http.request<any>({
        path: 'api/v3/foreign',
        method: 'DELETE',
        body: {schemas, include},
      })
      this.log(`${chalk.green(res.count)} foreign tables dropped`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
