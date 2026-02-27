/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import get from './get-response'
import make from './make-request'
import {createCliCentiaAdminClient, logCentiaErrorAndExit} from '../centiaClient'

type Client = {
  id: string
  name: string
  description: string
  redirect_uri: string[]
  homepage: string
  public: boolean
  confirm: boolean
  two_factor: boolean
  allow_signup: boolean
  social_signup: boolean
}

const clients = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    const t: any = await client.provisioning.clients.getClient(id)
    if (!t?.clients) {
      return {clients: Array.isArray(t) ? t : [t]}
    }
    return t
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

type User = {
  name: string;
  user_group?: string;
  email: string;
  properties: string;
  default_user: boolean;
}

const users = async (id?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    const t: any = await client.provisioning.users.getUser(id)
    if (!t?.users) {
      return {users: Array.isArray(t) ? t : [t]}
    }
    return t
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const rules = async (id?: string) => {
  const res = id ? `rules/${id}` : 'rules'
  const response = await make('4', res, 'GET')
  const t: any = await get(response, 200);
  if (!t?.rules) {
    t.rules = [t]
  }
  return t
}

const schemas = async (id?: string, namesOnly: boolean = true) => {
  try {
    const client = createCliCentiaAdminClient()
    const t: any = await client.provisioning.schemas.getSchema(id, {namesOnly})
    if (!t?.schemas) {
      t.schemas = [t]
    }
    return t
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const tables = async (schema: string, table?: string) => {
  try {
    const client = createCliCentiaAdminClient()
    const t: any = await client.provisioning.tables.getTable(schema, table)
    if (!t?.tables) {
      t.tables = [t]
    }
    return t
  } catch (error) {
    logCentiaErrorAndExit(error)
  }
}

const privileges = async (schema: string, table: string) => {
  const res = `schemas/${schema}/tables/${table}/privileges`
  const response = await make('4', res, 'GET')
  const t = await get(response, 200, true);
  if (!t?.privileges) {
    t.privileges = [t]
  }
  return t
}

export {clients, rules, schemas, tables, users, privileges}
