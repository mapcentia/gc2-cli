/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {columnCheck, constraintTypeList, schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  columns: Args.string(
    {
      required: false,
      description: 'Columns for use in the constraint (comma separated)',
    },
  ),
  type: Args.string(
    {
      required: false,
      description: 'Type of constraint',
      options: ['primary', 'unique', 'foreign', 'check'],
    },
  ),
  name: Args.string(
    {
      required: false,
      description: 'Name for constraint',
    },
  ),
}

export default class Add extends Command {
  static description = 'Add a constraint'
  static flags = {
    help: Flags.help({char: 'h'}),

    referencedTable: Flags.string({
      helpGroup: 'Foreign key options',
      char: 't',
      description: 'Referenced table',
    }),
    referencedColumns: Flags.string({
      helpGroup: 'Foreign key options',
      char: 'e',
      description: 'Referenced columns',
    }),
    check: Flags.string({
      helpGroup: 'Check options',
      char: 'c',
      description: 'Check expression',
    }),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Add)
    let {flags} = await this.parse(Add)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const columns = args?.columns || (await columnCheck(schema, table)).join(',')
    const type = args?.type || await constraintTypeList()
    const name = args?.name || await input({message: 'Name', required: false, default: `${table}-${type}`})

    let body = {
      name,
      columns: columns.split(',').map((e: string) => e.trim()),
      constraint: type,
    }

    if (type === 'foreign') {
      const ft = flags?.referencedTable || await input({message: 'Referenced table', required: true})
      body = {
        ...body, ...{
          referenced_table: ft,
        }
      }

      const fc = flags?.referencedColumns || await input({message: 'Referenced columns', required: false})

      if (fc) {
        body = {
          ...body, ...{
            referenced_columns: fc.split(',').map(e => e.trim()),
          }
        }
      }
    }

    if (type === 'check') {
      const ch = flags?.check || await input({message: 'Check expression', required: true})
      body = {
        ...body, ...{
          check: ch,
        }
      }
    }

    const response = await make('4', `schemas/${schema}/tables/${table}/constraints`, 'POST', body)
    await get(response, 201)
    this.log(`Constraint created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
