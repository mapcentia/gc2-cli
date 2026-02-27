/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2025 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import args from '../../common/base_args'
import {constraintList, schemasList, tableList} from '../../util/lists'
import setSchema from '../../util/set-schema'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

let base_args = args
let specific_args = {
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

    try {
      const client = createCliCentiaAdminClient()
      const res: any = await client.provisioning.constraints.getConstraint(schema, table, name)

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
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
