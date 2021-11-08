import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {User} from '../../interfaces/User'

export default class Stop extends Command {
  static description = 'Stops a seed job'

  static flags = {
    help: flags.help({char: 'h'}),
    uuid: flags.string({char: 'u', description: 'UUID of seed job', required: true}),
  }

  async run() {
    const {args, flags} = this.parse(Stop)
    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/tileseeder/index/' + flags.uuid, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      }
    })
    const data = await response.json()
    if (data.pid.pid !== null) {
      this.log(chalk.green(`SUCCESS: Seed job ${data.pid.uuid} with name ${data.pid.name} was stopped`))
    } else {
      this.log(chalk.red(`FAILURE: Seed job ${flags.uuid} doesn't exists`))
    }
  }
}
