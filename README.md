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
$ gc2 (--version|-v)
gc2/2024.6.0 linux-x64 node-v18.19.1
$ gc2 --help [COMMAND]
USAGE
  $ gc2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gc2 admin`](#gc2-admin)
* [`gc2 autocomplete [SHELL]`](#gc2-autocomplete-shell)
* [`gc2 client add [NAME]`](#gc2-client-add-name)
* [`gc2 client drop [ID]`](#gc2-client-drop-id)
* [`gc2 client get [ID]`](#gc2-client-get-id)
* [`gc2 client update [ID]`](#gc2-client-update-id)
* [`gc2 column add [TABLE] [COLUMN] [TYPE]`](#gc2-column-add-table-column-type)
* [`gc2 column default [TABLE] [COLUMN] [DEFAULT]`](#gc2-column-default-table-column-default)
* [`gc2 column drop [TABLE] [COLUMN]`](#gc2-column-drop-table-column)
* [`gc2 column nullable [TABLE] [COLUMN] [NULLABLE]`](#gc2-column-nullable-table-column-nullable)
* [`gc2 column rename [TABLE] [COLUMN] [NAME]`](#gc2-column-rename-table-column-name)
* [`gc2 column type [TABLE] [COLUMN] [TYPE]`](#gc2-column-type-table-column-type)
* [`gc2 connect`](#gc2-connect)
* [`gc2 constraint add [TABLE] [COLUMNS] [TYPE] [NAME]`](#gc2-constraint-add-table-columns-type-name)
* [`gc2 constraint drop [TABLE] [NAME]`](#gc2-constraint-drop-table-name)
* [`gc2 foreign drop SCHEMAS [INCLUDE]`](#gc2-foreign-drop-schemas-include)
* [`gc2 foreign import SERVER FROM TO [INCLUDE]`](#gc2-foreign-import-server-from-to-include)
* [`gc2 foreign materialize FROM [TO] [INCLUDE]`](#gc2-foreign-materialize-from-to-include)
* [`gc2 grid`](#gc2-grid)
* [`gc2 help [COMMANDS]`](#gc2-help-commands)
* [`gc2 import PATH`](#gc2-import-path)
* [`gc2 index add [TABLE] [COLUMNS] [METHOD] [NAME]`](#gc2-index-add-table-columns-method-name)
* [`gc2 index drop [TABLE] [NAME]`](#gc2-index-drop-table-name)
* [`gc2 login`](#gc2-login)
* [`gc2 privilege get [TABLE]`](#gc2-privilege-get-table)
* [`gc2 privilege set [TABLE] [USER] [PRIVILEGES]`](#gc2-privilege-set-table-user-privileges)
* [`gc2 rule add`](#gc2-rule-add)
* [`gc2 rule drop [ID]`](#gc2-rule-drop-id)
* [`gc2 rule get [ID]`](#gc2-rule-get-id)
* [`gc2 rule update [ID]`](#gc2-rule-update-id)
* [`gc2 scheduler start JOB [INCLUDE]`](#gc2-scheduler-start-job-include)
* [`gc2 scheduler status`](#gc2-scheduler-status)
* [`gc2 schema add [SCHEMA]`](#gc2-schema-add-schema)
* [`gc2 schema drop [SCHEMA]`](#gc2-schema-drop-schema)
* [`gc2 schema get [SCHEMA]`](#gc2-schema-get-schema)
* [`gc2 schema rename [SCHEMA] [NAME]`](#gc2-schema-rename-schema-name)
* [`gc2 seed list`](#gc2-seed-list)
* [`gc2 seed log`](#gc2-seed-log)
* [`gc2 seed start`](#gc2-seed-start)
* [`gc2 seed stop`](#gc2-seed-stop)
* [`gc2 sql`](#gc2-sql)
* [`gc2 stat`](#gc2-stat)
* [`gc2 symbol PATH`](#gc2-symbol-path)
* [`gc2 table add [TABLE]`](#gc2-table-add-table)
* [`gc2 table drop [TABLE]`](#gc2-table-drop-table)
* [`gc2 table get [TABLE]`](#gc2-table-get-table)
* [`gc2 table move [TABLE] [DESTINATION]`](#gc2-table-move-table-destination)
* [`gc2 table rename [TABLE] [NAME]`](#gc2-table-rename-table-name)
* [`gc2 update [CHANNEL]`](#gc2-update-channel)
* [`gc2 user add [NAME]`](#gc2-user-add-name)
* [`gc2 user drop [NAME]`](#gc2-user-drop-name)
* [`gc2 user update`](#gc2-user-update)
* [`gc2 view backup SCHEMAS`](#gc2-view-backup-schemas)
* [`gc2 view get SCHEMA`](#gc2-view-get-schema)
* [`gc2 view refresh SCHEMAS [INCLUDE]`](#gc2-view-refresh-schemas-include)
* [`gc2 view restore FROM [TO] [INCLUDE]`](#gc2-view-restore-from-to-include)

## `gc2 admin`

Run administration task on the GC2 installation.

```
USAGE
  $ gc2 admin -t
    mapfiles|mapcachefile|qgisfiles|schema|migrations|diskcleanup|cachestats|cachecleanup|insertmeta

FLAGS
  -t, --task=<option>  (required) The task to run
                       <options:
                       mapfiles|mapcachefile|qgisfiles|schema|migrations|diskcleanup|cachestats|cachecleanup|insertmeta>

DESCRIPTION
  Run administration task on the GC2 installation.
```

_See code: [src/commands/admin.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/admin.ts)_

## `gc2 autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ gc2 autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ gc2 autocomplete

  $ gc2 autocomplete bash

  $ gc2 autocomplete zsh

  $ gc2 autocomplete powershell

  $ gc2 autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.4/src/commands/autocomplete/index.ts)_

## `gc2 client add [NAME]`

Create new client

```
USAGE
  $ gc2 client add [NAME] [-n <value>] [-d <value>] [-r <value>] [-p <value>] [-h]

ARGUMENTS
  NAME  Name of new client

FLAGS
  -d, --description=<value>   Description
  -h, --help                  Show CLI help.
  -n, --name=<value>          Name
  -p, --homepage=<value>      Homepage
  -r, --redirect_uri=<value>  Redirect uri

DESCRIPTION
  Create new client
```

_See code: [src/commands/client/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/add.ts)_

## `gc2 client drop [ID]`

Drop a client.

```
USAGE
  $ gc2 client drop [ID] [-h]

ARGUMENTS
  ID  Id of client

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a client.
```

_See code: [src/commands/client/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/drop.ts)_

## `gc2 client get [ID]`

Get client(s).

```
USAGE
  $ gc2 client get [ID] [-h]

ARGUMENTS
  ID  Client id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get client(s).
```

_See code: [src/commands/client/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/get.ts)_

## `gc2 client update [ID]`

Update a client.

```
USAGE
  $ gc2 client update [ID] [-d <value>] [-r <value>] [-p <value>] [-h]

ARGUMENTS
  ID  Id of client

FLAGS
  -d, --description=<value>   Description
  -h, --help                  Show CLI help.
  -p, --homepage=<value>      Homepage
  -r, --redirect_uri=<value>  Redirect uri

DESCRIPTION
  Update a client.
```

_See code: [src/commands/client/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/update.ts)_

## `gc2 column add [TABLE] [COLUMN] [TYPE]`

Add a new column

```
USAGE
  $ gc2 column add [TABLE] [COLUMN] [TYPE] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Name of new column
  TYPE    Type of new column

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add a new column
```

_See code: [src/commands/column/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/add.ts)_

## `gc2 column default [TABLE] [COLUMN] [DEFAULT]`

Set default value for column

```
USAGE
  $ gc2 column default [TABLE] [COLUMN] [DEFAULT] [-h]

ARGUMENTS
  TABLE    Name of table
  COLUMN   Name of column
  DEFAULT  Default value. Set to 'null' for removing an already set value

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set default value for column
```

_See code: [src/commands/column/default.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/default.ts)_

## `gc2 column drop [TABLE] [COLUMN]`

Drop a column

```
USAGE
  $ gc2 column drop [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Name of column to drop

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a column
```

_See code: [src/commands/column/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/drop.ts)_

## `gc2 column nullable [TABLE] [COLUMN] [NULLABLE]`

Set column to nullable

```
USAGE
  $ gc2 column nullable [TABLE] [COLUMN] [NULLABLE] [-h]

ARGUMENTS
  TABLE     Name of table
  COLUMN    Name of column
  NULLABLE  (true|false)

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set column to nullable
```

_See code: [src/commands/column/nullable.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/nullable.ts)_

## `gc2 column rename [TABLE] [COLUMN] [NAME]`

Rename column

```
USAGE
  $ gc2 column rename [TABLE] [COLUMN] [NAME] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Existing Name of column
  NAME    New name for column

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename column
```

_See code: [src/commands/column/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/rename.ts)_

## `gc2 column type [TABLE] [COLUMN] [TYPE]`

Rename column

```
USAGE
  $ gc2 column type [TABLE] [COLUMN] [TYPE] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Name of column
  TYPE    New type for column

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename column
```

_See code: [src/commands/column/type.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/type.ts)_

## `gc2 connect`

Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.

```
USAGE
  $ gc2 connect [-h] [-r] [-H <value>]

FLAGS
  -H, --host=<value>  Host
  -h, --help          Show CLI help.
  -r, --reset         Reset connection

DESCRIPTION
  Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be
  prompted instead.
```

_See code: [src/commands/connect.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/connect.ts)_

## `gc2 constraint add [TABLE] [COLUMNS] [TYPE] [NAME]`

Add a constraint

```
USAGE
  $ gc2 constraint add [TABLE] [COLUMNS] [TYPE] [NAME] [-h] [-t <value>] [-e <value>] [-c <value>]

ARGUMENTS
  TABLE    Name of table
  COLUMNS  Columns for use in the constraint (comma separated)
  TYPE     (primary|unique|foreign|check) Type of constraint
  NAME     Name for constraint

FLAGS
  -h, --help  Show CLI help.

CHECK OPTIONS FLAGS
  -c, --check=<value>  Check expression

FOREIGN KEY OPTIONS FLAGS
  -e, --referencedColumns=<value>  Referenced columns
  -t, --referencedTable=<value>    Referenced table

DESCRIPTION
  Add a constraint
```

_See code: [src/commands/constraint/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/constraint/add.ts)_

## `gc2 constraint drop [TABLE] [NAME]`

Drop a constraint

```
USAGE
  $ gc2 constraint drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   Name for constraint

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a constraint
```

_See code: [src/commands/constraint/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/constraint/drop.ts)_

## `gc2 foreign drop SCHEMAS [INCLUDE]`

Drop all foreign tables in schema

```
USAGE
  $ gc2 foreign drop SCHEMAS [INCLUDE] [-h]

ARGUMENTS
  SCHEMAS  schemas for dropping (comma separated)
  INCLUDE  only drop named foreign tables. Comma separated

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop all foreign tables in schema
```

_See code: [src/commands/foreign/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/foreign/drop.ts)_

## `gc2 foreign import SERVER FROM TO [INCLUDE]`

Import schema from foreign server

```
USAGE
  $ gc2 foreign import SERVER FROM TO [INCLUDE] [-h]

ARGUMENTS
  SERVER   name of foreign server
  FROM     comma separated list of foreign schemas
  TO       comma separated list of local schemas
  INCLUDE  only include named relations in import. Comma separated

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Import schema from foreign server
```

_See code: [src/commands/foreign/import.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/foreign/import.ts)_

## `gc2 foreign materialize FROM [TO] [INCLUDE]`

Create mat views from foreign tables

```
USAGE
  $ gc2 foreign materialize FROM [TO] [INCLUDE] [-h] [-p <value>] [-s <value>]

ARGUMENTS
  FROM     comma separated list of source schemas
  TO       comma separated list of target schemas
  INCLUDE  only include named foreign tables. Comma separated

FLAGS
  -h, --help            Show CLI help.
  -p, --prefix=<value>  prefix for created foreign tables
  -s, --suffix=<value>  suffix for created foreign tables

DESCRIPTION
  Create mat views from foreign tables
```

_See code: [src/commands/foreign/materialize.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/foreign/materialize.ts)_

## `gc2 grid`

Add a fishnet grid from an input polygon.

```
USAGE
  $ gc2 grid -t <value> -e <value> -s <value> [-h]

FLAGS
  -e, --extent=<value>  (required) Polygon table which should be used for extent
  -h, --help            Show CLI help.
  -s, --size=<value>    (required) Cell size in map units
  -t, --table=<value>   (required) Name of the new fishnet table

DESCRIPTION
  Add a fishnet grid from an input polygon.
```

_See code: [src/commands/grid.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/grid.ts)_

## `gc2 help [COMMANDS]`

Display help for gc2.

```
USAGE
  $ gc2 help [COMMANDS...] [-n]

ARGUMENTS
  COMMANDS...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for gc2.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.1/src/commands/help.ts)_

## `gc2 import PATH`

Import files to GC2. Set path to a file or folder, which will be compressed, uploaded and imported into GC2

```
USAGE
  $ gc2 import PATH [-s <value>] [-t <value>] [-d] [-h]

ARGUMENTS
  PATH  Input path to file or folder.

FLAGS
  -d, --dry_run        Dry run. Only analyse files with no import.
  -h, --help           Show CLI help.
  -s, --s_srs=<value>  Source spatial reference system. Use EPSG codes.
  -t, --t_srs=<value>  Target spatial reference system. Use EPSG codes.

DESCRIPTION
  Import files to GC2. Set path to a file or folder, which will be compressed, uploaded and imported into GC2
```

_See code: [src/commands/import.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/import.ts)_

## `gc2 index add [TABLE] [COLUMNS] [METHOD] [NAME]`

Add index

```
USAGE
  $ gc2 index add [TABLE] [COLUMNS] [METHOD] [NAME] [-u] [-h]

ARGUMENTS
  TABLE    Name of table
  COLUMNS  Columns to index (comma separated)
  METHOD   (btree|brin|gin|gist|hash) Index method
  NAME     Name of index

FLAGS
  -h, --help    Show CLI help.
  -u, --unique  Causes the system to check for duplicate values in the table when the index is created

DESCRIPTION
  Add index
```

_See code: [src/commands/index/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/index/add.ts)_

## `gc2 index drop [TABLE] [NAME]`

Add column

```
USAGE
  $ gc2 index drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   Name of index

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add column
```

_See code: [src/commands/index/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/index/drop.ts)_

## `gc2 login`

Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It's better to be prompt for the password

```
USAGE
  $ gc2 login [-h] [-p <value>] [-u <value>] [-f password|device|code]

FLAGS
  -f, --flow=<option>     [default: code] Authentication flow
                          <options: password|device|code>
  -h, --help              Show CLI help.
  -p, --password=<value>  Password
  -u, --user=<value>      Username/database

DESCRIPTION
  Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the
  commandline is considered insecure. It's better to be prompt for the password
```

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/login.ts)_

## `gc2 privilege get [TABLE]`

Get privileges on table.

```
USAGE
  $ gc2 privilege get [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get privileges on table.
```

_See code: [src/commands/privilege/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/privilege/get.ts)_

## `gc2 privilege set [TABLE] [USER] [PRIVILEGES]`

Set privileges on table.

```
USAGE
  $ gc2 privilege set [TABLE] [USER] [PRIVILEGES] [-h]

ARGUMENTS
  TABLE       Name of table
  USER        Name of user
  PRIVILEGES  Which privileges

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set privileges on table.
```

_See code: [src/commands/privilege/set.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/privilege/set.ts)_

## `gc2 rule add`

Create new rule

```
USAGE
  $ gc2 rule add [-P <value>] [-u <value>] [-s <value>] [-p <value>] [-c <value>] [-t <value>] [-i <value>]
    [-a <value>] [-f <value>] [-h]

FLAGS
  -P, --priority=<value>  Priority
  -a, --access=<value>    Access
  -c, --schema=<value>    schema
  -f, --filter=<value>    Filter
  -h, --help              Show CLI help.
  -i, --iprange=<value>   Ip range
  -p, --request=<value>   Request
  -s, --service=<value>   Service
  -t, --table=<value>     Table
  -u, --username=<value>  Username

DESCRIPTION
  Create new rule
```

_See code: [src/commands/rule/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/add.ts)_

## `gc2 rule drop [ID]`

Drop a rule.

```
USAGE
  $ gc2 rule drop [ID] [-h]

ARGUMENTS
  ID  Id of rule

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a rule.
```

_See code: [src/commands/rule/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/drop.ts)_

## `gc2 rule get [ID]`

Get rule(s).

```
USAGE
  $ gc2 rule get [ID] [-h]

ARGUMENTS
  ID  Rule id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get rule(s).
```

_See code: [src/commands/rule/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/get.ts)_

## `gc2 rule update [ID]`

Update rule rule

```
USAGE
  $ gc2 rule update [ID] [-p <value>] [-u <value>] [-s <value>] [-r <value>] [-c <value>] [-t <value>] [-i
    <value>] [-a <value>] [-f <value>] [-h]

ARGUMENTS
  ID  Rule id

FLAGS
  -a, --access=<value>    Access
  -c, --schema=<value>    schema
  -f, --filter=<value>    Filter
  -h, --help              Show CLI help.
  -i, --iprange=<value>   Ip range
  -p, --priority=<value>  Priority
  -r, --request=<value>   Request
  -s, --service=<value>   Service
  -t, --table=<value>     Table
  -u, --username=<value>  Username

DESCRIPTION
  Update rule rule
```

_See code: [src/commands/rule/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/update.ts)_

## `gc2 scheduler start JOB [INCLUDE]`

Starts a scheduler job

```
USAGE
  $ gc2 scheduler start JOB [INCLUDE] [-h] [-n <value>] [-f]

ARGUMENTS
  JOB      job id to start. Can also be a schema name and all jobs for that schema will be started
  INCLUDE  only include jobs for named tables. Comma separated. Will only have effect id schema is used in "job" option

FLAGS
  -f, --force         force table to be recreated
  -h, --help          Show CLI help.
  -n, --name=<value>  Name the started job(s). The name will be listed in the progress status

DESCRIPTION
  Starts a scheduler job
```

_See code: [src/commands/scheduler/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/scheduler/start.ts)_

## `gc2 scheduler status`

Get jobs in progress

```
USAGE
  $ gc2 scheduler status [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get jobs in progress
```

_See code: [src/commands/scheduler/status.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/scheduler/status.ts)_

## `gc2 schema add [SCHEMA]`

Create a new schema

```
USAGE
  $ gc2 schema add [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of new schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new schema
```

_See code: [src/commands/schema/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/add.ts)_

## `gc2 schema drop [SCHEMA]`

Drop schema.

```
USAGE
  $ gc2 schema drop [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop schema.
```

_See code: [src/commands/schema/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/drop.ts)_

## `gc2 schema get [SCHEMA]`

Get list of tables in schema.

```
USAGE
  $ gc2 schema get [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get list of tables in schema.
```

_See code: [src/commands/schema/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/get.ts)_

## `gc2 schema rename [SCHEMA] [NAME]`

Rename schema

```
USAGE
  $ gc2 schema rename [SCHEMA] [NAME] [-h]

ARGUMENTS
  SCHEMA  Name of schema
  NAME    New name for schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename schema
```

_See code: [src/commands/schema/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/rename.ts)_

## `gc2 seed list`

List running seed jobs

```
USAGE
  $ gc2 seed list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List running seed jobs
```

_See code: [src/commands/seed/list.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/list.ts)_

## `gc2 seed log`

Logs

```
USAGE
  $ gc2 seed log -u <value> [-h]

FLAGS
  -h, --help          Show CLI help.
  -u, --uuid=<value>  (required) UUID of seed job

DESCRIPTION
  Logs
```

_See code: [src/commands/seed/log.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/log.ts)_

## `gc2 seed start`

Starts a seed job

```
USAGE
  $ gc2 seed start -n <value> -l <value> -g <value> -s <value> -e <value> -x <value> [-h] [-t <value>] [-f]

FLAGS
  -e, --end=<value>      (required) End zoom level (the higher number)
  -f, --force            Force seed job - overwrites existing tiles
  -g, --grid=<value>     (required) Grid to use
  -h, --help             Show CLI help.
  -l, --layer=<value>    (required) Layer to seed [schema].[relation]
  -n, --name=<value>     (required) Name of seed job
  -s, --start=<value>    (required) Start zoom level (the lower number)
  -t, --threads=<value>  Number of parallel threads that should be used to request tiles from the WMS source
  -x, --extent=<value>   (required) Polygon layer which set the extent for the seeding [schema].[relation]

DESCRIPTION
  Starts a seed job
```

_See code: [src/commands/seed/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/start.ts)_

## `gc2 seed stop`

Stops a seed job

```
USAGE
  $ gc2 seed stop -u <value> [-h]

FLAGS
  -h, --help          Show CLI help.
  -u, --uuid=<value>  (required) UUID of seed job

DESCRIPTION
  Stops a seed job
```

_See code: [src/commands/seed/stop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/stop.ts)_

## `gc2 sql`

Run SQL statements. If run without --statement inactive mode will be enabled.

```
USAGE
  $ gc2 sql [-s <value>] [-c <value>] [-f <value>] [-p <value>] [-h]

FLAGS
  -c, --srs=<value>        [default: 4326] Output spatial reference system. Use EPSG codes.
  -f, --format=<value>     [default: csv] Output file format.
  -h, --help               Show CLI help.
  -p, --path=<value>       [default: .] Output path to file. If omitted file is saved in current folder.
  -s, --statement=<value>  SQL statement

DESCRIPTION
  Run SQL statements. If run without --statement inactive mode will be enabled.
```

_See code: [src/commands/sql.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/sql.ts)_

## `gc2 stat`

Get usage statistics.

```
USAGE
  $ gc2 stat [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get usage statistics.
```

_See code: [src/commands/stat.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/stat.ts)_

## `gc2 symbol PATH`

Create a symbol file from a directory for use in Vidi Symbol extension

```
USAGE
  $ gc2 symbol PATH [-h] [-f <value>]

ARGUMENTS
  PATH  Path to directory with SVG files

FLAGS
  -f, --file=<value>  Output file name. If omitted the content will be printed
  -h, --help          Show CLI help.

DESCRIPTION
  Create a symbol file from a directory for use in Vidi Symbol extension
```

_See code: [src/commands/symbol.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/symbol.ts)_

## `gc2 table add [TABLE]`

Create a new table.

```
USAGE
  $ gc2 table add [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new table.
```

_See code: [src/commands/table/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/add.ts)_

## `gc2 table drop [TABLE]`

Drop table

```
USAGE
  $ gc2 table drop [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop table
```

_See code: [src/commands/table/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/drop.ts)_

## `gc2 table get [TABLE]`

Get table definition.

```
USAGE
  $ gc2 table get [TABLE] [-h] [--columns <value> | -x] [--filter <value>] [--no-header | [--csv |
    --no-truncate]] [--output csv|json|yaml |  | ] [--sort <value>]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
      --columns=<value>  only show provided columns (comma-separated)
      --csv              output is csv format [alias: --output=csv]
      --filter=<value>   filter property by partial string matching, ex: name=foo
      --no-header        hide table header from output
      --no-truncate      do not truncate output to fit screen
      --output=<option>  output in a more machine friendly format
                         <options: csv|json|yaml>
      --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Get table definition.
```

_See code: [src/commands/table/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/get.ts)_

## `gc2 table move [TABLE] [DESTINATION]`

Move table to another schema.

```
USAGE
  $ gc2 table move [TABLE] [DESTINATION] [-h]

ARGUMENTS
  TABLE        Name of table
  DESTINATION  Destination schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Move table to another schema.
```

_See code: [src/commands/table/move.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/move.ts)_

## `gc2 table rename [TABLE] [NAME]`

Rename table.

```
USAGE
  $ gc2 table rename [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   New name for table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename table.
```

_See code: [src/commands/table/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/rename.ts)_

## `gc2 update [CHANNEL]`

update the gc2 CLI

```
USAGE
  $ gc2 update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the gc2 CLI

EXAMPLES
  Update to the stable channel:

    $ gc2 update stable

  Update to a specific version:

    $ gc2 update --version 1.0.0

  Interactively select version:

    $ gc2 update --interactive

  See available versions:

    $ gc2 update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_

## `gc2 user add [NAME]`

Create new user.

```
USAGE
  $ gc2 user add [NAME] [-h] [-p <value>] [-e <value>] [-e <value>]

ARGUMENTS
  NAME  Name of new user

FLAGS
  -e, --email=<value>       email of new user
  -e, --properties=<value>  properties of new user
  -h, --help                Show CLI help.
  -p, --password=<value>    password of new user

DESCRIPTION
  Create new user.
```

_See code: [src/commands/user/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/add.ts)_

## `gc2 user drop [NAME]`

Drop existing user.

```
USAGE
  $ gc2 user drop [NAME] [-h]

ARGUMENTS
  NAME  Name of user to drop

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop existing user.
```

_See code: [src/commands/user/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/drop.ts)_

## `gc2 user update`

Update user

```
USAGE
  $ gc2 user update [-h] [-p <value>]

FLAGS
  -h, --help              Show CLI help.
  -p, --password=<value>  New password

DESCRIPTION
  Update user
```

_See code: [src/commands/user/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/update.ts)_

## `gc2 view backup SCHEMAS`

Backup all (mat)views definitions in schema

```
USAGE
  $ gc2 view backup SCHEMAS [-h]

ARGUMENTS
  SCHEMAS  schemas for backup (comma separated)

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Backup all (mat)views definitions in schema
```

_See code: [src/commands/view/backup.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/backup.ts)_

## `gc2 view get SCHEMA`

Get "*" definitions from backup for schema

```
USAGE
  $ gc2 view get SCHEMA [-h]

ARGUMENTS
  SCHEMA  get star views for schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get "*" definitions from backup for schema
```

_See code: [src/commands/view/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/get.ts)_

## `gc2 view refresh SCHEMAS [INCLUDE]`

Refresh all materialized views in schema

```
USAGE
  $ gc2 view refresh SCHEMAS [INCLUDE] [-h]

ARGUMENTS
  SCHEMAS  comma separated list of schemas
  INCLUDE  only include named views in restore. Comma separated

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Refresh all materialized views in schema
```

_See code: [src/commands/view/refresh.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/refresh.ts)_

## `gc2 view restore FROM [TO] [INCLUDE]`

Restore all (mat)views definitions from schema

```
USAGE
  $ gc2 view restore FROM [TO] [INCLUDE] [-h]

ARGUMENTS
  FROM     comma separated list of source schemas
  TO       comma separated list of target schemas
  INCLUDE  only include named views in restore. Comma separated

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Restore all (mat)views definitions from schema
```

_See code: [src/commands/view/restore.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/restore.ts)_
<!-- commandsstop -->
