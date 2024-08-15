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

export default class Backup extends Command {
  static description = 'Backup all (mat)views definitions in schema'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schemas: Args.string(
      {
        required: true,
        description: 'schemas for backup (comma separated)',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Backup)
    const schemas = args.schemas.split(',').map(s => s.trim())
    const response = await make('3', 'view', 'POST', {schemas: schemas})
    const res = await get(response, 201)
    this.log(`${chalk.green(res.count)} views backed up`)
  }
}
