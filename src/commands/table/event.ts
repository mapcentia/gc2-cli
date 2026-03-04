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
import {confirm} from '@inquirer/prompts'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'


let base_args = args
let specific_args = {
  event: Args.boolean(
    {
      required: false,
      description: 'Emit events.'
    }
  ),
}

export default class Event extends Command {
  static description = 'Enable emitting of realtime events from tables.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}
  async run() {
    let {args} = await this.parse(Event)

    args = setSchema(args)
    const schema: string = args?.schema || await schemasList()
    const table: string = args?.table || await tableList(schema)
    const event: boolean = args.event !== undefined ? args.event : await confirm({message: 'Emit events', default: true})
    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.tables.patchTable(schema, table, {emit_events: event})
      this.log(`Table relocated to here ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
