import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import Configstore from 'configstore'
import * as http from 'http'
import * as https from 'https'
import parse from 'url-parse'

import {User} from './../../interfaces/User'

export default class Log extends Command {
  static description = 'Logs'

  static flags = {
    help: flags.help({char: 'h'}),
    uuid: flags.string({char: 'u', description: 'UUID of seed job', required: true}),
  }

  async run() {
    const {flags} = this.parse(Log)
    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const url = user.host + '/api/v3/tileseeder/log/?uuid=' + flags.uuid

    let adapters: any = {
      'http:': http,
      'https:': https,
    }
    adapters[parse(url).protocol].get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token
        }
      },
      (res: any) => {
        res.setEncoding('utf8')
        res.on('data', (data: string) => {
          // We trim the strings because the server pads them to get them flushed
          let str: string = data.replace(/[\w\s]$/gi, '').trim()
          if (str !== '') {
            this.log(chalk.green(str))
          }
        })
        res.on('end', () => {
          //
        })
      })
  }
}
