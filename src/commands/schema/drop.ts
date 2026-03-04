/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {schemasList} from '../../util/lists'
import {confirm} from '@inquirer/prompts'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Drop extends Command {
  static description = 'Drop a schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: false,
        description: 'Name of schema.',
      }
    )
  }
  async run() {
    const {args} = await this.parse(Drop)
    let schema = args?.schema || await schemasList()
    if (!await confirm({message: '⚠️ The whole schema will be deleted. Are you sure', default: false})) {
      this.exit();
    }
    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.schemas.deleteSchema(schema)
      this.log(`Schema ${chalk.green(schema)} dropped.`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
