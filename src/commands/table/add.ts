/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {schemasList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {}

export default class Add extends Command {
  static description = 'Create new table. Leave out arguments for interactive mode'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Add)
    args = setSchema(args)

    // Interactive
    const schema = args?.schema || await schemasList()
    const table = args?.table || await cli.prompt('Table', {required: true})

    const response = await make('4', `schemas/${schema}/tables`, 'POST', {table})
    await get(response, 201)
    this.log(`Table created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
