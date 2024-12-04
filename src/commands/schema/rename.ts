/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {schemasList} from '../../util/lists'
import make from '../../util/make-request'

export default class Rename extends Command {
  static description = 'Rename schema.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: false,
        description: 'Name of schema.',
      }
    ),
    name: Args.string(
      {
        required: false,
        description: 'New name for schema.',
      }
    )
  }
  async run() {
    const {args} = await this.parse(Rename)

    let schema = args?.schema || await schemasList()
    const name = args?.name || await input({message: 'New name', required: true})
    const response = await make('4', `schemas/${schema}`, 'PATCH', {name})
    await get(response, 303)
    this.log(`Schema relocated to here ${chalk.green(response.headers.get('Location'))}`)
  }
}
