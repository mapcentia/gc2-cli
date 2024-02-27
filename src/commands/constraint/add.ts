import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Add extends Command {
  static description = 'Add a constraint on a column'

  static flags = {
    help: Flags.help({char: 'h'}),
    constraint: Flags.string({
      char: 'c',
      description: 'Type of constraint',
      required: true,
      options: ['unique', 'foreign'],
    }),
    referencedTable: Flags.string({
      helpGroup: 'Foreign key options',
      char: 't',
      description: 'Referenced table',
    }),
    referencedColumn: Flags.string({
      helpGroup: 'Foreign key options',
      char: 'e',
      description: 'Referenced column',
    }),
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
  }

  async run() {
    const {args} = await this.parse(Add)
    const {flags} = await this.parse(Add)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    let response
    if (flags.constraint === 'unique') {
      response = await fetch(user.host + '/api/v3/constraint/unique/' + args.table + '/' + args.column, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token
        },
      })
    }

    if (flags.constraint === 'foreign') {
      response = await fetch(user.host + '/api/v3/constraint/foreign/' + args.table + '/' + args.column, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token
        },
        body: JSON.stringify(flags)
      })
    }

    if (response) {
      const res: ApiResponse = await response.json()
      console.log(res)
      if (!res.success) {
        this.log(chalk.red(res.message))
        this.exit(1)
      }
      this.log(`Added unique constraint on ${chalk.green(args.column)}`)
    }
  }
}
