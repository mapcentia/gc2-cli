/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Create new client'
  static flags = {
    name: Flags.string({char: 'n', description: 'Name'}),
    description: Flags.string({char: 'd', description: 'Description'}),
    redirect_uri: Flags.string({char: 'r', description: 'Redirect uri'}),
    homepage: Flags.string({char: 'p', description: 'Homepage'}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Add)
    let name, description, redirect_uri_str, homepage
    // Interactive
    if (Object.keys(flags).length === 0) {
      name = await cli.prompt('Name', {required: true})
      description = await cli.prompt('Description', {required: false})
      redirect_uri_str = await cli.prompt('Redirect uri (comma separated)', {required: false})
      homepage = await cli.prompt('homepage', {required: false})
    } else {
      name = flags?.name || await cli.prompt('Name', {required: true})
      description = flags?.description
      redirect_uri_str = flags?.redirect_uri
      homepage = flags?.homepage
    }
    let redirect_uri = null
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const response = await make('4', `clients`, 'POST', {name, description, redirect_uri, homepage})
    const data = await get(response, 200)
    this.log(`Client created with secret:\n${chalk.green(data.secret)}\nThis secret will can not be retrieved, so please keep it save.`)
  }
}
