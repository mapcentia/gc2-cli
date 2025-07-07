/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import {rules} from '../../util/getters'

let specific_args = {
  id: Args.string(
    {
      required: false,
      description: 'Rule id',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get rule(s).'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...specific_args}
  async run() {
    let {args} = await this.parse(Get)
    let res = await rules(args?.id)
    if (args?.id) {
      res = {rules: [res]};
    }
    type row = {
      [key: string]: any
    }
    type rule = {
      id: string;
      priority: string;
      username?: string;
      service?: string;
      request?: string;
      schema?: string;
      table?: string;
      iprange?: string;
      access?: string;
      filter?: string;
    }
    const data: object[] = []
    const rows: row = {id: {}, priority: {}, username: {} , service: {}, request: {},
      schema: {}, table: {}, iprange: {}, access: {}, filter: {}}
    for (const c in res.rules) {
      const v: rule = res.rules[c]
      data.push({
        id: v.id,
        priority: v.priority,
        username: v.username,
        service: v.service,
        request: v.request,
        schema: v.schema,
        table: v.table,
        iprange: v.iprange,
        access: v.access,
        filter: v.filter,
      })
    }
    cli.table(data, rows, {
      printLine: this.log.bind(this)
    })
  }
}
