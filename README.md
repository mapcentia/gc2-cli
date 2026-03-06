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
$ npm install -g @centia-io/cli
$ centia COMMAND
running command...
$ centia (--version|-v)
@centia-io/cli/2026.3.2 linux-x64 node-v24.14.0
$ centia --help [COMMAND]
USAGE
  $ centia COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`centia client add [NAME]`](#centia-client-add-name)
* [`centia client drop [ID]`](#centia-client-drop-id)
* [`centia client get [ID]`](#centia-client-get-id)
* [`centia client update [ID]`](#centia-client-update-id)
* [`centia column add [SCHEMA] [TABLE] [COLUMN] [TYPE]`](#centia-column-add-schema-table-column-type)
* [`centia column default [SCHEMA] [TABLE] [COLUMN] [DEFAULT]`](#centia-column-default-schema-table-column-default)
* [`centia column drop [SCHEMA] [TABLE] [COLUMN]`](#centia-column-drop-schema-table-column)
* [`centia column get [SCHEMA] [TABLE] [COLUMN]`](#centia-column-get-schema-table-column)
* [`centia column nullable [SCHEMA] [TABLE] [COLUMN] [NULLABLE]`](#centia-column-nullable-schema-table-column-nullable)
* [`centia column rename [SCHEMA] [TABLE] [COLUMN] [NAME]`](#centia-column-rename-schema-table-column-name)
* [`centia column type [SCHEMA] [TABLE] [COLUMN] [TYPE]`](#centia-column-type-schema-table-column-type)
* [`centia connect [HOST]`](#centia-connect-host)
* [`centia constraint add [SCHEMA] [TABLE] [COLUMNS] [TYPE] [NAME]`](#centia-constraint-add-schema-table-columns-type-name)
* [`centia constraint drop [SCHEMA] [TABLE] [NAME]`](#centia-constraint-drop-schema-table-name)
* [`centia constraint get [SCHEMA] [TABLE] [NAME]`](#centia-constraint-get-schema-table-name)
* [`centia help [COMMAND]`](#centia-help-command)
* [`centia import [PATH] [SCHEMA]`](#centia-import-path-schema)
* [`centia index add [SCHEMA] [TABLE] [COLUMNS] [METHOD] [NAME]`](#centia-index-add-schema-table-columns-method-name)
* [`centia index drop [SCHEMA] [TABLE] [NAME]`](#centia-index-drop-schema-table-name)
* [`centia index get [SCHEMA] [TABLE] [NAME]`](#centia-index-get-schema-table-name)
* [`centia login`](#centia-login)
* [`centia logout`](#centia-logout)
* [`centia privilege get [SCHEMA] [TABLE]`](#centia-privilege-get-schema-table)
* [`centia privilege set [SCHEMA] [TABLE] [USER] [PRIVILEGE]`](#centia-privilege-set-schema-table-user-privilege)
* [`centia rule add`](#centia-rule-add)
* [`centia rule drop [ID]`](#centia-rule-drop-id)
* [`centia rule get [ID]`](#centia-rule-get-id)
* [`centia rule update [ID]`](#centia-rule-update-id)
* [`centia schema add [SCHEMA]`](#centia-schema-add-schema)
* [`centia schema drop [SCHEMA]`](#centia-schema-drop-schema)
* [`centia schema get [SCHEMA]`](#centia-schema-get-schema)
* [`centia schema rename [SCHEMA] [NAME]`](#centia-schema-rename-schema-name)
* [`centia sql`](#centia-sql)
* [`centia table add [SCHEMA] [TABLE]`](#centia-table-add-schema-table)
* [`centia table drop [SCHEMA] [TABLE]`](#centia-table-drop-schema-table)
* [`centia table event [SCHEMA] [TABLE] [EVENT]`](#centia-table-event-schema-table-event)
* [`centia table get [SCHEMA] [TABLE]`](#centia-table-get-schema-table)
* [`centia table move [SCHEMA] [TABLE] [DESTINATION]`](#centia-table-move-schema-table-destination)
* [`centia table rename [SCHEMA] [TABLE] [NAME]`](#centia-table-rename-schema-table-name)
* [`centia user add [NAME]`](#centia-user-add-name)
* [`centia user drop [NAME]`](#centia-user-drop-name)
* [`centia user get [ID]`](#centia-user-get-id)
* [`centia user update [NAME]`](#centia-user-update-name)

## `centia client add [NAME]`

Create new client.

```
USAGE
  $ centia client add [NAME] [-i <value>] [-n <value>] [-d <value>] [-r <value>] [-H <value>] [-p] [-c] [-t]
    [-s] [-S] [-h]

ARGUMENTS
  [NAME]  Name of new client.

FLAGS
  -H, --homepage=<value>      Homepage of the application.
  -S, --social_signup         Enable users to sign up for a new account with social login.
  -c, --confirm               Client user must confirm the token exchange.
  -d, --description=<value>   Description of new client.
  -h, --help                  Show CLI help.
  -i, --id=<value>            Id of new client.
  -n, --name=<value>          Name of new client.
  -p, --public                Public client. No secret needed.
  -r, --redirect_uri=<value>  Redirect uri. Redirects will only be allowed to an uri in this list.
  -s, --allow_signup          Allow users to sign up for a new account in the web-dialog.
  -t, --two_factor            Client user must authenticate with two factor authentication.

DESCRIPTION
  Create new client.
```

_See code: [src/commands/client/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/client/add.ts)_

## `centia client drop [ID]`

Drop a client.

```
USAGE
  $ centia client drop [ID] [-h]

ARGUMENTS
  [ID]  Id of client.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a client.
```

_See code: [src/commands/client/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/client/drop.ts)_

## `centia client get [ID]`

List client(s).

```
USAGE
  $ centia client get [ID] [-h]

ARGUMENTS
  [ID]  Client id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List client(s).
```

_See code: [src/commands/client/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/client/get.ts)_

## `centia client update [ID]`

Update a client.

```
USAGE
  $ centia client update [ID] [-n <value>] [-d <value>] [-r <value>] [-p <value>] [-p] [-c] [-t] [-s] [-S] [-h]

ARGUMENTS
  [ID]  Id of client.

FLAGS
  -S, --social_signup         Enable users to sign up for a new account with social login.
  -c, --confirm               Client user must confirm the token exchange.
  -d, --description=<value>   Description of new client.
  -h, --help                  Show CLI help.
  -n, --name=<value>          New name ofclient.
  -p, --homepage=<value>      Homepage of the application.
  -p, --public                Public client. No secret needed.
  -r, --redirect_uri=<value>  Redirect uri. Redirects will only be allowed to an uri in this list.
  -s, --allow_signup          Allow users to sign up for a new account in the web-dialog.
  -t, --two_factor            Client user must authenticate with two factor authentication.

DESCRIPTION
  Update a client.
```

_See code: [src/commands/client/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/client/update.ts)_

## `centia column add [SCHEMA] [TABLE] [COLUMN] [TYPE]`

Add a new column to a table.

```
USAGE
  $ centia column add [SCHEMA] [TABLE] [COLUMN] [TYPE] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [COLUMN]  Name of new column.
  [TYPE]    Data type of new column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add a new column to a table.
```

_See code: [src/commands/column/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/add.ts)_

## `centia column default [SCHEMA] [TABLE] [COLUMN] [DEFAULT]`

Set default value for column. The default value is set when inserting a new row without a value for the column.

```
USAGE
  $ centia column default [SCHEMA] [TABLE] [COLUMN] [DEFAULT] [-h]

ARGUMENTS
  [SCHEMA]   Name of schema.
  [TABLE]    Name of table.
  [COLUMN]   Name of column.
  [DEFAULT]  Default value. Set to 'null' for removing an already set value.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set default value for column. The default value is set when inserting a new row without a value for the column.
```

_See code: [src/commands/column/default.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/default.ts)_

## `centia column drop [SCHEMA] [TABLE] [COLUMN]`

Drop a column from table.

```
USAGE
  $ centia column drop [SCHEMA] [TABLE] [COLUMN] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [COLUMN]  Name of column to drop.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a column from table.
```

_See code: [src/commands/column/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/drop.ts)_

## `centia column get [SCHEMA] [TABLE] [COLUMN]`

Get description of a column.

```
USAGE
  $ centia column get [SCHEMA] [TABLE] [COLUMN] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [COLUMN]  Name of column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get description of a column.
```

_See code: [src/commands/column/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/get.ts)_

## `centia column nullable [SCHEMA] [TABLE] [COLUMN] [NULLABLE]`

Set nullable on column. If set the column can't be empty.

```
USAGE
  $ centia column nullable [SCHEMA] [TABLE] [COLUMN] [NULLABLE] [-h]

ARGUMENTS
  [SCHEMA]    Name of schema.
  [TABLE]     Name of table.
  [COLUMN]    Name of column.
  [NULLABLE]  (true|false) Set column to nullable.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set nullable on column. If set the column can't be empty.
```

_See code: [src/commands/column/nullable.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/nullable.ts)_

## `centia column rename [SCHEMA] [TABLE] [COLUMN] [NAME]`

Rename a column.

```
USAGE
  $ centia column rename [SCHEMA] [TABLE] [COLUMN] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [COLUMN]  Existing name of column.
  [NAME]    New name for column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename a column.
```

_See code: [src/commands/column/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/rename.ts)_

## `centia column type [SCHEMA] [TABLE] [COLUMN] [TYPE]`

Set the data on column. It might be, the existing data type can't be transformed to the chosen one.

```
USAGE
  $ centia column type [SCHEMA] [TABLE] [COLUMN] [TYPE] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [COLUMN]  Name of column.
  [TYPE]    New data type for column.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set the data on column. It might be, the existing data type can't be transformed to the chosen one.
```

_See code: [src/commands/column/type.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/column/type.ts)_

## `centia connect [HOST]`

Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.

```
USAGE
  $ centia connect [HOST] [-h] [-r]

ARGUMENTS
  [HOST]  Server host with scheme: http(s)

FLAGS
  -h, --help   Show CLI help.
  -r, --reset  Reset connection.

DESCRIPTION
  Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be
  prompted instead.
```

_See code: [src/commands/connect.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/connect.ts)_

## `centia constraint add [SCHEMA] [TABLE] [COLUMNS] [TYPE] [NAME]`

Add a constraint.

```
USAGE
  $ centia constraint add [SCHEMA] [TABLE] [COLUMNS] [TYPE] [NAME] [-h] [-t <value>] [-e <value>] [-c <value>]

ARGUMENTS
  [SCHEMA]   Name of schema.
  [TABLE]    Name of table.
  [COLUMNS]  Columns for use in the constraint (comma separated).
  [TYPE]     (primary|unique|foreign|check) Type of constraint.
  [NAME]     Name for constraint.

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

_See code: [src/commands/constraint/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/constraint/add.ts)_

## `centia constraint drop [SCHEMA] [TABLE] [NAME]`

Drop a constraint.

```
USAGE
  $ centia constraint drop [SCHEMA] [TABLE] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [NAME]    Name of constraint.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a constraint.
```

_See code: [src/commands/constraint/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/constraint/drop.ts)_

## `centia constraint get [SCHEMA] [TABLE] [NAME]`

Get constraint details.

```
USAGE
  $ centia constraint get [SCHEMA] [TABLE] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [NAME]    Name of constraint.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get constraint details.
```

_See code: [src/commands/constraint/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/constraint/get.ts)_

## `centia help [COMMAND]`

Display help for centia.

```
USAGE
  $ centia help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for centia.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.37/src/commands/help.ts)_

## `centia import [PATH] [SCHEMA]`

Import files. Set path to a file or folder, which will be compressed, uploaded and imported into GC2.

```
USAGE
  $ centia import [PATH] [SCHEMA] [-s <value>] [-t <value>] [-T <value>] [-x <value>] [-y <value>] [-d] [-a]
    [-r] [-p] [-n <value>] [-h]

ARGUMENTS
  [PATH]    [default: .] Input path to file or folder.
  [SCHEMA]  Destination schema.

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

_See code: [src/commands/import.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/import.ts)_

## `centia index add [SCHEMA] [TABLE] [COLUMNS] [METHOD] [NAME]`

Add an new index to table.

```
USAGE
  $ centia index add [SCHEMA] [TABLE] [COLUMNS] [METHOD] [NAME] [-h]

ARGUMENTS
  [SCHEMA]   Name of schema.
  [TABLE]    Name of table.
  [COLUMNS]  Columns to index (comma separated).
  [METHOD]   (btree|brin|gin|gist|hash) Index method.
  [NAME]     Name of new index.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add an new index to table.
```

_See code: [src/commands/index/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/index/add.ts)_

## `centia index drop [SCHEMA] [TABLE] [NAME]`

Drop an index from table.

```
USAGE
  $ centia index drop [SCHEMA] [TABLE] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [NAME]    Name of index.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop an index from table.
```

_See code: [src/commands/index/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/index/drop.ts)_

## `centia index get [SCHEMA] [TABLE] [NAME]`

Get index definition.

```
USAGE
  $ centia index get [SCHEMA] [TABLE] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [NAME]    Name of index.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get index definition.
```

_See code: [src/commands/index/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/index/get.ts)_

## `centia login`

Sign in to Centia. Use `connect` to set the host first.

```
USAGE
  $ centia login [-h] [-p <value>] [-u <value>] [-f password|device|code]

FLAGS
  -f, --flow=<option>     [default: code] Authentication flow
                          <options: password|device|code>
  -h, --help              Show CLI help.
  -p, --password=<value>  Password
  -u, --user=<value>      Username/database

DESCRIPTION
  Sign in to Centia. Use `connect` to set the host first.
```

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/login.ts)_

## `centia logout`

Logout the current user.

```
USAGE
  $ centia logout [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Logout the current user.
```

_See code: [src/commands/logout.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/logout.ts)_

## `centia privilege get [SCHEMA] [TABLE]`

Get user privileges on table.

```
USAGE
  $ centia privilege get [SCHEMA] [TABLE] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get user privileges on table.
```

_See code: [src/commands/privilege/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/privilege/get.ts)_

## `centia privilege set [SCHEMA] [TABLE] [USER] [PRIVILEGE]`

Set user privileges on table.

```
USAGE
  $ centia privilege set [SCHEMA] [TABLE] [USER] [PRIVILEGE] [-h]

ARGUMENTS
  [SCHEMA]     Name of schema.
  [TABLE]      Name of table.
  [USER]       Name of user.
  [PRIVILEGE]  Which privilege.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Set user privileges on table.
```

_See code: [src/commands/privilege/set.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/privilege/set.ts)_

## `centia rule add`

Create a new rule.

```
USAGE
  $ centia rule add [-P <value>] [-u <value>] [-s <value>] [-p <value>] [-c <value>] [-t <value>] [-i <value>]
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

_See code: [src/commands/rule/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/rule/add.ts)_

## `centia rule drop [ID]`

Drop a rule.

```
USAGE
  $ centia rule drop [ID] [-h]

ARGUMENTS
  [ID]  Id of rule

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a rule.
```

_See code: [src/commands/rule/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/rule/drop.ts)_

## `centia rule get [ID]`

Get rule(s).

```
USAGE
  $ centia rule get [ID] [-h]

ARGUMENTS
  [ID]  Rule id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get rule(s).
```

_See code: [src/commands/rule/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/rule/get.ts)_

## `centia rule update [ID]`

Update a rule.

```
USAGE
  $ centia rule update [ID] [-p <value>] [-u <value>] [-s <value>] [-r <value>] [-c <value>] [-t <value>] [-i
    <value>] [-a <value>] [-f <value>] [-h]

ARGUMENTS
  [ID]  Rule id.

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

_See code: [src/commands/rule/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/rule/update.ts)_

## `centia schema add [SCHEMA]`

Create a new schema.

```
USAGE
  $ centia schema add [SCHEMA] [-h]

ARGUMENTS
  [SCHEMA]  Name of new schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new schema.
```

_See code: [src/commands/schema/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/schema/add.ts)_

## `centia schema drop [SCHEMA]`

Drop a schema.

```
USAGE
  $ centia schema drop [SCHEMA] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a schema.
```

_See code: [src/commands/schema/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/schema/drop.ts)_

## `centia schema get [SCHEMA]`

Get list of tables in schema.

```
USAGE
  $ centia schema get [SCHEMA] [-R] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.

FLAGS
  -R, --raw   Print raw data.
  -h, --help  Show CLI help.

DESCRIPTION
  Get list of tables in schema.
```

_See code: [src/commands/schema/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/schema/get.ts)_

## `centia schema rename [SCHEMA] [NAME]`

Rename schema.

```
USAGE
  $ centia schema rename [SCHEMA] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [NAME]    New name for schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename schema.
```

_See code: [src/commands/schema/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/schema/rename.ts)_

## `centia sql`

Run SQL statements. If run without --statement inactive mode will be enabled.

```
USAGE
  $ centia sql [-s <value>] [-c <value>] [-f <value>] [-g wkt|geojson] [-p <value>] [-h]

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

_See code: [src/commands/sql.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/sql.ts)_

## `centia table add [SCHEMA] [TABLE]`

Create a new table.

```
USAGE
  $ centia table add [SCHEMA] [TABLE] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new table.
```

_See code: [src/commands/table/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/table/add.ts)_

## `centia table drop [SCHEMA] [TABLE]`

Drop a table.

```
USAGE
  $ centia table drop [SCHEMA] [TABLE] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a table.
```

_See code: [src/commands/table/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/table/drop.ts)_

## `centia table event [SCHEMA] [TABLE] [EVENT]`

Enable emitting of realtime events from tables.

```
USAGE
  $ centia table event [SCHEMA] [TABLE] [EVENT] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [EVENT]   Emit events.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Enable emitting of realtime events from tables.
```

_See code: [src/commands/table/event.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/table/event.ts)_

## `centia table get [SCHEMA] [TABLE]`

Get table definition.

```
USAGE
  $ centia table get [SCHEMA] [TABLE] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get table definition.
```

_See code: [src/commands/table/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/table/get.ts)_

## `centia table move [SCHEMA] [TABLE] [DESTINATION]`

Move table to another schema.

```
USAGE
  $ centia table move [SCHEMA] [TABLE] [DESTINATION] [-h]

ARGUMENTS
  [SCHEMA]       Name of schema.
  [TABLE]        Name of table.
  [DESTINATION]  Destination schema.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Move table to another schema.
```

_See code: [src/commands/table/move.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/table/move.ts)_

## `centia table rename [SCHEMA] [TABLE] [NAME]`

Rename table.

```
USAGE
  $ centia table rename [SCHEMA] [TABLE] [NAME] [-h]

ARGUMENTS
  [SCHEMA]  Name of schema.
  [TABLE]   Name of table.
  [NAME]    New name for table.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename table.
```

_See code: [src/commands/table/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/table/rename.ts)_

## `centia user add [NAME]`

Create new user.

```
USAGE
  $ centia user add [NAME] [-h] [-p <value>] [-e <value>] [-P <value>] [-d]

ARGUMENTS
  [NAME]  Name of new user

FLAGS
  -P, --properties=<value>  Properties for new user
  -d, --default_user        The default user is the user that is used when no token is provided. Use for public
                            applications where users should not be able to access data without a token.
  -e, --email=<value>       E-mail for new user
  -h, --help                Show CLI help.
  -p, --password=<value>    password for new user.

DESCRIPTION
  Create new user.
```

_See code: [src/commands/user/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/user/add.ts)_

## `centia user drop [NAME]`

Drop existing user.

```
USAGE
  $ centia user drop [NAME] [-h]

ARGUMENTS
  [NAME]  Name of user to drop.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop existing user.
```

_See code: [src/commands/user/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/user/drop.ts)_

## `centia user get [ID]`

Get user(s).

```
USAGE
  $ centia user get [ID] [-h]

ARGUMENTS
  [ID]  User id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get user(s).
```

_See code: [src/commands/user/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/user/get.ts)_

## `centia user update [NAME]`

Update user.

```
USAGE
  $ centia user update [NAME] [-h] [-p <value>] [-d] [-e <value>] [-g <value>]

ARGUMENTS
  [NAME]  Name of user.

FLAGS
  -d, --default_user        The default user is the user that is used when no token is provided. Use for public
                            applications where users should not be able to access data without a token.
  -e, --properties=<value>  New properties.
  -g, --group=<value>       New group.
  -h, --help                Show CLI help.
  -p, --password=<value>    New password for user.

DESCRIPTION
  Update user.
```

_See code: [src/commands/user/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2026.3.2/src/commands/user/update.ts)_
<!-- commandsstop -->
