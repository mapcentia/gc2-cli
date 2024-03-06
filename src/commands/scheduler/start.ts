import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Start extends Command {
  static description = 'Starts a scheduler job'
  static args = {
    id: Args.string(
      {
        required: true,
        description: 'Job id to start. Can also be a schema name and all jobs for that schema will be started',
      },
    ),
  }
  static flags = {
    help: Flags.help({char: 'h'}),
  }

  async run() {
    const {args} = await this.parse(Start)
    const response = await make('3', `scheduler/${args.id}`, 'POST', null)
    await get(this, response, 202)
    this.log(`See status here: ${chalk.green(response.headers.get('Location'))}`)
  }
}
