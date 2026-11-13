/**
 * Restore page layouts that are empty in the target database.
 *
 * Why: the production Postgres has the page records but no blocks for some pages (home, about,
 * products, services, ...). This copies the blocks from an export of the local CMS.
 *
 * Safe by design:
 *  - Only pages whose layout is EMPTY in the target are touched; pages with content are skipped.
 *  - Nothing is written unless APPLY=1. Without it you get a dry run.
 *  - Media ids differ between databases, so images are matched by filename. Other relations
 *    (case studies, products, services, team profiles, testimonials) are checked to exist by id.
 *    If anything can't be matched the page is skipped and listed, never half-written.
 *
 * 1. Export (local CMS running):
 *      curl -s "http://localhost:3000/api/pages?limit=100&depth=1&draft=false" | \
 *        python3 -c "import sys,json;d=json.load(sys.stdin)['docs'];json.dump([{'slug':p['slug'],'layout':p['layout']} for p in d],open('.migration/pages-layout.json','w'))"
 *    (already done: cms/.migration/pages-layout.json, git-ignored)
 * 2. Dry run against production (CMS dev server stopped):
 *      cd cms && DATABASE_URL='<production postgres url>' npm run restore:layouts
 * 3. Apply:
 *      cd cms && APPLY=1 DATABASE_URL='<production postgres url>' npm run restore:layouts
 */
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '@payload-config'

const FILE = process.env.LAYOUT_FILE || path.resolve('.migration/pages-layout.json')
const APPLY = process.env.APPLY === '1'
const RELATION_COLLECTIONS = ['case-studies', 'products', 'services', 'team-profiles', 'testimonials']

type Json = any

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
if (!/^postgres(ql)?:\/\//.test(url)) {
  console.error('DATABASE_URL must be the production postgres:// URL (a local SQLite file would restore nothing).')
  process.exit(1)
}
try {
  console.log(`Target database host: ${new URL(url).host}`)
} catch {}
console.log(APPLY ? 'MODE: APPLY (writing)\n' : 'MODE: dry run (nothing is written; add APPLY=1 to write)\n')

const exported: { slug: string; layout: Json[] }[] = JSON.parse(fs.readFileSync(FILE, 'utf8'))
const payload = await getPayload({ config })

const mediaCache = new Map<string, number | null>()
const mediaIdByFilename = async (filename: string) => {
  if (mediaCache.has(filename)) return mediaCache.get(filename)!
  // Exact filename first. Uploads re-created in production may have gained a numeric suffix
  // ("logo-sap.svg" -> "logo-sap-1.svg"), so fall back to that, lowest suffix first.
  const dot = filename.lastIndexOf('.')
  const base = dot > 0 ? filename.slice(0, dot) : filename
  const ext = dot > 0 ? filename.slice(dot) : ''
  const r = await payload.find({ collection: 'media', where: { filename: { like: base } }, limit: 50, depth: 0 })
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`^${escape(base)}(-\\d+)?${escape(ext)}$`)
  const candidates = r.docs
    .filter((d) => pattern.test(String(d.filename)))
    .sort((a, b) => (a.filename === filename ? -1 : b.filename === filename ? 1 : String(a.filename).localeCompare(String(b.filename), undefined, { numeric: true })))
  if (candidates.length > 1) console.log(`  note: ${filename} matches ${candidates.length} files in target, using ${candidates[0].filename}`)
  const id = (candidates[0]?.id as number | undefined) ?? null
  mediaCache.set(filename, id)
  return id
}
const relationOk = new Map<string, boolean>()
const relationExists = async (collection: string, id: number) => {
  const k = `${collection}:${id}`
  if (relationOk.has(k)) return relationOk.get(k)!
  const r = await payload.find({ collection: collection as any, where: { id: { equals: id } }, limit: 1, depth: 0 })
  relationOk.set(k, r.docs.length > 0)
  return r.docs.length > 0
}

/** Rewrite a depth-1 layout into ids valid in the target database. Collects problems instead of throwing. */
const remap = async (node: Json, problems: string[]): Promise<Json> => {
  if (Array.isArray(node)) return Promise.all(node.map((n) => remap(n, problems)))
  if (node && typeof node === 'object') {
    // A populated related document (has timestamps) → its id.
    if ('createdAt' in node && 'updatedAt' in node && 'id' in node) {
      if (node.filename && node.mimeType) {
        const id = await mediaIdByFilename(node.filename)
        if (id == null) problems.push(`media not found in target: ${node.filename}`)
        return id
      }
      // Non-media relation: identical ids in both databases (verified), so keep the id but confirm it exists.
      let found = false
      for (const c of RELATION_COLLECTIONS) {
        if (await relationExists(c, node.id)) {
          found = true
          break
        }
      }
      if (!found) problems.push(`related document id ${node.id} (${node.title || node.name || node.slug || '?'}) not found in target`)
      return node.id
    }
    const out: Json = {}
    for (const [k, v] of Object.entries(node)) out[k] = await remap(v, problems)
    return out
  }
  return node
}
let restored = 0
for (const page of exported) {
  const found = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1, depth: 0, draft: false })
  const doc = found.docs[0]
  if (!doc) {
    console.log(`- ${page.slug}: not in target, skipped`)
    continue
  }
  const current = (doc.layout as Json[] | null | undefined) ?? []
  if (current.length > 0) {
    console.log(`- ${page.slug}: already has ${current.length} blocks, left alone`)
    continue
  }
  if (!page.layout?.length) {
    console.log(`- ${page.slug}: nothing to restore from the export`)
    continue
  }
  const problems: string[] = []
  const layout = await remap(page.layout, problems)
  if (problems.length) {
    console.log(`- ${page.slug}: SKIPPED, ${problems.length} problem(s):`)
    for (const p of [...new Set(problems)]) console.log(`    · ${p}`)
    continue
  }
  if (!APPLY) {
    console.log(`- ${page.slug}: would restore ${layout.length} blocks`)
    continue
  }
  await payload.update({ collection: 'pages', id: doc.id, data: { layout }, draft: false })
  restored++
  console.log(`- ${page.slug}: restored ${layout.length} blocks`)
}

console.log(APPLY ? `\nDone. Restored ${restored} page(s). Trigger a site rebuild (Vercel → customer360-site → Redeploy).` : '\nDry run finished. Re-run with APPLY=1 to write.')
process.exit(0)
