/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import Configstore from "configstore";

export default class Logout extends Command {
  static description = 'Logout the current user.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
    const config: Configstore = new Configstore('gc2-env')
    config.set({user: '', database: '', token: '', superUser: false, refresh_token: '' })
    this.log(`You're now logged out.`)
  }
}
