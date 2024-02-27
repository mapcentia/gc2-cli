import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Drop extends Command {
  static description = 'Drop existing user'

  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    name: Args.string(
      {
        required: true,
        description: 'Name of user to drop',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Drop)
    const {flags} = await this.parse(Drop)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/user/' + args.name, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
    })
    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`User ${chalk.green(args.name)} dropped`)
    }
  }
}
