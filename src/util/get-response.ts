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
  let res: any = null
  let bodyText = ''

  // Read the body only once as text. This avoids "body used already" with node-fetch.
  try {
    // Even for 204/303, text() is safe and will return '' for empty bodies
    bodyText = await response.text()
  } catch (e) {
    // Ignore body read errors; we'll proceed with null/empty body
  }

  // Try to parse JSON if there is a body
  if (bodyText) {
    try {
      res = JSON.parse(bodyText)
    } catch (e) {
      // Not JSON; keep res as null and use bodyText for error messages
    }
  }

  if (response.status !== expectedCode) {
    const msg = (res && (res.message || res.error)) || bodyText || `Unexpected status ${response.status}`
    ux.log('⚠️ ' + chalk.red(msg))
    if (!doNotExit) {
      exit(1)
    }
  }

  // For 204/303, res will be null (no body), which is fine for callers expecting no content
  return res
}

export default get
