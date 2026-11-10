/**
 * Step 1 of moving the local SQLite content to Postgres.
 * Run against SQLite:  DATABASE_URL=file:./customer360.db npx payload run src/scripts/migrate-to-postgres/export.ts
 * Writes .migration/data.json (gitignored).
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const out: { collections: Record<string, unknown[]>; globals: Record<string, unknown> } = { collections: {}, globals: {} }

for (const c of payload.config.collections) {
  if (c.slug.startsWith('payload-')) continue
  const { docs } = await payload.find({ collection: c.slug, depth: 0, pagination: false, showHiddenFields: true, overrideAccess: true })
  out.collections[c.slug] = docs
  console.log(`${c.slug}: ${docs.length}`)
}
for (const g of payload.config.globals) {
  out.globals[g.slug] = await payload.findGlobal({ slug: g.slug, depth: 0, showHiddenFields: true, overrideAccess: true })
}

fs.mkdirSync('.migration', { recursive: true })
fs.writeFileSync(path.resolve('.migration/data.json'), JSON.stringify(out, null, 2))
console.log('Wrote .migration/data.json')
process.exit(0)
