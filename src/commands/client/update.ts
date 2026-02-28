/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, confirm} from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'
import {clients} from '../../util/getters'
import {clientList} from '../../util/lists'

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
    allow_signup: Flags.boolean({char: 's', description: 'Allow users to sign up for a new account in the web-dialog.', required: false}),
    social_signup: Flags.boolean({char: 'S', description: 'Enable users to sign up for a new account with social login.', required: false}),
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
    const existingClient: any = await clients(id)

    const name = flags?.name || await input({message: 'Name', required: false, default: existingClient.name})
    const description = flags?.description || await input({
      message: 'Description',
      required: true,
      default: existingClient.description
    })
    const redirect_uri_str = flags?.redirect_uri || await input({
      message: 'Redirect uri (comma separated)',
      required: true,
      default: existingClient.redirect_uri?.join(',')
    })
    const homepage = flags?.homepage || await input({message: 'homepage', required: false, default: existingClient.homepage})

    let redirect_uri: string[] | undefined
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const _public = flags?.public || await confirm({message: 'Public client?', default: existingClient.public})
    const _confirm = flags?.confirm || await confirm({message: 'Confirm token exchange?', default: existingClient.confirm})
    const two_factor = flags?.two_factor || await confirm({message: 'Enable two factor authentication', default: existingClient.two_factor})
    const allow_signup = flags?.allow_signup || await confirm({message: 'Allow users to sign up', default: existingClient.allow_signup})
    const social_signup = flags?.social_signup || await confirm({message: 'Enable users to sign up with social login', default: existingClient.social_signup})

    try {
      const client = createCliCentiaAdminClient()
      const response = await client.provisioning.clients.patchClient(id, {
        name,
        description,
        redirect_uri,
        homepage,
        public: _public,
        confirm: _confirm,
        two_factor,
        allow_signup,
        social_signup,
      })
      this.log(`Client is here ${chalk.green(response.location)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
