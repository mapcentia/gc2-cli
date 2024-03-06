/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args} from '@oclif/core'

let args = {
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
}
export default args
