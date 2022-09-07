gc2-cli
=======

CLI tool for GC2

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gc2.svg)](https://npmjs.org/package/gc2)
[![Downloads/week](https://img.shields.io/npm/dw/gc2.svg)](https://npmjs.org/package/gc2)
[![License](https://img.shields.io/npm/l/gc2.svg)](https://github.com/mapcentia/gc2-cli/blob/master/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gc2
$ gc2 COMMAND
running command...
$ gc2 (-v|--version|version)
gc2/2022.9.2 linux-x64 node-v14.15.5
$ gc2 --help [COMMAND]
USAGE
  $ gc2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gc2 admin`](#gc2-admin)
* [`gc2 connect [OPTIONS]`](#gc2-connect-options)
* [`gc2 grid`](#gc2-grid)
* [`gc2 help [COMMAND]`](#gc2-help-command)
* [`gc2 login [OPTIONS]`](#gc2-login-options)
* [`gc2 scheduler:start [ID]`](#gc2-schedulerstart-id)
* [`gc2 seed:list`](#gc2-seedlist)
* [`gc2 seed:log`](#gc2-seedlog)
* [`gc2 seed:start`](#gc2-seedstart)
* [`gc2 seed:stop`](#gc2-seedstop)
* [`gc2 sql [OPTIONS]`](#gc2-sql-options)
* [`gc2 update [CHANNEL]`](#gc2-update-channel)

## `gc2 admin`

Run administration task on the GC2 installation.

```
USAGE
  $ gc2 admin

OPTIONS
  -t, --task=task  (required) The task to run: mapfiles, mapcachefile, qgisfiles, schema, migrations, diskcleanup,
                   cachestats, cachecleanup
```

_See code: [src/commands/admin.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/admin.ts)_

## `gc2 connect [OPTIONS]`

Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.

```
USAGE
  $ gc2 connect [OPTIONS]

OPTIONS
  -H, --host=host          Host
  -d, --database=database  Database
  -h, --help               show CLI help
  -r, --reset              Reset connection
  -u, --user=user          User
```

_See code: [src/commands/connect.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/connect.ts)_

## `gc2 grid`

Create a fishnet grid from an input polygon.

```
USAGE
  $ gc2 grid

OPTIONS
  -e, --extent=extent  (required) Polygon table which should be used for extent
  -h, --help           show CLI help
  -s, --size=size      (required) Cell size in map units
  -t, --table=table    (required) Name of the new fishnet table
```

_See code: [src/commands/grid.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/grid.ts)_

## `gc2 help [COMMAND]`

Display help for gc2.

```
USAGE
  $ gc2 help [COMMAND]

ARGUMENTS
  COMMAND  Command to show help for.

OPTIONS
  -n, --nested-commands  Include all nested commands in the output.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `gc2 login [OPTIONS]`

Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It's better to be prompt for the password

```
USAGE
  $ gc2 login [OPTIONS]

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  Password
```

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/login.ts)_

## `gc2 scheduler:start [ID]`

Starts a scheduler job

```
USAGE
  $ gc2 scheduler:start [ID]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/scheduler/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/scheduler/start.ts)_

## `gc2 seed:list`

List running seed jobs

```
USAGE
  $ gc2 seed:list

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/seed/list.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/seed/list.ts)_

## `gc2 seed:log`

Logs

```
USAGE
  $ gc2 seed:log

OPTIONS
  -h, --help       show CLI help
  -u, --uuid=uuid  (required) UUID of seed job
```

_See code: [src/commands/seed/log.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/seed/log.ts)_

## `gc2 seed:start`

Starts a seed job

```
USAGE
  $ gc2 seed:start

OPTIONS
  -e, --end=end          (required) End zoom level (the higher number)
  -f, --force            Force seed job - overwrites existing tiles
  -g, --grid=grid        (required) Grid to use
  -h, --help             show CLI help
  -l, --layer=layer      (required) Layer to seed [schema].[relation]
  -n, --name=name        (required) Name of seed job
  -s, --start=start      (required) Start zoom level (the lower number)
  -t, --threads=threads  Number of parallel threads that should be used to request tiles from the WMS source
  -x, --extent=extent    (required) Polygon layer which set the extent for the seeding [schema].[relation]
```

_See code: [src/commands/seed/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/seed/start.ts)_

## `gc2 seed:stop`

Stops a seed job

```
USAGE
  $ gc2 seed:stop

OPTIONS
  -h, --help       show CLI help
  -u, --uuid=uuid  (required) UUID of seed job
```

_See code: [src/commands/seed/stop.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/seed/stop.ts)_

## `gc2 sql [OPTIONS]`

Run SQL statements. If run without --statement inactive mode will be enabled.

```
USAGE
  $ gc2 sql [OPTIONS]

OPTIONS
  -c, --srs=srs              [default: 4326] Output spatial reference system. Use EPSG codes.
  -f, --format=format        [default: ogr/GPKG] Output file format.
  -h, --help                 show CLI help
  -p, --path=path            Output path to file. If omitted file is saved in current folder.
  -s, --statement=statement  SQL statement
```

_See code: [src/commands/sql.ts](https://github.com/mapcentia/gc2-cli/blob/v2022.9.2/src/commands/sql.ts)_

## `gc2 update [CHANNEL]`

update the gc2 CLI

```
USAGE
  $ gc2 update [CHANNEL]

OPTIONS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=version  Install a specific version.
  --force                Force a re-download of the requested version.

EXAMPLES
  [object Object]
  [object Object]
  [object Object]
  [object Object]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_
<!-- commandsstop -->
