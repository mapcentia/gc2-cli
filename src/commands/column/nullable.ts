/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {select} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import {tables} from '../../util/getters'
import {columnList, schemasList, tableList} from '../../util/lists'
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
  nullable: Args.string(
    {
      required: false,
      description: 'Set column to nullable.',
      options: ['true', 'false']
    },
  ),
}
export default class Nullable extends Command {
  static description = 'Set nullable on column. If set the column can\'t be empty.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Nullable)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)

    const res: any = await tables(schema, table)
    const c = res.columns.filter((e: { name: any }) => e.name === column)[0]

    const nullable = args?.nullable || (await select({
      message: 'Nullable',
      default: c.is_nullable ? 'true' : 'false',
      choices: [{value: 'true'}, {value: 'false'}],
    }))

    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.columns.patchColumn(schema, table, column, {
        is_nullable: nullable === 'true'
      })
      this.log(`Column ${chalk.green(column)} is now ${nullable !== 'true' ? chalk.red('NOT ') : ''}nullable.`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
