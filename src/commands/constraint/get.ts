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
  run(): Promise<any> {
    return Promise.resolve(undefined)
  }

}
