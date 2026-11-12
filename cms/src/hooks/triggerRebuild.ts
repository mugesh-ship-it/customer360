import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

/**
 * Pings a deploy hook (Netlify/Vercel/Cloudflare) so the static Astro site
 * rebuilds after content changes. No-op when REBUILD_HOOK_URL is unset.
 * Every ping is awaited: on Vercel serverless an un-awaited fetch can be dropped when the request ends.
 * One ping per request: a bulk edit of 20 documents queues one deploy, not 20.
 */
const ping = async (req: PayloadRequest) => {
  const url = process.env.REBUILD_HOOK_URL
  if (!url || req.context.rebuildPinged) return
  req.context.rebuildPinged = true
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
    await ping(req)
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
    if (live?._status !== 'published') await ping(req)
  }
  return doc
}

/**
 * Media rebuilds when an existing file changes: its alt text, focal point, or the file itself. The site
 * embeds Blob URLs, and replacing a file deletes the old blob, so pages keep showing a broken image
 * until they are rebuilt. A new upload is not on any page yet, so it does not rebuild; picking it in a
 * page and publishing does.
 */
export const triggerRebuildOnMediaChange: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'update') await ping(req)
  return doc
}

export const triggerRebuildOnDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await ping(req)
  return doc
}

export const triggerRebuildGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
  await ping(req)
  return doc
}
