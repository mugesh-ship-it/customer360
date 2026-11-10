/**
 * One-off: create/refresh the "AI for Intelligent Decisions" service detail page
 * without re-seeding (keeps everything else edited in the admin).
 * Run: npx payload run src/scripts/seed-service-detail.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedServiceDetail } from '../seed/serviceDetail'

const payload = await getPayload({ config })
await seedServiceDetail(payload)
payload.logger.info('✅ Service detail page seeded')
process.exit(0)
