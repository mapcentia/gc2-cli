/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {confirm} from '@inquirer/prompts'
import {Args, Command, Flags, ux, ux as cli} from '@oclif/core'
import get from '../../util/get-response'
import {clientList, ruleList} from '../../util/lists'
import make from '../../util/make-request'
import chalk from "chalk";

export default class Drop extends Command {
  static description = 'Drop a rule.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    id: Args.string(
      {
        required: false,
        description: 'Id of rule',
      },
    )
  }

  async run() {
    const {args} = await this.parse(Drop)
    let id = args?.id || await ruleList()
    if (!await confirm({message: '⚠️ The rule will be deleted. Are you sure', default: false})) {
      this.exit();
    }
    const response = await make('4', `rules/${id}`, 'DELETE')
    await get(response, 204)
    this.log(`Rule ${chalk.green(id)} is dropped.`)
  }
}
