/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {clients} from '../../util/getters'
import {clientList} from '../../util/lists'
import make from '../../util/make-request'

export default class Update extends Command {
  static description = 'Update a client'
  static flags = {
    name: Flags.string({char: 'n', description: 'Name'}),
    description: Flags.string({char: 'd', description: 'Description'}),
    redirect_uri: Flags.string({char: 'r', description: 'Redirect uri'}),
    homepage: Flags.string({char: 'p', description: 'Homepage'}),
    help: Flags.help({char: 'h'}),
  }
  static args = {
    id: Args.string(
      {
        required: false,
        description: 'Id of client',
      },
    )
  }

  async run() {
    const {args} = await this.parse(Update)
    const {flags} = await this.parse(Update)
    let name, description, redirect_uri_str, homepage
    let id = args?.id || await clientList()
    const cl = await clients(id)
    // Interactive
    name = flags?.name || await cli.prompt('Name', {required: false, default: cl.name})
    description = flags?.description || await cli.prompt('Description', {required: false, default: cl.description})
    redirect_uri_str = flags?.redirect_uri || await cli.prompt('Redirect uri (comma separated)', {
      required: false,
      default: cl.redirect_uri?.join(',')
    })
    homepage = flags?.homepage || await cli.prompt('homepage', {required: false, default: cl.homepage})
    let redirect_uri = null
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const response = await make('4', `clients/${id}`, 'PUT', {name, description, redirect_uri, homepage})
    await get(response, 303)
    this.log(`Client is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
