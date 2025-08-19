/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {input} from '@inquirer/prompts'
import {Args, Command, Flags, ux} from '@oclif/core'
import Configstore from 'configstore'
import fetch from "node-fetch";
import {GC2_SERVER_ADDRESS} from "../util/utils";
import {exit} from "@oclif/core/lib/errors";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default class Connect extends Command {
  static description = 'Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.'

  static args = {
    host: Args.string(
      {
        required: false,
        description: 'Server host with scheme: http(s)',
      }
    )
  }

  static flags = {
    help: Flags.help({char: 'h'}),
    reset: Flags.boolean({char: 'r', description: 'Reset connection.'}),
  }

  async run() {
    const {flags, args} = await this.parse(Connect)
    const config: Configstore = new Configstore('gc2-env')
    if (flags.reset) {
      config.clear()
      this.log('Connection reset.')
      return
    }

    let host = args?.host ? args.host : await input({message: 'Host', required: true, default: config.all.host})
    if (host) {
      host = host.replace(/\/$/, '')

      // Check host
      const response = await fetch((host || GC2_SERVER_ADDRESS) + '/ping')

      if (response.status !== 200) {
        ux.log('⚠️ The URL is not a valid connection.')
        exit(1)
      }

      config.set({host})
      config.set({user: ''})
      config.set({database: ''})
    }

  }
}
