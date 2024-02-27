import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Create extends Command {
  static description = 'Create user with password and email'

  static flags = {
    help: Flags.help({char: 'h'}),
    password: Flags.string({char: 'p', description: 'password of new user', required: true}),
    email: Flags.string({char: 'e', description: 'email of new user', required: true}),
  }
  static args = {
    name: Args.string(
      {
        required: true,
        description: 'Name of new user',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Create)
    const {flags} = await this.parse(Create)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/user/' + args.name, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify(flags)
    })
    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`User ${chalk.green(args.name)} created`)
    }
  }
}
