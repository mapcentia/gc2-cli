import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import get from '../util/get-response'
import make from '../util/make-request'

export default class Grid extends Command {
  static description = 'Add a fishnet grid from an input polygon.'
  static flags = {
    help: Flags.help({char: 'h'}),
    table: Flags.string({char: 't', description: 'Name of the new fishnet table.', required: true}),
    extent: Flags.string({char: 'e', description: 'Polygon table which should be used for extent.', required: true}),
    size: Flags.string({char: 's', description: 'Cell size in map units.', required: true}),
  }
  async run() {
    const {flags} = await this.parse(Grid)
    cli.action.start('Creating fishnet grid ')
    const response = await make('3', `grid`, 'POST', flags)
    const data  = await get(response, 200)
    cli.action.stop('')
    if (data.success) {
      this.log(chalk.green('SUCCESS: Fishnet grid was created.'))
    } else {
      this.log(chalk.red('ERROR: Fishnet grid was not created. Check below.'))
      this.log(chalk.red(data.message))
      this.exit(1)
    }
  }
}
