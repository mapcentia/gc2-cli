/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import get from './get-response'
import make from './make-request'

const clients = async (id?: string) => {
  const res = id ? `clients/${id}` : 'clients'
  const response = await make('4', res, 'GET')
  const t: any = await get(response, 200);
  if (!t.clients) {
    t.clients = [t]
  }
  return t
}

const rules = async (id?: string) => {
  const res = id ? `rules/${id}` : 'rules'
  const response = await make('4', res, 'GET')
  const t: any = await get(response, 200);
  if (!t.rules) {
    t.rules = [t]
  }
  return t
}

const schemas = async (id?: string) => {
  const res = id ? `schemas/${id}` : 'schemas?namesOnly'
  const response = await make('4', res, 'GET')
  const t: any = await get(response, 200);
  if (!t.schemas) {
    t.schemas = [t]
  }
  return t
}

const tables = async (schema: string, table?: string) => {
  const res = table ? `schemas/${schema}/tables/${table}?namesOnly` : `schemas/${schema}/tables?namesOnly`
  const response = await make('4', res, 'GET')
  const t = await get(response, 200);
  if (!t.tables) {
    t.tables = [t]
  }
  return t
}

const users = async (id?: string) => {
  const res = id ? `users/${id}` : 'users'
  const response = await make('4', res, 'GET')
  const t: any = await get(response, 200);
  if (!t.users) {
    t.users = [t]
  }
  return t
}

const privileges = async (schema: string, table: string) => {
  const res = `schemas/${schema}/tables/${table}/privilege`
  const response = await make('4', res, 'GET')
  return await get(response, 200)
}

export {clients, rules, schemas, tables, users, privileges}
