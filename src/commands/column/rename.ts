import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Rename extends Command {
  static description = 'Rename column'

  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    table: Args.string(
      {
        name: 'table',
        required: true,
        description: 'Name of table',
      },
    ),
    old: Args.string(
      {
        name: 'old',
        required: true,
        description: 'Existing Name of column',
      },
    ),
    new: Args.string(
      {
        name: 'New',
        required: true,
        description: 'New name of column',
      },
    ),
  }

  async run() {
    const {args} = await this.parse(Rename)
    const {flags} = await this.parse(Rename)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    let response
    response = await fetch(user.host + '/api/v3/column/' + args.table + '/' + args.old, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify(
        {
          column: args.new,
          id: args.old
        }
      )
    })

    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Column ${chalk.green(args.old)} renamed to ${chalk.green(args.new)}`)
    }
  }
}
