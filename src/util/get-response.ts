/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2023 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, ux} from '@oclif/core'
import chalk from 'chalk'
import {Response} from 'node-fetch'
import {exit} from '@oclif/core/lib/errors'

/**
 * Asynchronously sends a GET request and returns the response body if the
 * request is successful.
 *
 * @param {Response} response - The response object containing the response from the GET request.
 * @param expectedCode
 * @param doNotExit
 * @returns {Promise<any>} - A promise that resolves with the response body.
 */
const get = async (response: Response, expectedCode: number, doNotExit: boolean = false): Promise<any> => {
  let res = null
  // Handle case of No Content
  if (![204, 303].includes(expectedCode)) {
    res = await response.json()
  }
  console.log(response.status, expectedCode)

  if (response.status !== expectedCode) {
    if (res === null) {
      res = await response.json()
    }
    ux.log('⚠️ ' + chalk.red(res.message || res.error))
    if (!doNotExit) {
      exit(1)
    }
  }
  return res
}
export default get
