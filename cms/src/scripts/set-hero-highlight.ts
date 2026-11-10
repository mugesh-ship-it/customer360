/**
 * One-off: set the Home hero's "Words to highlight" (animated gradient) without re-seeding.
 * Run: npx payload run src/scripts/set-hero-highlight.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
if (home?.layout) {
  const layout = home.layout.map((b) => (b.blockType === 'hero' && !b.highlight ? { ...b, highlight: 'Intelligent AI' } : b))
  await payload.update({ collection: 'pages', id: home.id, data: { layout } })
  payload.logger.info('✅ Home hero highlight set')
}
process.exit(0)
