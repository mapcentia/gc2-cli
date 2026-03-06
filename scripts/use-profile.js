#!/usr/bin/env node
/**
 * Applies a publish profile on top of package.json.
 *
 * Usage:
 *   node scripts/use-profile.js <profile>   — apply profile (gc2 | centia)
 *   node scripts/use-profile.js --restore   — restore original package.json
 *
 * The original package.json is saved as package.json.bak before any changes.
 * The active profile name is written to .active-profile so other scripts
 * (like prepack) know which profile is in effect.
 */

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const pkgPath = path.join(root, 'package.json')
const bakPath = path.join(root, 'package.json.bak')
const activePath = path.join(root, '.active-profile')

// ── Restore mode ──────────────────────────────────────────────────────
if (process.argv.includes('--restore')) {
  if (fs.existsSync(bakPath)) {
    fs.copyFileSync(bakPath, pkgPath)
    fs.unlinkSync(bakPath)
  }
  if (fs.existsSync(activePath)) fs.unlinkSync(activePath)
  console.log('  ● Restored package.json')
  process.exit(0)
}

// ── Apply mode ────────────────────────────────────────────────────────
const profileName = process.argv[2]
if (!profileName) {
  console.error('Usage: node scripts/use-profile.js <gc2|centia>')
  process.exit(1)
}

const profilePath = path.join(root, 'profiles', `${profileName}.json`)
if (!fs.existsSync(profilePath)) {
  console.error(`Profile not found: profiles/${profileName}.json`)
  process.exit(1)
}

const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'))
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

// Back up the original (only if not already backed up)
if (!fs.existsSync(bakPath)) {
  fs.copyFileSync(pkgPath, bakPath)
}

// Keys that should be replaced entirely, not merged
const replaceKeys = new Set(['bin'])

// Deep-merge profile into package.json (one level deep is enough)
for (const [key, value] of Object.entries(profile)) {
  if (key === 'commands') continue // handled separately
  if (!replaceKeys.has(key) && typeof value === 'object' && !Array.isArray(value) && typeof pkg[key] === 'object') {
    pkg[key] = { ...pkg[key], ...value }
  } else {
    pkg[key] = value
  }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
fs.writeFileSync(activePath, profileName)

console.log(`  ● Applied profile: ${profileName}`)
console.log(`    name: ${pkg.name}`)
console.log(`    bin:  ${Object.keys(pkg.bin)[0]}`)

// If profile has a commands whitelist, write it for whitelist-commands.js
if (profile.commands) {
  console.log(`    commands: ${profile.commands.length} whitelisted`)
}
