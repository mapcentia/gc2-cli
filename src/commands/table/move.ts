/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  destination: Args.string(
    {
      required: false,
      description: 'Destination schema'
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

    const response = await make('4', `schemas/${schema}/tables/${table}`, 'PUT', {schema: destination})
    await get(response, 303)
    this.log(`Table relocated to here ${chalk.green(response.headers.get('Location'))}`)
  }
}
