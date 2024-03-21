/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import make from '../../util/make-request'
import get from '../../util/get-response'

export default class Drop extends Command {
  static description = 'Drop all foreign tables in schema'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schemas: Args.string(
      {
        required: true,
        description: 'schemas for dropping (comma separated)',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Drop)
    const schemas = args.schemas.split(',').map(s => s.trim())
    const response = await make('3', 'foreign', 'DELETE', {schemas})
    await get(this, response, 204)
    this.log(`Foreign tables dropped`)
  }
}
