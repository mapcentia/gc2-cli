/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2025 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, confirm} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Add extends Command {
  static description = 'Create new client.'

  static args = {
    name: Args.string(
      {
        required: false,
        description: 'Name of new client.',
      }
    ),
  }

  static flags = {
    id: Flags.string({char: 'i', description: 'Id of new client.'}),
    name: Flags.string({char: 'n', description: 'Name of new client.'}),
    description: Flags.string({char: 'd', description: 'Description of new client.'}),
    redirect_uri: Flags.string({
      char: 'r',
      description: 'Redirect uri. Redirects will only be allowed to an uri in this list.'
    }),
    homepage: Flags.string({char: 'H', description: 'Homepage of the application.'}),
    public: Flags.boolean({char: 'p', description: 'Public client. No secret needed.'}),
    confirm: Flags.boolean({char: 'c', description: 'Client user must confirm the token exchange.'}),
    two_factor: Flags.boolean({char: 't', description: 'Client user must authenticate with two factor authentication.'}),
    allow_signup: Flags.boolean({char: 's', description: 'Allow users to sign up for a new account in the web-dialog.'}),
    social_signup: Flags.boolean({char: 'S', description: 'Enable users to signup for a new account with social login.'}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Add)

    const id = flags?.id || await input({message: 'Client id', required: false})
    const name = flags?.name || await input({message: 'Client name', required: true})
    const description = flags?.description || await input({message: 'description', required: false})
    const redirect_uri_str = flags?.redirect_uri || await input({
      message: 'Redirect uri (comma separated)',
      required: false
    })
    const homepage = flags?.homepage || await input({message: 'homepage', required: false})

    let redirect_uri = null
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const _public = flags?.public || await confirm({message: 'Public client?', default: false})
    const _confirm = flags?.confirm || await confirm({message: 'Confirm token exchange?', default: true})
    const two_factor = flags?.two_factor || await confirm({message: 'Enable two factor authentication', default: true})
    const allow_signup = flags?.allow_signup || await confirm({message: 'Allow users to signup', default: false})
    const social_signup = flags?.social_signup || await confirm({message: 'Enable social signup', default: false})

    let payload: any = {}
    payload.name = name
    payload.public = _public
    payload._confirm = _confirm
    payload.two_factor = two_factor
    payload.allow_signup = allow_signup
    payload.social_signup = social_signup
    if (id) payload.id = id
    if (description) payload.description = description
    if (redirect_uri) payload.redirect_uri = redirect_uri
    if (homepage) payload.homepage = homepage

    const response = await make('4', `clients`, 'POST', payload)
    const data = await get(response, 201)
    this.log(`Client created with here ${chalk.green(response.headers.get('Location'))}\nsecret ${chalk.green(data.secret)}\nThis secret will can not be retrieved, so please keep it save.`)
  }
}
