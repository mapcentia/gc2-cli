/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux as cli, ux} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {schemasList} from '../../util/lists'
import make from '../../util/make-request'

export default class Drop extends Command {
  static description = 'Drop table'
  static flags = {
    help: Flags.help({char: 'h'}),
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
    const {args} = await this.parse(Drop)
    let schema = args?.schema || await schemasList()
    if (!await ux.confirm('The whole schema will be deleted. Are you sure')) {
      this.exit();
    }
    const response = await make('4', `schemas/${schema}`, 'DELETE', null)
    await get(response, 204)
    this.log(`Schema ${chalk.green(schema)} dropped`)
  }
}
