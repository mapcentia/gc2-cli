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
import {schemasList, tableList, indexList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

const base_args = args
const specific_args = {
  name: Args.string(
    {
      required: false,
      description: 'Name of index.',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get index definition.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Get)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const name = args?.name || await indexList(schema, table)

    const response = await make('4', `schemas/${schema}/tables/${table}/indices/${name}`, 'GET', null)
    const res = await get(response, 200)

    type row = {
      [key: string]: any
    }
    const props: object[] = []
    const rows: row = {prop: {}, value: {}}
    props.push({prop: 'Name', value: res.name || name})
    if (res?.method) props.push({prop: 'Method', value: res.method})
    if (res?.columns) props.push({prop: 'Columns', value: (Array.isArray(res.columns) ? res.columns.join(', ') : res.columns)})
    if (res?.unique !== undefined) props.push({prop: 'Unique', value: res.unique})

    cli.table(props, rows, {
      printLine: this.log.bind(this)
    })
  }
}
