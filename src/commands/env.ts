import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import fetch from 'node-fetch';
import * as Configstore from 'configstore';
import * as inquirer from 'inquirer'


export default class Env extends Command {

  static description = 'Set user and host'

  static flags = {
    help: flags.help({ char: 'h' })
  }

  static args = [{ name: 'options' }]

  async run() {

    interface Database {
      screenname: string,
      email: string,
      parentdb: string
    }

    interface Databases {
      databases: Database[]
      success?: string
    }

    const config: Configstore = new Configstore("gc2-env");
    let database: string = '';

    console.log(config.all);

    const host = await cli.prompt('Which host?', { 'required': false });
    const user = await cli.prompt('Which user?', { 'required': false });

    if (user && host) {
      cli.action.start("Getting databases");
      const response = await fetch(host + '/api/v2/database/search?userIdentifier=' + user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res: Databases = await response.json();
      if (res.databases.length > 0) {
        cli.action.stop('success!');
      } else {
        cli.action.stop('fail');
        return;
      }
      if (res.databases.length > 1) {
        let response: any = await inquirer.prompt([{
          name: 'db',
          message: 'select a database',
          type: 'list',
          choices: res.databases.map((v) => { return { 'name': v.parentdb } })
        }])
        database = response.db;
      } else {
        database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname;
      }
    }
    config.set({ 'database': database });
    config.set({ 'user': user });
    config.set({ 'host': host });
    console.log(config.all);
  }
}

