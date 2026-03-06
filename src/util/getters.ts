/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../centiaClient'

const asArray = <T>(result: T | T[]): T[] => Array.isArray(result) ? result : [result]

const clients = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    if (id) return await client.provisioning.clients.getClient(id)
    return asArray(await client.provisioning.clients.getClient())
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const users = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    if (id) return await client.provisioning.users.getUser(id)
    return asArray(await client.provisioning.users.getUser())
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const rules = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    if (id != null) return await client.provisioning.rules.getRule(Number(id))
    return asArray(await client.provisioning.rules.getRule())
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const schemas = async (id?: string, namesOnly: boolean = true) => {
  try {
    const client = createCliCentiaAdminClient()
    if (id) return await client.provisioning.schemas.getSchema(id, {namesOnly})
    return asArray(await client.provisioning.schemas.getSchema(undefined, {namesOnly}))
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const tables = async (schema: string, table?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    if (table) return await client.provisioning.tables.getTable(schema, table)
    return asArray(await client.provisioning.tables.getTable(schema))
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const privileges = async (schema: string, table: string) => {
  try {
    const client = createCliCentiaAdminClient()
    return await client.provisioning.privileges.getPrivileges(schema, table)
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

export {clients, rules, schemas, tables, users, privileges}
