import {Command, Flags} from '@oclif/core'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class List extends Command {
  static description = 'List running seed jobs'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
    const {args} = await this.parse(List)
    const response = await make('3', `tileseeder`, 'GET', null)
    const data = await get(response, 200)
    console.log(data)
  }
}
