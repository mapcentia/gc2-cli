/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {logToStderr} from '@oclif/core/lib/cli-ux'
import {exit} from '@oclif/core/lib/errors'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch, {RequestInit} from 'node-fetch'
import getHeaders from './request-headers'
import Method from '../common/http-verbs'
import User from '../common/user'
import {isTokenExpired} from './utils'
import {Gc2Service} from '../services/gc2.service'

const config: Configstore = new Configstore('gc2-env')
const user: User = config.all

const make = async (version: string, resource: string, method: Method, payload?: any, checkConnection?: boolean, contentType: string = 'application/json', host: string|null = null): Promise<any> => {
  const headers = getHeaders(contentType)
  if (!headers.Authorization && checkConnection) {
    logToStderr(chalk.red('No login. Use \'gc2 connect\''))
    exit(1);
  }
  // We check is token needs refreshing
  if (isTokenExpired(user.token)) {
    if (isTokenExpired(user.refresh_token)) {
      logToStderr('⚠️ Refresh token has expired. Please login again')
      exit(1)
    }
    const keycloakService = new Gc2Service()
    try {
      const data = await keycloakService.getRefreshToken(user.refresh_token)
      headers.Authorization = 'Bearer ' + data.access_token
      config.set({token: data.access_token})
    } catch (e) {
      logToStderr('⚠️ Could not get refresh token')
      exit(1)
    }
  }
  let request: RequestInit = {
    method: method,
    headers: headers,
    redirect: 'manual'
  }
  if (payload) {
    request.body =  contentType === 'application/json' ? JSON.stringify(payload) : payload
  }
  return await fetch((host || user.host) + `/api/v${version}/${resource}`, request)
}
export default make
