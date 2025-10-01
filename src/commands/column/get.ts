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

const base_args = args
const specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Name of column.',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get description of a column.'
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

    type row = {
      [key: string]: any
    }
    const props: object[] = []
    const rows: row = {prop: {}, value: {}}
    props.push({prop: 'Name', value: res.name})
    props.push({prop: 'Type', value: res.type})
    props.push({prop: 'Is primary', value: res._is_primary})
    props.push({prop: 'Is unique', value: res._is_unique})
    props.push({prop: 'Is nullable', value: res.is_nullable})
    props.push({prop: 'Default value', value: res.default_value || ''})
    if (res._character_maximum_length) props.push({
      prop: 'character_maximum_length',
      value: res._character_maximum_length
    })
    if (res._numeric_precision) props.push({prop: 'Numeric precision', value: res._numeric_precision})
    if (res._numeric_scale) props.push({prop: 'Numeric scale', value: res._numeric_scale})
    if (res._max_bytes) props.push({prop: 'Max bytes', value: res._max_bytes})
    if (res._reference) props.push({prop: 'Reference', value: res._reference})
    if (res._index_method) props.push({prop: 'Index method', value: res._index_method.join(', ')})
    if (res._checks) props.push({prop: 'Checks', value: res._checks.join(', ')})

    cli.table(props, rows, {
      printLine: this.log.bind(this)
    })
    if (res.comment) {
      this.log(`Comment: ${res.comment}`)
    }
  }
}
