"use strict"

import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import fetch from 'node-fetch';
import * as Configstore from 'configstore';
import { User } from './../interfaces/User';

export default class Login extends Command {
  static description = 'Login to GC2'
  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    interface Response {
      success: string,
      data: {
        screen_name: string
      }
    }

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
    let obj: User = config.all; // User object or empty object
    const { args, flags } = this.parse(Login)

    function instanceOfResponse(object: any, name: string): object is User {
      return name in object;
    }

    if (!instanceOfResponse(obj, 'user')) {
      obj = { database: '', user: '', host: '' };
    }

    if (obj.host === '') {
      obj.host = await cli.prompt('Host?');
    }

    if (obj.user === '') {
      obj.user = await cli.prompt('User?');
    }

    if (obj.database === '') {
      cli.action.start("Getting databases");
      const response = await fetch(obj.host + '/api/v2/database/search?userIdentifier=' + obj.user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res: Databases = await response.json();
      if (res.success) {
        cli.action.stop('success!');
      } else {
        cli.action.stop('fail');
        return;
      }
      if (res.databases.length > 1) {
        cli.table(res.databases, { parentdb: {} })
        obj.database = await cli.prompt('Which database?');
      } else {
        obj.database = res.databases[0].parentdb ? res.databases[0].parentdb : res.databases[0].screenname;
      }
    }
    
    const password: string = await cli.prompt('Your password?', { type: 'hide' });

    cli.action.start('Loggin in');

    const response = await fetch(obj.host + '/api/v2/session/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: obj.user, password: password, schema: "public", database: obj.database })
    });
    const data: Response = await response.json();

    console.log(data);

    if (data.success) {
      cli.action.stop('success!')
    } else {
      cli.action.stop('failed. Check your user name and password')
    }
  }
}
