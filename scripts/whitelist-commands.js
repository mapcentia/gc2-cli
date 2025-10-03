const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const libCommandsDir = path.join(projectRoot, 'lib', 'commands');

// Whitelisted command paths relative to lib/commands (exact files)
const whitelistFiles = new Set([
  'login.js',
  'logout.js',
  'import.js',
  'sql.js',
  'connect.js',
]);

// Whitelisted directories (relative to lib/commands). All files under these are kept.
const whitelistDirs = new Set([
  'client',
  'column',
  'constraint',
  'index',
  'privilege',
  'rule',
  'schema',
  'table',
  'user',
]);

function isWhitelisted(jsRelative) {
  // Exact file match
  if (whitelistFiles.has(jsRelative)) return true;

  // Directory (prefix) match
  for (const dir of whitelistDirs) {
    const prefix = dir.endsWith(path.sep) ? dir : dir + path.sep;
    if (jsRelative.startsWith(prefix)) return true;
  }
  return false;
}

function removeIfNotWhitelisted(currentPath, relativeFromCommands) {
  const stats = fs.statSync(currentPath);
  if (stats.isDirectory()) {
    const entries = fs.readdirSync(currentPath);
    for (const entry of entries) {
      const child = path.join(currentPath, entry);
      const rel = path.join(relativeFromCommands, entry);
      removeIfNotWhitelisted(child, rel);
    }
    // After processing children, if directory is now empty and not a whitelisted file path, remove it
    const remaining = fs.readdirSync(currentPath);
    if (remaining.length === 0 && currentPath !== libCommandsDir) {
      fs.rmdirSync(currentPath);
    }
    return;
  }

  // For files: keep only .js and .map associated with whitelisted modules; remove others
  const isMap = currentPath.endsWith('.map');
  const jsRelative = isMap ? relativeFromCommands.replace(/\.map$/, '') : relativeFromCommands;

  // ... existing code ...
  const baseIsWhitelisted = isWhitelisted(jsRelative);

  if (baseIsWhitelisted) {
    // Keep the .js file; also keep its .map if present
    return;
  }

  // Not in whitelist -> remove file
  try {
    fs.unlinkSync(currentPath);
  } catch (e) {
    // ignore
  }
}

if (!fs.existsSync(libCommandsDir)) {
  process.exit(0);
}

removeIfNotWhitelisted(libCommandsDir, '');
