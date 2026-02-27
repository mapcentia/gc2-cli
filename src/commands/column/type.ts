/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import {columnList, schemasList, tableList, typeList} from '../../util/lists'
import setSchema from '../../util/set-schema'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

let base_args = args
let specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Name of column.',
    },
  ),
  type: Args.string(
    {
      required: false,
      description: 'New data type for column.',
    },
  ),
}

export default class Type extends Command {
  static description = 'Set the data on column. It might be, the existing data type can\'t be transformed to the chosen one.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Type)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)
    const type = args?.type || await typeList()

    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.columns.patchColumn(schema, table, column, {type})
      this.log(`Column relocated to here ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
