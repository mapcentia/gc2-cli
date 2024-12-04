/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Args, Command, Flags, ux as cli} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import {clients} from '../../util/getters'
import {clientList} from '../../util/lists'
import make from '../../util/make-request'

export default class Update extends Command {
  static description = 'Update a client.'

  static flags = {
    description: Flags.string({char: 'd', description: 'Description', required: false}),
    redirect_uri: Flags.string({char: 'r', description: 'Redirect uri', required: false}),
    homepage: Flags.string({char: 'p', description: 'Homepage', required: false}),
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
    let id = args?.id || await clientList()
    const cl = await clients(id)

    const name = flags?.name || await input({message: 'Name', required: false, default: cl.name})
    const description = flags?.description || await input({
      message: 'Description',
      required: false,
      default: cl.description
    })
    const redirect_uri_str = flags?.redirect_uri || await input({
      message: 'Redirect uri (comma separated)',
      required: false,
      default: cl.redirect_uri?.join(',')
    })
    const homepage = flags?.homepage || await input({message: 'homepage', required: false, default: cl.homepage})

    let redirect_uri = null
    if (redirect_uri_str) {
      redirect_uri = redirect_uri_str.split(',').map((e: string) => e.trim())
    }
    const response = await make('4', `clients/${id}`, 'PATCH', {name, description, redirect_uri, homepage})
    await get(response, 204)
    this.log(`Client is here ${chalk.green(response.headers.get('Location'))}`)
  }
}
