import { headersWithCors, type Endpoint } from 'payload'

const LIMITS = { firstName: 80, lastName: 80, email: 200, phone: 40, company: 160, message: 5000, page: 300 } as const
type Field = keyof typeof LIMITS
const REQUIRED: Field[] = ['firstName', 'lastName', 'email', 'company', 'message']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * POST /api/contact — the website's contact form. Accepts form data or JSON, stores the message in
 * Inbox → Contact messages. A hidden "website" field catches bots: if it is filled the request is
 * accepted but nothing is stored.
 */
export const contactEndpoint: Endpoint = {
  path: '/contact',
  method: 'post',
  handler: async (req) => {
    const reply = (body: object, status = 200) =>
      Response.json(body, { status, headers: headersWithCors({ headers: new Headers({ 'Cache-Control': 'no-store' }), req }) })

    let raw: Record<string, unknown> = {}
    try {
      const type = req.headers.get('content-type') ?? ''
      if (type.includes('application/json')) raw = ((await req.json?.()) ?? {}) as Record<string, unknown>
      else if (req.formData) raw = Object.fromEntries((await req.formData()).entries())
    } catch {
      return reply({ error: 'Could not read the form.' }, 400)
    }

    if (typeof raw.website === 'string' && raw.website.trim()) return reply({ ok: true })

    const data = {} as Record<Field, string>
    for (const key of Object.keys(LIMITS) as Field[]) {
      const value = typeof raw[key] === 'string' ? (raw[key] as string).trim() : ''
      if (value.length > LIMITS[key]) return reply({ error: `${key} is too long.` }, 400)
      data[key] = value
    }
    const missing = REQUIRED.filter((k) => !data[k])
    if (missing.length) return reply({ error: 'Please fill in every required field.', fields: missing }, 400)
    if (!EMAIL.test(data.email)) return reply({ error: 'Please enter a valid email address.', fields: ['email'] }, 400)

    await req.payload.create({ collection: 'contact-messages', data, overrideAccess: true })
    return reply({ ok: true })
  },
}
