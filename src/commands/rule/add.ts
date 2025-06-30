/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, select} from '@inquirer/prompts'
import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {accessList, requestList, serviceList} from '../../util/lists'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Create a new rule.'
  static flags = {
    priority: Flags.integer({char: 'P', description: 'Priority'}),
    username: Flags.string({char: 'u', description: 'Username'}),
    service: Flags.string({char: 's', description: 'Service'}),
    request: Flags.string({char: 'p', description: 'Request'}),
    schema: Flags.string({char: 'c', description: 'schema'}),
    table: Flags.string({char: 't', description: 'Table'}),
    iprange: Flags.string({char: 'i', description: 'Ip range'}),
    access: Flags.string({char: 'a', description: 'Access'}),
    filter: Flags.string({char: 'f', description: 'Filter'}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Add)

    // Interactive
    const priority = flags?.priority || parseInt(await input({message: 'Priority', required: true, validate: async (input) => {
        return Number.isInteger(parseInt(input));
      }}))
    const username = flags?.username || await input({message: 'Username', required: false, default: '*'})
    const service = flags?.service || await serviceList()
    const request = flags?.request ||  await requestList()
    const schema = flags?.schema || await input({message: 'schema', required: false, default: '*'})
    const table = flags?.table || await input({message: 'table', required: false, default: '*'})
    const iprange = flags?.iprange || await input({message: 'iprange', required: false, default: '*'})
    const access = flags?.access || await accessList()
    const filter = flags?.filter || await input({message: 'filter', required: false})

    const body: {[index: string]:any} = {priority, username, service, request, schema, table, iprange, access, filter}
    Object.keys(body).forEach((key) => {
      if (body[key] === '') {
        delete (body[key])
     }
    });
   // console.log(body)
    const response = await make('4', `rules`, 'POST', body)
    await get(response, 201)
    this.log(`Rule created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
