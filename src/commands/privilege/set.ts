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
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  user: Args.string(
    {
      required: true,
      description: 'Name of user',
    },
  ),
  privileges: Args.string(
    {
      required: true,
      description: 'Which privileges',
    },
  )
}

export default class Set extends Command {
  static description = 'Set privileges on table'

  static flags = {
    help: Flags.help({char: 'h'}),
  }

  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Set)
    args = setSchema(args)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}/privilege`, 'PUT', {subuser: args.user, privileges: args.privileges})
    await get(response, 200)
    this.log(`Privileges update on ${chalk.green(args.table)}`)
  }
}
