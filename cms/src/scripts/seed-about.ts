/**
 * One-off: create/refresh the About Us page and team profiles without
 * re-seeding (keeps everything else edited in the admin).
 * Run: npx payload run src/scripts/seed-about.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedAbout } from '../seed/about'

const payload = await getPayload({ config })
await seedAbout(payload)
payload.logger.info('✅ About page seeded')
process.exit(0)
