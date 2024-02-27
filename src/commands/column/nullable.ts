import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Nullable extends Command {
  static description = 'Set column to nullable'

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
    column: Args.string(
      {
        required: true,
        description: 'Name of column',
      },
    ),
    nullable: Args.string(
      {
        required: true,
        options: ['true', 'false']
      },
    ),
  }

  async run() {
    const {args} = await this.parse(Nullable)
    const {flags} = await this.parse(Nullable)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    let response
    response = await fetch(user.host + '/api/v3/column/' + args.table + '/' + args.column, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify(
        {
          column: args.column,
          is_nullable: args.nullable === 'true',
          id: args.column
        }
      )
    })

    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Column ${chalk.green(args.column)} is now ${args.nullable !== 'true' ? chalk.red('NOT ') : ''}nullable`)
    }
  }
}
