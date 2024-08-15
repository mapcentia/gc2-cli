/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags, ux} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import get from '../../util/get-response'
import make from '../../util/make-request'

export default class Get extends Command {
  static description = 'Get table definition.'
  static flags = {
    help: Flags.help({char: 'h'}),
    ...ux.table.flags()
  }
  static args = {
    schema: Args.string(
      {
        required: true,
        description: 'Name of schema',
      }
    ),
    table: Args.string(
      {
        required: true,
        description: 'Name of table',
      }
    ),
  }
  async run() {
    const {args} = await this.parse(Get)
    const {flags} = await this.parse(Get)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}`, 'GET', null)
    const res = await get(response, 200)
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
