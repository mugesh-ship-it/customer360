import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pings a deploy hook (Netlify/Vercel/Cloudflare) so the static Astro site
 * rebuilds after content changes. No-op when REBUILD_HOOK_URL is unset.
 */
const ping = async () => {
  const url = process.env.REBUILD_HOOK_URL
  if (!url) return
  try {
    await fetch(url, { method: 'POST' })
  } catch (err) {
    console.error('[rebuild hook] failed', err)
  }
}

export const triggerRebuild: CollectionAfterChangeHook = async ({ doc }) => {
  void ping()
  return doc
}

export const triggerRebuildGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  void ping()
  return doc
}
