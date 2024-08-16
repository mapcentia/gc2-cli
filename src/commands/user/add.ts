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
  static description = 'Create user with password and email'

  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'password of new user', required: false}),
    email: Flags.string({char: 'e', description: 'email of new user', required: false}),
    properties: Flags.string({char: 'e', description: 'properties of new user', required: false}),
  }
  static args = {
    name: Args.string(
      {
        required: false,
        description: 'Name of new user',
      }
    ),
  }

  async run() {
    let {args, flags} = await this.parse(Add)

    const name = args?.name || await cli.prompt('Name', {required: true})
    const password = flags?.password || await cli.prompt('Password', {required: true, type: 'hide'})
    const email = flags?.password || await cli.prompt('E-mail', {required: true})

    const body = {
      name,
      email,
      password,
      properties: flags.properties,
    }
    const response = await make('4', `users`, 'POST', body)
    await get(response, 201)
    this.log(`User created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
