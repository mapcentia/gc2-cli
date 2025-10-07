/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags, ux} from '@oclif/core'
import cli from 'cli-ux'
import args from '../../common/base_args'
import {privileges} from '../../util/getters'
import {schemasList, tableList} from '../../util/lists'
import setSchema from '../../util/set-schema'

const base_args = args
const specific_args = {}

export default class Get extends Command {
  static description = 'Get user privileges on table.'

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

    if (Object.keys(res.privileges).length === 0) {
      ux.log(`⚠️ No privilege set yet`)
      this.exit(1)
    }

    type row = {
      [key: string]: any
    }
    type user = {
      subuser: string;
      privilege: string;
      group?: string;
    }
    const data: object[] = []
    const rows: row = {subuser: {}, privilege: {}, group: {}}
    for (const c in res.privileges) {
      const v: user = res.privileges[c]
      data.push({
        subuser: v.subuser,
        privilege: v.privilege,
        group: v.group || '',
      })
    }
    cli.table(data, rows, {
      printLine: this.log.bind(this)
    })
  }
}
