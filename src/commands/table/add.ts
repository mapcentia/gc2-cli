/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2026 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'

import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'
import args from '../../common/base_args'
import {schemasList} from '../../util/lists'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {}

export class Add extends Command {
  static description = 'Create a new table.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Add)
    args = setSchema(args)

    // Interactive
    const schema = args?.schema || await schemasList()
    const name = args?.table || await input({message: 'Table', required: true})

    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.tables.postTable(schema, {name})
      this.log(`Table created here ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
