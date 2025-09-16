/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, confirm} from '@inquirer/prompts'
import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {clients} from '../../util/getters'
import {clientList} from '../../util/lists'
import make from '../../util/make-request'

export default class Update extends Command {
  static description = 'Update a client.'

  static flags = {
    name: Flags.string({char: 'n', description: 'New name ofclient.', required: false}),
    description: Flags.string({char: 'd', description: 'Description of new client.', required: false}),
    redirect_uri: Flags.string({
      char: 'r',
      description: 'Redirect uri. Redirects will only be allowed to an uri in this list.',
      required: false
    }),
    homepage: Flags.string({char: 'p', description: 'Homepage of the application.', required: false}),
    public: Flags.boolean({char: 'p', description: 'Public client. No secret needed.', required: false}),
    confirm: Flags.boolean({char: 'c', description: 'Client user must confirm the token exchange.', required: false}),
    two_factor: Flags.boolean({char: 't', description: 'Client user must authenticate with two factor authentication.', required: false}),
    help: Flags.help({char: 'h'}),
  }
  static args = {
    id: Args.string(
      {
        required: false,
        description: 'Id of client.',
      },
    )
  }

  async run() {
    const {args} = await this.parse(Update)
    const {flags} = await this.parse(Update)
    let id = args?.id || await clientList()
    const clientResult = await clients(id)
    const client = clientResult.clients[0]

    const name = flags?.name || await input({message: 'Name', required: false, default: client.name})
    const description = flags?.description || await input({
      message: 'Description',
      required: true,
      default: client.description
    })
    const redirect_uri_str = flags?.redirect_uri || await input({
      message: 'Redirect uri (comma separated)',
      required: true,
      default: client.redirect_uri?.join(',')
    })
    const homepage = flags?.homepage || await input({message: 'homepage', required: false, default: client.homepage})

    let redirect_uri = null
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const _public = flags?.public || await confirm({message: 'Public client?', default: client.public})
    const _confirm = flags?.confirm || await confirm({message: 'Confirm token exchange?', default: client.confirm})
    const two_factor = flags?.two_factor || await confirm({message: 'Enable two factor authentication', default: client.two_factor})
    const response = await make('4', `clients/${id}`, 'PATCH', {
      name,
      description,
      redirect_uri,
      homepage,
      public: _public,
      confirm: _confirm,
      two_factor
    })
    await get(response, 303)
    this.log(`Client is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
