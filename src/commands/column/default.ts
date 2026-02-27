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
  default: Args.string(
    {
      required: false,
      description: 'Default value. Set to \'null\' for removing an already set value.',
    },
  ),
}
export default class Default extends Command {
  static description = 'Set default value for column. The default value is set when inserting a new row without a value for the column.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Default)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const column = args?.column || await columnList(schema, table)
    const res = await tables(schema, table)
    const c = res.columns.filter((e: { name: any }) => e.name === column)[0]
    const defaultValue = args?.default || await input({
      message: 'Default value',
      default: c.default_value,
      required: true
    })

    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.columns.patchColumn(schema, table, column, {
        default_value: defaultValue
      })
      if (defaultValue === 'null') {
        this.log(`Column ${chalk.green(column)} has now NO default value.`)
      } else {
        this.log(`Column ${chalk.green(column)} has now default value.`)
      }
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
