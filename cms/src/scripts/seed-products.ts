/**
 * One-off: create/refresh the Products page, products and featured testimonial
 * without re-seeding (keeps everything else edited in the admin).
 * Run: npx payload run src/scripts/seed-products.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedProducts } from '../seed/products'

const payload = await getPayload({ config })
await seedProducts(payload)
payload.logger.info('✅ Products page seeded')
process.exit(0)
