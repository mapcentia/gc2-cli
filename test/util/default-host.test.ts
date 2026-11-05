import {expect} from 'chai'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

describe('default host', () => {
  it('falls back to https://api.gc2.io when no host is stored', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'gc2-default-host-test-'))
    process.env.XDG_CONFIG_HOME = tmpRoot
    const {GC2_SERVER_ADDRESS} = await import('../../lib/util/utils.js')
    expect(GC2_SERVER_ADDRESS).to.equal('https://api.gc2.io')
  })
})
