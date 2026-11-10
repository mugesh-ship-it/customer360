/**
 * One-off: fill in "SEO & tracking" and "Brand & design" without re-seeding
 * (keeps pages and media edited in the admin).
 * Run: npx payload run src/scripts/seed-seo.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedSeoAndDesign } from '../seed/seoAndDesign'

const payload = await getPayload({ config })
const byFile = async (filename: string) =>
  (await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, depth: 0 })).docs[0]?.id as number | undefined

await seedSeoAndDesign(payload, { logo: await byFile('logo-mark.webp'), shareImage: await byFile('cta-robot.webp') })
payload.logger.info('✅ SEO & design settings saved')
process.exit(0)
