import {Command, Flags} from '@oclif/core'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class Start extends Command {
  static description = 'Starts a seed job.'

  static flags = {
    help: Flags.help({char: 'h'}),
    name: Flags.string({char: 'n', description: 'Name of seed job.', required: true}),
    layer: Flags.string({char: 'l', description: 'Layer to seed [schema].[relation]', required: true}),
    grid: Flags.string({char: 'g', description: 'Grid to use.', required: true}),
    start: Flags.string({char: 's', description: 'Start zoom level (the lower number).', required: true}),
    end: Flags.string({char: 'e', description: 'End zoom level (the higher number).', required: true}),
    extent: Flags.string({
      char: 'x',
      description: 'Polygon layer which set the extent for the seeding [schema].[relation]',
      required: true
    }),
    threads: Flags.string({char: 't', description: 'Number of parallel threads that should be used to request tiles from the WMS source.', required: false}),
    force: Flags.boolean({char: 'f', description: 'Force seed job - overwrites existing tiles.'}),
  }
  async run() {
    const {flags} = await this.parse(Start)
    try {
      const client = createCliCentiaAdminClient()
      const data = await client.http.request<any>({
        path: 'api/v3/tileseeder',
        method: 'POST',
        body: {
          name: flags.name,
          layer: flags.layer,
          grid: flags.grid,
          start: flags.start,
          end: flags.end,
          extent: flags.extent,
          threads: flags.threads,
          force: flags.force,
        },
      })
      console.log(data)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
