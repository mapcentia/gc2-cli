/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import AdmZip from 'adm-zip'
import Configstore from 'configstore'
import * as os from 'os'
import {v4 as uuidv4} from 'uuid'
import FormData from 'form-data'
import * as fs from 'fs'
import * as path from 'path'
import User from '../common/user'
import get from '../util/get-response'
import make from '../util/make-request'
import {schemasList} from "../util/lists"
import setSchema from "../util/set-schema"

const config: Configstore = new Configstore('gc2-env')
const userConfig: User = config.all

let args: any = {}

args.path = Args.string(
  {
    required: false,
    description: 'Input path to file or folder.',
    default: '.',
  },
)

if (userConfig.superUser) {
  args.schema = Args.string(
    {
      required: false,
      description: 'Destination schema.',
    }
  )
}

export default class Import extends Command {
  static description = 'Import files. Set path to a file or folder, which will be compressed, uploaded and imported into GC2.'
  static flags = {
    s_srs: Flags.string({
      char: 's',
      description: 'Fallback source SRS. Will be used if file doesn\'t contain projection information'
    }),
    t_srs: Flags.string({
      char: 't',
      description: 'Fallback target SRS. Will be used if no authority name/code is available. Defaults to EPSG:4326.'
    }),
    timestamp: Flags.string({
      char: 'T',
      description: 'Name of timestamp field. Create a timestamp field in the import table. Omit argument for no timestamp field.'
    }),
    x_possible_names: Flags.string({
      char: 'x',
      description: 'Specify the potential names of the columns that can contain X/longitude. Only effects CSV. Defaults to "lon*,Lon*,x,X"]'
    }),
    y_possible_names: Flags.string({
      char: 'y',
      description: 'Specify the potential names of the columns that can contain Y/latitude. Only effects CSV. Defaults to "lat*,Lat*,y,Y"]'
    }),
    dry_run: Flags.boolean({char: 'd', description: 'Dry run. Only analyse files with no import.'}),
    append: Flags.boolean({char: 'a', description: 'Append to existing table instead of creating new.'}),
    truncate: Flags.boolean({char: 'r', description: 'Truncate table before appending. Only have effect if --append is set.'}),

    help: Flags.help({char: 'h'}),
  }
  static args = args

  async run() {
    let {flags, args} = await this.parse(Import)
    args = setSchema(args)

    let tmpDir
    let tmpFile
    let tmpPath
    const appPrefix = 'gc2-cli-'
    const chunkSize = 1000000
    const inputPath = args.path

    // Interactive
    const schema = args?.schema || await schemasList()

    try {

      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix))
      tmpFile = uuidv4() + '.zip'
      tmpPath = tmpDir + '/' + tmpFile

      if (inputPath.split('.').reverse()[0].toLowerCase() === 'zip') {
        fs.renameSync( inputPath, tmpPath)
      } else {
        cli.action.start('Compressing files')
        await this.createZipArchive(inputPath, tmpPath)
        cli.action.stop()
      }

      cli.action.start('Uploading')
      const file = fs.readFileSync(tmpPath)
      const stats = fs.statSync(tmpPath)
      const fileSizeInBytes: number = stats.size

      const chunks = Math.ceil(fileSizeInBytes / chunkSize)
      let chunkCount = 0
      for (let start = 0; start < fileSizeInBytes; start += chunkSize) {
        const form = new FormData()
        const chunk = file.slice(start, start + chunkSize)
        form.append('chunk', chunkCount)
        form.append('chunks', chunks)
        form.append('filename', chunk, {
          filename: tmpFile
        })
        const res = await make('4', `import/${schema}`, 'POST', form, true, null)
        await get(res, 201)
        chunkCount++
      }
      cli.action.stop()

      let body: any = flags
      if (!flags.dry_run) {
        body.import = true
      }
      delete body.dry_run

      const res = await make('4', `import/${schema}/${tmpFile}`, 'PATCH', body)
      const data = await get(res, 201)
      type tables = {
        [key: string]: any
      }
      type table = {
        driver: string;
        featureCount: number;
        type: string;
        layerIndex: number;
        layerName: string;
        hasWkt: boolean;
        authStr: string;
        error: string;
      }
      const rows: object[] = []
      const tables: tables = {driver: {}, count: {}, type: {}, index: {}, name: {}, hasWkt: {}, authStr: {}, error: {},}
      for (const c in data.data) {
        const v: table = data.data[c]
        rows.push({
          driver: v.driver,
          count: v.featureCount,
          type: v.type,
          index: v.layerIndex,
          name: v.layerName,
          hasWkt: v.hasWkt,
          authStr: v.authStr,
          error: v.error,

        })
      }
      //  cli.action.stop()
      this.log('')
      cli.table(rows, tables, {
        printLine: this.log.bind(this)
      })
    } catch (e) {
      console.log(e)
      this.exit(1)
    } finally {
      try {
        if (tmpDir) {
          // @ts-ignore
          fs.rmSync(tmpDir, {recursive: true, force: true})
        }
      } catch (e) {
        console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`)
      }
    }
    this.exit(0)
  }

  async createZipArchive(path: string, outputFile: string) {
    const zip = new AdmZip()
    if (fs.statSync(path).isDirectory()) {
      zip.addLocalFolder(path)
    } else {
      zip.addLocalFile(path)
    }
    zip.writeZip(outputFile)
  }
}
