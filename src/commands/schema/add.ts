/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Create new schema'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: false,
        description: 'name of schema',
      }
    )
  }
  async run() {
    const {args} = await this.parse(Add)
    const schema = args?.schema || await cli.prompt('Name', {required: true})
    const response = await make('4', `schemas`, 'POST', {schema})
    await get(response, 201)
    this.log(`Schema created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
