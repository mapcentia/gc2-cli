import {expect} from 'chai'
import {spawnSync} from 'child_process'
import * as path from 'path'

describe('centia alias', () => {
  it('warns on stderr and still runs the gc2 CLI', () => {
    const bin = path.join(process.cwd(), 'bin', 'run-centia')
    const res = spawnSync('node', [bin, '--version'], {encoding: 'utf8'})
    expect(res.status).to.equal(0)
    expect(res.stderr).to.contain('renamed to "gc2"')
    expect(res.stdout).to.contain('@mapcentia/gc2-cli/')
  })
})
