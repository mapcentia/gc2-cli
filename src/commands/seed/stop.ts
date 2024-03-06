import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Stop extends Command {
  static description = 'Stops a seed job'
  static flags = {
    help: Flags.help({char: 'h'}),
    uuid: Flags.string({char: 'u', description: 'UUID of seed job', required: true}),
  }
  async run() {
    const {flags} = await this.parse(Stop)
    const response = await make('3', `tileseeder/index` + flags.uuid, 'DELETE', null)
    const data = await get(this, response, 200)
    if (data.pid.pid !== null) {
      this.log(chalk.green(`SUCCESS: Seed job ${data.pid.uuid} with name ${data.pid.name} was stopped`))
    } else {
      this.log(chalk.red(`FAILURE: Seed job ${flags.uuid} doesn't exists`))
    }
  }
}
