import {Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import inquirer from 'inquirer'
import get from '../util/get-response'
import make from '../util/make-request'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default class Connect extends Command {
  static description = 'Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.'

  static flags = {
    help: Flags.help({char: 'h'}),
    reset: Flags.boolean({char: 'r', description: 'Reset connection'}),
    host: Flags.string({char: 'H', description: 'Host'}),
    database: Flags.string({char: 'd', description: 'Database'}),
    user: Flags.string({char: 'u', description: 'User'}),
  }
  async run() {
    const {flags} = await this.parse(Connect)
    const config: Configstore = new Configstore('gc2-env')
    if (flags.reset) {
      config.clear()
      this.log('Connection reset')
      return
    }
    interface Database {
      screenname: string,
      email: string,
      parentdb: string
    }
    interface Databases {
      databases: Database[]
      success?: string
    }
    let database = ''
    let host = flags?.host ? flags.host : await cli.prompt('Host', {required: true, default: config.all.host})
    const user = flags?.user ? flags.user : await cli.prompt('User', {required: true, default: config.all.user})
    if (user && host) {
      try {
        host = host.replace(/\/$/, '')
        config.set({user})
        config.set({host})
        cli.action.start('Getting database')
        const response = await make('2', `database/search?userIdentifier=${user}`, 'GET', null, false)
        const res = await get(this, response, 200)
        if (res.databases.length > 0) {
          cli.action.stop(chalk.green('success'))
        } else {
          cli.action.stop(chalk.red('fail'))
          return
        }
        if (flags?.database) {
          database = flags.database
        } else if (res.databases.length > 1) {
          let response: any = await inquirer.prompt([{
            name: 'db',
            message: 'Database',
            type: 'list',
            default: config.all.database,
            choices: res.databases.map((v: { parentdb: any }) => {
              return {name: v.parentdb}
            })
          }])
          database = response.db
        } else {
          database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname
        }
        config.set({database})
      } catch (e: Error | any) {
        cli.action.stop(chalk.red(e.message))
      }
    }

  }
}
