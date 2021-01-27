import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {User} from '../interfaces/User'

const tasks: string[] = ['mapfiles', 'mapcachefile', 'qgisfiles', 'schema', 'migrations', 'diskcleanup', 'cachestats', 'cachecleanup' /*, 'qgisfromfiles' */]

export default class Admin extends Command {
  static description = 'Run administration task on the GC2 installation.'

  static flags = {
    help: flags.help({char: 'h'}),
    task: flags.string({char: 't', description: 'The task to run: ' + tasks.join(', '), required: true}),
  }

  async run() {
    // tslint:disable-next-line:no-unused
    const {flags} = this.parse(Admin)

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
    const data: { 'data': any, '_execution_time': number } = await response.json()
    cli.action.stop('')
    // report
    switch (flags.task) {
    case tasks[0]:
      data.data.forEach((e: Array<string>) => {
        this.log(chalk.green(e[0]))
        this.log(chalk.green(e[1]))
      })
      this.log(`time ${data._execution_time}`)
      break
    case tasks[1]:
      this.log(chalk.green(data.data))
      break
    case tasks[2]:
      data.data.forEach((e: Array<string>) => {
        this.log(chalk.green(e))
      })
      this.log(`time ${data._execution_time}`)
      break
    case tasks[3]:
      this.log(chalk.green(data.data.message))
      this.log(`time ${data._execution_time}`)
      break
    case tasks[4]:
      Object.keys(data.data).forEach(key => {
        let value = data.data[key]
        this.log(key + ': ' + chalk.green(value))
      })
      this.log(`time ${data._execution_time}`)
      break
    case tasks[5]:
      data.data.forEach((e: Array<string>) => {
        this.log(chalk.green(e))
      })
      break
    default:
      console.log(data)
    }
  }
}
