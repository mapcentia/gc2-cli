import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'gc2-whoami-test-'))
const configDir = path.join(tmpRoot, 'configstore')
const configFile = path.join(configDir, 'gc2-env.json')
fs.mkdirSync(configDir, {recursive: true})
process.env.XDG_CONFIG_HOME = tmpRoot

function makeJwt(expSecondsFromNow: number): string {
  const header = Buffer.from(JSON.stringify({alg: 'none', typ: 'JWT'})).toString('base64url')
  const payload = Buffer.from(
    JSON.stringify({exp: Math.floor(Date.now() / 1000) + expSecondsFromNow, uid: 'mhogh'}),
  ).toString('base64url')
  return `${header}.${payload}.`
}

function writeStore(creds: Record<string, unknown>): void {
  fs.writeFileSync(configFile, JSON.stringify(creds))
}

describe('whoami', () => {
  test
    .do(() => writeStore({
      host: 'https://api.centia.io',
      user: 'mhogh',
      database: 'fkg',
      superUser: false,
      token: makeJwt(3600),
      refresh_token: makeJwt(7200),
    }))
    .stdout()
    .command(['whoami'])
    .it('reports active session', (ctx: {stdout: string}) => {
      expect(ctx.stdout).to.contain('Host')
      expect(ctx.stdout).to.contain('https://api.centia.io')
      expect(ctx.stdout).to.contain('mhogh')
      expect(ctx.stdout).to.contain('fkg')
      expect(ctx.stdout).to.contain('active')
    })

  test
    .do(() => writeStore({
      host: 'https://api.centia.io',
      user: 'mhogh',
      database: 'fkg',
      superUser: true,
      token: makeJwt(-60),
      refresh_token: makeJwt(7200),
    }))
    .stdout()
    .command(['whoami'])
    .it('reports expired session', (ctx: {stdout: string}) => {
      expect(ctx.stdout).to.contain('expired')
    })

  test
    .do(() => writeStore({host: 'https://api.centia.io'}))
    .stdout()
    .command(['whoami'])
    .it('reports not logged in when no token', (ctx: {stdout: string}) => {
      expect(ctx.stdout).to.contain('not logged in')
    })

  test
    .do(() => writeStore({
      host: 'https://api.centia.io',
      user: 'mhogh',
      database: 'fkg',
      superUser: true,
      token: makeJwt(3600),
      refresh_token: makeJwt(7200),
    }))
    .stdout()
    .command(['whoami', '--json'])
    .it('emits machine-readable JSON', (ctx: {stdout: string}) => {
      const parsed = JSON.parse(ctx.stdout)
      expect(parsed).to.deep.equal({
        host: 'https://api.centia.io',
        user: 'mhogh',
        database: 'fkg',
        superUser: true,
        status: 'active',
      })
    })
})
