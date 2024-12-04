/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input,password} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'
import {passwordIsStrongEnough} from '../../util/utils'

export default class Add extends Command {
  static description = 'Create new user.'

  static args = {
    name: Args.string(
      {
        required: false,
        description: 'Name of new user',
      }
    ),
  }

  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'password for new user.', required: false}),
    email: Flags.string({char: 'e', description: 'E-mail for new user', required: false}),
    properties: Flags.string({char: 'e', description: 'Properties for new user', required: false}),
  }

  async run() {
    let {args, flags} = await this.parse(Add)

    const name = args?.name || await input({message: 'Username', required: true})
    const pwd = flags?.password || await password({message: 'Password', mask:true, validate: passwordIsStrongEnough})
    const email = flags?.email || await input({message: 'E-mail', required: true})

    const body = {
      name,
      email,
      password: pwd,
      properties: flags.properties,
    }
    const response = await make('4', `users`, 'POST', body)
    await get(response, 201)
    this.log(`User created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
