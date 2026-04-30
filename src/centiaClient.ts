/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2026 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {
  CodeFlow,
  createCentiaAdminClient,
  createConfigstoreTokenStore,
  createTokenProvider,
  isCentiaApiError,
  NotLoggedInError,
  SessionExpiredError,
  type CentiaAdminClient,
} from '@centia-io/sdk'
import {logToStderr} from '@oclif/core/lib/cli-ux'
import {exit} from '@oclif/core/lib/errors'
import Configstore from 'configstore'

import User from './common/user'
import {CLI_SERVER_ADDRESS_CALLBACK, GC2_SERVER_ADDRESS, noLogin} from './util/utils'

const config: Configstore = new Configstore('gc2-env')

const getUser = (): User => config.all as User

export interface AuthService {
  getDeviceCode(): Promise<{device_code: string; user_code: string; verification_uri: string; verification_uri_complete?: string; expires_in: number; interval: number}>
  pollToken(deviceCode: string, interval: number): Promise<{access_token: string; refresh_token: string; [k: string]: unknown}>
  getAuthorizationCodeURL(codeChallenge: string, state: string): string
  getAuthorizationCodeToken(code: string | string[], codeVerifier: string | null): Promise<{access_token: string; refresh_token: string; [k: string]: unknown}>
  getRefreshToken(token: string): Promise<{access_token: string; refresh_token: string; [k: string]: unknown}>
}

export const createAuthService = (): AuthService =>
  new CodeFlow({
    host: GC2_SERVER_ADDRESS,
    clientId: 'gc2-cli',
    redirectUri: CLI_SERVER_ADDRESS_CALLBACK,
  }).service

export const tokenStore = createConfigstoreTokenStore('gc2-env')

const tokenProvider = createTokenProvider({
  store: tokenStore,
  authService: createAuthService() as any,
})

const getAccessToken = async (): Promise<string> => {
  try {
    return await tokenProvider.getAccessToken()
  } catch (e) {
    if (e instanceof NotLoggedInError) {
      noLogin()
    }
    if (e instanceof SessionExpiredError) {
      logToStderr('⚠️ Refresh token has expired. Please login again')
      exit(1)
    }
    throw e
  }
}

export const createCliCentiaAdminClient = (): CentiaAdminClient => {
  const user = getUser()

  return createCentiaAdminClient({
    baseUrl: user?.host || GC2_SERVER_ADDRESS,
    auth: {
      getAccessToken,
    },
    userAgent: 'gc2-cli',
  })
}

export const logCentiaErrorAndExit = (error: unknown): never => {
  if (isCentiaApiError(error)) {
    logToStderr(`⚠️ ${error.message}`)
    exit(1)
  }

  if (error instanceof Error) {
    logToStderr(`⚠️ ${error.message}`)
  } else {
    logToStderr('⚠️ Unexpected error')
  }
  exit(1)
}
