/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, select} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {columnCheck, schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import args, {BaseArgs} from '../../common/base_args'
import setSchema from '../../util/set-schema'

const base_args: BaseArgs = args
const specific_args = {
  columns: Args.string(
    {
      required: false,
      description: 'Columns to index (comma separated).',
    },
  ),
  method: Args.string(
    {
      required: false,
      description: 'Index method.',
      options: ['btree', 'brin', 'gin', 'gist', 'hash']
    },
  ),
  name: Args.string(
    {
      required: false,
      description: 'Name of new index.',
    },
  ),
}

export default class Add extends Command {
  static description = 'Add an new index to table.'
  static flags = {
    // unique: Flags.boolean({
    //   char: 'u',
    //   description: 'Causes the system to check for duplicate values in the table when the index is created.',
    //   required: false
    // }),
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Add)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const columns = args?.columns || (await columnCheck(schema, table)).join(',')
    const method = args?.method || await select({
      message: 'Choose index method',
      default: 'btree',
      choices: [
        {value: 'btree', name: 'Btree'},
        {value: 'brin', name: 'Brin'},
        {value: 'gin', name: 'Gin'},
        {value: 'gist', name: 'Gist'},
        {value: 'hash', name: 'Hash'},
      ]
    })
    const name = args?.name || await input({message: 'Name of new index', required: false, default: `${table}-${method}`})
    const body = {
      name,
      columns: columns.split(',').map((e: string) => e.trim()),
      method,
    }
    const response = await make('4', `schemas/${schema}/tables/${table}/indices`, 'POST', body)
    await get(response, 201)
    this.log(`Index created here: ${chalk.green(response.headers.get('Location'))}`)
  }
}
