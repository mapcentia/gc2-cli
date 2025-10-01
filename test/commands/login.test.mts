import {expect, test} from '@oclif/test'

describe('login', () => {
  test
    .stdout()
    .command(['login', '--flow', 'password', '--user', 'mydb', '--password', 'hawk2000'])
    .it('runs login cmd', (ctx: { stdout: any }) => {
      console.log(ctx.stdout)
      expect(ctx.stdout).to.contain('success')
    })
})
