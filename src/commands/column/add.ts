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
import get from '../../util/get-response'
import {schemasList, tableList, typeList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  column: Args.string(
    {
      required: false,
      description: 'Name of new column',
    },
  ),
  type: Args.string(
    {
      required: false,
      description: 'Type of new column',
    },
  ),
}

export default class Add extends Command {
  static description = 'Add a new column'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Add)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const name = args?.column || await input({message: 'Name', required: true})
    const type = args?.type || await typeList()

    const body = {
      name,
      type,
    }
    const response = await make('4', `schemas/${schema}/tables/${table}/columns`, 'POST', body)
    await get(response, 201)
    this.log(`Column created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
