/**
 * Services page content (Figma node 487:20391), plus the Services and
 * Case studies collections it shows. Used by the full seed and by
 * src/scripts/seed-services.ts (non-destructive: upserts by title/slug).
 */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'
import type { Page } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaDir = path.resolve(dirname, '../../seed/media')

type Block = NonNullable<Page['layout']>[number]
const stripIds = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stripIds)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).filter(([k]) => k !== 'id').map(([k, v]) => [k, stripIds(v)]))
      : value

const SERVICES = [
  { title: 'AI for Intelligent Decisions', file: 'service-decisions.svg', summary: 'Use AI strategy, governance, and insights to make smarter business choices.', alt: 'Brain above a glowing gear' },
  { title: 'AI Accelerators', file: 'service-accelerators.svg', summary: 'Pre-built frameworks that speed up AI implementation and orchestration.', alt: 'Robot rising out of a laptop' },
  { title: 'AI Data Migration', file: 'service-migration.svg', summary: 'Automate and optimize the movement of enterprise data with AI precision.', alt: 'Data moving between connected servers' },
  { title: 'AI Data Profiling & Mapping', file: 'service-profiling.svg', summary: 'Improve data quality and integrity through AI-driven profiling and mapping.', alt: 'Data blocks being mapped together' },
  { title: 'AI Digital Adoption', file: 'service-adoption.svg', summary: 'Drive faster software adoption through personalized, AI-powered experiences.', alt: 'Person guided through an app interface' },
  { title: 'AI End-User Enablement', file: 'service-enablement.svg', summary: 'Empower employees with adaptive learning and continuous readiness tools.', alt: 'Learner with an adaptive course on screen' },
  { title: 'AI Automated Testing', file: 'service-testing.svg', summary: 'Ensure seamless delivery with no-code AI test automation and cross-platform assurance.', alt: 'Automated checks running on a screen' },
]

const CASE_STUDIES = [
  { title: 'Accelerating Digital Adoption Across 20,000 Employees', service: 'AI Digital Adoption', tags: ['Human-Centric Enablement', 'AI-Powered Learning'] },
  { title: 'Reimagining Data Migration for a Global Retail Leader', service: 'AI Data Migration', tags: ['Enterprise Transformation', 'Automation at Scale'] },
  { title: 'Optimizing Quality Assurance with Intelligent Test Automation', service: 'AI Automated Testing', tags: ['Zero-Defect Delivery', 'Intelligent QA Framework'] },
]

export async function seedServices(payload: Payload) {
  const media = async (file: string, alt: string) => {
    const found = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1, depth: 0 })
    if (found.docs[0]) return found.docs[0].id as number
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(mediaDir, file) })
    return doc.id as number
  }
  const upsert = async <C extends 'services' | 'case-studies'>(collection: C, title: string, data: Record<string, unknown>) => {
    const existing = await payload.find({ collection, where: { title: { equals: title } }, limit: 1, depth: 0 })
    const doc = existing.docs[0]
      ? await payload.update({ collection, id: existing.docs[0].id, data: data as never })
      : await payload.create({ collection, data: data as never })
    return doc.id as number
  }

  // ---- services --------------------------------------------------------------
  const serviceIds: Record<string, number> = {}
  for (const s of SERVICES) {
    const illustration = await media(s.file, s.alt)
    serviceIds[s.title] = await upsert('services', s.title, { title: s.title, summary: s.summary, illustration })
  }

  // ---- case studies ----------------------------------------------------------
  const caseIds: number[] = []
  for (const c of CASE_STUDIES) {
    caseIds.push(
      await upsert('case-studies', c.title, { title: c.title, service: serviceIds[c.service], tags: c.tags.map((label) => ({ label })) }),
    )
  }

  // ---- page --------------------------------------------------------------------
  const heroDecor = await media('hero-union.svg', '')
  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  const fromHome = (type: Block['blockType']) => {
    const b = home?.layout?.find((x) => x.blockType === type)
    return b ? [stripIds(b) as Block] : []
  }

  const layout: Block[] = [
    {
      blockType: 'hero',
      tag: 'Our Services',
      heading: 'Intelligent Solutions for Enterprises',
      description: 'From automation to analytics, each of our services is built to accelerate digital transformation.',
      decorImage: heroDecor,
    },
    {
      blockType: 'serviceGrid',
      tag: 'Explore Our AI Suite',
      heading: 'A Unified Ecosystem of AI Solutions',
      services: SERVICES.map((s) => serviceIds[s.title]),
    },
    {
      blockType: 'caseStudies',
      tag: 'Success Stories',
      heading: 'Real Results. Proven Impact.',
      caseStudies: caseIds,
    },
    ...fromHome('logoMarquee'),
    ...fromHome('cta'),
  ]

  const data = {
    title: 'Services',
    slug: 'services',
    pageBackground: 'light' as const,
    layout,
    meta: {
      title: 'AI Services for Enterprises | Customer360',
      description:
        'AI decision intelligence, accelerators, data migration, data profiling, digital adoption, end-user enablement and automated testing — one unified AI ecosystem for the enterprise.',
      keyword: 'enterprise AI services',
    },
    seo: { pageType: 'CollectionPage' as const, breadcrumbLabel: 'Services', priority: 0.9, changeFrequency: 'monthly' as const },
  }

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'services' } }, limit: 1, depth: 0 })
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  else await payload.create({ collection: 'pages', data })
}
