/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import inquirer from 'inquirer'
import {clients, schemas, tables} from './getters'

const schemasList = async () => {
  const s: any = await schemas()
  let r: any = await inquirer.prompt([{
    name: 'id',
    message: 'Choose a schema',
    type: 'list',
    default: null, choices: s.schemas.map((v: { schema: string }) => {
      return {name: v.schema}
    })
  }])
  return r.id
}
const tableList = async (schema: string) => {
  const s: any = await tables(schema)
  let r: any = await inquirer.prompt([{
    name: 'id',
    message: 'Choose a table',
    type: 'list',
    default: null, choices: s.tables.map((v: { table: string }) => {
      return {name: v.table.split('.').reverse()[0]}
    })
  }])
  return r.id
}


const clientList = async () => {
  const cls: any = await clients()
  let r: any = await inquirer.prompt([{
    name: 'id',
    message: 'Choose a client',
    type: 'list',
    default: null, choices: cls.clients.map((v: {id: string, name: string }) => {
      return {name: v.id + ' ' + v.name}
    })
  }])
  return  r.id.split(' ')[0]
}
export {schemasList, tableList, clientList}
