import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import Configstore from 'configstore'
import fetch from 'node-fetch'

import {User} from '../interfaces/User'

export default class Grid extends Command {
  static description = 'Create a fishnet grid from an input polygon.'

  static flags = {
    help: flags.help({char: 'h'}),
    table: flags.string({char: 't', description: 'Name of the new fishnet table', required: true}),
    extent: flags.string({char: 'e', description: 'Polygon table which should be used for extent', required: true}),
    size: flags.string({char: 's', description: 'Cell size in map units', required: true}),
  }

  async run() {
    const {flags} = this.parse(Grid)
    const config: Configstore = new Configstore('gc2-env')
    let user: User = config.all
    cli.action.start('Creating fishnet grid ')
    const response = await fetch(user.host + '/api/v3/grid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token
      },
      body: JSON.stringify(flags)
    })
    const data: { 'data'?: any, '_execution_time'?: number, 'success'?: boolean, 'message'?: string } = await response.json()
    cli.action.stop('')
    if (data.success) {
      this.log(chalk.green('SUCCESS: Fishnet grid was created'))
    } else {
      this.log(chalk.red('ERROR: Fishnet grid was not created. Check below'))
      this.log(chalk.red(data.message))
      this.exit(1)
    }
  }
}
