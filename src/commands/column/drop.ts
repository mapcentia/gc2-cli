/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import {columnList, schemasList, tableList} from '../../util/lists'
import setSchema from '../../util/set-schema'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

let base_args = args
let specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Name of column to drop.',
    },
  ),
}

export default class Drop extends Command {
  static description = 'Drop a column from table.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Drop)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)

    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.columns.deleteColumn(schema, table, column)
      this.log(`Column ${chalk.green(column)} dropped`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
