/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
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
    name: Flags.string({char: 'n', description: 'Name of new client.'}),
    description: Flags.string({char: 'd', description: 'Description of new client.'}),
    redirect_uri: Flags.string({char: 'r', description: 'Redirect uri. Redirects will only be allowed to an uri in this list.'}),
    homepage: Flags.string({char: 'p', description: 'Homepage of the application.'}),
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {flags} = await this.parse(Add)

    const name = flags?.name || await input({message: 'Client name', required: true})
    const description = flags?.description || await input({message: 'description', required: true})
    const redirect_uri_str = flags?.redirect_uri || await input({
      message: 'Redirect uri (comma separated)',
      required: true
    })
    const homepage = flags?.homepage || await input({message: 'homepage', required: false})

    let redirect_uri = null
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const response = await make('4', `clients`, 'POST', {name, description, redirect_uri, homepage})
    const data = await get(response, 200)
    this.log(`Client ${chalk.green(name)} created with:\n id: ${chalk.green(data.id)}\nsecret ${chalk.green(data.secret)}\nThis secret will can not be retrieved, so please keep it save.`)
  }
}
