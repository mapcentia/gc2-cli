/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {select} from '@inquirer/prompts'
import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import {rules} from '../../util/getters'
import {ruleList} from '../../util/lists'
import make from '../../util/make-request'
import {input} from '@inquirer/prompts'


let specific_args = {
  id: Args.string(
    {
      required: false,
      description: 'Rule id',
    },
  ),
}

export default class Update extends Command {
  static description = 'Update rule rule'
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
    let {args, flags} = await this.parse(Update)

    const id = args?.id || await ruleList()

    const rule = await rules(id)
    console.log(rule)

    // Interactive
    const priority = flags?.priority || await input({message: 'Priority', required: true, default: rule.priority})
    const username = flags?.username || await cli.prompt('Username', {required: false, default: rule.username})
    const service = flags?.service || await cli.prompt('service', {required: false, default: rule.service})
    const request = flags?.request ||  await select({
      message: 'Request',
      default: rule.request,
      choices: [
        {value: '', name: '*'},
        {value: 'select', name: 'Select'},
        {value: 'insert', name: 'Insert'},
        {value: 'update', name: 'Update'},
        {value: 'delete', name: 'Delete'},
      ]
    })
    const schema = flags?.schema || await cli.prompt('schema', {required: false, default: rule.schema})
    const table = flags?.table || await cli.prompt('table', {required: false, default: rule.layer})
    const iprange = flags?.iprange || await cli.prompt('IP range', {required: false, default: rule.iprange})
    const access = flags?.access || await select({
      message: 'Access',
      default: rule.access,
      choices: [
        {value: 'deny', name: 'Deny'},
        {value: 'allow', name: 'Allow'},
        {value: 'limit', name: 'Limit'},
      ]
    })
    const filter = flags?.filter || await cli.prompt('Filter', {required: false, default: rule.filter})
    const body: {[index: string]:any} = {priority, username, service, request, schema, layer:table, iprange, access, filter}
    Object.keys(body).forEach((key) => {
      if (body[key] === '') {
        delete (body[key])
      }
    });
    // console.log(body)
    const response = await make('4', `rules/${id}`, 'PUT', body)
    this.log(`Rule is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
