/**
 * One-off: create/refresh the Services page, services and case studies
 * without re-seeding (keeps everything else edited in the admin).
 * Run: npx payload run src/scripts/seed-services.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedServices } from '../seed/services'

const payload = await getPayload({ config })
await seedServices(payload)
payload.logger.info('✅ Services page seeded')
process.exit(0)
