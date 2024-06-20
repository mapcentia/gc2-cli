/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'
import args, {BaseArgs} from '../../common/base_args'

let base_args: BaseArgs = args
let specific_args = {
  columns: Args.string(
    {
      required: true,
      description: 'Columns to index (comma separated)',
    },
  ),
  method: Args.string(
    {
      required: false,
      description: 'Index method',
      default: 'btree',
      options: ['brin', 'btree', 'gin', 'gist', 'hash', 'gist']
    },
  ),
  name: Args.string(
    {
      required: false,
      description: 'Name for index',
    },
  ),
}

export default class Add extends Command {
  static description = 'Add index'
  static flags = {
    unique: Flags.boolean({
      char: 'u',
      description: 'Causes the system to check for duplicate values in the table when the index is created',
      required: false
    }),
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    const {args} = await this.parse(Add)
    const body = {
      name: args.name,
      columns: args.columns.split(',').map((e: string) => e.trim()),
      method: args.method,
    }
    const response = await make('4', `schemas/${args.schema || 'rosa'}/tables/${args.table}/indices`, 'POST', body)
    await get(this, response, 201)
    this.log(`Index created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
