#!/usr/bin/env node
/**
 * Blocks npm pack/publish if package.json contains file: dependencies.
 */

const pkg = require('../package.json')

const bad = Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })
  .filter(([, v]) => v.startsWith('file:'))

if (bad.length) {
  console.error('\x1b[31mLocal file: deps found — update before publishing:\x1b[0m')
  bad.forEach(([k, v]) => console.error(`  ${k}: ${v}`))
  process.exit(1)
}
