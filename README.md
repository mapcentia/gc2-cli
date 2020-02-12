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
gc2-cli/0.0.0 linux-x64 node-v12.4.0
$ gc2 --help [COMMAND]
USAGE
  $ gc2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gc2 build:mapfiles [FILE]`](#gc2-buildmapfiles-file)
* [`gc2 config [FILE]`](#gc2-config-file)
* [`gc2 help [COMMAND]`](#gc2-help-command)
* [`gc2 import [FILE]`](#gc2-import-file)
* [`gc2 login`](#gc2-login)
* [`gc2 seed [FILE]`](#gc2-seed-file)

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

_See code: [src/commands/build/mapfiles.ts](https://github.com/mapcentia/gc2-cli/blob/v0.0.0/src/commands/build/mapfiles.ts)_

## `gc2 config [FILE]`

describe the command here

```
USAGE
  $ gc2 config [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/config.ts](https://github.com/mapcentia/gc2-cli/blob/v0.0.0/src/commands/config.ts)_

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

_See code: [src/commands/import.ts](https://github.com/mapcentia/gc2-cli/blob/v0.0.0/src/commands/import.ts)_

## `gc2 login`

Login to GC2

```
USAGE
  $ gc2 login

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v0.0.0/src/commands/login.ts)_

## `gc2 seed [FILE]`

describe the command here

```
USAGE
  $ gc2 seed [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/seed.ts](https://github.com/mapcentia/gc2-cli/blob/v0.0.0/src/commands/seed.ts)_
<!-- commandsstop -->
