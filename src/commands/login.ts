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

const brand = chalk.hex('#4F46E5')
const dim = chalk.dim
const success = chalk.green
const warn = chalk.yellow
const err = chalk.red

const LOGO = `
  ${brand('█▀▀ █▀▀ █▄░█ ▀█▀ █ ▄▀█')}
  ${brand('█▄▄ ██▄ █░▀█ ░█░ █ █▀█')}
`

const spinner = {
  start(msg: string) {
    process.stderr.write(dim(`  ◌ ${msg}…`))
  },
  stop(msg: string) {
    process.stderr.write(`\r  ${success('●')} ${msg}\n`)
  },
  fail(msg: string) {
    process.stderr.write(`\r  ${err('✖')} ${msg}\n`)
  },
}

export default class Login extends Command {
  static description = 'Sign in to Centia. Use `connect` to set the host first.'
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

    process.stderr.write(LOGO + '\n')

    const config: Configstore = new Configstore('gc2-env')
    let obj: User = config.all

    function instanceOfResponse(object: any, name: string): object is User {
      return name in object
    }

    if (!instanceOfResponse(obj, 'user')) {
      obj = {database: '', user: '', host: '', token: '', superUser: false, refresh_token: ''}
    }

    const host = obj.host || GC2_SERVER_ADDRESS
    process.stderr.write(dim(`  Host  ${host}\n`))
    process.stderr.write(dim(`  Flow  ${flags.flow}\n\n`))

    let data
    if (flags.flow === 'password') {
      data = await this.runPasswordFlow(flags, obj, config)
    } else if (flags.flow === 'code') {
      data = await this.startAuthorizationCodeFlow()
    } else {
      data = await this.startDeviceCodeFlow()
    }

    const claims = JSON.parse(atob(data.access_token.split('.')[1]))
    config.set({user: claims.uid})
    config.set({database: claims.database})
    config.set({token: data.access_token})
    config.set({refresh_token: data.refresh_token})
    config.set({superUser: claims.superUser})

    process.stderr.write('\n')
    process.stderr.write(`  ${success('✔')} Signed in as ${chalk.bold(claims.uid)}`)
    if (claims.superUser) process.stderr.write(dim(' (admin)'))
    process.stderr.write('\n')
    process.stderr.write(dim(`  Database  ${claims.database}\n\n`))
  }

  private async runPasswordFlow(flags: any, obj: User, config: Configstore): Promise<any> {
    if (obj.user === '' && !flags?.user) {
      obj.user = await input({message: '  User', required: true})
    }

    const user: string = flags?.user || obj.user

    if (obj.database === '') {
      const host = obj.host || GC2_SERVER_ADDRESS
      spinner.start('Looking up databases')
      const response = await fetch(`${host}/api/v2/database/search?userIdentifier=${user}`)
      const res = await response.json() as any
      if (!res.success) {
        spinner.fail('Database lookup failed')
        exit(1)
      }

      if (res.databases.length === 0) {
        spinner.fail('User not found')
        exit(1)
      }

      spinner.stop(`Found ${res.databases.length} database${res.databases.length > 1 ? 's' : ''}`)

      if (res.databases.length === 1) {
        obj.database = res.databases[0].parentdb || res.databases[0].screenname
      } else {
        obj.database = await select({
          message: '  Database',
          default: config.all.database,
          choices: res.databases.map((v: {parentdb: any}) => ({value: v.parentdb}))
        })
      }
    }

    const pwd: string = flags?.password ? flags.password : await password({message: '  Password', mask: true})

    if (flags?.password) {
      process.stderr.write(`  ${warn('!')} ${dim('Passing passwords via flags is insecure')}\n`)
    }

    spinner.start('Authenticating')
    try {
      const data = await this.startPasswordFlow(user, pwd, obj.database)
      spinner.stop('Authenticated')
      return data
    } catch (error: any) {
      spinner.fail(error?.response?.data?.error_description || 'Authentication failed')
      exit(1)
    }
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
    return {access_token, refresh_token}
  }

  private async startAuthorizationCodeFlow(): Promise<any> {
    const authService = createAuthService()
    const {codeVerifier, codeChallenge, state} = generatePkceChallenge()
    const port = CLI_SERVER_ADDRESS.split(':').pop()
    const callbackPath = CLI_SERVER_ADDRESS_CALLBACK.split(':')[2].replace(port!, '')
    const authorizationCodeURL = authService.getAuthorizationCodeURL(codeChallenge, state)

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
        res.end('Unsupported')
        emmiter.emit(eventName, new Error('Invalid URL address'))
      }
    }).listen(port)

    await cli.anykey(`  Press any key to open the browser${dim('…')}`)
    await cli.open(authorizationCodeURL)

    spinner.start('Waiting for browser authentication')
    const {code, state: stateFromParams} = await waitFor<AuthoricationCodeCallbackParams>(eventName, emmiter)
    if (stateFromParams !== state) {
      spinner.fail('Possible CSRF attack — aborting')
      exit(1)
    }

    const {access_token, refresh_token} = await authService.getAuthorizationCodeToken(code!, codeVerifier)
    spinner.stop('Authenticated')
    return {access_token, refresh_token}
  }

  private async startDeviceCodeFlow(): Promise<any> {
    const authService = createAuthService()
    const {device_code, interval, verification_uri, user_code} = await authService.getDeviceCode()

    process.stderr.write(`  Your code  ${chalk.bold.white(user_code)}\n`)
    process.stderr.write(dim(`  Open       ${verification_uri}\n\n`))
    await cli.anykey(`  Press any key to continue${dim('…')}`)

    spinner.start('Waiting for device authorization')
    try {
      const {access_token, refresh_token} = await authService.pollToken(device_code, interval)
      spinner.stop('Authorized')
      return {access_token, refresh_token}
    } catch (e: any) {
      spinner.fail(e.message)
      exit(1)
    }
  }
}
