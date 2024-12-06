/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import make from '../../util/make-request'
import get from '../../util/get-response'

export default class Materialize extends Command {
  static description = 'Create materialized views of foreign tables.'
  static flags = {
    help: Flags.help({char: 'h'}),
    prefix: Flags.string({char: 'p', description: 'prefix for created foreign tables', required: false}),
    suffix: Flags.string({char: 's', description: 'suffix for created foreign tables', required: false}),
  }
  static args = {
    from: Args.string(
      {
        required: true,
        description: 'Comma separated list of source schemas.',
      }
    ),
    to: Args.string(
      {
        required: false,
        description: 'comma separated list of target schemas.',
      }
    ),
    include: Args.string(
      {
        required: false,
        description: 'only include named foreign tables. Comma separated.',
      }
    )
  }

  async run() {
    const {args} = await this.parse(Materialize)
    const {flags} = await this.parse(Materialize)
    const from = args.from.split(',').map(s => s.trim())
    const to = args?.to ? args.to.split(',').map(s => s.trim()) : null
    const include = args?.include ? args.include.split(',').map(s => s.trim()) : null
    const response = await make('3', `foreign/materialize`, 'POST', {
      from,
      to,
      include,
      prefix: flags.prefix,
      suffix: flags.suffix
    })
    const res = await get(response, 200)
    this.log(`${chalk.green(res.count)} foreign tables materialized`)
  }
}
