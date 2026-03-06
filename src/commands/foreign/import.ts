/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Import extends Command {
  static description = 'Import schema from foreign server.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    server: Args.string(
      {
        required: true,
        description: 'Name of foreign server.',
      }
    ),
    from: Args.string(
      {
        required: true,
        description: 'Comma separated list of foreign schemas.',
      }
    ),
    to: Args.string(
      {
        required: true,
        description: 'Comma separated list of local schemas.',
      }
    ),
    include: Args.string(
      {
        required: false,
        description: 'Only include named relations in import. Comma separated.',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Import)
    const from = args.from.split(',').map(s => s.trim())
    const to = args?.to ? args.to.split(',').map(s => s.trim()) : null
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    const server = args.server
    try {
      const client = createCliCentiaAdminClient()
      await client.http.request<any>({
        path: 'api/v3/foreign',
        method: 'POST',
        body: {from, to, server, include},
        expectedStatus: 201,
      })
      this.log(`${chalk.green('Schemas imported.')}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
