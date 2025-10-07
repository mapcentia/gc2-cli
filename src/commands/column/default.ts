/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, select} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {tables} from '../../util/getters'
import {columnList, schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

const base_args = args
const specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Name of column.',
    },
  ),
  default: Args.string(
    {
      required: false,
      description: 'Default value. Set to \'null\' for removing an already set value.',
    },
  ),
}
export default class Default extends Command {
  static description = 'Set default value for column. The default value is set when inserting a new row without a value for the column.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Default)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)
    const res = await tables(schema, table)
    const c = res.columns.filter((e: { name: any }) => e.name === column)[0]
    const defaultValue = args?.default || await input({
      message: 'Default value',
      default: c.default_value,
      required: true
    })
    const body = {
      default_value: defaultValue
    }
    const response = await make('4', `schemas/${schema}/tables/${table}/columns/${column}`, 'PATCH', body)
    await get(response, 303)
    if (defaultValue === 'null') {
      this.log(`Column ${chalk.green(column)} has now NO default value.`)
    } else {
      this.log(`Column ${chalk.green(column)} has now default value.`)
    }
  }
}
