/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import {privileges} from '../../util/getters'
import {privilegeList, schemasList, tableList, userList} from '../../util/lists'
import setSchema from '../../util/set-schema'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../../centiaClient'
import type {PrivilegeLevel} from '@centia-io/sdk'

let base_args = args
let specific_args = {
  user: Args.string(
    {
      required: false,
      description: 'Name of user.',
    },
  ),
  privilege: Args.string(
    {
      required: false,
      description: 'Which privilege.',
    },
  )
}

export default class Set extends Command {
  static description = 'Set user privileges on table.'
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
    const v = current?.filter((e: { subuser: any }) => user === e.subuser)[0]
    const privilege = args?.privilege || await privilegeList(v?.privilege)

    try {
      const client = createCliCentiaAdminClient()
      await client.provisioning.privileges.patchPrivileges(schema, table, {subuser: user, privilege: privilege as PrivilegeLevel})
      this.log(`Privileges update on ${chalk.green(table)}`)
    } catch (error) {
      logCentiaErrorAndExit(error)
    }
  }
}
