import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Drop extends Command {
  static description = 'Add column'

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
        description: 'Column to index',
      },
    ),
    type: Args.string(
      {
        required: false,
        description: 'Type of index',
        default: 'btree',
        options: ['brin', 'btree', 'gin', 'gist', 'hash', 'spgist']
      },
    ),
  }

  async run() {
    const {args} = await this.parse(Drop)
    const {flags} = await this.parse(Drop)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    let response
    response = await fetch(user.host + '/api/v3/index/' + args.table + '/' + args.column + '/' + args.type, {
      method: 'DELETE',
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
      this.log(`Dropped ${args.type} index on ${chalk.green(args.column)}`)
    }
  }
}
