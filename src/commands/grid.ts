import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../centiaClient'

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
    let data: any
    try {
      const client = createCliCentiaAdminClient()
      cli.action.start('Creating fishnet grid ')
      data = await client.http.request<any>({
        path: 'api/v3/grid',
        method: 'POST',
        body: {table: flags.table, extent: flags.extent, size: flags.size},
      })
      cli.action.stop('')
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
    if (data.success) {
      this.log(chalk.green('SUCCESS: Fishnet grid was created.'))
    } else {
      this.log(chalk.red('ERROR: Fishnet grid was not created. Check below.'))
      this.log(chalk.red(data.message))
      this.exit(1)
    }
  }
}
