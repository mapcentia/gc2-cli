/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags, ux} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import args from '../../common/base_args'
import {tables} from '../../util/getters'
import {schemasList, tableList} from '../../util/lists'
import setSchema from '../../util/set-schema'

let base_args = args
let specific_args = {}

export default class Get extends Command {
  static description = 'Get table definition.'
  static flags = {
    help: Flags.help({char: 'h'})
  }
  static args = {...base_args, ...specific_args}

  async run() {
    let {args} = await this.parse(Get)
    const {flags} = await this.parse(Get)

    args = setSchema(args)
    const schema = args?.schema || await schemasList()
    const table = args?.table || await tableList(schema)
    const res = await tables(schema, table)

    type columns = {
      [key: string]: any
    }
    type column = {
      name: string;
      _num: number;
      type: string;
      is_nullable: boolean;
      _character_maximum_length: number;
      _numeric_precision: number;
      _numeric_scale: number;
      _max_bytes: number;
      _reference: string;
      _restriction: any;
      _geom_type?: string;
      _srid?: string;
      _is_primary: boolean;
      _is_unique: boolean;
      default_value: string;
      _index_method?: any;
      _checks?: any;
    }
    const data: object[] = []
    const columns: columns = {column: {}, type: {}, unique: {} , nullable: {}, index_method: {}, foreign_key: {}, checks: {}}
    for (const c in res.columns) {
      const v: column = res.columns[c]
      data.push({
        column: (v._is_primary ? chalk.green(v.name) : v.name) + (v.default_value ? ' = ' + v.default_value : ''),
        type: v.type,
        unique: v._is_unique,
        nullable: v.is_nullable,
        index_method: v._index_method ? v._index_method.join(', ') : '',
        foreign_key: v._reference || '',
        checks: v._checks ? v._checks.join(', ') : '',
      })
    }
    cli.table(data, columns, {
      printLine: this.log.bind(this),
      ...flags
    })
    this.log('Indices:')
    if (res.indices.length === 0) {
      this.log(` none`)
    } else {
      for (const i in res.indices) {
        const v = res.indices[i]
        this.log(`  ${v.method} on: ${v.columns.join(', ')} (${v.name})`)
      }
    }

    this.log('constraints:')
    if (res.constraints.length === 0)  {
      this.log(` none`)
    } else {
      for (const i in res.constraints) {
        const v = res.constraints[i]
        let pre;
        if (v?.columns) {
          pre = `on ${v.columns.join(', ')}`
        }
        if (v?.check) {
          pre = `on ${v.check}`
        }
        this.log(`  ${v.constraint} ${pre} (${v.name})`)
      }
    }
  }
}
