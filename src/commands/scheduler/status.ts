/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Start extends Command {
  static description = 'Get jobs in progress.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
    try {
      const client = createCliCentiaAdminClient()
      const res = await client.http.request<any>({
        path: 'api/v3/scheduler',
        method: 'GET',
      })
      type Columns = {
        [key: string]: any
      }
      type Column = {
        id: number;
        pid: number;
        name: string;
      }
      const data: object[] = []
      const columns: Columns = {id: {}, pid: {}, name: {}}
      if (res.jobs.length > 0) {
        for (const c in res.jobs) {
          const v: Column = res.jobs[c]
          data.push({
            id: v.id,
            pid: v.pid,
            name: v.name || '-',
          })
        }
        cli.table(data, columns, {
          printLine: this.log.bind(this)
        })
      } else {
        this.exit(0)
      }
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
