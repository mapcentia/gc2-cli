import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {ApiResponse} from '../../interfaces/api-response'
import {User} from '../../interfaces/user'

export default class Log extends Command {
  static description = 'Logs'

  static flags = {
    help: flags.help({char: 'h'}),
    uuid: flags.string({char: 'u', description: 'UUID of seed job', required: true}),
  }

  async run() {
    const {flags} = this.parse(Log)
    const config: Configstore = new Configstore('gc2-env')
    const user: User = config.all
    const url = user.host + '/api/v3/tileseeder/log/' + flags.uuid
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      }
    })
    const data: ApiResponse = await response.json()
    this.log(data.data)
  }
}
