/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, password} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {users} from '../../util/getters'
import {groupList, userList} from '../../util/lists'
import make from '../../util/make-request'
import {passwordIsStrongEnough} from '../../util/utils'

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
        description: 'Name of user.',
      }
    ),
  }

  async run() {
    let {args, flags} = await this.parse(Update)

    const name = args?.name || await userList()
    const user = await users(name)
    const pwd = flags?.password || await password({message: 'Password', mask: true, validate: (t) => passwordIsStrongEnough(t, true)})
    const email = flags?.password || await input({message: 'E-mail', required: true, default: user.email})
    const group = flags?.group || await groupList(name, user.user_group)

    const p: string|null = pwd === '' ? null: pwd

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
