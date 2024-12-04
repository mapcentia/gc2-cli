/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {confirm} from '@inquirer/prompts'
import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {}

export default class Drop extends Command {
  static description = 'Drop a table.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Drop)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    if (!await confirm({message: '⚠️ The table will be deleted. Are you sure', default: false})) {
      this.exit();
    }

    const response = await make('4', `schemas/${schema}/tables/${table}`, 'DELETE', null)
    await get(response, 204)
    this.log(`Table ${chalk.green(table)} dropped`)
  }
}
