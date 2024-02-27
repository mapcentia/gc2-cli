import {Args, Command, Flags, ux} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Desc extends Command {
  static description = 'Get table definition.'

  static flags = {
    help: Flags.help({char: 'h'}),
    ...ux.table.flags()

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
    const {args} = await this.parse(Desc)
    const {flags} = await this.parse(Desc)

    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/table/' + args.name, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      }
    })
    const res: ApiResponse = await response.json()
    if (!res.success) {
      this.log(chalk.red(res.message))
      this.exit(1)
    }

    if (!res.data.columns) {
      this.log(chalk.red("Relation doesn\'t exists"))
      this.exit(1)

    }

    type columns = {
      [key: string]: any
    }
    type column = {
      num: number,
      type: string,
      full_type: string,
      is_nullable: boolean,
      character_maximum_length: number,
      numeric_precision: number,
      numeric_scale: number,
      max_bytes: number,
      reference: string,
      restriction: any,
      geom_type?: string,
      srid?: string,
      is_primary: boolean,
      is_unique: boolean,
      index_method?: string
    }

    const data: object[] = []
    const columns: columns = {name: {}, type: {}, unique: {} , nullable: {}, index_method: {extended: true}, foreign_key: {extended: true}}
    for (const c of Object.keys(res.data.columns)) {
      const v: column = res.data.columns[c]
      data.push({
        name: v.is_primary ? chalk.green(c) : c,
        type: v.full_type,
        unique: v.is_unique,
        nullable: v.is_nullable,
        index_method: v.index_method || '',
        foreign_key: v.reference || '',
      })
    }

    cli.table(data, columns, {
      printLine: this.log.bind(this),
      ...flags
    })
  }
}
