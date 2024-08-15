/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import inquirer from 'inquirer'
import get from '../../util/get-response'
import {clients} from '../../util/getters'
import {clientList} from '../../util/lists'
import make from '../../util/make-request'

export default class Drop extends Command {
  static description = 'Drop a client'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    id: Args.string(
      {
        required: false,
        description: 'Id of client',
      },
    )
  }

  async run() {
    const {args} = await this.parse(Drop)
    let id = args?.id || await clientList()
    const response = await make('4', `clients/${id}`, 'DELETE')
    await get(response, 204)
    this.log(`Client is dropped`)
  }
}
