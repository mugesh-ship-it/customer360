import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pings a deploy hook (Netlify/Vercel/Cloudflare) so the static Astro site
 * rebuilds after content changes. No-op when REBUILD_HOOK_URL is unset.
 * Every ping is awaited: on Vercel serverless an un-awaited fetch can be dropped when the request ends.
 */
const ping = async () => {
  const url = process.env.REBUILD_HOOK_URL
  if (!url) return
  try {
    await fetch(url, { method: 'POST', signal: AbortSignal.timeout(5000) })
  } catch (err) {
    console.error('[rebuild hook] failed', err)
  }
}

/**
 * Collections without drafts rebuild on every save. Collections with drafts rebuild only when
 * the live site changes: a publish or an unpublish. Saving a draft leaves the published record
 * untouched, so it does not rebuild.
 */
export const triggerRebuild: CollectionAfterChangeHook = async ({ collection, doc, previousDoc, req }) => {
  if (!collection.versions?.drafts || doc?._status === 'published') {
    await ping()
    return doc
  }
  // A draft save and an unpublish look alike here; only an unpublish moves the main record off "published".
  if (previousDoc?._status === 'published') {
    const live = (await req.payload.findByID({
      collection: collection.slug,
      id: doc.id,
      depth: 0,
      draft: false,
      overrideAccess: true,
      disableErrors: true,
      req,
    })) as { _status?: string } | null
    if (live?._status !== 'published') await ping()
  }
  return doc
}

export const triggerRebuildOnDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await ping()
  return doc
}

export const triggerRebuildGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  await ping()
  return doc
}
