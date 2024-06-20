import {exit} from '@oclif/core/lib/errors'
import axios, {AxiosError, AxiosInstance} from 'axios'
import * as querystring from 'querystring'
import {
  CLI_SERVER_ADDRESS_CALLBACK,
  getUserCredentials,
  GC2_SERVER_ADDRESS,
} from '../util/utils'

type GetDeviceCodeResponse = {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete?: string;
  expires_in: number;
  interval: number;
};

type GetTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
};

type GetUserInfoResponse = {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

export class Gc2Service {
  http: AxiosInstance
  // realm: string;
  clientId: string

  constructor() {
    this.http = axios.create({
      baseURL: `${GC2_SERVER_ADDRESS}`,
    })
    this.clientId = '667414465e8a4' // using the same name by the way
  }

  async getDeviceCode(): Promise<GetDeviceCodeResponse> {
    const {data} = await this.http.post(
      `/api/v4/oauth/device`,
      {
        client_id: this.clientId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return data
  }

  async poolToken(deviceCode: string, interval: number): Promise<GetTokenResponse> {
    const getToken = () =>
      this.http
        .post(
          '/api/v4/oauth',
          {
            client_id: this.clientId,
            device_code: deviceCode,
            grant_type: 'device_code',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(({data}) => data)
        .catch(error => {
          if (error instanceof AxiosError) {
            const err = error.response?.data
            if (err.error === 'authorization_pending') {
              return null
            } else {
              return err.error_description
            }
          }
        })

    let response = await getToken()

    while (response === null) {
      response = await new Promise(resolve => {
        setTimeout(async () => {
          resolve(await getToken())
        }, interval * 1100) // interval equal to 1 is equivalent to 1.1 seconds between one request and another
      })
    }
    if (typeof response === 'string') {
      throw new Error(response)
    }

    return response
  }

  async getUserInfo(): Promise<GetUserInfoResponse | null> {
    const userCredentials = getUserCredentials()

    if (!userCredentials?.accessToken) return null

    try {
      const {data} = await this.http.get('/userinfo', {
        headers: {
          Authorization: `Bearer ${userCredentials.accessToken}`,
        },
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401)
        return null

      throw error
    }
  }

  async logout(): Promise<void | null> {
    const userCredentials = getUserCredentials()

    if (!userCredentials?.refreshToken) return null

    try {
      const {data} = await this.http.post(
        '/logout',
        {
          client_id: this.clientId,
          refresh_token: userCredentials.refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      return data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401)
        return null

      throw error
    }
  }

  getAuthorizationCodeURL(codeChallenge: string, state: string): string {
    const queryParams = querystring.stringify({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: CLI_SERVER_ADDRESS_CALLBACK,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })

    return `${GC2_SERVER_ADDRESS}/auth/?${queryParams}`
  }

  async getAuthorizationCodeToken(code: string | undefined, codeVerifier: string): Promise<GetTokenResponse> {
    return this.http
      .post(
        `/api/v4/oauth`,
        {
          client_id: this.clientId,
          redirect_uri: CLI_SERVER_ADDRESS_CALLBACK,
          grant_type: 'authorization_code',
          code,
          code_verifier: codeVerifier,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => data).catch(err => {
        //console.log(err)
        exit(1)

      })
  }

  async getPasswordToken(username: string, password: string, database: string): Promise<GetTokenResponse> {
    return this.http
      .post(
        `/api/v3/oauth/token`,
        {
          client_id: this.clientId,
          grant_type: 'password',
          username,
          password,
          database,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => data).catch(err => console.log(err))
  }

  async getRefreshToken(token: string): Promise<GetTokenResponse> {
    return this.http
      .post(
        `/api/v4/oauth`,
        {
          client_id: this.clientId,
          grant_type: 'refresh_token',
          refresh_token: token
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => data).catch(err => {
        exit(1)
      })
  }
}
