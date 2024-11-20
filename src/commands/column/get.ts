/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {columnList, schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Column',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get a column'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Get)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)

    const response = await make('4', `schemas/${schema}/tables/${table}/columns/${column}`, 'GET', null)
    const res = await get(response, 200)
    this.log(res)

    type row = {
      [key: string]: any
    }
    const props: object[] = []
    const rows: row = {prop: {}, value: {}}
    props.push({prop: 'Name', value: res.name})
    props.push({prop: 'Type', value: res.full_type})
    props.push({prop: 'Is primary', value: res.is_primary})
    props.push({prop: 'Is unique', value: res.is_unique})
    props.push({prop: 'Is nullable', value: res.is_nullable})
    props.push({prop: 'Default value', value: res.default_value || ''})
    if (res.character_maximum_length) props.push({
      prop: 'character_maximum_length',
      value: res.character_maximum_length
    })
    if (res.numeric_precision) props.push({prop: 'Numeric precision', value: res.numeric_precision})
    if (res.numeric_scale) props.push({prop: 'Numeric scale', value: res.numeric_scale})
    if (res.max_bytes) props.push({prop: 'Max bytes', value: res.max_bytes})
    if (res.reference) props.push({prop: 'Reference', value: res.reference})
    if (res.index_method) props.push({prop: 'Index method', value: res.index_method.join(', ')})
    if (res.checks) props.push({prop: 'Checks', value: res.checks.join(', ')})

    cli.table(props, rows, {
      printLine: this.log.bind(this)
    })
  }
}
