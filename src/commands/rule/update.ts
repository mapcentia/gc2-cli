/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {select} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {rules} from '../../util/getters'
import {accessList, requestList, ruleList, serviceList} from '../../util/lists'
import make from '../../util/make-request'
import {input} from '@inquirer/prompts'


const specific_args = {
  id: Args.string(
    {
      required: false,
      description: 'Rule id.',
    },
  ),
}

export default class Update extends Command {
  static description = 'Update a rule.'
  static args = {...specific_args}
  static flags = {
    priority: Flags.string({char: 'p', description: 'Priority'}),
    username: Flags.string({char: 'u', description: 'Username'}),
    service: Flags.string({char: 's', description: 'Service'}),
    request: Flags.string({char: 'r', description: 'Request'}),
    schema: Flags.string({char: 'c', description: 'schema'}),
    table: Flags.string({char: 't', description: 'Table'}),
    iprange: Flags.string({char: 'i', description: 'Ip range'}),
    access: Flags.string({char: 'a', description: 'Access'}),
    filter: Flags.string({char: 'f', description: 'Filter'}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = await this.parse(Update)

    const id = args?.id || await ruleList()
    const rule = await rules(id)

    // Interactive
    const priority = flags?.priority || await input({message: 'Priority', required: true, default: rule.priority})
    const username = flags?.username || await input({message: 'Username', required: false, default: rule.username})
    const service = flags?.service || await serviceList(rule.service)
    const request = flags?.request ||  await requestList(rule.request)
    const schema = flags?.schema || await input({message: 'Schema', required: false, default: rule.schema})
    const table = flags?.table || await input({message: 'Table', required: false, default: rule.table})
    const iprange = flags?.iprange || await input({message: 'IP range', required: false, default: rule.iprange})
    const access = flags?.access || await accessList(rule.access)
    const filter = flags?.filter || await input({message: 'Filter', required: false, default: rule.filter})
    const body: {[index: string]:any} = {priority, username, service, request, schema, table, iprange, access, filter}
    Object.keys(body).forEach((key) => {
      if (body[key] === '') {
        delete (body[key])
      }
    });

    const response = await make('4', `rules/${id}`, 'PATCH', body)
    this.log(`Rule is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
