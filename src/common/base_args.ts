/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command} from '@oclif/core'
import User from '../common/user'
import Configstore from 'configstore'
import Arg = Command.Arg

const config: Configstore = new Configstore('gc2-env')
const user: User = config.all

export interface BaseArgs {
  schema?: Arg;
  table: Arg;
}

let args: BaseArgs = {
  table:Args.string(
    {
      required: true,
      description: 'Name of table',
    },
  )
}
if (user.superUser) {
  args['schema'] = Args.string(
    {
      required: true,
      description: 'Name of schema',
    },
  )
}

export default args

