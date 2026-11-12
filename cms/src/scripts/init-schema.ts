/** Starts Payload once so it pushes the current schema to DATABASE_URL (used by scripts/rebuild-local-db.mjs). */
import { getPayload } from 'payload'
import config from '@payload-config'

await getPayload({ config })
process.exit(0)
