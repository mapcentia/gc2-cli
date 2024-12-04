/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import cli from 'cli-ux'
import {schemas} from '../../util/getters'
import {schemasList} from '../../util/lists'

export default class Get extends Command {
  static description = 'Get list of tables in schema.'
  static flags = {
    help: Flags.help({char: 'h'})
  }
  static args = {
    schema: Args.string(
      {
        required: false,
        description: 'Name of schema.',
      }
    )
  }

  async run() {
    const {args} = await this.parse(Get)
    let schema = args?.schema || await schemasList()
    const res = await schemas(schema)
    if (res.tables.length < 1) {
      ux.log(`⚠️ No tables found for schema ${schema}`)
      exit(0)
    }
    type tables = {
      [key: string]: any
    }
    type table = {
      table: string;
    }
    const data: object[] = []
    const columns: tables = {table: {}}
    for (const c in res.tables) {
      const v: tables = res.tables[c]
      data.push({
        table: v.name.split('.').reverse()[0],

      })
    }
    cli.table(data, columns, {
      printLine: this.log.bind(this)
    })
  }
}
