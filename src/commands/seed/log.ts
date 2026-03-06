/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Log extends Command {
  static description = 'Get progress of a running job.'
  static flags = {
    help: Flags.help({char: 'h'}),
    uuid: Flags.string({char: 'u', description: 'UUID of seed job.', required: true}),
  }
  async run() {
    const {flags} = await this.parse(Log)
    try {
      const client = createCliCentiaAdminClient()
      const data = await client.http.request<any>({
        path: `api/v3/tileseeder/log/${flags.uuid}`,
        method: 'GET',
      })
      this.log(data.data)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
