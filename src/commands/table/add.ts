/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Create new table'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'name of schema where the new table should be created ',
      }
    ),
    table: Args.string(
      {
        required: true,
        description: 'name of new table',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Add)
    const response = await make('4', `schemas/${args.schema}/tables`, 'POST', {table: args.table})
    await get(this, response, 201)
    this.log(`Table created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
