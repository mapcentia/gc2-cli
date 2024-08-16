/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {privileges} from '../../util/getters'
import {schemasList, tableList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {}

export default class Get extends Command {
  static description = 'Get privileges on table'

  static flags = {
    help: Flags.help({char: 'h'}),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Get)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const res = await privileges(schema, table)

    type row = {
      [key: string]: any
    }
    type user = {
      subuser: string;
      privileges: string;
      group?: string;
    }
    const data: object[] = []
    const rows: row = {subuser: {}, privileges: {}, group: {}}
    for (const c in res.privileges) {
      const v: user = res.privileges[c]
      data.push({
        subuser: v.subuser,
        privileges: v.privileges,
        group: v.group || '',
      })
    }
    cli.table(data, rows, {
      printLine: this.log.bind(this)
    })
  }
}
