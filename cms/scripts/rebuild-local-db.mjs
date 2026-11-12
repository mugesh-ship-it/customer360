// Rebuilds the local SQLite database on the current schema, keeping every row.
//
// Local dev uses SQLite with automatic schema push. Some schema changes (turning on drafts, making
// fields optional) make Drizzle rebuild tables, and that fails part-way on SQLite
// ("index … already exists"). This creates a fresh database from the current config, copies all rows
// across, and swaps it in. Documents from before drafts existed are marked published.
//
// Stop the CMS dev server first, then:   cd cms && npm run db:rebuild-local
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import Database from 'libsql'
import dotenv from 'dotenv'

dotenv.config()
const url = process.env.DATABASE_URL || ''
if (!url.startsWith('file:')) {
  console.error(`[rebuild-local-db] Only for a local SQLite DATABASE_URL (file:…). Got: ${url.split(':')[0] || 'nothing'}.`)
  process.exit(1)
}
const dbPath = path.resolve(url.slice('file:'.length))
if (!fs.existsSync(dbPath)) {
  console.error(`[rebuild-local-db] ${dbPath} does not exist.`)
  process.exit(1)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backup = `${dbPath}.bak-${stamp}`
const fresh = `${dbPath}.fresh-${stamp}`
fs.copyFileSync(dbPath, backup)
console.log(`[rebuild-local-db] Backup: ${path.basename(backup)}`)

// 1. Empty database with the current schema (Payload pushes it on start-up).
const init = spawnSync('npx', ['payload', 'run', 'src/scripts/init-schema.ts'], {
  stdio: 'inherit',
  env: { ...process.env, DATABASE_URL: `file:${fresh}`, NODE_OPTIONS: '--no-deprecation' },
})
if (init.status !== 0) {
  fs.rmSync(fresh, { force: true })
  console.error('[rebuild-local-db] Could not create the new schema; your database is unchanged.')
  process.exit(1)
}

// 2. Copy every row of every table both databases share, column by column.
const db = new Database(fresh)
db.exec('PRAGMA foreign_keys = OFF')
db.exec(`ATTACH DATABASE '${backup.replaceAll("'", "''")}' AS old`)
const tables = (schema) =>
  db.prepare(`SELECT name FROM ${schema}.sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'`).all().map((r) => r.name)
const columns = (schema, table) => db.prepare(`PRAGMA ${schema}.table_info("${table}")`).all().map((r) => r.name)

const newTables = new Set(tables('main'))
let rows = 0
db.exec('BEGIN')
for (const table of tables('old')) {
  if (!newTables.has(table)) {
    console.warn(`[rebuild-local-db] Skipped table no longer in the schema: ${table}`)
    continue
  }
  const newCols = new Set(columns('main', table))
  const shared = columns('old', table).filter((c) => newCols.has(c))
  const dropped = columns('old', table).filter((c) => !newCols.has(c))
  if (dropped.length) console.warn(`[rebuild-local-db] ${table}: columns no longer in the schema: ${dropped.join(', ')}`)
  const list = shared.map((c) => `"${c}"`).join(', ')
  db.exec(`DELETE FROM main."${table}"`)
  rows += db.prepare(`INSERT INTO main."${table}" (${list}) SELECT ${list} FROM old."${table}"`).run().changes
}
// Documents saved before drafts existed have no status; they were live, so keep them live.
for (const table of ['pages', 'case_studies']) {
  if (!columns('old', table).includes('_status') && columns('main', table).includes('_status')) {
    db.exec(`UPDATE main."${table}" SET "_status" = 'published'`)
  }
}
db.exec('COMMIT')
const broken = db.prepare('PRAGMA main.foreign_key_check').all()
db.exec('DETACH DATABASE old')
db.close()
if (broken.length) {
  fs.rmSync(fresh, { force: true })
  console.error('[rebuild-local-db] Copied rows have broken references; your database is unchanged.', broken.slice(0, 5))
  process.exit(1)
}

// 3. Swap it in.
for (const suffix of ['-wal', '-shm']) fs.rmSync(dbPath + suffix, { force: true })
fs.renameSync(fresh, dbPath)
console.log(`[rebuild-local-db] Done: ${rows} rows copied into a fresh ${path.basename(dbPath)}. Start the CMS again.`)
