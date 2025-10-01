/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {schemasList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

const base_args = args
const specific_args = {}

export default class Add extends Command {
  static description = 'Create a new table.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Add)
    args = setSchema(args)

    // Interactive
    const schema = args?.schema || await schemasList()
    const name = args?.table || await input({message: 'Table', required: true})

    const response = await make('4', `schemas/${schema}/tables`, 'POST', {name})
    await get(response, 201)
    this.log(`Table created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
