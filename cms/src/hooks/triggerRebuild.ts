import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pings a deploy hook (Netlify/Vercel/Cloudflare) so the static Astro site
 * rebuilds after content changes. No-op when REBUILD_HOOK_URL is unset.
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

// Awaited: on Vercel serverless an un-awaited fetch can be dropped when the request ends.
export const triggerRebuild: CollectionAfterChangeHook = async ({ doc }) => {
  await ping()
  return doc
}

export const triggerRebuildGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  await ping()
  return doc
}
