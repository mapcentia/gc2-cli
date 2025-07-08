/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2025 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux} from '@oclif/core'
import cli from 'cli-ux'
import {users} from '../../util/getters'

let specific_args = {
  id: Args.string(
    {
      required: false,
      description: 'User id',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get user(s).'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...specific_args}

  async run() {
    let {args} = await this.parse(Get)
    let res = await users(args?.id)

    type row = {
      [key: string]: any
    }

    const data: object[] = []
    const rows: row = {name: {}, user_group: {}, email: {}, default_user: {}}
    for (const c in res.users) {
      const v = res.users[c]
      data.push({
        name: v.name,
        user_group: v.user_group || '',
        email: v.email,
        default_user: v.default_user,
      })
    }
    cli.table(data, rows, {printLine: this.log.bind(this)})
  }
}
