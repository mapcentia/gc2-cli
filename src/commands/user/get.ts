/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2025 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
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
    const res = await users(args?.id)
    const items: any[] = Array.isArray(res) ? res : [res]

    type row = {
      [key: string]: any
    }

    const data: object[] = []
    const rows: row = {name: {}, user_group: {}, email: {}, default_user: {}}
    for (const v of items) {
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
