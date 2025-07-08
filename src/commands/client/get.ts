/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
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
  static description = 'Get client(s).'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...specific_args}

  async run() {
    let {args} = await this.parse(Get)
    let res = await clients(args?.id)
    type row = {
      [key: string]: any
    }

    const data: object[] = []
    const rows: row = {id: {}, name: {}, homepage: {}, description: {}, redirect_uri: {}, public: {}, confirm: {}}
    for (const c in res.clients) {
      const v = res.clients[c]
      data.push({
        id: v.id,
        name: v.name,
        homepage: v.homepage || '',
        description: v.description || '',
        redirect_uri: v.redirect_uri?.join(',') || '',
        public: v.public,
        confirm: v.confirm,
      })
    }
    cli.table(data, rows, {
      printLine: this.log.bind(this)
    })
  }
}
