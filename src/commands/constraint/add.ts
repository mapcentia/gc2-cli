import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import args from '../../common/base_args'
import get from '../../util/get-response'
import make from '../../util/make-request'

let base_args = args
let specific_args = {
  columns: Args.string(
    {
      required: true,
      description: 'Columns for use in the constraint (comma separated)',
    },
  ),
  type: Args.string(
    {
      required: true,
      description: 'Type of constraint',
      default: 'primary',
      options: ['primary', 'unique', 'foreign', 'check'],
    },
  ),
  name: Args.string(
    {
      required: false,
      description: 'Name for constraint',
    },
  ),
}

export default class Add extends Command {
  static description = 'Add a constraint'
  static flags = {
    help: Flags.help({char: 'h'}),
    referencedTable: Flags.string({
      helpGroup: 'Foreign key options',
      char: 't',
      description: 'Referenced table',
    }),
    referencedColumns: Flags.string({
      helpGroup: 'Foreign key options',
      char: 'e',
      description: 'Referenced column',
    }),
  }
  static args = {...base_args, ...specific_args}

  async run() {
    const {args} = await this.parse(Add)
    const {flags} = await this.parse(Add)
    let body = {
      name: args.name,
      columns: args.columns.split(',').map(e => e.trim()),
      constraint: args.type,
    }

    if (args.type === 'foreign') {
      if (!flags.referencedTable) {
        this.log(chalk.red(`A referenced table must be set`))
        this.exit(1)
      }
      body = {
        ...body, ...{
          referenced_table: flags.referencedTable,
        }
      }
      if (flags.referencedColumns) {
        body = {
          ...body, ...{
            referenced_columns: flags.referencedColumns.split(',').map(e => e.trim()),
          }
        }
      }
    }
    console.log(body)
    const response = await make('4', `schemas/${args.schema}/tables/${args.table}/constraints`, 'POST', body)
    await get(this, response, 201)
    this.log(`Constraint created here ${chalk.green(response.headers.get('Location'))}`)
  }
}
