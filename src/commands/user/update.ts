/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {users} from '../../util/getters'
import {userList} from '../../util/lists'
import make from '../../util/make-request'

export default class Update extends Command {
  static description = 'Update user'

  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'New password', required: false}),
    email: Flags.string({char: 'e', description: 'New e-mail', required: false}),
    properties: Flags.string({char: 'e', description: 'New properties', required: false}),
    group: Flags.string({char: 'g', description: 'New group', required: false}),
  }
  static args = {
    name: Args.string(
      {
        required: false,
        description: 'Name of user',
      }
    ),
  }

  async run() {
    let {args, flags} = await this.parse(Update)

    const name = args?.name || await userList()
    const user = await users(name)
    const password = flags?.password || await cli.prompt('Password', {required: false, type: 'hide', default: undefined})
    const email = flags?.password || await cli.prompt('E-mail', {required: true, default: user.email})
    const group = flags?.group || await userList(user.user_group)

    const p: string|null = password === '' ? null: password

    const body = {
      email,
      password: p,
      user_group: group,
      properties: flags.properties,
    }
    const response = await make('4', `users/${name}`, 'PUT', body)
    await get(response, 303)
    this.log(`User is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
