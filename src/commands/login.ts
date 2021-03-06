'use strict'

import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import inquirer from 'inquirer'
import fetch from 'node-fetch'

import {User} from '../interfaces/User'

export default class Login extends Command {
  static description = 'Login to GC2'
  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    interface Response {
      access_token: string,
      token_type: string,
      expires_in: number,
      refresh_token: string,
      scope: string,
      error: string
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

    const config: Configstore = new Configstore('gc2-env')
    let obj: User = config.all // User object or empty object

    function instanceOfResponse(object: any, name: string): object is User {
      return name in object
    }

    if (!instanceOfResponse(obj, 'user')) {
      obj = {database: '', user: '', host: '', token: ''}
    }

    if (obj.host === '') {
      obj.host = await cli.prompt('Host')
    }

    if (obj.user === '') {
      obj.user = await cli.prompt('User')
    }

    if (obj.database === '') {
      cli.action.start('Getting databases')
      const response = await fetch(obj.host + '/api/v2/database/search?userIdentifier=' + obj.user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res: Databases = await response.json()
      if (res.success) {
        cli.action.stop(chalk.green('success'))
      } else {
        cli.action.stop(chalk.green('fail'))
        return
      }
      // if (res.databases.length > 1) {
      //   cli.table(res.databases, {parentdb: {}})
      //   obj.database = await cli.prompt('Database')
      // } else {
      //   obj.database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname
      // }
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
        obj.database = response.db
      } else {
        obj.database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname
      }
    }

    const password: string = await cli.prompt('Password', {type: 'hide'})

    cli.action.start(`Loggin into ${chalk.yellow(obj.host)} with ${chalk.yellow(obj.user)}`)

    const response = await fetch(obj.host + '/api/v3/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({grant_type: 'password', username: obj.user, password, database: obj.database})
    })
    const data: Response = await response.json()

    if (response.status === 200) {
      cli.action.stop(chalk.green('success'))
      config.set({token: data.access_token})
    } else {
      cli.action.stop(chalk.red(data.error))
    }
  }
}
