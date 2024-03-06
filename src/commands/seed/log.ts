import {Command, Flags} from '@oclif/core'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Log extends Command {
  static description = 'Logs'
  static flags = {
    help: Flags.help({char: 'h'}),
    uuid: Flags.string({char: 'u', description: 'UUID of seed job', required: true}),
  }
  async run() {
    const {flags} = await this.parse(Log)
    const response = await make('3', `tileseeder/log`, 'GET', null)
    const data = await get(this, response, 200)
    this.log(data.data)
  }
}
