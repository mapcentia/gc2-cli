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
import {columnList, schemasList, tableList} from '../../util/lists'
import setSchema from '../../util/set-schema'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

let base_args = args
let specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Existing name of column.',
    },
  ),
  name: Args.string(
    {
      required: false,
      description: 'New name for column.',
    },
  ),
}

export default class Rename extends Command {
  static description = 'Rename a column.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Rename)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)
    const name = args?.name || await input({message: 'New name', required: true})

    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.columns.patchColumn(schema, table, column, {name})
      this.log(`Column relocated to here: ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
