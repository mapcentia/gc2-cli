import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Create extends Command {
  static description = 'Add table'

  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    name: Args.string(
      {
        name: 'name',
        required: true,
        description: 'Name of table',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Create)
    const {flags} = await this.parse(Create)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/table/' + args.name, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      }
    })
    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Table ${chalk.green(args.name)} created`)
    }
  }
}
