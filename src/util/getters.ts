/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import get from './get-response'
import make from './make-request'

const clients = async (id?: string) => {
  const res = id ? `clients/${id}` : 'clients'
  const response = await make('4', res, 'GET')
  return await get(response, 200)
}
export {clients}
