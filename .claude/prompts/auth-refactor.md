# CLI auth refactor — migrate to shared SDK token provider + add `whoami`

## Context

Today, `src/centiaClient.ts` reimplements token expiry + refresh + writeback
to `Configstore('gc2-env')` directly. With a new `mcp-server` project also
reading the same configstore file, two independent implementations of the
same logic will race on refresh-token rotation and corrupt each other's
session.

The shared logic has been extracted into `@centia-io/sdk` as
`createTokenProvider` + `createConfigstoreTokenStore` (with file locking via
`proper-lockfile`). See `../gc2-js-client/.claude/prompts/auth-refactor.md`
for what was added there.

This prompt: migrate CLI to use it, plus add a `gc2 whoami` command.

## Prerequisite

`@centia-io/sdk` must be published with the new exports:
`createConfigstoreTokenStore`, `createTokenProvider`, `NotLoggedInError`,
`SessionExpiredError`. Bump the dep in `package.json` first.

## What to do

### 1. Replace token logic in `src/centiaClient.ts`

Current state (lines ~38-65): a manually written `getAccessToken` that reads
configstore, checks expiry via `isTokenExpired` from `util/utils`, calls
`createAuthService().getRefreshToken(...)`, writes back via `config.set`.

Replace with:

```ts
import {
  createConfigstoreTokenStore,
  createTokenProvider,
  NotLoggedInError,
  SessionExpiredError,
} from "@centia-io/sdk";

const tokenStore = createConfigstoreTokenStore("gc2-env"); // same name as today
const tokenProvider = createTokenProvider({
  store: tokenStore,
  authService: createAuthService(),
});

const getAccessToken = async (): Promise<string> => {
  try {
    return await tokenProvider.getAccessToken();
  } catch (e) {
    if (e instanceof NotLoggedInError) noLogin();
    if (e instanceof SessionExpiredError) {
      logToStderr("⚠️ Refresh token has expired. Please login again");
      exit(1);
    }
    throw e;
  }
};
```

Keep `createCliCentiaAdminClient` and `logCentiaErrorAndExit` unchanged; they
just call `getAccessToken` via the `auth` callback.

### 2. Update `src/commands/login.ts` to write via the same store

Currently `login.ts` writes individually with `config.set({token: ...})` etc.
That's fine — but switch to `tokenStore.set(...)` so writes go through the
file lock. This prevents a race where MCP server is mid-refresh while
`gc2 login` is overwriting tokens.

```ts
import {createConfigstoreTokenStore} from "@centia-io/sdk";
const tokenStore = createConfigstoreTokenStore("gc2-env");
// ...
await tokenStore.set({
  token: data.access_token,
  refresh_token: data.refresh_token,
});
// non-token fields (user, database, host, superUser) can stay on Configstore directly,
// or extend StoredCredentials in the SDK if you want everything routed through the lock.
```

### 3. Delete now-unused code

`isTokenExpired` in `src/util/utils.ts` — leave if used elsewhere; otherwise
remove. Run `grep -r isTokenExpired src/` to confirm.

### 4. Add `gc2 whoami` command

New file `src/commands/whoami.ts`. Prints current session:

```
Host      https://api.centia.io
User      mhogh
Database  fkg
Status    ✔ active   (or  ⚠ expired,  ✖ not logged in)
```

Implementation:
- Read configstore directly for `host`, `user`, `database`, `superUser`.
- Read token via `tokenStore.get()`. If absent → "not logged in". If present,
  decode with `jwtDecode` and compare `exp` to now → active or expired.
- Add `--json` flag for machine-readable output (used by mcp-server's startup
  banner): `{ host, user, database, superUser, status: "active"|"expired"|"none" }`.
- No flags besides `--json` and `--help`.

Add to oclif config; verify it shows up in `gc2 --help`.

### 5. Add `gc2 config path` (small but useful)

New file `src/commands/config.ts` (or `src/commands/config/path.ts` matching
existing nested-command style). Prints absolute path to the configstore
JSON file:

```ts
import Configstore from "configstore";
const config = new Configstore("gc2-env");
console.log(config.path);
```

Lets MCP server (and users) discover the file location without hardcoding
platform-specific paths.

### 6. Tests

- `test/commands/whoami.test.ts` — smoke test with a mocked store: returns
  active, expired, none correctly; `--json` shape.
- Existing tests for login flow should still pass — no behaviour change for
  end users.

## Don't break

- Don't change the configstore name (`gc2-env`) or schema. Existing users
  must stay logged in across the upgrade.
- Don't change command names, flags, or output format of existing commands —
  scripts in the wild depend on them.
- `createAuthService()` and `createCliCentiaAdminClient()` keep their
  signatures.

## Done = next steps

After this ships, MCP server prompt at
`../mcp-server/.claude/prompts/auth-refactor.md` can be executed: it will use
the same `createConfigstoreTokenStore("gc2-env")` and piggyback on the user's
`gc2 login` session.
