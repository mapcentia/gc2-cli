import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import fetch from 'node-fetch'
import {User} from '../interfaces/User'
import * as Configstore from 'configstore'

const tasks: string[] = ['mapfiles', 'mapcachefile', 'qgisfiles', 'schema', 'migrations', 'diskcleanup', 'cachestats', 'cachecleanup', 'qgisfromfiles']

export default class Admin extends Command {
  static description = 'Run administration task on the GC2 installation.'

  static flags = {
    help: flags.help({char: 'h'}),
    task: flags.string({char: 't', description: 'The task to run: ' + tasks.join(', '), required: true}),
  }

  async run() {
    const {args, flags} = this.parse(Admin)

    if (!tasks.includes(flags.task)) {
      this.log(chalk.red('Invalid task'))
      this.exit(1)
    }

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    cli.action.start('Running task ')

    const response = await fetch(user.host + '/api/v3/admin/' + flags.task, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      }
    })
    const data: Response = await response.json()
    console.log(data)
  }
}
