/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags, ux as cli} from '@oclif/core'
import Configstore from 'configstore'

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default class Connect extends Command {
  static description = 'Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.'

  static flags = {
    help: Flags.help({char: 'h'}),
    reset: Flags.boolean({char: 'r', description: 'Reset connection'}),
    host: Flags.string({char: 'H', description: 'Host'}),
  }

  async run() {
    const {flags} = await this.parse(Connect)
    const config: Configstore = new Configstore('gc2-env')
    if (flags.reset) {
      config.clear()
      this.log('Connection reset')
      return
    }

    let host = flags?.host ? flags.host : await cli.prompt('Host', {required: true, default: config.all.host})
    if (host) {
      host = host.replace(/\/$/, '')
      config.set({host})
      config.set({user: ''})
      config.set({database: ''})
    }
  }
}
