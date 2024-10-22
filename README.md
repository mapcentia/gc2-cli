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
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g centia
$ cen COMMAND
running command...
$ cen (--version|-v)
centia/2024.6.0 linux-x64 node-v20.18.0
$ cen --help [COMMAND]
USAGE
  $ cen COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g gc2
$ centia COMMAND
running command...
$ centia (--version|-v)
gc2/2024.6.0 linux-x64 node-v18.19.1
$ centia --help [COMMAND]
USAGE
  $ centia COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cen client drop [ID]`](#cen-client-drop-id)
* [`cen client get [ID]`](#cen-client-get-id)
* [`cen client update [ID]`](#cen-client-update-id)
* [`cen column default [TABLE] [COLUMN] [DEFAULT]`](#cen-column-default-table-column-default)
* [`cen column drop [TABLE] [COLUMN]`](#cen-column-drop-table-column)
* [`cen column get [TABLE] [COLUMN]`](#cen-column-get-table-column)
* [`cen column nullable [TABLE] [COLUMN] [NULLABLE]`](#cen-column-nullable-table-column-nullable)
* [`cen column rename [TABLE] [COLUMN] [NAME]`](#cen-column-rename-table-column-name)
* [`cen column type [TABLE] [COLUMN] [TYPE]`](#cen-column-type-table-column-type)
* [`cen constraint drop [TABLE] [NAME]`](#cen-constraint-drop-table-name)
* [`cen constraint get`](#cen-constraint-get)
* [`cen help [COMMANDS]`](#cen-help-commands)
* [`cen import PATH`](#cen-import-path)
* [`cen index drop [TABLE] [NAME]`](#cen-index-drop-table-name)
* [`cen index get`](#cen-index-get)
* [`cen login`](#cen-login)
* [`cen privilege get [TABLE]`](#cen-privilege-get-table)
* [`cen privilege set [TABLE] [USER] [PRIVILEGES]`](#cen-privilege-set-table-user-privileges)
* [`cen rule drop [ID]`](#cen-rule-drop-id)
* [`cen rule get [ID]`](#cen-rule-get-id)
* [`cen rule update [ID]`](#cen-rule-update-id)
* [`cen schema drop [SCHEMA]`](#cen-schema-drop-schema)
* [`cen schema get [SCHEMA]`](#cen-schema-get-schema)
* [`cen schema rename [SCHEMA] [NAME]`](#cen-schema-rename-schema-name)
* [`cen sql`](#cen-sql)
* [`cen stat`](#cen-stat)
* [`cen table drop [TABLE]`](#cen-table-drop-table)
* [`cen table get [TABLE]`](#cen-table-get-table)
* [`cen table move [TABLE] [DESTINATION]`](#cen-table-move-table-destination)
* [`cen table rename [TABLE] [NAME]`](#cen-table-rename-table-name)
* [`cen update [CHANNEL]`](#cen-update-channel)
* [`cen user drop [NAME]`](#cen-user-drop-name)
* [`cen user get`](#cen-user-get)
* [`cen user update`](#cen-user-update)

## `cen client drop [ID]`

Drop a client.

```
USAGE
  $ cen client drop [ID] [-h]

ARGUMENTS
  ID  Id of client

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a client.
```

_See code: [src/commands/client/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/drop.ts)_

## `cen client get [ID]`

Get client(s).

```
USAGE
  $ cen client get [ID] [-h]

ARGUMENTS
  ID  Client id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get client(s).
```

_See code: [src/commands/client/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/get.ts)_

## `cen client update [ID]`

Update a client.

```
USAGE
  $ cen client update [ID] [-d <value>] [-r <value>] [-p <value>] [-h]

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

## `cen column default [TABLE] [COLUMN] [DEFAULT]`

Set default value for column

```
USAGE
  $ cen column default [TABLE] [COLUMN] [DEFAULT] [-h]

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

## `cen column drop [TABLE] [COLUMN]`

Drop a column

```
USAGE
  $ cen column drop [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Name of column to drop

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a column
```

_See code: [src/commands/column/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/drop.ts)_

## `cen column get [TABLE] [COLUMN]`

Get a column

```
USAGE
  $ cen column get [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Column

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get a column
```

_See code: [src/commands/column/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/get.ts)_

## `cen column nullable [TABLE] [COLUMN] [NULLABLE]`

Set column to nullable

```
USAGE
  $ cen column nullable [TABLE] [COLUMN] [NULLABLE] [-h]

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

## `cen column rename [TABLE] [COLUMN] [NAME]`

Rename column

```
USAGE
  $ cen column rename [TABLE] [COLUMN] [NAME] [-h]

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

## `cen column type [TABLE] [COLUMN] [TYPE]`

Rename column

```
USAGE
  $ cen column type [TABLE] [COLUMN] [TYPE] [-h]

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

## `cen constraint drop [TABLE] [NAME]`

Drop a constraint

```
USAGE
  $ cen constraint drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   Name for constraint

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a constraint
```

_See code: [src/commands/constraint/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/constraint/drop.ts)_

## `cen constraint get`

```
USAGE
  $ cen constraint get
```

_See code: [src/commands/constraint/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/constraint/get.ts)_

## `cen help [COMMANDS]`

Display help for cen.

```
USAGE
  $ cen help [COMMANDS...] [-n]

ARGUMENTS
  COMMANDS...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.1/src/commands/help.ts)_

## `cen import PATH`

Import files to GC2. Set path to a file or folder, which will be compressed, uploaded and imported into GC2

```
USAGE
  $ cen import PATH [-s <value>] [-t <value>] [-d] [-h]

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

## `cen index drop [TABLE] [NAME]`

Add column

```
USAGE
  $ cen index drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   Name of index

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add column
```

_See code: [src/commands/index/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/index/drop.ts)_

## `cen index get`

```
USAGE
  $ cen index get
```

_See code: [src/commands/index/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/index/get.ts)_

## `cen login`

Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It's better to be prompt for the password

```
USAGE
  $ cen login [-h] [-p <value>] [-u <value>] [-f password|device|code]

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

## `cen privilege get [TABLE]`

Get privileges on table.

```
USAGE
  $ cen privilege get [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get privileges on table.
```

_See code: [src/commands/privilege/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/privilege/get.ts)_

## `cen privilege set [TABLE] [USER] [PRIVILEGES]`

Set privileges on table.

```
USAGE
  $ cen privilege set [TABLE] [USER] [PRIVILEGES] [-h]

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

## `cen rule drop [ID]`

Drop a rule.

```
USAGE
  $ cen rule drop [ID] [-h]

ARGUMENTS
  ID  Id of rule

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a rule.
```

_See code: [src/commands/rule/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/drop.ts)_

## `cen rule get [ID]`

Get rule(s).

```
USAGE
  $ cen rule get [ID] [-h]

ARGUMENTS
  ID  Rule id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get rule(s).
```

_See code: [src/commands/rule/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/get.ts)_

## `cen rule update [ID]`

Update rule rule

```
USAGE
  $ cen rule update [ID] [-p <value>] [-u <value>] [-s <value>] [-r <value>] [-c <value>] [-t <value>] [-i
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

## `cen schema drop [SCHEMA]`

Drop schema.

```
USAGE
  $ cen schema drop [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop schema.
```

_See code: [src/commands/schema/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/drop.ts)_

## `cen schema get [SCHEMA]`

Get list of tables in schema.

```
USAGE
  $ cen schema get [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get list of tables in schema.
```

_See code: [src/commands/schema/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/get.ts)_

## `cen schema rename [SCHEMA] [NAME]`

Rename schema

```
USAGE
  $ cen schema rename [SCHEMA] [NAME] [-h]

ARGUMENTS
  SCHEMA  Name of schema
  NAME    New name for schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename schema
```

_See code: [src/commands/schema/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/rename.ts)_

## `cen sql`

Run SQL statements. If run without --statement inactive mode will be enabled.

```
USAGE
  $ cen sql [-s <value>] [-c <value>] [-f <value>] [-p <value>] [-h]

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

## `cen stat`

Get usage statistics.

```
USAGE
  $ cen stat [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get usage statistics.
```

_See code: [src/commands/stat.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/stat.ts)_

## `cen table drop [TABLE]`

Drop table

```
USAGE
  $ cen table drop [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop table
```

_See code: [src/commands/table/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/drop.ts)_

## `cen table get [TABLE]`

Get table definition.

```
USAGE
  $ cen table get [TABLE] [-h] [--columns <value> | -x] [--filter <value>] [--no-header | [--csv |
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

## `cen table move [TABLE] [DESTINATION]`

Move table to another schema.

```
USAGE
  $ cen table move [TABLE] [DESTINATION] [-h]

ARGUMENTS
  TABLE        Name of table
  DESTINATION  Destination schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Move table to another schema.
```

_See code: [src/commands/table/move.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/move.ts)_

## `cen table rename [TABLE] [NAME]`

Rename table.

```
USAGE
  $ cen table rename [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   New name for table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename table.
```

_See code: [src/commands/table/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/rename.ts)_

## `cen update [CHANNEL]`

update the cen CLI

```
USAGE
  $ cen update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the cen CLI

EXAMPLES
  Update to the stable channel:

    $ cen update stable

  Update to a specific version:

    $ cen update --version 1.0.0

  Interactively select version:

    $ cen update --interactive

  See available versions:

    $ cen update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_

## `cen user drop [NAME]`

Drop existing user.

```
USAGE
  $ cen user drop [NAME] [-h]

ARGUMENTS
  NAME  Name of user to drop

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop existing user.
```

_See code: [src/commands/user/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/drop.ts)_

## `cen user get`

```
USAGE
  $ cen user get
```

_See code: [src/commands/user/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/get.ts)_

## `cen user update`

Update user

```
USAGE
  $ cen user update [-h] [-p <value>]

FLAGS
  -h, --help              Show CLI help.
  -p, --password=<value>  New password

DESCRIPTION
  Update user
```

_See code: [src/commands/user/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/update.ts)_
<!-- commandsstop -->
* [`centia admin`](#centia-admin)
* [`centia client add [NAME]`](#centia-client-add-name)
* [`centia client drop [ID]`](#centia-client-drop-id)
* [`centia client get [ID]`](#centia-client-get-id)
* [`centia client update [ID]`](#centia-client-update-id)
* [`centia column add [TABLE] [COLUMN] [TYPE]`](#centia-column-add-table-column-type)
* [`centia column default [TABLE] [COLUMN] [DEFAULT]`](#centia-column-default-table-column-default)
* [`centia column drop [TABLE] [COLUMN]`](#centia-column-drop-table-column)
* [`centia column get [TABLE] [COLUMN]`](#centia-column-get-table-column)
* [`centia column nullable [TABLE] [COLUMN] [NULLABLE]`](#centia-column-nullable-table-column-nullable)
* [`centia column rename [TABLE] [COLUMN] [NAME]`](#centia-column-rename-table-column-name)
* [`centia column type [TABLE] [COLUMN] [TYPE]`](#centia-column-type-table-column-type)
* [`centia connect`](#centia-connect)
* [`centia constraint add [TABLE] [COLUMNS] [TYPE] [NAME]`](#centia-constraint-add-table-columns-type-name)
* [`centia constraint drop [TABLE] [NAME]`](#centia-constraint-drop-table-name)
* [`centia constraint get`](#centia-constraint-get)
* [`centia foreign drop SCHEMAS [INCLUDE]`](#centia-foreign-drop-schemas-include)
* [`centia foreign import SERVER FROM TO [INCLUDE]`](#centia-foreign-import-server-from-to-include)
* [`centia foreign materialize FROM [TO] [INCLUDE]`](#centia-foreign-materialize-from-to-include)
* [`centia grid`](#centia-grid)
* [`centia help [COMMANDS]`](#centia-help-commands)
* [`centia import PATH`](#centia-import-path)
* [`centia index add [TABLE] [COLUMNS] [METHOD] [NAME]`](#centia-index-add-table-columns-method-name)
* [`centia index drop [TABLE] [NAME]`](#centia-index-drop-table-name)
* [`centia index get`](#centia-index-get)
* [`centia login`](#centia-login)
* [`centia privilege get [TABLE]`](#centia-privilege-get-table)
* [`centia privilege set [TABLE] [USER] [PRIVILEGES]`](#centia-privilege-set-table-user-privileges)
* [`centia rule add`](#centia-rule-add)
* [`centia rule drop [ID]`](#centia-rule-drop-id)
* [`centia rule get [ID]`](#centia-rule-get-id)
* [`centia rule update [ID]`](#centia-rule-update-id)
* [`centia scheduler start JOB [INCLUDE]`](#centia-scheduler-start-job-include)
* [`centia scheduler status`](#centia-scheduler-status)
* [`centia schema add [SCHEMA]`](#centia-schema-add-schema)
* [`centia schema drop [SCHEMA]`](#centia-schema-drop-schema)
* [`centia schema get [SCHEMA]`](#centia-schema-get-schema)
* [`centia schema rename [SCHEMA] [NAME]`](#centia-schema-rename-schema-name)
* [`centia seed list`](#centia-seed-list)
* [`centia seed log`](#centia-seed-log)
* [`centia seed start`](#centia-seed-start)
* [`centia seed stop`](#centia-seed-stop)
* [`centia sql`](#centia-sql)
* [`centia stat`](#centia-stat)
* [`centia symbol PATH`](#centia-symbol-path)
* [`centia table add [TABLE]`](#centia-table-add-table)
* [`centia table drop [TABLE]`](#centia-table-drop-table)
* [`centia table get [TABLE]`](#centia-table-get-table)
* [`centia table move [TABLE] [DESTINATION]`](#centia-table-move-table-destination)
* [`centia table rename [TABLE] [NAME]`](#centia-table-rename-table-name)
* [`centia update [CHANNEL]`](#centia-update-channel)
* [`centia user add [NAME]`](#centia-user-add-name)
* [`centia user drop [NAME]`](#centia-user-drop-name)
* [`centia user get`](#centia-user-get)
* [`centia user update`](#centia-user-update)
* [`centia view backup SCHEMAS`](#centia-view-backup-schemas)
* [`centia view get SCHEMA`](#centia-view-get-schema)
* [`centia view refresh SCHEMAS [INCLUDE]`](#centia-view-refresh-schemas-include)
* [`centia view restore FROM [TO] [INCLUDE]`](#centia-view-restore-from-to-include)

## `centia admin`

Run administration task on the GC2 installation.

```
USAGE
  $ centia admin -t
    mapfiles|mapcachefile|qgisfiles|schema|migrations|diskcleanup|cachestats|cachecleanup|insertmeta

FLAGS
  -t, --task=<option>  (required) The task to run
                       <options:
                       mapfiles|mapcachefile|qgisfiles|schema|migrations|diskcleanup|cachestats|cachecleanup|insertmeta>

DESCRIPTION
  Run administration task on the GC2 installation.
```

_See code: [src/commands/admin.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/admin.ts)_

## `centia client add [NAME]`

Create new client

```
USAGE
  $ centia client add [NAME] [-n <value>] [-d <value>] [-r <value>] [-p <value>] [-h]

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

## `centia client drop [ID]`

Drop a client.

```
USAGE
  $ centia client drop [ID] [-h]

ARGUMENTS
  ID  Id of client

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a client.
```

_See code: [src/commands/client/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/drop.ts)_

## `centia client get [ID]`

Get client(s).

```
USAGE
  $ centia client get [ID] [-h]

ARGUMENTS
  ID  Client id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get client(s).
```

_See code: [src/commands/client/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/client/get.ts)_

## `centia client update [ID]`

Update a client.

```
USAGE
  $ centia client update [ID] [-d <value>] [-r <value>] [-p <value>] [-h]

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

## `centia column add [TABLE] [COLUMN] [TYPE]`

Add a new column

```
USAGE
  $ centia column add [TABLE] [COLUMN] [TYPE] [-h]

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

## `centia column default [TABLE] [COLUMN] [DEFAULT]`

Set default value for column

```
USAGE
  $ centia column default [TABLE] [COLUMN] [DEFAULT] [-h]

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

## `centia column drop [TABLE] [COLUMN]`

Drop a column

```
USAGE
  $ centia column drop [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Name of column to drop

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a column
```

_See code: [src/commands/column/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/drop.ts)_

## `centia column get [TABLE] [COLUMN]`

Get a column

```
USAGE
  $ centia column get [TABLE] [COLUMN] [-h]

ARGUMENTS
  TABLE   Name of table
  COLUMN  Column

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get a column
```

_See code: [src/commands/column/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/column/get.ts)_

## `centia column nullable [TABLE] [COLUMN] [NULLABLE]`

Set column to nullable

```
USAGE
  $ centia column nullable [TABLE] [COLUMN] [NULLABLE] [-h]

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

## `centia column rename [TABLE] [COLUMN] [NAME]`

Rename column

```
USAGE
  $ centia column rename [TABLE] [COLUMN] [NAME] [-h]

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

## `centia column type [TABLE] [COLUMN] [TYPE]`

Rename column

```
USAGE
  $ centia column type [TABLE] [COLUMN] [TYPE] [-h]

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

## `centia connect`

Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be prompted instead.

```
USAGE
  $ centia connect [-h] [-r] [-H <value>]

FLAGS
  -H, --host=<value>  Host
  -h, --help          Show CLI help.
  -r, --reset         Reset connection

DESCRIPTION
  Set connection. You can use flags to set host, database and user. If one or more flags are missing, you will be
  prompted instead.
```

_See code: [src/commands/connect.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/connect.ts)_

## `centia constraint add [TABLE] [COLUMNS] [TYPE] [NAME]`

Add a constraint

```
USAGE
  $ centia constraint add [TABLE] [COLUMNS] [TYPE] [NAME] [-h] [-t <value>] [-e <value>] [-c <value>]

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

## `centia constraint drop [TABLE] [NAME]`

Drop a constraint

```
USAGE
  $ centia constraint drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   Name for constraint

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a constraint
```

_See code: [src/commands/constraint/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/constraint/drop.ts)_

## `centia constraint get`

```
USAGE
  $ centia constraint get
```

_See code: [src/commands/constraint/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/constraint/get.ts)_

## `centia foreign drop SCHEMAS [INCLUDE]`

Drop all foreign tables in schema

```
USAGE
  $ centia foreign drop SCHEMAS [INCLUDE] [-h]

ARGUMENTS
  SCHEMAS  schemas for dropping (comma separated)
  INCLUDE  only drop named foreign tables. Comma separated

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop all foreign tables in schema
```

_See code: [src/commands/foreign/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/foreign/drop.ts)_

## `centia foreign import SERVER FROM TO [INCLUDE]`

Import schema from foreign server

```
USAGE
  $ centia foreign import SERVER FROM TO [INCLUDE] [-h]

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

## `centia foreign materialize FROM [TO] [INCLUDE]`

Create mat views from foreign tables

```
USAGE
  $ centia foreign materialize FROM [TO] [INCLUDE] [-h] [-p <value>] [-s <value>]

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

## `centia grid`

Add a fishnet grid from an input polygon.

```
USAGE
  $ centia grid -t <value> -e <value> -s <value> [-h]

FLAGS
  -e, --extent=<value>  (required) Polygon table which should be used for extent
  -h, --help            Show CLI help.
  -s, --size=<value>    (required) Cell size in map units
  -t, --table=<value>   (required) Name of the new fishnet table

DESCRIPTION
  Add a fishnet grid from an input polygon.
```

_See code: [src/commands/grid.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/grid.ts)_

## `centia help [COMMANDS]`

Display help for centia.

```
USAGE
  $ centia help [COMMANDS...] [-n]

ARGUMENTS
  COMMANDS...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for centia.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.1/src/commands/help.ts)_

## `centia import PATH`

Import files to GC2. Set path to a file or folder, which will be compressed, uploaded and imported into GC2

```
USAGE
  $ centia import PATH [-s <value>] [-t <value>] [-d] [-h]

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

## `centia index add [TABLE] [COLUMNS] [METHOD] [NAME]`

Add index

```
USAGE
  $ centia index add [TABLE] [COLUMNS] [METHOD] [NAME] [-u] [-h]

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

## `centia index drop [TABLE] [NAME]`

Add column

```
USAGE
  $ centia index drop [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   Name of index

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Add column
```

_See code: [src/commands/index/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/index/drop.ts)_

## `centia index get`

```
USAGE
  $ centia index get
```

_See code: [src/commands/index/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/index/get.ts)_

## `centia login`

Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the commandline is considered insecure. It's better to be prompt for the password

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
  Sign in to GC2. You can set the connect options beforehand using the `connect` command. Providing the password on the
  commandline is considered insecure. It's better to be prompt for the password
```

_See code: [src/commands/login.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/login.ts)_

## `centia privilege get [TABLE]`

Get privileges on table.

```
USAGE
  $ centia privilege get [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get privileges on table.
```

_See code: [src/commands/privilege/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/privilege/get.ts)_

## `centia privilege set [TABLE] [USER] [PRIVILEGES]`

Set privileges on table.

```
USAGE
  $ centia privilege set [TABLE] [USER] [PRIVILEGES] [-h]

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

## `centia rule add`

Create new rule

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
  Create new rule
```

_See code: [src/commands/rule/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/add.ts)_

## `centia rule drop [ID]`

Drop a rule.

```
USAGE
  $ centia rule drop [ID] [-h]

ARGUMENTS
  ID  Id of rule

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop a rule.
```

_See code: [src/commands/rule/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/drop.ts)_

## `centia rule get [ID]`

Get rule(s).

```
USAGE
  $ centia rule get [ID] [-h]

ARGUMENTS
  ID  Rule id

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get rule(s).
```

_See code: [src/commands/rule/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/rule/get.ts)_

## `centia rule update [ID]`

Update rule rule

```
USAGE
  $ centia rule update [ID] [-p <value>] [-u <value>] [-s <value>] [-r <value>] [-c <value>] [-t <value>] [-i
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

## `centia scheduler start JOB [INCLUDE]`

Starts a scheduler job

```
USAGE
  $ centia scheduler start JOB [INCLUDE] [-h] [-n <value>] [-f]

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

## `centia scheduler status`

Get jobs in progress

```
USAGE
  $ centia scheduler status [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get jobs in progress
```

_See code: [src/commands/scheduler/status.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/scheduler/status.ts)_

## `centia schema add [SCHEMA]`

Create a new schema

```
USAGE
  $ centia schema add [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of new schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new schema
```

_See code: [src/commands/schema/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/add.ts)_

## `centia schema drop [SCHEMA]`

Drop schema.

```
USAGE
  $ centia schema drop [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop schema.
```

_See code: [src/commands/schema/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/drop.ts)_

## `centia schema get [SCHEMA]`

Get list of tables in schema.

```
USAGE
  $ centia schema get [SCHEMA] [-h]

ARGUMENTS
  SCHEMA  Name of schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get list of tables in schema.
```

_See code: [src/commands/schema/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/get.ts)_

## `centia schema rename [SCHEMA] [NAME]`

Rename schema

```
USAGE
  $ centia schema rename [SCHEMA] [NAME] [-h]

ARGUMENTS
  SCHEMA  Name of schema
  NAME    New name for schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename schema
```

_See code: [src/commands/schema/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/schema/rename.ts)_

## `centia seed list`

List running seed jobs

```
USAGE
  $ centia seed list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List running seed jobs
```

_See code: [src/commands/seed/list.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/list.ts)_

## `centia seed log`

Logs

```
USAGE
  $ centia seed log -u <value> [-h]

FLAGS
  -h, --help          Show CLI help.
  -u, --uuid=<value>  (required) UUID of seed job

DESCRIPTION
  Logs
```

_See code: [src/commands/seed/log.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/log.ts)_

## `centia seed start`

Starts a seed job

```
USAGE
  $ centia seed start -n <value> -l <value> -g <value> -s <value> -e <value> -x <value> [-h] [-t <value>] [-f]

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

## `centia seed stop`

Stops a seed job

```
USAGE
  $ centia seed stop -u <value> [-h]

FLAGS
  -h, --help          Show CLI help.
  -u, --uuid=<value>  (required) UUID of seed job

DESCRIPTION
  Stops a seed job
```

_See code: [src/commands/seed/stop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/seed/stop.ts)_

## `centia sql`

Run SQL statements. If run without --statement inactive mode will be enabled.

```
USAGE
  $ centia sql [-s <value>] [-c <value>] [-f <value>] [-p <value>] [-h]

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

## `centia stat`

Get usage statistics.

```
USAGE
  $ centia stat [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get usage statistics.
```

_See code: [src/commands/stat.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/stat.ts)_

## `centia symbol PATH`

Create a symbol file from a directory for use in Vidi Symbol extension

```
USAGE
  $ centia symbol PATH [-h] [-f <value>]

ARGUMENTS
  PATH  Path to directory with SVG files

FLAGS
  -f, --file=<value>  Output file name. If omitted the content will be printed
  -h, --help          Show CLI help.

DESCRIPTION
  Create a symbol file from a directory for use in Vidi Symbol extension
```

_See code: [src/commands/symbol.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/symbol.ts)_

## `centia table add [TABLE]`

Create a new table.

```
USAGE
  $ centia table add [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Create a new table.
```

_See code: [src/commands/table/add.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/add.ts)_

## `centia table drop [TABLE]`

Drop table

```
USAGE
  $ centia table drop [TABLE] [-h]

ARGUMENTS
  TABLE  Name of table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop table
```

_See code: [src/commands/table/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/drop.ts)_

## `centia table get [TABLE]`

Get table definition.

```
USAGE
  $ centia table get [TABLE] [-h] [--columns <value> | -x] [--filter <value>] [--no-header | [--csv |
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

## `centia table move [TABLE] [DESTINATION]`

Move table to another schema.

```
USAGE
  $ centia table move [TABLE] [DESTINATION] [-h]

ARGUMENTS
  TABLE        Name of table
  DESTINATION  Destination schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Move table to another schema.
```

_See code: [src/commands/table/move.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/move.ts)_

## `centia table rename [TABLE] [NAME]`

Rename table.

```
USAGE
  $ centia table rename [TABLE] [NAME] [-h]

ARGUMENTS
  TABLE  Name of table
  NAME   New name for table

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Rename table.
```

_See code: [src/commands/table/rename.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/table/rename.ts)_

## `centia update [CHANNEL]`

update the centia CLI

```
USAGE
  $ centia update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the centia CLI

EXAMPLES
  Update to the stable channel:

    $ centia update stable

  Update to a specific version:

    $ centia update --version 1.0.0

  Interactively select version:

    $ centia update --interactive

  See available versions:

    $ centia update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_

## `centia user add [NAME]`

Create new user.

```
USAGE
  $ centia user add [NAME] [-h] [-p <value>] [-e <value>] [-e <value>]

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

## `centia user drop [NAME]`

Drop existing user.

```
USAGE
  $ centia user drop [NAME] [-h]

ARGUMENTS
  NAME  Name of user to drop

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Drop existing user.
```

_See code: [src/commands/user/drop.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/drop.ts)_

## `centia user get`

```
USAGE
  $ centia user get
```

_See code: [src/commands/user/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/get.ts)_

## `centia user update`

Update user

```
USAGE
  $ centia user update [-h] [-p <value>]

FLAGS
  -h, --help              Show CLI help.
  -p, --password=<value>  New password

DESCRIPTION
  Update user
```

_See code: [src/commands/user/update.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/user/update.ts)_

## `centia view backup SCHEMAS`

Backup all (mat)views definitions in schema

```
USAGE
  $ centia view backup SCHEMAS [-h]

ARGUMENTS
  SCHEMAS  schemas for backup (comma separated)

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Backup all (mat)views definitions in schema
```

_See code: [src/commands/view/backup.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/backup.ts)_

## `centia view get SCHEMA`

Get "*" definitions from backup for schema

```
USAGE
  $ centia view get SCHEMA [-h]

ARGUMENTS
  SCHEMA  get star views for schema

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get "*" definitions from backup for schema
```

_See code: [src/commands/view/get.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/get.ts)_

## `centia view refresh SCHEMAS [INCLUDE]`

Refresh all materialized views in schema

```
USAGE
  $ centia view refresh SCHEMAS [INCLUDE] [-h]

ARGUMENTS
  SCHEMAS  comma separated list of schemas
  INCLUDE  only include named views in restore. Comma separated

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Refresh all materialized views in schema
```

_See code: [src/commands/view/refresh.ts](https://github.com/mapcentia/gc2-cli/blob/v2024.6.0/src/commands/view/refresh.ts)_

## `centia view restore FROM [TO] [INCLUDE]`

Restore all (mat)views definitions from schema

```
USAGE
  $ centia view restore FROM [TO] [INCLUDE] [-h]

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
