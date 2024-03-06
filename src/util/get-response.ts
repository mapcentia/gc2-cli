/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2023 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command} from '@oclif/core'
import chalk from 'chalk'
import {Response} from 'node-fetch'

/**
 * Asynchronously sends a GET request and returns the response body if the
 * request is successful.
 *
 * @param {Command} cmd - The command object.
 * @param {Response} response - The response object containing the response from the GET request.
 * @param expectedCode
 * @returns {Promise<any>} - A promise that resolves with the response body.
 */
const get = async (cmd: Command, response: Response, expectedCode: number): Promise<any> => {
  let res = null
  // Handle case of No Content
  if (expectedCode !== 204) {
    res = await response.json()
  }
  if (response.status !== expectedCode) {
    if (res === null) {
      res = await response.json()
    }
    cmd.log(chalk.red(res.message || res.error))
    cmd.exit(1)
  }
  return res
}
export default get
