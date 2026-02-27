/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {confirm} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'
import {clientList} from '../../util/lists'

export default class Drop extends Command {
  static description = 'Drop a client.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    id: Args.string(
      {
        required: false,
        description: 'Id of client.',
      },
    )
  }

  async run() {
    const {args} = await this.parse(Drop)
    let id = args?.id || await clientList()
    if (!await confirm({message: '⚠️ The client will be deleted. Are you sure', default: false})) {
      this.exit();
    }
    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.clients.deleteClient(id)
      this.log(`Client is dropped.`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
