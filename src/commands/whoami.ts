/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2026 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import {jwtDecode} from 'jwt-decode'

import {tokenStore} from '../centiaClient'
import User from '../common/user'

type Status = 'active' | 'expired' | 'none'

export default class Whoami extends Command {
  static description = 'Show the current Centia session: host, user, database, and status.'
  static flags = {
    help: Flags.help({char: 'h'}),
    json: Flags.boolean({description: 'Output as JSON.'}),
  }

  async run() {
    const {flags} = await this.parse(Whoami)

    const config: Configstore = new Configstore('gc2-env')
    const profile = config.all as User
    const host = profile.host || ''
    const user = profile.user || ''
    const database = profile.database || ''
    const superUser = Boolean(profile.superUser)

    const creds = await tokenStore.get()
    const status: Status = computeStatus(creds.token)

    if (flags.json) {
      this.log(JSON.stringify({host, user, database, superUser, status}))
      return
    }

    const statusLabel =
      status === 'active' ? chalk.green('✔ active') :
      status === 'expired' ? chalk.yellow('⚠ expired') :
      chalk.red('✖ not logged in')

    const userLabel = superUser ? `${user} ${chalk.dim('(admin)')}` : user

    this.log(`Host      ${host}`)
    this.log(`User      ${userLabel}`)
    this.log(`Database  ${database}`)
    this.log(`Status    ${statusLabel}`)
  }
}

function computeStatus(token?: string): Status {
  if (!token) return 'none'
  try {
    const {exp} = jwtDecode(token)
    if (!exp) return 'active'
    const nowSec = Math.floor(Date.now() / 1000)
    return nowSec >= exp ? 'expired' : 'active'
  } catch {
    return 'expired'
  }
}
