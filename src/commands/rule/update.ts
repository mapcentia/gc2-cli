/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, select} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'
import {accessList, requestList, ruleList, serviceList} from '../../util/lists'


let specific_args = {
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
    let {args, flags} = await this.parse(Update)

    const id = args?.id || await ruleList()

    let rule: any
    try {
      const client = createCliCentiaAdminClient()
      rule = await client.provisioning.rules.getRule(Number(id))
    } catch (error) {
      logCentiaErrorAndExit(error)
    }

    // Interactive
    const priority = flags?.priority || parseInt(await input({message: 'Priority', required: true, validate: async (input) => {
        return Number.isInteger(parseInt(input));
      }}))
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

    try {
      const client = createCliCentiaAdminClient()
      const result = await client.provisioning.rules.patchRule(Number(id), body)
      this.log(`Rule updated: ${chalk.green(JSON.stringify(result))}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
