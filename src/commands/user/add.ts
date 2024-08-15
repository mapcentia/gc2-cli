/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Create user with password and email'

  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'password of new user', required: true}),
    email: Flags.string({char: 'e', description: 'email of new user', required: true}),
    properties: Flags.string({char: 'e', description: 'properties of new user', required: false}),
  }
  static args = {
    name: Args.string(
      {
        required: true,
        description: 'Name of new user',
      }
    ),
  }

  async run() {
    const {args, flags} = await this.parse(Add)
    const body = {
      name: args.name,
      email: flags.email,
      password: flags.password,
      properties: flags.properties,
    }
    const response = await make('4', `users`, 'POST', body)
    await get(response, 201)
    this.log(`User created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
