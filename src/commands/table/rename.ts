import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Rename extends Command {
  static description = 'Rename table'

  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    name: Args.string(
      {
        required: true,
        description: 'Name of table',
      }
    ),
    new_name: Args.string(
      {
        required: true,
        description: 'Name of table',
      }
    ),
  }

  async run() {
    const {args} = await this.parse(Rename)
    const {flags} = await this.parse(Rename)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/table/' + args.name, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify({name: args.new_name})
    })
    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Table ${chalk.green(args.name)} renamed`)

    }
  }
}
