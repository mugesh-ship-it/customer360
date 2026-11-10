/**
 * One-off: create/refresh the Case Studies page and the case studies (with
 * their stories) without re-seeding everything else.
 * Run: npx payload run src/scripts/seed-case-studies.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedCaseStudies } from '../seed/caseStudies'

const payload = await getPayload({ config })
await seedCaseStudies(payload)
payload.logger.info('✅ Case studies seeded')
process.exit(0)
