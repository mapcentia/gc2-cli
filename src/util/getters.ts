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
  return await get(response, 200)
}

const schemas = async (id?: string) => {
  const res = id ? `schemas/${id}` : 'schemas'
  const response = await make('4', res, 'GET')
  return await get(response, 200)

}

const tables = async (schema: string, table?: string) => {
  const res = table ? `schemas/${schema}/tables/${table}` : `schemas/${schema}/tables`
  const response = await make('4', res, 'GET')
  return await get(response, 200)
}

export {clients, schemas, tables}

export class indices {
}
