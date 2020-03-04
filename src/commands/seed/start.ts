import {Command, flags} from '@oclif/command';
import fetch from 'node-fetch';
import * as Configstore from 'configstore';
import { User } from './../../interfaces/User';


export default class Start extends Command {
  static description = 'Starts a seed job'
  

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'Name of seed job', required: true}),
    layer: flags.string({char: 'l', description: 'Layer to seed [schema].[relation]', required: true}),
    start: flags.string({char: 's', description: 'Start zoom level (the lower number)', required: true}),
    end: flags.string({char: 'e', description: 'End zoom level (the higher number)', required: true}),
    extent: flags.string({char: 'x', description: 'Polygon layer which set the extent for the seeding [schema].[relation]', required: true}),
    force: flags.boolean({char: 'f', description: 'Force seed job - overwrites existing tiles'}),
  }

  async run() {
    const {args, flags} = this.parse(Start)
    const config: Configstore = new Configstore("gc2-env");
    let user: User = config.all;
    const response = await fetch(user.host + '/api/v3/tileseeder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      body: JSON.stringify(flags)
    });
    const data: Response = await response.json();
    console.log(data);
  }
}
