/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Backup extends Command {
  static description = 'Backup all (mat)views definitions in schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schemas: Args.string(
      {
        required: true,
        description: 'Schemas for backup (comma separated).',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Backup)
    const schemas = args.schemas.split(',').map(s => s.trim())
    try {
      const client = createCliCentiaAdminClient()
      const res = await client.http.request<any>({
        path: 'api/v3/view',
        method: 'POST',
        body: {schemas},
        expectedStatus: 201,
      })
      this.log(`${chalk.green(res.count)} views backed up.`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
