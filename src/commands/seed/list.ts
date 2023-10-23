import {Command, flags} from '@oclif/command'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {User} from '../../interfaces/user'

export default class List extends Command {
  static description = 'List running seed jobs'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = this.parse(List)
    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    const response = await fetch(user.host + '/api/v3/tileseeder', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      }
    })
    const data: Response = await response.json()
    console.log(data)
  }
}
