/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import make from '../../util/make-request'

let base_args = args
let specific_args = {
  name: Args.string(
    {
      required: false,
      description: 'Name for constraint',
    },
  ),
}

export default class Drop extends Command {
  static description = 'Drop a constraint'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}
  async run() {
    const {args} = await this.parse(Drop)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}/constraints/${args.name}`, 'DELETE', null)
    await get(this, response, 204)
    this.log(`Dropped constraint ${args.name} on ${chalk.green(args.table)}`)
  }
}
