/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {confirm} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'
import {userList} from '../../util/lists'

export default class Drop extends Command {
  static description = 'Drop existing user.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    name: Args.string(
      {
        required: false,
        description: 'Name of user to drop.',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Drop)
    const name = args?.name || await userList()
    if (!await confirm({message: '⚠️ The user will be deleted. Are you sure', default: false})) {
      this.exit();
    }
    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.users.deleteUser(name)
      this.log(`User ${chalk.green(name)} dropped.`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
