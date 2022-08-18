'use strict'

import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {User} from '../interfaces/User'

export default class Sql extends Command {
  static description = 'Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It\'s better to be prompt for the password'
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static args = [{name: 'options'}]

  async run() {
    // var prompts = new Subject();
    // inquirer.prompt(prompts);

    while (true) {
      let sql = await cli.prompt('')
      console.log(sql)
    }
  }
}
