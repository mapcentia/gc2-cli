import {logToStderr} from '@oclif/core/lib/cli-ux'
import {exit} from '@oclif/core/lib/errors'
import chalk from 'chalk'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import Configstore from 'configstore'
import User from '../common/user'
import EventEmitter = require('events')
import {jwtDecode} from 'jwt-decode'

const config: Configstore = new Configstore('gc2-env')
let obj: User = config.all // User object or empty object

const CONFIG_PATH = path.resolve(os.homedir(), '.clirc')
export const CLI_SERVER_ADDRESS = 'http://127.0.0.1:5657'
export const CLI_SERVER_ADDRESS_CALLBACK = `${CLI_SERVER_ADDRESS}/auth/callback`
export const GC2_SERVER_ADDRESS = obj.host ?? 'https://api.centia.io'

export type UserCredentials = {
  accessToken: string;
  refreshToken: string;
};

export const saveUserCredentials = (data: UserCredentials): void => {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2), {
    encoding: 'utf-8',
  })
}

export const getUserCredentials = (): UserCredentials | null => {
  try {
    const content = fs.readFileSync(CONFIG_PATH, {
      encoding: 'utf-8',
    })

    return JSON.parse(content) as UserCredentials
  } catch {
    return null
  }
}

export const generatePkceChallenge = (): {
  state: string;
  codeVerifier: string;
  codeChallenge: string;
} => {
  const codeVerifier = crypto.randomBytes(64).toString('hex')

  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  return {
    state: crypto.randomBytes(32).toString('hex'),
    codeVerifier,
    codeChallenge,
  }
}

export const waitFor = <T>(
  eventName: string,
  emitter: EventEmitter,
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const handleEvent = (eventData: any): void => {
      eventData instanceof Error ? reject(eventData) : resolve(eventData)

      emitter.removeListener(eventName, handleEvent)
    }

    emitter.addListener(eventName, handleEvent)
  })
}

export const isTokenExpired = (token: string): boolean => {

  let isJwtExpired = false
  const {exp} = jwtDecode(token)
  const currentTime = new Date().getTime() / 1000

  if (exp) {
    if (currentTime > exp) isJwtExpired = true
  }
  return isJwtExpired
}

export const passwordIsStrongEnough = (password: string, allowNull: boolean = false) => {
  const message = 'Entered password is too weak'
  if (password === '' && allowNull) return true
  if (password.length < 9) return message
  if (!(/[A-Z]/.test(password))) return message
  if (!(/[a-z]/.test(password))) return message
  if (!(/\d/.test(password))) return message
  return true
}

export const noLogin = () => {
  logToStderr(chalk.red("You're not logged in. Please use the 'login' command."))
  exit(1)
}
