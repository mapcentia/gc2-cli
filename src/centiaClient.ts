import Configstore from 'configstore'
import {CodeFlow, createCentiaAdminClient, isCentiaApiError} from '@centia-io/sdk'
import type {CentiaAdminClient} from '@centia-io/sdk'
import {exit} from '@oclif/core/lib/errors'
import {logToStderr} from '@oclif/core/lib/cli-ux'
import User from './common/user'
import {CLI_SERVER_ADDRESS_CALLBACK, GC2_SERVER_ADDRESS, isTokenExpired, noLogin} from './util/utils'

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

const getAccessToken = async (): Promise<string | undefined> => {
  const user = getUser()

  if (!user?.token) {
    noLogin()
  }

  if (user?.token && isTokenExpired(user.token)) {
    if (!user.refresh_token || isTokenExpired(user.refresh_token)) {
      logToStderr('⚠️ Refresh token has expired. Please login again')
      exit(1)
    }

    try {
      const service = createAuthService()
      const data = await service.getRefreshToken(user.refresh_token)
      config.set({token: data.access_token})
      return data.access_token
    } catch {
      logToStderr('⚠️ Could not get refresh token')
      exit(1)
    }
  }

  return (config.all as User).token
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
