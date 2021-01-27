import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import inquirer from 'inquirer'
import fetch from 'node-fetch'

export default class Connect extends Command {
  static description = 'Set connection'

  static flags = {
    help: flags.help({char: 'h'}),
    reset: flags.boolean({char: 'r', description: 'Reset connection'}),
  }

  static args = [{name: 'options'}]

  async run() {
    const {flags} = this.parse(Connect)
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

    let host = await cli.prompt('Host', {required: true, default: config.all.host})
    const user = await cli.prompt('User', {required: true, default: config.all.user})

    if (user && host) {
      try {
        host = host.replace(/\/$/, '')
        cli.action.start('Getting database')
        const response = await fetch(host + '/api/v2/database/search?userIdentifier=' + user, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const res: Databases = await response.json()
        if (res.databases.length > 0) {
          cli.action.stop(chalk.green('success'))
        } else {
          cli.action.stop(chalk.red('fail'))
          return
        }
        if (res.databases.length > 1) {
          let response: any = await inquirer.prompt([{
            name: 'db',
            message: 'Database',
            type: 'list',
            default: config.all.database,
            choices: res.databases.map(v => {
              return {name: v.parentdb}
            })
          }])
          database = response.db
        } else {
          database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname
        }
      } catch (e) {
        cli.action.stop(chalk.red(e.message))
      }
    }
    config.set({database})
    config.set({user})
    config.set({host})
  }
}
