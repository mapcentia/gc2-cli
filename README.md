gc2-cli
=======

CLI tool for GC2

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gc2-cli.svg)](https://npmjs.org/package/gc2-cli)
[![Downloads/week](https://img.shields.io/npm/dw/gc2-cli.svg)](https://npmjs.org/package/gc2-cli)
[![License](https://img.shields.io/npm/l/gc2-cli.svg)](https://github.com/mapcentia/gc2-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gc2-cli
$ gc2 COMMAND
running command...
$ gc2 (-v|--version|version)
gc2-cli/2020.3.0 darwin-x64 node-v12.15.0
$ gc2 --help [COMMAND]
USAGE
  $ gc2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gc2 build:mapfiles [FILE]`](#gc2-buildmapfiles-file)
* [`gc2 env [OPTIONS]`](#gc2-env-options)
* [`gc2 help [COMMAND]`](#gc2-help-command)
* [`gc2 import [FILE]`](#gc2-import-file)
* [`gc2 login`](#gc2-login)
* [`gc2 seed:start`](#gc2-seedstart)
* [`gc2 update [CHANNEL]`](#gc2-update-channel)

## `gc2 build:mapfiles [FILE]`

describe the command here

```
USAGE
  $ gc2 build:mapfiles [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/build/mapfiles.ts](https://github.com/mapcentia/gc2-cli/blob/v2020.3.0/src/commands/build/mapfiles.ts)_

## `gc2 env [OPTIONS]`

Set user and host

```
USAGE
  $ gc2 env [OPTIONS]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/env.ts](https://github.com/mapcentia/gc2-cli/blob/v2020.3.0/src/commands/env.ts)_

## `gc2 help [COMMAND]`

display help for gc2

```
USAGE
  $ gc2 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `gc2 import [FILE]`

describe the command here

```
USAGE
  $ gc2 import [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/import.ts](https://github.com/mapcentia/gc2-cli/blob/v2020.3.0/src/commands/import.ts)_

## `gc2 login`

Login to GC2

```
USAGE
  $ gc2 login

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v2020.3.0/src/commands/login.ts)_

## `gc2 seed:start`

Starts a seed job

```
USAGE
  $ gc2 seed:start

OPTIONS
  -e, --end=end        (required) End zoom level (the higher number)
  -f, --force          Force seed job - overwrites existing tiles
  -h, --help           show CLI help
  -l, --layer=layer    (required) Layer to seed [schema].[relation]
  -n, --name=name      (required) Name of seed job
  -s, --start=start    (required) Start zoom level (the lower number)
  -x, --extent=extent  (required) Polygon layer which set the extent for the seeding [schema].[relation]
```

_See code: [src/commands/seed/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2020.3.0/src/commands/seed/start.ts)_

## `gc2 update [CHANNEL]`

update the gc2 CLI

```
USAGE
  $ gc2 update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_
<!-- commandsstop -->
