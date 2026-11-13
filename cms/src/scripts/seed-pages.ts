/** Local: add the Contact, Careers, FAQ, Blog, Resources, Privacy and Terms pages if they are missing. */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedMissingPages } from '../seed/missingPages'

const payload = await getPayload({ config })
await seedMissingPages(payload)
process.exit(0)
