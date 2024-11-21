/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import Configstore from 'configstore'
import User from '../common/user'

const config: Configstore = new Configstore('gc2-env')
const user: User = config.all
const getHeaders: any = (contentType: string|null = 'application/json') => {
  type headers = {
    Accept: string,
    Cookie: string,
    Authorization: string|null,
    'Content-Type'?: string
  }
  const headers: headers = {
    Accept: 'application/json',
    Cookie: 'XDEBUG_SESSION=XDEBUG_ECLIPSE',
    Authorization: user?.token ? 'Bearer ' + user.token : null,
  }
  if (contentType) {
    headers['Content-Type'] = contentType
  }
  return headers
}
export default getHeaders

