import {Command, Flags} from '@oclif/core'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'

export default class List extends Command {
  static description = 'List running seed jobs.'
  static flags = {
    help: Flags.help({char: 'h'}),
  }
  async run() {
    try {
      const client = createCliCentiaAdminClient()
      const data = await client.http.request<any>({
        path: 'api/v3/tileseeder',
        method: 'GET',
      })
      console.log(data)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
