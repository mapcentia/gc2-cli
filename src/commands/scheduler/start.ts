import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import * as Configstore from 'configstore';
import { User } from './../../interfaces/User';
import cli from 'cli-ux';
import * as http from 'http';
import * as https from 'https';
import * as parse from 'url-parse';

export default class Start extends Command {
    static description = 'Starts a seed job'
    static args = [
        { name: 'id' }
    ]
    static flags = {
        help: flags.help({ char: 'h' }),
    }

    async run() {
        const { args, flags } = this.parse(Start)
        const config: Configstore = new Configstore("gc2-env");
        let user: User = config.all;
        cli.action.start("Running job " + args.id);

        let adapters: any = {
            'http:': http,
            'https:': https,
        };
        let url: string = user.host + '/api/v3/scheduler/' + args.id

        adapters[parse(url).protocol].get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            },
            (res: any) => {
                res.setEncoding("utf8");
                res.on("data", (data: string) => {
                    // We trim the strings because the server pads them to get them flushed
                    let str: string = data.replace(/[\w\s]$/gi, '').trim();
                    if (str !== '') {
                        if (str.startsWith('Info') || str.startsWith('Notice')){
                            this.log(chalk.green(str));
                        }
                        else if (str.startsWith('Warning')){
                            this.log(chalk.yellow(str));
                        }
                        else if (str.startsWith('Error')){
                            this.log(chalk.yellow(str));
                        }
                        else if (str.startsWith('Processing')){
                            this.log(chalk.gray(str));
                        }
                        else {
                            this.log(str);
                        }
                    }
                });
                res.on("end", () => {
                    //
                });
            });
    }
}
