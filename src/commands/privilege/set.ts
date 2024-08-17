/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import {privileges} from '../../util/getters'
import {privilegeList, schemasList, tableList, userList} from '../../util/lists'
import make from '../../util/make-request'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {
  user: Args.string(
    {
      required: false,
      description: 'Name of user',
    },
  ),
  privileges: Args.string(
    {
      required: false,
      description: 'Which privileges',
    },
  )
}

export default class Set extends Command {
  static description = 'Set privileges on table'

  static flags = {
    help: Flags.help({char: 'h'}),
  }

  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Set)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const user = args?.user || await userList()
    const current = await privileges(schema, table)
    const v = current.privileges.filter((e: { subuser: any }) => user === e.subuser)[0]
    const pr = args?.privileges || await privilegeList(v?.privileges)

    const response = await make('4', `schemas/${schema}/tables/${table}/privilege`, 'PUT', {subuser: user, privileges: pr})
    await get(response, 200)
    this.log(`Privileges update on ${chalk.green(table)}`)
  }
}
