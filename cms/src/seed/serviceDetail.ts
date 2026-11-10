/**
 * Service detail page — "AI for Intelligent Decisions" (Figma node 487:20744).
 * Used by the full seed and by src/scripts/seed-service-detail.ts (non-destructive:
 * upserts the page by slug and reuses media by filename). Copy this page in the
 * admin to start another service's detail page.
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

export const SERVICE_DETAIL_SLUG = 'services/ai-for-intelligent-decisions'
const SERVICE_TITLE = 'AI for Intelligent Decisions'

export async function seedServiceDetail(payload: Payload) {
  const media = async (file: string, alt: string) => {
    const found = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1, depth: 0 })
    if (found.docs[0]) return found.docs[0].id as number
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(mediaDir, file) })
    return doc.id as number
  }

  const [hero, cardStrategy, cardGovernance, cardUseCases, faster, alignment, roi, ethical, risk, scalable, cloudLeft, cloudRight] =
    await Promise.all([
      media('service-decisions-hero.webp', 'A human hand reaching towards a robot hand'),
      media('service-card-strategy.svg', ''),
      media('service-card-governance.svg', ''),
      media('service-card-usecases.svg', ''),
      media('impact-faster.svg', ''),
      media('impact-alignment.svg', ''),
      media('impact-roi.svg', ''),
      media('impact-ethical.svg', ''),
      media('impact-risk.svg', ''),
      media('impact-scalable.svg', ''),
      media('about-cloud-left.webp', ''),
      media('about-cloud-right.webp', ''),
    ])

  // Shared sections are copied from the Home page so they stay identical.
  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  const fromHome = (type: Block['blockType']) => {
    const b = home?.layout?.find((x) => x.blockType === type)
    return b ? [stripIds(b) as Block] : []
  }

  const caseStudies = await payload.find({ collection: 'case-studies', limit: 20, depth: 0, sort: 'createdAt' })

  const layout: Block[] = [
    {
      blockType: 'hero',
      visualStyle: 'banner',
      tag: SERVICE_TITLE,
      heading: 'Smarter Decisions and Efficiencies Through the Fusion of People & AI',
      decorImage: hero,
      button: { label: 'Request a demo', url: '/contact', newTab: false },
    },
    ...fromHome('logoMarquee'),
    {
      blockType: 'splitIntro',
      tag: 'Understanding the Value',
      heading: 'Turning Complexity into Clarity',
      text: 'AI for Intelligent Decisions helps organizations combine AI intelligence with human judgment to make faster, fairer, and more strategic choices that drive impact.',
      imagePosition: 'right',
    },
    {
      blockType: 'iconCards',
      background: 'tint',
      tag: 'Strategic Foundation',
      heading: 'A Structured Path to AI Adoption',
      cards: [
        { icon: cardStrategy, title: 'AI Strategy Framework', description: 'Define your AI vision and align it with business goals for measurable, sustainable value' },
        { icon: cardGovernance, title: 'AI Governance & Ethics', description: 'Ensure transparency, and accountability through responsible AI principles' },
        { icon: cardUseCases, title: 'AI Use Cases', description: 'Apply AI to real-world scenarios that drive measurable impact and innovation' },
      ],
    },
    {
      blockType: 'approach',
      arrangement: 'imageLeft',
      tag: 'Our Approach',
      heading: 'How We Deliver',
      items: [
        { title: 'Discovery & Assessment', description: 'Map your decision processes, data readiness, and the opportunities where AI adds the most value.' },
        { title: 'Framework Design', description: 'Define your AI strategy, governance model, and success metrics.' },
        { title: 'Implementation', description: 'Deploy decision models and workflows alongside your teams, with people kept in the loop.' },
        { title: 'Continuous Optimization', description: 'Monitor outcomes, retrain models, and refine the framework as your business evolves.' },
      ],
    },
    {
      blockType: 'iconList',
      tag: 'The impact',
      heading: 'Why Intelligent Decision Making Matters',
      backgroundLeft: cloudLeft,
      backgroundRight: cloudRight,
      items: [
        { icon: faster, title: 'Faster, Smarter Decisions', description: 'Accelerate decision cycles with AI-driven insights that process data in real time, helping leaders act with precision and speed.' },
        { icon: alignment, title: 'Strategic Alignment', description: 'Connect AI initiatives with business objectives, ensuring technology investments directly support measurable enterprise goals' },
        { icon: roi, title: 'Measurable ROI & Efficiency', description: 'Optimize performance and resource allocation through data-driven insights that maximize returns and minimize waste.' },
        { icon: ethical, title: 'Responsible & Ethical AI', description: 'Build trust with governance frameworks that ensure transparency, fairness, and accountability in every model and outcome.' },
        { icon: risk, title: 'Risk Reduction & Compliance', description: 'Leverage predictive intelligence to identify risks early, enhance compliance, and maintain operational stability.' },
        { icon: scalable, title: 'Scalable Intelligence Foundation', description: 'Establish a flexible AI ecosystem that grows with your business, enabling continuous learning, adaptation, and improvement.' },
      ],
    },
    {
      blockType: 'caseStudies',
      tag: 'Success Stories',
      heading: 'Real Results. Proven Impact.',
      caseStudies: caseStudies.docs.map((d) => d.id as number),
    },
    { blockType: 'divider', nodes: '1', lineUp: true, lineDown: true },
    ...fromHome('cta'),
  ]

  const data = {
    title: SERVICE_TITLE,
    slug: SERVICE_DETAIL_SLUG,
    pageBackground: 'light' as const,
    layout,
    meta: {
      title: 'AI for Intelligent Decisions | Customer360',
      description:
        'Combine AI insight with human judgement: AI strategy, governance and use cases that help leaders make faster, fairer, more strategic decisions.',
      keyword: 'AI decision intelligence',
    },
    seo: { pageType: 'ItemPage' as const, breadcrumbLabel: SERVICE_TITLE, priority: 0.8, changeFrequency: 'monthly' as const },
  }

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: SERVICE_DETAIL_SLUG } }, limit: 1, depth: 0 })
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  else await payload.create({ collection: 'pages', data })

  // Point the service card at its new page.
  const service = await payload.find({ collection: 'services', where: { title: { equals: SERVICE_TITLE } }, limit: 1, depth: 0 })
  if (service.docs[0]) await payload.update({ collection: 'services', id: service.docs[0].id, data: { url: `/${SERVICE_DETAIL_SLUG}` } })
}
