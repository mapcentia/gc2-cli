import {expect, test} from '@oclif/test'

describe('build:mapfiles', () => {
  test
    .stdout()
    .command(['build:mapfiles'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['build:mapfiles', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
