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
    help: Flags.help({char: 'h'}),
    ...ux.table.flags()
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
      column: string;
      num: number;
      type: string;
      full_type: string;
      is_nullable: boolean;
      character_maximum_length: number;
      numeric_precision: number;
      numeric_scale: number;
      max_bytes: number;
      reference: string;
      restriction: any;
      geom_type?: string;
      srid?: string;
      is_primary: boolean;
      is_unique: boolean;
      default_value: string;
      index_method?: string;
    }
    const data: object[] = []
    const columns: columns = {column: {}, type: {}, unique: {} , nullable: {}, index_method: {extended: true}, foreign_key: {extended: true}}
    for (const c in res.columns) {
      const v: column = res.columns[c]
      data.push({
        column: (v.is_primary ? chalk.green(v.column) : v.column) + (v.default_value ? ' = ' + v.default_value : ''),
        type: v.full_type,
        unique: v.is_unique,
        nullable: v.is_nullable,
        index_method: v.index_method || '',
        foreign_key: v.reference || '',
      })
    }
    cli.table(data, columns, {
      printLine: this.log.bind(this),
      ...flags
    })
  }
}
