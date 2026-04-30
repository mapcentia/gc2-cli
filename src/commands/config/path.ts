/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2026 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import Configstore from 'configstore'

export default class ConfigPath extends Command {
  static description = 'Print the absolute path to the configstore JSON file used by the CLI.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const config = new Configstore('gc2-env')
    this.log(config.path)
  }
}
