/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {clients, rules, schemas, tables, users} from './getters'
import {ux} from '@oclif/core'
import {exit} from '@oclif/core/lib/errors'
import {checkbox, select} from '@inquirer/prompts'

const schemasList = async (message: string = 'Choose a schema') => {
  const s: any = await schemas()
  let r: any = await select({
    message,
    default: null,
    choices: s.schemas.map((v: { name: string }) => {
      return {value: v.name}
    })
  })
  return r
}

const tableList = async (schema: string) => {
  const s: any = await tables(schema)
  let r: any = await select({
    message: 'Choose a table',
    default: null,
    choices: s.tables.map((v: { name: string }) => {
      return {value: v.name.split('.').reverse()[0]}
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
    choices: s.columns.map((v: { name: string, type: string }) => {
      const c = v.name.split('.').reverse()[0]
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
    choices: s.columns.map((v: { name: string, type: string }) => {
      const c = v.name.split('.').reverse()[0]
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

const ruleList = async () => {
  const s: any = await rules()
  if (s.rules.length < 1) {
    ux.log(`⚠️ No rules yet`)
    exit(0)
  }
  let r: any = await select({
    message: 'Choose a rule',
    default: null,
    choices: s.rules.map((v: { id: string }) => {
      return {value: v.id}
    })
  })
  return r
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

const privilegeList = async (defaultValue: string = 'none') => {
  let r: any = await select({
    message: 'Choose privileges',
    default: defaultValue,
    choices: [
      {value: 'none', name: 'No privileges'},
      {value: 'read', name: 'Read privileges'},
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

const groupList = async (exclude: string, defaultValue?: string) => {
  const s: any = await users()
  let r: any = await select({
    message: 'Choose a group',
    default: defaultValue || '',
    choices: [{value: '', name: 'None'}, ...s.users.filter((e: { name: string }) => e.name !== exclude).map((v: {
      name: string
    }) => {
      return {value: v.name}
    })]
  })
  return r
}

const serviceList = async (defaultValue: string = '*') => {
  let r: any = await select({
    message: 'Service',
    default: defaultValue,
    choices: [
      {value: '', name: '*'},
      {value: 'sql', name: 'Sql'},
      {value: 'ows', name: 'Ows'},
      {value: 'Wfs-t', name: 'wfst'},
    ]
  })
  return r
}

const requestList = async (defaultValue: string = '*') => {
  let r: any = select({
    message: 'Request',
    default: defaultValue,
    choices: [
      {value: '', name: '*'},
      {value: 'select', name: 'Select'},
      {value: 'insert', name: 'Insert'},
      {value: 'update', name: 'Update'},
      {value: 'delete', name: 'Delete'},
    ]
  })
  return r
}

const accessList = async (defaultValue: string = 'deny') => {
  let r: any =select({
    message: 'Access',
    default: defaultValue,
    choices: [
      {value: 'deny', name: 'Deny'},
      {value: 'allow', name: 'Allow'},
      {value: 'limit', name: 'Limit'},
    ]
  })
  return r
}

export {
  schemasList,
  tableList,
  columnList,
  columnCheck,
  clientList,
  ruleList,
  indexList,
  typeList,
  constraintList,
  constraintTypeList,
  privilegeList,
  userList,
  groupList,
  serviceList,
  requestList,
  accessList,
}
