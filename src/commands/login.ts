/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import inquirer from 'inquirer'
import get from '../util/get-response'
import make from '../util/make-request'

import User from '../common/user'

export default class Login extends Command {
  static description = 'Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It\'s better to be prompt for the password'
  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'Password'}),
  }

  async run() {
    const {flags} = await this.parse(Login)

    interface Response {
      access_token: string,
      token_type: string,
      expires_in: number,
      refresh_token: string,
      scope: string,
      error: string
    }

    interface Database {
      screenname: string,
      email: string,
      parentdb: string
    }

    interface Databases {
      databases: Database[]
      success?: string
    }

    const config: Configstore = new Configstore('gc2-env')
    let obj: User = config.all // User object or empty object

    function instanceOfResponse(object: any, name: string): object is User {
      return name in object
    }

    if (!instanceOfResponse(obj, 'user')) {
      obj = {database: '', user: '', host: '', token: ''}
    }

    if (obj.host === '') {
      let host = await cli.prompt('Host')
      host = host.replace(/\/$/, '')
      obj.host = host
      config.set({host: obj.host})
    }

    if (obj.user === '') {
      obj.user = await cli.prompt('User')
      config.set({user: obj.user})
    }

    if (obj.database === '') {
      cli.action.start('Getting databases')
      const response = await make('2', `database/search?userIdentifier=${obj.user}`, 'GET', null, false, 'application/json', obj.host)
      const res = await get(this, response, 200)
      if (res.success) {
        cli.action.stop(chalk.green('success'))
      } else {
        cli.action.stop(chalk.green('fail'))
        return
      }
      if (res.databases.length > 1) {
        let response: any = await inquirer.prompt([{
          name: 'db',
          message: 'Database',
          type: 'list',
          default: config.all.database,
          choices: res.databases.map((v: { parentdb: any }) => {
            return {name: v.parentdb}
          })
        }])
        obj.database = response.db
      } else {
        obj.database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname
      }
      config.set({database: obj.database})
    }
    const password: string = flags?.password ? flags.password : await cli.prompt('Password', {type: 'hide'})
    // Warn about using pwd on the command line
    if (flags?.password) {
      this.log(chalk.yellow('Warning: Using a password on the command line interface can be insecure.'))
    }
    const response = await make('4', `oauth`, 'POST', {
        grant_type: 'password',
        username: obj.user,
        password,
        database: obj.database
      }, false, 'application/json', obj.host
    )
    const data = await get(this, response, 200)
    cli.action.start(`Signing into ${chalk.yellow(obj.host)} with ${chalk.yellow(obj.user)}`)
    cli.action.stop(chalk.green('success'))
    config.set({token: data.access_token})
  }
}
