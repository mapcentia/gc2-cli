import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Add extends Command {
  static description = 'Add column'

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
    name: Args.string(
      {
        required: true,
        description: 'Name of new column',
      },
    ),
    type: Args.string(
      {
        required: true,
        description: 'Type of new column',
      },
    ),
  }

  async run() {
    const {args} = await this.parse(Add)
    const {flags} = await this.parse(Add)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    let response
    response = await fetch(user.host + '/api/v3/column/' + args.table + '/' + args.name, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify(
        {
          type: args.type,
        }
      )
    })

    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Column ${chalk.green(args.name)} added`)
    }
  }
}
