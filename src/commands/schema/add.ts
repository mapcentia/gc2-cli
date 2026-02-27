/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {input} from '@inquirer/prompts'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Add extends Command {
  static description = 'Create a new schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: false,
        description: 'Name of new schema.',
      }
    )
  }
  async run() {
    const {args} = await this.parse(Add)
    const name = args?.schema || await input({message: 'Name', required: true})
    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.schemas.postSchema({name})
      this.log(`Schema created here: ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
