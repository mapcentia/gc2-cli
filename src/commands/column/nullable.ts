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

export default class Nullable extends Command {
  static description = 'Set column to nullable'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'Name of schema',
      },
    ),
    table: Args.string(
      {
        required: true,
        description: 'Name of table',
      },
    ),
    column: Args.string(
      {
        required: true,
        description: 'Name of column',
      },
    ),
    nullable: Args.string(
      {
        required: true,
        options: ['true', 'false']
      },
    ),
  }
  async run() {
    const {args} = await this.parse(Nullable)
    const body = {
        is_nullable: args.nullable === 'true'
    }
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}/columns/${args.column}`, 'PUT', body)
    await get(this, response, 303)
    this.log(`Column ${chalk.green(args.column)} is now ${args.nullable !== 'true' ? chalk.red('NOT ') : ''}nullable`)
  }
}
