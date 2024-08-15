/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import setSchema from '../../util/set-schema'
import {clients} from '../../util/getters'

let specific_args = {
  id: Args.string(
    {
      required: false,
      description: 'Client id',
    },
  ),
}

export default class Get extends Command {
  static description = 'Get privileges on table'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...specific_args}
  async run() {
    let {args} = await this.parse(Get)
    const res = await clients(args?.id)
    type row = {
      [key: string]: any
    }
    type client = {
      id: string;
      name: string;
      homepage?: string;
      description?: string;
      redirect_uri?: any;
    }
    const data: object[] = []
    const rows: row = {id: {}, name: {}, homepage: {} , description: {}, redirect_uri: {}}
    for (const c in res.clients) {
      const v: client = res.clients[c]
      data.push({
        id: v.id,
        name: v.name,
        homepage: v.homepage || '',
        description: v.description || '',
        redirect_uri: v.redirect_uri.join(',') || '',
      })
    }
    cli.table(data, rows, {
      printLine: this.log.bind(this)
    })
  }
}
