/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import cli from 'cli-ux'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Start extends Command {
  static description = 'Get jobs in progress'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
    const response = await make('3', `scheduler`, 'GET', null)
    const res = await get(this, response, 200)
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
  }
}
