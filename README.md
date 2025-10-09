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
$ npm install -g @mapcentia/gc2-cli
$ gc2 COMMAND
running command...
$ gc2 (--version|-v)
@mapcentia/gc2-cli/2025.8.0 linux-x64 node-v22.19.0
$ gc2 --help [COMMAND]
USAGE
  $ gc2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gc2 admin`](#gc2-admin)
* [`gc2 client add [NAME]`](#gc2-client-add-name)
* [`gc2 client drop [ID]`](#gc2-client-drop-id)
* [`gc2 client get [ID]`](#gc2-client-get-id)
* [`gc2 client update [ID]`](#gc2-client-update-id)
* [`gc2 column add [TABLE] [COLUMN] [TYPE]`](#gc2-column-add-table-column-type)
* [`gc2 column default [TABLE] [COLUMN] [DEFAULT]`](#gc2-column-default-table-column-default)
* [`gc2 column drop [TABLE] [COLUMN]`](#gc2-column-drop-table-column)
* [`gc2 column get [TABLE] [COLUMN]`](#gc2-column-get-table-column)
* [`gc2 column nullable [TABLE] [COLUMN] [NULLABLE]`](#gc2-column-nullable-table-column-nullable)
* [`gc2 column rename [TABLE] [COLUMN] [NAME]`](#gc2-column-rename-table-column-name)
* [`gc2 column type [TABLE] [COLUMN] [TYPE]`](#gc2-column-type-table-column-type)
* [`gc2 connect [HOST]`](#gc2-connect-host)
* [`gc2 constraint add [TABLE] [COLUMNS] [TYPE] [NAME]`](#gc2-constraint-add-table-columns-type-name)
* [`gc2 constraint drop [TABLE] [NAME]`](#gc2-constraint-drop-table-name)
* [`gc2 constraint get [TABLE] [NAME]`](#gc2-constraint-get-table-name)
* [`gc2 foreign drop SCHEMAS [INCLUDE]`](#gc2-foreign-drop-schemas-include)
* [`gc2 foreign import SERVER FROM TO [INCLUDE]`](#gc2-foreign-import-server-from-to-include)
* [`gc2 foreign materialize FROM [TO] [INCLUDE]`](#gc2-foreign-materialize-from-to-include)
* [`gc2 grid`](#gc2-grid)
* [`gc2 help [COMMAND]`](#gc2-help-command)
* [`gc2 import [PATH]`](#gc2-import-path)
* [`gc2 index add [TABLE] [COLUMNS] [METHOD] [NAME]`](#gc2-index-add-table-columns-method-name)
* [`gc2 index drop [TABLE] [NAME]`](#gc2-index-drop-table-name)
* [`gc2 index get [TABLE] [NAME]`](#gc2-index-get-table-name)
* [`gc2 login`](#gc2-login)
* [`gc2 logout`](#gc2-logout)
* [`gc2 privilege get [TABLE]`](#gc2-privilege-get-table)
* [`gc2 privilege set [TABLE] [USER] [PRIVILEGE]`](#gc2-privilege-set-table-user-privilege)
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
* [`gc2 user add [NAME]`](#gc2-user-add-name)
* [`gc2 user drop [NAME]`](#gc2-user-drop-name)
* [`gc2 user get [ID]`](#gc2-user-get-id)
* [`gc2 user update`](#gc2-user-update)
* [`gc2 view backup SCHEMAS`](#gc2-view-backup-schemas)
* [`gc2 view get SCHEMA`](#gc2-view-get-schema)
* [`gc2 view refresh SCHEMAS [INCLUDE]`](#gc2-view-refresh-schemas-include)
* [`gc2 view restore FROM [TO] [INCLUDE]`](#gc2-view-restore-from-to-include)

## `gc2 admin`

Run administration task on the GC2 installation.

```
USAGE
  $ gc2 admin [-t
    mapfiles|mapcachefile|qgisfiles|schema|migrations|diskcleanup|cachestats|cachecleanup|insertmeta]

FLAGS
  -t, --task=<option>  The task to run.
                       <options:
                       mapfiles|mapcachefile|qgisfiles|schema|migrations|diskcleanup|cachestats|cachecleanup|insertmeta>

DESCRIPTION
  Run administration task on the GC2 installation.
```

_See code: [src/commands/admin.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/admin.ts)_

## `gc2 client add [NAME]`

Create new client.

```
USAGE
  $ gc2 client add [NAME] [-n <value>] [-d <value>] [-r <value>] [-H <value>] [-p] [-c] [-h]

ARGUMENTS
  NAME  Name of new client.

FLAGS
  -H, --homepage=<value>      Homepage of the application.
  -c, --confirm               Client user must confirm the token exchange.
  -d, --description=<value>   Description of new client.
  -h, --help                  Show CLI help.
  -n, --name=<value>          Name of new client.
  -p, --public                Public client. No secret needed.
  -r, --redirect_uri=<value>  Redirect uri. Redirects will only be allowed to an uri in this list.

DESCRIPTION
  Create new client.
```

_See code: [src/commands/client/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/client/add.ts)_

## `gc2 client drop [ID]`

Drop a client.

```
USAGE
  $ gc2 client drop [ID] [-h]

ARGUMENTS
  ID  Id of client.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a client.
```

_See code: [src/commands/client/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/client/drop.ts)_

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

_See code: [src/commands/client/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/client/get.ts)_

## `gc2 client update [ID]`

Update a client.

```
USAGE
  $ gc2 client update [ID] [-n <value>] [-d <value>] [-r <value>] [-p <value>] [-p] [-c] [-h]

ARGUMENTS
  ID  Id of client.

FLAGS
  -c, --confirm               Client user must confirm the token exchange.
  -d, --description=<value>   Description of new client.
  -h, --help                  Show CLI help.
  -n, --name=<value>          New name ofclient.
  -p, --homepage=<value>      Homepage of the application.
  -p, --public                Public client. No secret needed.
  -r, --redirect_uri=<value>  Redirect uri. Redirects will only be allowed to an uri in this list.

DESCRIPTION
  Update a client.
```

_See code: [src/commands/client/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/client/update.ts)_

## `gc2 column add [TABLE] [COLUMN] [TYPE]`

Add a new column to a table.

```
USAGE
  $ gc2 column add [TABLE] [COLUMN] [TYPE] [-h]

ARGUMENTS
  TABLE   Name of table.
  COLUMN  Name of new column.
  TYPE    Data type of new column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add a new column to a table.
```

_See code: [src/commands/column/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/add.ts)_

## `gc2 column default [TABLE] [COLUMN] [DEFAULT]`

Set default value for column. The default value is set when inserting a new row without a value for the column.

```
USAGE
  $ gc2 column default [TABLE] [COLUMN] [DEFAULT] [-h]

ARGUMENTS
  TABLE    Name of table.
  COLUMN   Name of column.
  DEFAULT  Default value. Set to 'null' for removing an already set value.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set default value for column. The default value is set when inserting a new row without a value for the column.
```

_See code: [src/commands/column/default.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/default.ts)_

## `gc2 column drop [TABLE] [COLUMN]`

Drop a column from table.

```
USAGE
  $ gc2 column drop [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table.
  COLUMN  Name of column to drop.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a column from table.
```

_See code: [src/commands/column/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/drop.ts)_

## `gc2 column get [TABLE] [COLUMN]`

Get description of a column.

```
USAGE
  $ gc2 column get [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table.
  COLUMN  Name of column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get description of a column.
```

_See code: [src/commands/column/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/get.ts)_

## `gc2 column nullable [TABLE] [COLUMN] [NULLABLE]`

Set nullable on column. If set the column can't be empty.

```
USAGE
  $ gc2 column nullable [TABLE] [COLUMN] [NULLABLE] [-h]

ARGUMENTS
  TABLE     Name of table.
  COLUMN    Name of column.
  NULLABLE  (true|false) Set column to nullable.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set nullable on column. If set the column can't be empty.
```

_See code: [src/commands/column/nullable.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/nullable.ts)_

## `gc2 column rename [TABLE] [COLUMN] [NAME]`

Rename a column.

```
USAGE
  $ gc2 column rename [TABLE] [COLUMN] [NAME] [-h]

ARGUMENTS
  TABLE   Name of table.
  COLUMN  Existing name of column.
  NAME    New name for column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename a column.
```

_See code: [src/commands/column/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/rename.ts)_

## `gc2 column type [TABLE] [COLUMN] [TYPE]`

Set the data on column. It might be, the existing data type can't be transformed to the chosen one.

```
USAGE
  $ gc2 column type [TABLE] [COLUMN] [TYPE] [-h]

ARGUMENTS
  TABLE   Name of table.
  COLUMN  Name of column.
  TYPE    New data type for column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set the data on column. It might be, the existing data type can't be transformed to the chosen one.
```

_See code: [src/commands/column/type.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/column/type.ts)_

## `gc2 connect [HOST]`

Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.

```
USAGE
  $ gc2 connect [HOST] [-h] [-r]

ARGUMENTS
  HOST  Server host with scheme: http(s)

FLAGS
  -h, --help   Show CLI help.
  -r, --reset  Reset connection.

DESCRIPTION
  Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be
  prompted instead.
```

_See code: [src/commands/connect.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/connect.ts)_

## `gc2 constraint add [TABLE] [COLUMNS] [TYPE] [NAME]`

Add a constraint.

```
USAGE
  $ gc2 constraint add [TABLE] [COLUMNS] [TYPE] [NAME] [-h] [-t <value>] [-e <value>] [-c <value>]

ARGUMENTS
  TABLE    Name of table.
  COLUMNS  Columns for use in the constraint (comma separated).
  TYPE     (primary|unique|foreign|check) Type of constraint.
  NAME     Name for constraint.

FLAGS
  -h, --help  Show CLI help.

CHECK OPTIONS FLAGS
  -c, --check=<value>  Check expression

FOREIGN KEY OPTIONS FLAGS
  -e, --referencedColumns=<value>  Referenced columns.
  -t, --referencedTable=<value>    Referenced table.

DESCRIPTION
  Add a constraint.
```

_See code: [src/commands/constraint/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/constraint/add.ts)_

## `gc2 constraint drop [TABLE] [NAME]`

Drop a constraint.

```
USAGE
  $ gc2 constraint drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table.
  NAME   Name of constraint.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a constraint.
```

_See code: [src/commands/constraint/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/constraint/drop.ts)_

## `gc2 constraint get [TABLE] [NAME]`

Get constraint details.

```
USAGE
  $ gc2 constraint get [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table.
  NAME   Name of constraint.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get constraint details.
```

_See code: [src/commands/constraint/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/constraint/get.ts)_

## `gc2 foreign drop SCHEMAS [INCLUDE]`

Drop all foreign tables in schema.

```
USAGE
  $ gc2 foreign drop SCHEMAS [INCLUDE] [-h]

ARGUMENTS
  SCHEMAS  Schemas for dropping (comma separated).
  INCLUDE  Only drop named foreign tables. Comma separated.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop all foreign tables in schema.
```

_See code: [src/commands/foreign/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/foreign/drop.ts)_

## `gc2 foreign import SERVER FROM TO [INCLUDE]`

Import schema from foreign server.

```
USAGE
  $ gc2 foreign import SERVER FROM TO [INCLUDE] [-h]

ARGUMENTS
  SERVER   Name of foreign server.
  FROM     Comma separated list of foreign schemas.
  TO       Comma separated list of local schemas.
  INCLUDE  Only include named relations in import. Comma separated.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Import schema from foreign server.
```

_See code: [src/commands/foreign/import.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/foreign/import.ts)_

## `gc2 foreign materialize FROM [TO] [INCLUDE]`

Create materialized views of foreign tables.

```
USAGE
  $ gc2 foreign materialize FROM [TO] [INCLUDE] [-h] [-p <value>] [-s <value>]

ARGUMENTS
  FROM     Comma separated list of source schemas.
  TO       comma separated list of target schemas.
  INCLUDE  only include named foreign tables. Comma separated.

FLAGS
  -h, --help            Show CLI help.
  -p, --prefix=<value>  prefix for created foreign tables
  -s, --suffix=<value>  suffix for created foreign tables

DESCRIPTION
  Create materialized views of foreign tables.
```

_See code: [src/commands/foreign/materialize.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/foreign/materialize.ts)_

## `gc2 grid`

Add a fishnet grid from an input polygon.

```
USAGE
  $ gc2 grid -t <value> -e <value> -s <value> [-h]

FLAGS
  -e, --extent=<value>  (required) Polygon table which should be used for extent.
  -h, --help            Show CLI help.
  -s, --size=<value>    (required) Cell size in map units.
  -t, --table=<value>   (required) Name of the new fishnet table.

DESCRIPTION
  Add a fishnet grid from an input polygon.
```

_See code: [src/commands/grid.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/grid.ts)_

## `gc2 help [COMMAND]`

Display help for gc2.

```
USAGE
  $ gc2 help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for gc2.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.33/src/commands/help.ts)_

## `gc2 import [PATH]`

Import files. Set path to a file or folder, which will be compressed, uploaded and imported into GC2.

```
USAGE
  $ gc2 import [PATH] [-s <value>] [-t <value>] [-T <value>] [-x <value>] [-y <value>] [-d] [-a] [-r] [-p]
    [-n <value>] [-h]

ARGUMENTS
  PATH  [default: .] Input path to file or folder.

FLAGS
  -T, --timestamp=<value>         Name of timestamp field. Create a timestamp field in the import table. Omit argument
                                  for no timestamp field.
  -a, --append                    Append to existing table instead of creating new.
  -d, --dry_run                   Dry run. Only analyse files with no import.
  -h, --help                      Show CLI help.
  -n, --table_name=<value>        Name of table. Defaults to the name of the file. Can only be used when importing
                                  single file - not directories unless --append is used
  -p, --p_multi                   Promote single geometries to multi part.
  -r, --truncate                  Truncate table before appending. Only have effect if --append is set.
  -s, --s_srs=<value>             Fallback source SRS. Will be used if file doesn't contain projection information
  -t, --t_srs=<value>             Fallback target SRS. Will be used if no authority name/code is available. Defaults to
                                  EPSG:4326.
  -x, --x_possible_names=<value>  Specify the potential names of the columns that can contain X/longitude. Only effects
                                  CSV. Defaults to "lon*,Lon*,x,X"]
  -y, --y_possible_names=<value>  Specify the potential names of the columns that can contain Y/latitude. Only effects
                                  CSV. Defaults to "lat*,Lat*,y,Y"]

DESCRIPTION
  Import files. Set path to a file or folder, which will be compressed, uploaded and imported into GC2.
```

_See code: [src/commands/import.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/import.ts)_

## `gc2 index add [TABLE] [COLUMNS] [METHOD] [NAME]`

Add an new index to table.

```
USAGE
  $ gc2 index add [TABLE] [COLUMNS] [METHOD] [NAME] [-h]

ARGUMENTS
  TABLE    Name of table.
  COLUMNS  Columns to index (comma separated).
  METHOD   (btree|brin|gin|gist|hash) Index method.
  NAME     Name of new index.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add an new index to table.
```

_See code: [src/commands/index/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/index/add.ts)_

## `gc2 index drop [TABLE] [NAME]`

Drop an index from table.

```
USAGE
  $ gc2 index drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table.
  NAME   Name of index.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop an index from table.
```

_See code: [src/commands/index/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/index/drop.ts)_

## `gc2 index get [TABLE] [NAME]`

Get index definition.

```
USAGE
  $ gc2 index get [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table.
  NAME   Name of index.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get index definition.
```

_See code: [src/commands/index/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/index/get.ts)_

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

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/login.ts)_

## `gc2 logout`

Logout the current user.

```
USAGE
  $ gc2 logout [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Logout the current user.
```

_See code: [src/commands/logout.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/logout.ts)_

## `gc2 privilege get [TABLE]`

Get user privileges on table.

```
USAGE
  $ gc2 privilege get [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get user privileges on table.
```

_See code: [src/commands/privilege/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/privilege/get.ts)_

## `gc2 privilege set [TABLE] [USER] [PRIVILEGE]`

Set user privileges on table.

```
USAGE
  $ gc2 privilege set [TABLE] [USER] [PRIVILEGE] [-h]

ARGUMENTS
  TABLE      Name of table.
  USER       Name of user.
  PRIVILEGE  Which privilege.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set user privileges on table.
```

_See code: [src/commands/privilege/set.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/privilege/set.ts)_

## `gc2 rule add`

Create a new rule.

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
  Create a new rule.
```

_See code: [src/commands/rule/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/rule/add.ts)_

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

_See code: [src/commands/rule/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/rule/drop.ts)_

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

_See code: [src/commands/rule/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/rule/get.ts)_

## `gc2 rule update [ID]`

Update a rule.

```
USAGE
  $ gc2 rule update [ID] [-p <value>] [-u <value>] [-s <value>] [-r <value>] [-c <value>] [-t <value>] [-i
    <value>] [-a <value>] [-f <value>] [-h]

ARGUMENTS
  ID  Rule id.

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
  Update a rule.
```

_See code: [src/commands/rule/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/rule/update.ts)_

## `gc2 scheduler start JOB [INCLUDE]`

Starts a scheduler job

```
USAGE
  $ gc2 scheduler start JOB [INCLUDE] [-h] [-n <value>] [-f]

ARGUMENTS
  JOB      Job id to start. Can also be a schema name and all jobs for that schema will be started.
  INCLUDE  Only include jobs for named tables. Comma separated. Will only have effect if schema is used in "job" option.

FLAGS
  -f, --force         Force table to be recreated.
  -h, --help          Show CLI help.
  -n, --name=<value>  Name the started job(s). The name will be listed in the progress status.

DESCRIPTION
  Starts a scheduler job
```

_See code: [src/commands/scheduler/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/scheduler/start.ts)_

## `gc2 scheduler status`

Get jobs in progress.

```
USAGE
  $ gc2 scheduler status [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get jobs in progress.
```

_See code: [src/commands/scheduler/status.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/scheduler/status.ts)_

## `gc2 schema add [SCHEMA]`

Create a new schema.

```
USAGE
  $ gc2 schema add [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of new schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new schema.
```

_See code: [src/commands/schema/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/schema/add.ts)_

## `gc2 schema drop [SCHEMA]`

Drop a schema.

```
USAGE
  $ gc2 schema drop [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a schema.
```

_See code: [src/commands/schema/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/schema/drop.ts)_

## `gc2 schema get [SCHEMA]`

Get list of tables in schema.

```
USAGE
  $ gc2 schema get [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get list of tables in schema.
```

_See code: [src/commands/schema/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/schema/get.ts)_

## `gc2 schema rename [SCHEMA] [NAME]`

Rename schema.

```
USAGE
  $ gc2 schema rename [SCHEMA] [NAME] [-h]

ARGUMENTS
  SCHEMA  Name of schema.
  NAME    New name for schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename schema.
```

_See code: [src/commands/schema/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/schema/rename.ts)_

## `gc2 seed list`

List running seed jobs.

```
USAGE
  $ gc2 seed list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List running seed jobs.
```

_See code: [src/commands/seed/list.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/seed/list.ts)_

## `gc2 seed log`

Get progress of a running job.

```
USAGE
  $ gc2 seed log -u <value> [-h]

FLAGS
  -h, --help          Show CLI help.
  -u, --uuid=<value>  (required) UUID of seed job.

DESCRIPTION
  Get progress of a running job.
```

_See code: [src/commands/seed/log.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/seed/log.ts)_

## `gc2 seed start`

Starts a seed job.

```
USAGE
  $ gc2 seed start -n <value> -l <value> -g <value> -s <value> -e <value> -x <value> [-h] [-t <value>] [-f]

FLAGS
  -e, --end=<value>      (required) End zoom level (the higher number).
  -f, --force            Force seed job - overwrites existing tiles.
  -g, --grid=<value>     (required) Grid to use.
  -h, --help             Show CLI help.
  -l, --layer=<value>    (required) Layer to seed [schema].[relation]
  -n, --name=<value>     (required) Name of seed job.
  -s, --start=<value>    (required) Start zoom level (the lower number).
  -t, --threads=<value>  Number of parallel threads that should be used to request tiles from the WMS source.
  -x, --extent=<value>   (required) Polygon layer which set the extent for the seeding [schema].[relation]

DESCRIPTION
  Starts a seed job.
```

_See code: [src/commands/seed/start.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/seed/start.ts)_

## `gc2 seed stop`

Stops a running seed job.

```
USAGE
  $ gc2 seed stop -u <value> [-h]

FLAGS
  -h, --help          Show CLI help.
  -u, --uuid=<value>  (required) UUID of seed job.

DESCRIPTION
  Stops a running seed job.
```

_See code: [src/commands/seed/stop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/seed/stop.ts)_

## `gc2 sql`

Run SQL statements. If run without --statement inactive mode will be enabled.

```
USAGE
  $ gc2 sql [-s <value>] [-c <value>] [-f <value>] [-g wkt|geojson] [-p <value>] [-h]

FLAGS
  -c, --srs=<value>         [default: 4326] Output spatial reference system. Use EPSG codes.
  -f, --format=<value>      Output file format.
  -g, --geoformat=<option>  Output geometry in CSV and Excel.
                            <options: wkt|geojson>
  -h, --help                Show CLI help.
  -p, --path=<value>        [default: .] Output path to file. If omitted file is saved in current folder.
  -s, --statement=<value>   SQL statement. Any select, insert, update and delete. No altering of schema is allowed.

DESCRIPTION
  Run SQL statements. If run without --statement inactive mode will be enabled.
```

_See code: [src/commands/sql.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/sql.ts)_

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

_See code: [src/commands/stat.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/stat.ts)_

## `gc2 symbol PATH`

Create a symbol file from a directory for use in Vidi Symbol extension.

```
USAGE
  $ gc2 symbol PATH [-h] [-f <value>]

ARGUMENTS
  PATH  Path to directory with SVG files.

FLAGS
  -f, --file=<value>  Output file name. If omitted the content will be printed.
  -h, --help          Show CLI help.

DESCRIPTION
  Create a symbol file from a directory for use in Vidi Symbol extension.
```

_See code: [src/commands/symbol.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/symbol.ts)_

## `gc2 table add [TABLE]`

Create a new table.

```
USAGE
  $ gc2 table add [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new table.
```

_See code: [src/commands/table/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/table/add.ts)_

## `gc2 table drop [TABLE]`

Drop a table.

```
USAGE
  $ gc2 table drop [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a table.
```

_See code: [src/commands/table/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/table/drop.ts)_

## `gc2 table get [TABLE]`

Get table definition.

```
USAGE
  $ gc2 table get [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get table definition.
```

_See code: [src/commands/table/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/table/get.ts)_

## `gc2 table move [TABLE] [DESTINATION]`

Move table to another schema.

```
USAGE
  $ gc2 table move [TABLE] [DESTINATION] [-h]

ARGUMENTS
  TABLE        Name of table.
  DESTINATION  Destination schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Move table to another schema.
```

_See code: [src/commands/table/move.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/table/move.ts)_

## `gc2 table rename [TABLE] [NAME]`

Rename table.

```
USAGE
  $ gc2 table rename [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table.
  NAME   New name for table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename table.
```

_See code: [src/commands/table/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/table/rename.ts)_

## `gc2 user add [NAME]`

Create new user.

```
USAGE
  $ gc2 user add [NAME] [-h] [-p <value>] [-e <value>] [-e <value>] [-d]

ARGUMENTS
  NAME  Name of new user

FLAGS
  -d, --default_user        The default user is the user that is used when no token is provided. Use for public
                            applications where users should not be able to access data without a token.
  -e, --email=<value>       E-mail for new user
  -e, --properties=<value>  Properties for new user
  -h, --help                Show CLI help.
  -p, --password=<value>    password for new user.

DESCRIPTION
  Create new user.
```

_See code: [src/commands/user/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/user/add.ts)_

## `gc2 user drop [NAME]`

Drop existing user.

```
USAGE
  $ gc2 user drop [NAME] [-h]

ARGUMENTS
  NAME  Name of user to drop.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop existing user.
```

_See code: [src/commands/user/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/user/drop.ts)_

## `gc2 user get [ID]`

Get user(s).

```
USAGE
  $ gc2 user get [ID] [-h]

ARGUMENTS
  ID  User id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get user(s).
```

_See code: [src/commands/user/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/user/get.ts)_

## `gc2 user update`

Update user.

```
USAGE
  $ gc2 user update [-h] [-p <value>] [-d]

FLAGS
  -d, --default_user      The default user is the user that is used when no token is provided. Use for public
                          applications where users should not be able to access data without a token.
  -h, --help              Show CLI help.
  -p, --password=<value>  New password for user.

DESCRIPTION
  Update user.
```

_See code: [src/commands/user/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/user/update.ts)_

## `gc2 view backup SCHEMAS`

Backup all (mat)views definitions in schema.

```
USAGE
  $ gc2 view backup SCHEMAS [-h]

ARGUMENTS
  SCHEMAS  Schemas for backup (comma separated).

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Backup all (mat)views definitions in schema.
```

_See code: [src/commands/view/backup.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/view/backup.ts)_

## `gc2 view get SCHEMA`

Get "*" definitions from backup for schema.

```
USAGE
  $ gc2 view get SCHEMA [-h]

ARGUMENTS
  SCHEMA  Get star views for schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get "*" definitions from backup for schema.
```

_See code: [src/commands/view/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/view/get.ts)_

## `gc2 view refresh SCHEMAS [INCLUDE]`

Refresh all materialized views in schema.

```
USAGE
  $ gc2 view refresh SCHEMAS [INCLUDE] [-h]

ARGUMENTS
  SCHEMAS  Comma separated list of schemas.
  INCLUDE  Only include named views in restore. Comma separated.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Refresh all materialized views in schema.
```

_See code: [src/commands/view/refresh.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/view/refresh.ts)_

## `gc2 view restore FROM [TO] [INCLUDE]`

Restore all (mat)views definitions from schema.

```
USAGE
  $ gc2 view restore FROM [TO] [INCLUDE] [-h]

ARGUMENTS
  FROM     Comma separated list of source schemas.
  TO       Comma separated list of target schemas.
  INCLUDE  Only include named views in restore. Comma separated.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Restore all (mat)views definitions from schema.
```

_See code: [src/commands/view/restore.ts](https://github.com/mapcentia/gc2-cli/blob/v2025.8.0/src/commands/view/restore.ts)_
<!-- commandsstop -->
