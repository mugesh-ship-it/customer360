/**
 * Step 2: load .migration/data.json into an empty Postgres database, keeping IDs.
 * Media files are re-uploaded from ./media (to Vercel Blob when BLOB_READ_WRITE_TOKEN is set).
 * Run: DATABASE_URL=postgres://… BLOB_READ_WRITE_TOKEN=… npx payload run src/scripts/migrate-to-postgres/import.ts
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@payload-config'

type Doc = Record<string, any> & { id: number }
const data = JSON.parse(fs.readFileSync(path.resolve('.migration/data.json'), 'utf8')) as {
  collections: Record<string, Doc[]>
  globals: Record<string, Doc>
}

const payload = await getPayload({ config })

// Media first (everything else points at it), users next, the rest after.
const order = ['media', 'users', ...Object.keys(data.collections).filter((s) => s !== 'media' && s !== 'users')]
const strip = ({ createdAt, updatedAt, ...rest }: Doc) => ({ ...rest, createdAt, updatedAt })

let pending: { slug: string; doc: Doc }[] = []
for (const slug of order) for (const doc of data.collections[slug] ?? []) pending.push({ slug, doc })

const insert = async ({ slug, doc }: { slug: string; doc: Doc }) => {
  const exists = await payload.db.findOne({ collection: slug, where: { id: { equals: doc.id } } })
  if (exists) return
  if (slug === 'media') {
    const file = [path.resolve('media', doc.filename), path.resolve('seed/media', doc.filename)].find((f) => fs.existsSync(f))!
    const { url, thumbnailURL, sizes, filename, filesize, width, height, mimeType, ...fields } = doc
    await payload.create({ collection: 'media', data: fields, filePath: file, overrideAccess: true })
  } else {
    const { sessions, ...fields } = doc
    await payload.db.create({ collection: slug, data: strip(fields) })
  }
}

// Retry in passes so any cross-references between collections resolve.
for (let pass = 1; pending.length && pass <= 5; pass++) {
  const failed: typeof pending = []
  for (const item of pending) {
    try {
      await insert(item)
    } catch (err) {
      failed.push(item)
      if (pass === 5) console.error(`✗ ${item.slug}#${item.doc.id}:`, (err as Error).message)
    }
  }
  console.log(`pass ${pass}: ${pending.length - failed.length} inserted, ${failed.length} pending`)
  pending = failed
}

for (const [slug, doc] of Object.entries(data.globals)) {
  const { id, globalType, createdAt, updatedAt, ...fields } = doc
  await payload.updateGlobal({ slug, data: fields, overrideAccess: true, context: { skipRebuild: true } })
  console.log(`global ${slug}`)
}

// Move every id sequence past the imported IDs.
const db = (payload.db as any).drizzle
const { rows } = await db.execute(sql`
  select table_name, column_name, pg_get_serial_sequence(quote_ident(table_name), column_name) as seq
  from information_schema.columns
  where table_schema = 'public' and column_default like 'nextval%'`)
for (const r of rows) {
  await db.execute(sql.raw(`select setval('${r.seq}', coalesce((select max("${r.column_name}") from "${r.table_name}"), 0) + 1, false)`))
}
console.log(`Reset ${rows.length} sequences. Done${pending.length ? ` with ${pending.length} failures` : ''}.`)
process.exit(pending.length ? 1 : 0)
