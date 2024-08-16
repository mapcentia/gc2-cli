/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {clients, schemas, tables, users} from './getters'
import {ux} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import {checkbox, select} from '@inquirer/prompts'

const schemasList = async () => {
  const s: any = await schemas()
  let r: any = await select({
    message: 'Choose a schema',
    default: null,
    choices: s.schemas.map((v: { schema: string }) => {
      return {value: v.schema}
    })
  })
  return r
}

const tableList = async (schema: string) => {
  const s: any = await tables(schema)
  if (s.tables.length < 1) {
    ux.log(`⚠️ No tables found for schema ${schema}`)
    exit(0)
  }
  let r: any = await select({
    message: 'Choose a table',
    default: null,
    choices: s.tables.map((v: { table: string }) => {
      return {value: v.table.split('.').reverse()[0]}
    })
  })
  return r
}

const columnList = async (schema: string, table: string) => {
  const s: any = await tables(schema, table)
  if (s.columns.length < 1) {
    ux.log(`⚠️ No columns found for table ${table}`)
    exit(0)
  }
  let r: any = await select({
    message: 'Choose a column',
    default: null,
    choices: s.columns.map((v: { column: string, type: string }) => {
      const c = v.column.split('.').reverse()[0]
      return {value: c, name: c + ` (${v.type})`}
    })
  })
  return r
}

const columnCheck = async (schema: string, table: string) => {
  const s: any = await tables(schema, table)
  if (s.columns.length < 1) {
    ux.log(`⚠️ No columns found for table ${table}`)
    exit(0)
  }
  const r: any = await checkbox({
    message: 'Choose one or more columns',
    required: true,
    choices: s.columns.map((v: { column: string, type: string }) => {
      const c = v.column.split('.').reverse()[0]
      return {value: c, name: c + ` (${v.type})`}
    })
  })
  return r
}

const indexList = async (schema: string, table: string) => {
  const s: any = await tables(schema, table)
  if (s.columns.length < 1) {
    ux.log(`⚠️ No indices found for table ${table}`)
    exit(0)
  }
  let r: any = await select({
    message: 'Choose an index',
    default: null,
    choices: s.indices.map((v: { name: string, method: string, columns: any }) => {
      return {value: v.name, name: v.name + ` (${v.method} on ${v.columns.join(', ')})`}
    })
  })
  return r
}

const constraintList = async (schema: string, table: string) => {
  const s: any = await tables(schema, table)
  if (s.columns.length < 1) {
    ux.log(`⚠️ No constraints found for table ${table}`)
    exit(0)
  }
  let r: any = await select({
    message: 'Choose an constraint',
    default: null,
    choices: s.constraints.map((v: { name: string, constraint: string, columns?: any }) => {
      const name = v.name + ` (${v.constraint}` + (v?.columns ? ` on ${v.columns.join(', ')})` : ')')
      return {value: v.name, name}
    })
  })
  return r
}

const clientList = async () => {
  const s: any = await clients()
  if (s.clients.length < 1) {
    ux.log(`⚠️ No clients yet`)
    exit(0)
  }
  let r: any = await select({
    message: 'Choose a client',
    default: null,
    choices: s.clients.map((v: { id: string, name: string }) => {
      return {value: v.id + ' ' + v.name}
    })
  })
  return r.split(' ')[0]
}

const typeList = async () => {
  let r: any = await select({
    message: 'Choose a type',
    default: null,
    choices: [
      {value: 'String'}, {value: 'Integer'}, {value: 'Decimal'}, {value: 'Double'},
      {value: 'Text'}, {value: 'Date'}, {value: 'Timestamp'}, {value: 'Time'}, {value: 'Timestamptz'}, {value: 'Timetz'},
      {value: 'Boolean'}, {value: 'Bytea'}, {value: 'Json'}, {value: 'Geometry'}]
  })
  return r
}

const constraintTypeList = async () => {
  let r: any = await select({
    message: 'Choose a constraint type',
    default: null,
    choices: [
      {value: 'primary', name: 'Primary'},
      {value: 'unique', name: 'Unique'},
      {value: 'foreign', name: 'Foreign'},
      {value: 'check', name: 'Check'},
    ]
  })
  return r
}

const privilegeList = async (defaultValue?: string) => {
  let r: any = await select({
    message: 'Choose privileges',
    default: defaultValue,
    choices: [
      {value: 'none', name: 'No privileges'},
      {value: 'read', name:  'Read privileges'},
      {value: 'read/write', name: 'Read and write privileges'},
    ]
  })
  return r
}

const authLevelList = async () => {
  let r: any = await select({
    message: 'Choose a auth level',
    default: null,
    choices: [
      {value: 'None', name: 'No restrictions for any users (not recommend)'},
      {value: 'Write', name: 'Users must be signed in to write but not read'},
      {value: 'Read/write', name: 'Users must be signed in to both read and write'},
    ]
  })
  return r
}

const userList = async (defaultValue?: string) => {
  const s: any = await users()
  let r: any = await select({
    message: 'Choose a user',
    default: defaultValue,
    choices: s.users.map((v: { name: string }) => {
      return {value: v.name}
    })
  })
  return r
}

export {
  schemasList,
  tableList,
  columnList,
  columnCheck,
  clientList,
  indexList,
  typeList,
  constraintList,
  constraintTypeList,
  privilegeList,
  userList,
}
