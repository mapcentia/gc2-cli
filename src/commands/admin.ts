/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import cli from 'cli-ux'
import get from '../util/get-response'
import make from '../util/make-request'

const tasks = ['mapfiles', 'mapcachefile', 'qgisfiles', 'schema', 'migrations', 'diskcleanup', 'cachestats', 'cachecleanup', 'insertmeta']

export default class Admin extends Command {
  static description = 'Run administration task on the GC2 installation.'
  static flags = {
    task: Flags.string({
      char: 't', description: 'The task to run', required: true,
      options: tasks
    }),
  }

  async run() {
    cli.action.start('Running task')
    const {flags} = await this.parse(Admin)
    const response = await make('3', `admin/${flags.task}`, 'GET', null)
    const data = await get(this, response, 200)
    if (!data.success) {
      this.log(data.message)
      this.exit(1)
    }
    cli.action.stop('')
    // report
    switch (flags.task) {
      case tasks[0]:
        data.data.forEach((e: Array<string>) => {
          this.log(chalk.green(e[0]))
          this.log(chalk.green(e[1]))
        })
        this.log(`time ${data._execution_time}`)
        break
      case tasks[1]:
        this.log(chalk.green(data.data))
        break
      case tasks[2]:
        data.data.forEach((e: Array<string>) => {
          this.log(chalk.green(e))
        })
        this.log(`time ${data._execution_time}`)
        break
      case tasks[3]:
        this.log(chalk.green(data.message))
        this.log(`time ${data._execution_time}`)
        break
      case tasks[4]:
        Object.keys(data.data).forEach(key => {
          let value = data.data[key]
          this.log(key + ': ' + chalk.green(value))
        })
        this.log(`time ${data._execution_time}`)
        break
      case tasks[5]:
        data.data.forEach((e: Array<string>) => {
          this.log(chalk.green(e))
        })
        break
      case tasks[7]:
        this.log(`time ${data._execution_time}`)
        break
      case tasks[8]:
        this.log('Inserted ' + chalk.green(data.count))
        this.log(`time ${data._execution_time}`)
        break
      default:
        console.log(data)
    }
  }
}
