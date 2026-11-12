import crypto from 'node:crypto'
import type { Endpoint, PayloadRequest } from 'payload'

/**
 * Live preview of drafts on the Astro site.
 *
 * The admin shows `${SITE_URL}/preview/<collection>/<id>?exp=…&sig=…` beside the editor. That route
 * renders on request (the rest of the site stays static) and fetches the draft from `/api/preview-doc`,
 * passing the same signed parameters. Only this CMS can sign, and it only signs for logged-in editors,
 * so a preview link works without sharing a secret with the site, and it expires.
 */
export const PREVIEW_COLLECTIONS = ['pages', 'case-studies'] as const
type PreviewCollection = (typeof PREVIEW_COLLECTIONS)[number]

const DAY = 24 * 60 * 60 * 1000
const siteURL = () => (process.env.SITE_URL || 'http://localhost:4321').replace(/\/$/, '')
// Derived from PAYLOAD_SECRET so there is no extra secret to manage.
const key = () => crypto.createHash('sha256').update(`live-preview:${process.env.PAYLOAD_SECRET || ''}`).digest()

const sign = (collection: string, id: string, exp: number) =>
  crypto.createHmac('sha256', key()).update(`${collection}:${id}:${exp}`).digest('hex')

/**
 * Valid until the end of tomorrow (UTC). Rounded to the day so the URL stays the same while an editor
 * types; a changing URL would make the admin reload the preview frame on every autosave.
 */
const expiry = () => (Math.floor(Date.now() / DAY) + 2) * DAY

export const previewURL = (collection: PreviewCollection, id: string | number | undefined, req: PayloadRequest) => {
  if (!req.user || id === undefined || id === null || id === '') return null
  const exp = expiry()
  const qs = new URLSearchParams({ exp: String(exp), sig: sign(collection, String(id), exp) })
  return `${siteURL()}/preview/${collection}/${id}?${qs}`
}

const isPreviewCollection = (c: string | null): c is PreviewCollection =>
  (PREVIEW_COLLECTIONS as readonly string[]).includes(c ?? '')

/** GET /api/preview-doc?collection=&id=&exp=&sig= → the latest draft, populated like the site build. */
export const previewDocEndpoint: Endpoint = {
  path: '/preview-doc',
  method: 'get',
  handler: async (req) => {
    const params = req.searchParams
    const collection = params.get('collection')
    const id = params.get('id') ?? ''
    const exp = Number(params.get('exp'))
    const sig = params.get('sig') ?? ''

    const expected = isPreviewCollection(collection) && id ? sign(collection, id, exp) : ''
    const valid =
      expected.length > 0 &&
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) &&
      Number.isFinite(exp) &&
      exp > Date.now()
    if (!valid || !isPreviewCollection(collection)) {
      return Response.json({ error: 'This preview link is invalid or has expired. Reopen it from the CMS.' }, { status: 401 })
    }

    const doc = await req.payload.findByID({
      collection,
      id,
      draft: true,
      depth: 2,
      overrideAccess: true,
      disableErrors: true,
    })
    if (!doc) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(doc, { headers: { 'Cache-Control': 'no-store' } })
  },
}
