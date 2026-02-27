/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import {schemasList, tableList} from '../../util/lists'
import setSchema from '../../util/set-schema'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

let base_args = args
let specific_args = {
  destination: Args.string(
    {
      required: false,
      description: 'Destination schema.'
    }
  ),
}

export default class Move extends Command {
  static description = 'Move table to another schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}
  async run() {
    let {args} = await this.parse(Move)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const destination = args?.destination || await schemasList('Choose a destination schema')

    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.tables.patchTable(schema, table, {schema: destination})
      this.log(`Table relocated to here ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
