import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { seedMissingPages } from '../seed/missingPages'

/**
 * Content, not schema: adds the Contact, Careers, FAQ, Blog, Resources, Privacy and Terms pages and
 * redirects from the old site's addresses. Skips anything that already exists, so it is safe on a
 * database where an editor created some of these by hand.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await seedMissingPages(payload, req)
}

/** Leaves the pages in place: by now editors may have changed them. Delete them in the admin if needed. */
export async function down(_: MigrateDownArgs): Promise<void> {}
