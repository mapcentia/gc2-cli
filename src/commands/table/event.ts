/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {checkbox} from '@inquirer/prompts'
import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'
import {confirm} from '@inquirer/prompts'


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
    const response = await make('4', `schemas/${schema}/tables/${table}`, 'PATCH', {emit_events: event})
    await get(response, 303)
    this.log(`Table relocated to here ${chalk.green(response.headers.get('Location'))}`)
  }
}
