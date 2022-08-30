'use strict'

import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {User} from '../interfaces/User'

export default class Sql extends Command {
  static description = 'Run SQL statements'
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
