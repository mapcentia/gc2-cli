/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../centiaClient'

const clients = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    return id
      ? await client.provisioning.clients.getClient(id)
      : await client.provisioning.clients.getClient()
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const users = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    return id
      ? await client.provisioning.users.getUser(id)
      : await client.provisioning.users.getUser()
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const rules = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    return id != null
      ? await client.provisioning.rules.getRule(Number(id))
      : await client.provisioning.rules.getRule()
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const schemas = async (id?: string, namesOnly: boolean = true) => {
  try {
    const client = createCliCentiaAdminClient()
    return id
      ? await client.provisioning.schemas.getSchema(id, {namesOnly})
      : await client.provisioning.schemas.getSchema(undefined, {namesOnly})
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const tables = async (schema: string, table?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    return table
      ? await client.provisioning.tables.getTable(schema, table)
      : await client.provisioning.tables.getTable(schema)
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
