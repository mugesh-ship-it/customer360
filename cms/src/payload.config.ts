import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Testimonials } from './collections/Testimonials'
import { Redirects } from './collections/Redirects'
import { TeamProfiles } from './collections/TeamProfiles'
import { Services } from './collections/Services'
import { CaseStudies } from './collections/CaseStudies'
import { Products } from './collections/Products'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Design } from './globals/Design'
import { CaseStudyPage } from './globals/CaseStudyPage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Origins allowed to read the API (the Astro site). Use "*" locally so any dev
// port works (media is public); list real domains in production.
const siteOrigins = (process.env.SITE_ORIGINS || 'http://localhost:4321').split(',').map((s) => s.trim())
const corsOrigins = siteOrigins.includes('*') ? '*' : siteOrigins
const csrfOrigins = siteOrigins.filter((o) => o !== '*')

// Postgres (Neon) in production, the local SQLite file in development.
const databaseURL = process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
const usePostgres = /^postgres(ql)?:\/\//.test(databaseURL)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Customer360 CMS', icons: [{ url: '/admin/logo-mark.webp' }] },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      beforeDashboard: ['/components/admin/Welcome#Welcome'],
    },
  },
  collections: [Pages, Services, Products, CaseStudies, Testimonials, TeamProfiles, Media, Redirects, Users],
  globals: [Header, Footer, SiteSettings, Design, CaseStudyPage],
  cors: corsOrigins,
  csrf: csrfOrigins,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: databaseURL },
        migrationDir: path.resolve(dirname, 'migrations'),
        allowIDOnCreate: true,
      })
    : sqliteAdapter({ client: { url: databaseURL } }),
  sharp,
  plugins: [
    // Uploads go to Vercel Blob when a token is set (production); otherwise to ./media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
