/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2025 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {constraintList, schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

const base_args = args
const specific_args = {
  name: Args.string(
    {
      required: false,
      description: 'Name of constraint.',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get constraint details.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Get)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const name = args?.name || await constraintList(schema, table)

    const response = await make('4', `schemas/${schema}/tables/${table}/constraints/${name}`, 'GET', null)
    const res: any = await get(response, 200)

    type row = { [key: string]: any }
    const props: object[] = []
    const rows: row = {prop: {}, value: {}}

    props.push({prop: 'Name', value: res.name})
    props.push({prop: 'Type', value: res.constraint})
    if (res?.columns?.length) props.push({prop: 'Columns', value: res.columns.join(', ')})
    if (res?.referenced_table) props.push({prop: 'Referenced table', value: res.referenced_table})
    if (res?.referenced_columns?.length) props.push({prop: 'Referenced columns', value: res.referenced_columns.join(', ')})
    if (res?.check) props.push({prop: 'Check', value: res.check})

    cli.table(props, rows, {
      printLine: this.log.bind(this)
    })
  }
}
