#!/usr/bin/env node
/**
 * Removes compiled command files from lib/commands/ that are NOT in the
 * active profile's command whitelist.
 *
 * Reads whitelist from profiles/<active>.json → "commands" array.
 * If no profile is active or the profile has no "commands" key, all
 * commands are kept (GC2 full build).
 *
 * Whitelist entries:
 *   "login"      → keeps lib/commands/login.js (+ .d.ts, .js.map)
 *   "client/*"   → keeps everything under lib/commands/client/
 */

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const libCommandsDir = path.join(root, 'lib', 'commands')
const activePath = path.join(root, '.active-profile')

if (!fs.existsSync(libCommandsDir)) process.exit(0)

// Determine active profile
let commands = null
if (fs.existsSync(activePath)) {
  const profileName = fs.readFileSync(activePath, 'utf8').trim()
  const profilePath = path.join(root, 'profiles', `${profileName}.json`)
  if (fs.existsSync(profilePath)) {
    const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'))
    commands = profile.commands || null
  }
}

// No whitelist → keep everything
if (!commands) {
  console.log('  ○ No command whitelist — keeping all commands')
  process.exit(0)
}

// Build sets for exact files and directory prefixes
const whitelistFiles = new Set()
const whitelistDirs = new Set()

for (const entry of commands) {
  if (entry.endsWith('/*')) {
    whitelistDirs.add(entry.slice(0, -2))
  } else {
    whitelistFiles.add(entry + '.js')
    whitelistFiles.add(entry + '.d.ts')
    whitelistFiles.add(entry + '.js.map')
  }
}

function isWhitelisted(relPath) {
  if (whitelistFiles.has(relPath)) return true
  for (const dir of whitelistDirs) {
    if (relPath.startsWith(dir + path.sep)) return true
  }
  return false
}

let removed = 0

function prune(currentPath, relFromCommands) {
  const stats = fs.statSync(currentPath)
  if (stats.isDirectory()) {
    for (const entry of fs.readdirSync(currentPath)) {
      prune(path.join(currentPath, entry), path.join(relFromCommands, entry))
    }
    // Remove empty dirs
    if (fs.readdirSync(currentPath).length === 0 && currentPath !== libCommandsDir) {
      fs.rmdirSync(currentPath)
    }
    return
  }

  if (!isWhitelisted(relFromCommands)) {
    fs.unlinkSync(currentPath)
    removed++
  }
}

prune(libCommandsDir, '')
console.log(`  ● Pruned ${removed} files (whitelist: ${commands.length} entries)`)
