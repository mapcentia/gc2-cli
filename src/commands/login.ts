/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input, password, select} from '@inquirer/prompts'
import {Command, Flags} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import * as http from 'http'
import * as querystring from 'querystring'

import User from '../common/user'
import {PasswordFlow} from '@centia-io/sdk'
import {createAuthService} from '../centiaClient'
import {CLI_SERVER_ADDRESS, CLI_SERVER_ADDRESS_CALLBACK, GC2_SERVER_ADDRESS, generatePkceChallenge, waitFor,} from '../util/utils'
import EventEmitter = require('events')

type AuthoricationCodeCallbackParams = {
  state?: string;
  code?: string;
  access_token: string;
  session_state?: string;
}

export default class Login extends Command {
  static description = 'Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It\'s better to be prompt for the password'
  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'Password'}),
    user: Flags.string({char: 'u', description: 'Username/database'}),
    flow: Flags.string({
      char: 'f',
      description: 'Authentication flow',
      options: ['password', 'device', 'code'],
      required: false,
      default: 'code'
    }),
  }

  async run() {
    const {flags} = await this.parse(Login)

    const config: Configstore = new Configstore('gc2-env')
    let obj: User = config.all // User object or empty object

    function instanceOfResponse(object: any, name: string): object is User {
      return name in object
    }

    if (!instanceOfResponse(obj, 'user')) {
      obj = {database: '', user: '', host: '', token: '', superUser: false, refresh_token: ''}
    }

    if (obj.host === '' && !process.env?.GC2_HOST) {
      //  this.log('Connect is not set. Please use the \'connect\' command')
      //  this.exit()
    }

    let data
    if (flags.flow === 'password') {
      if (obj.user === '' && !flags?.user) {
        obj.user = await input({message: 'User', required: true})
      }
      const user: string = flags?.user || obj.user

      if (obj.database === '') {
        const host = obj.host || GC2_SERVER_ADDRESS
        const response = await fetch(`${host}/api/v2/database/search?userIdentifier=${user}`)
        const res = await response.json() as any
        if (!res.success) {
          this.log(chalk.red('fail'))
          return
        }
        if (res.databases.length === 1) {
          obj.database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname
        }
        else if (res.databases.length > 1) {
          obj.database = await select({
            message: 'Database',
            default: config.all.database, choices: res.databases.map((v: { parentdb: any }) => {
              return {value: v.parentdb}
            })
          })
        } else {
          this.log(chalk.red('User not found'))
          return
        }
      }
      const pwd: string = flags?.password ? flags.password : await password({message: 'Password', mask:true})
      // Warn about using pwd on the command line
      if (flags?.password) {
        this.log(chalk.yellow('Warning: Using a password on the command line interface can be insecure.'))
      }
      try {
        data = await this.startPasswordFlow(user, pwd, obj.database)
      } catch (error: any) {
        this.log(error.response.data.error_description)
        exit(1);
      }
    } else if (flags.flow === 'code') {
      data = await this.startAuthorizationCodeFlow()
    } else {
      data = await this.startDeviceCodeFlow()
    }
    const user = JSON.parse(atob(data.access_token.split('.')[1])).uid
    const database = JSON.parse(atob(data.access_token.split('.')[1])).database
    const superUser = JSON.parse(atob(data.access_token.split('.')[1])).superUser
    config.set({user: user})
    config.set({database: database})
    config.set({token: data.access_token})
    config.set({refresh_token: data.refresh_token})
    config.set({superUser})
    cli.action.start(`Signing with ${chalk.yellow(user)}`)
    cli.action.stop(chalk.green('success'))
  }

  private async startPasswordFlow(user: string, pwd: string, database: string): Promise<any> {
    const service = new PasswordFlow({
      host: GC2_SERVER_ADDRESS,
      clientId: 'gc2-cli',
      username: user,
      password: pwd,
      database,
    }).service
    const {access_token, refresh_token} = await service.getPasswordToken()
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    }
  }

  private async startAuthorizationCodeFlow(): Promise<any> {
    const authService = createAuthService()
    const {codeVerifier, codeChallenge, state} = generatePkceChallenge()
    const port = CLI_SERVER_ADDRESS.split(':').pop()
    const callbackPath = CLI_SERVER_ADDRESS_CALLBACK.split(':')[2].replace(
      port!, '',
    )
    const authorizationCodeURL = authService.getAuthorizationCodeURL(
      codeChallenge,
      state,
    )
    const emmiter = new EventEmitter()
    const eventName = 'authorication_code_callback_params'
    const server = http.createServer((req, res) => {
      if (req?.url?.startsWith(callbackPath)) {
        const params = querystring.parse(
          req?.url.replace(`${callbackPath}?`, ''),
        ) as AuthoricationCodeCallbackParams
        emmiter.emit(eventName, params)
        res.end('You can close this browser now.')
        server.close()
      } else {
        // TODO: handle an invalid URL address
        res.end('Unsupported')
        emmiter.emit(eventName, new Error('Invalid URL address'))
      }
    })
      .listen(port)
    await cli.anykey('Press any key to open GC2 in your browser')
    await cli.open(authorizationCodeURL)
    cli.action.start('Waiting for authentication')
    const {code, state: stateFromParams} = await waitFor<AuthoricationCodeCallbackParams>(eventName, emmiter)
    if (stateFromParams !== state) {
      throw new Error('Possible CSRF attack. Aborting login! ⚠️')
    }
    const {access_token, refresh_token} = await authService.getAuthorizationCodeToken(code!, codeVerifier)
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    }
  }

  private async startDeviceCodeFlow(): Promise<any> {
    const authService = createAuthService()
    const {device_code, interval, verification_uri, user_code} = await authService.getDeviceCode()
    console.log(device_code)
    this.log(`First copy your one-time code: ${user_code}`)
    this.log('When open a browser at ' + verification_uri)
    cli.action.start('Waiting for authentication')
    try {
      const {access_token, refresh_token} = await authService.pollToken(device_code, interval)
      return {
        access_token: access_token,
        refresh_token: refresh_token,
      }
    } catch (e: any) {
      this.log(`⚠️ ` + e.message)
      exit(1)
    }
  }
}
