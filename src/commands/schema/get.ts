/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import inquirer from 'inquirer'
import get from '../../util/get-response'
import {clients, schemas} from '../../util/getters'
import {schemasList} from '../../util/lists'
import make from '../../util/make-request'

export default class Get extends Command {
  static description = 'Get table definition.'
  static flags = {
    help: Flags.help({char: 'h'}),
    ...ux.table.flags()
  }
  static args = {
    schema: Args.string(
      {
        required: false,
        description: 'Name of schema',
      }
    )
  }

  async run() {
    const {args} = await this.parse(Get)
    const {flags} = await this.parse(Get)

    let schema = args?.schema || await schemasList()

    const res = await schemas(schema)
    type columns = {
      [key: string]: any
    }
    type column = {
      table: string;
    }
    const data: object[] = []
    const columns: columns = {table: {}}
    for (const c in res.tables) {
      const v: column = res.tables[c]
      data.push({
        table: v.table.split('.').reverse()[0],

      })
    }
    cli.table(data, columns, {
      printLine: this.log.bind(this),
      ...flags
    })
  }
}
