/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {confirm, input, password} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import User from '../../common/user'
import get from '../../util/get-response'
import {users} from '../../util/getters'
import {groupList, userList} from '../../util/lists'
import make from '../../util/make-request'
import {passwordIsStrongEnough} from '../../util/utils'

const config: Configstore = new Configstore('gc2-env')
const userConfig: User = config.all

let args: any = {}
if (userConfig.superUser) {
  args.name = Args.string(
    {
      required: false,
      description: 'Name of user.',
    }
  )
} else {
  args = null
}

let flags: any = {
  help: Flags.help({char: 'h'}),
  password: Flags.string({char: 'p', description: 'New password for user.', required: false}),
  default_user: Flags.boolean({char: 'd', description: 'The default user is the user that is used when no token is provided. Use for public applications where users should not be able to access data without a token.', required: false}),
}
if (userConfig.superUser) {
  flags.properties = Flags.string({char: 'e', description: 'New properties.', required: false})
  flags.group = Flags.string({char: 'g', description: 'New group.', required: false})
}

export default class Update extends Command {
  static description = 'Update user.'
  static flags = flags
  static args = args

  async run() {
    let {args, flags} = await this.parse(Update)
    let name
    let user
    let group

    if (userConfig.superUser) {
      name = args?.name || await userList()
    } else {
      name = userConfig.user
    }
    user = await users(name)
    const pwd = flags?.password || await password({message: 'Password', mask: true, validate: (t) => passwordIsStrongEnough(t, true)})
    const email = flags?.password || await input({message: 'E-mail', required: true, default: user.email})
    const default_user = flags?.default_user || await confirm({message: 'Default user?', default: user.default_user})
    if (userConfig.superUser) {
      group = flags?.group || await groupList(name, user.user_group)
    }

    const p: string|null = pwd === '' ? null: pwd

    let body: any = {
      email,
      password: p,
      properties: flags.properties,
      default_user,
    }
    if (userConfig.superUser) {
      body.user_group = group
    }

    const response = await make('4', `users/${name}`, 'PATCH', body)
    await get(response, 303)
    this.log(`User is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
