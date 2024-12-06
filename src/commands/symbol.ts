/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs'
import {JSDOM} from 'jsdom'
import * as path from 'path'

export default class Symbol extends Command {
  static description = 'Create a symbol file from a directory for use in Vidi Symbol extension.'
  static flags = {
    help: Flags.help({char: 'h'}),
    file: Flags.string({char: 'f', description: 'Output file name. If omitted the content will be printed.' }),
  }
  static args = {
    path: Args.string(
      {
        required: true,
        description: 'Path to directory with SVG files.',
      }
    )
  }

  async run() {
    const {flags} = await this.parse(Symbol)
    const {args} = await this.parse(Symbol)

    // Get the directory to walk through from the command-line arguments
    const walkDir: string = args.path
    const symbols: { [key: string]: { svg: string } } = {}

    // Get a list of files in the directory, sorted and filtered to include only SVG files
    const onlyFiles: string[] = fs.readdirSync(walkDir)
      .filter(file => fs.statSync(path.join(walkDir, file)).isFile() && path.extname(file).toLowerCase() === '.svg')
      .sort();

    onlyFiles.forEach(file => {
      try {
        const fullPath: string = path.join(walkDir, file)

        // Read and parse the SVG file
        const svgContent: string = fs.readFileSync(fullPath, 'utf8')
        const dom = new JSDOM(svgContent)
        const doc = dom.window.document

        // Remove width and height attributes from the svg element
        const svgElement: Element | null = doc.querySelector('svg')
        if (svgElement) {
          svgElement.removeAttribute('width')
          svgElement.removeAttribute('height')
        }

        // Create a compact string of the XML content
        const outputXML: string = svgElement ? svgElement.outerHTML.replace(/\n|\r/g, '').replace(/\s{2,}/g, ' ').trim() : ''

        // Add the modified SVG content to the symbols dictionary
        symbols[file] = {svg: outputXML}
      } catch (e) {
        this.log(`Error processing file ${file}: ${e}`)
        this.exit(1)
      }
    })

    if (flags.file) {
      // Write the symbols dictionary as a JSON string to the output file
      fs.writeFileSync(flags.file, JSON.stringify(symbols, null, 2), 'utf8');
    } else {
      // Output the symbols dictionary as a JSON string
      this.log(JSON.stringify(symbols))
    }
    this.exit(0)
  }
}
