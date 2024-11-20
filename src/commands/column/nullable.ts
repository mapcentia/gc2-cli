/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {select} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {tables} from '../../util/getters'
import {columnList, schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Name of column',
    },
  ),
  nullable: Args.string(
    {
      required: false,
      options: ['true', 'false']
    },
  ),
}
export default class Nullable extends Command {
  static description = 'Set column to nullable'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Nullable)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)

    const res = await tables(schema, table)
    const c = res.columns.filter((e: { name: any }) => e.name === column)[0]

    const nullable = args?.nullable || (await select({
      message: 'Nullable',
      default: c.is_nullable ? 'true' : 'false',
      choices: [{value: 'true'}, {value: 'false'}],
    }))

    const body = {
      is_nullable: nullable === 'true'
    }
    const response = await make('4', `schemas/${schema}/tables/${table}/columns/${column}`, 'PATCH', body)
    await get(response, 303)
    this.log(`Column ${chalk.green(column)} is now ${nullable !== 'true' ? chalk.red('NOT ') : ''}nullable`)
  }
}
