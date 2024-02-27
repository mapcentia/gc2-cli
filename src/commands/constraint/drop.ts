import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Drop extends Command {
  static description = 'Drop a constraint on a column'

  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {
    table: Args.string(
      {
        required: true,
        description: 'Name of table',
      },
    ),
    column: Args.string(
      {
        required: true,
        description: 'Column',
      },
    ),
    constraint: Args.string(
      {
        required: true,
        description: 'Constraint type',
        options: ['unique', 'foreign'],
      },
    ),
  }

  async run() {
    const {args} = await this.parse(Drop)
    const {flags} = await this.parse(Drop)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    let response
    if (args.constraint === 'unique') {
      response = await fetch(user.host + '/api/v3/constraint/unique/' + args.table + '/' + args.column, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token
        },
        body: JSON.stringify(flags)
      })
    }
    if (args.constraint === 'foreign') {
      response = await fetch(user.host + '/api/v3/constraint/foreign/' + args.table + '/' + args.column, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token
        },
      })
    }

    if (response) {
      const res: ApiResponse = await response.json()
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Dropped unique constraint on ${chalk.green(args.column)}`)
    }
  }
}
