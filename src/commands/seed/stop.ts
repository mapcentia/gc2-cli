/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Stop extends Command {
  static description = 'Stops a running seed job.'
  static flags = {
    help: Flags.help({char: 'h'}),
    uuid: Flags.string({char: 'u', description: 'UUID of seed job.', required: true}),
  }
  async run() {
    const {flags} = await this.parse(Stop)
    const response = await make('3', `tileseeder/index/` + flags.uuid, 'DELETE', null)
    const data = await get(response, 200)
    console.log(data)
    if (data.success) {
      this.log(chalk.green(`SUCCESS: Seed job ${data.pid.uuid} with name ${data.pid.name} was stopped.`))
    } else {
      this.log(chalk.red(`FAILURE: Seed job ${flags.uuid} doesn't exists`))
    }
  }
}
