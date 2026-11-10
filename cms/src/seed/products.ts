/**
 * Products page (Figma node 586:115), plus the Products collection and the
 * testimonial it features. Used by the full seed and by
 * src/scripts/seed-products.ts (non-destructive: upserts by name/slug).
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

const PRODUCTS = ['Product 1', 'Product 2', 'Product 3', 'Product 4']
const PRODUCT_SUMMARY = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'

export async function seedProducts(payload: Payload) {
  const media = async (file: string, alt: string) => {
    const found = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1, depth: 0 })
    if (found.docs[0]) return found.docs[0].id as number
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(mediaDir, file) })
    return doc.id as number
  }
  const upsert = async (collection: 'products' | 'testimonials', where: Record<string, unknown>, data: Record<string, unknown>) => {
    const existing = await payload.find({ collection, where: where as never, limit: 1, depth: 0 })
    const doc = existing.docs[0]
      ? await payload.update({ collection, id: existing.docs[0].id, data: data as never })
      : await payload.create({ collection, data: data as never })
    return doc.id as number
  }

  const [heroPerson, productIcon, a1, a2, a3, a4, world, testimonialPerson, benefitsPhoto, automation, visibility, integration, scalable] =
    await Promise.all([
      media('products-hero-person.webp', 'Smiling man holding a laptop'),
      media('product-icon.svg', ''),
      media('avatar-1.jpg', 'Team member portrait'),
      media('avatar-2.jpg', 'Team member portrait'),
      media('avatar-3.jpg', 'Team member portrait'),
      media('avatar-4.jpg', 'Team member portrait'),
      media('avatar-world.svg', 'Globe'),
      media('products-testimonial-person.webp', 'Man in a denim shirt using a tablet'),
      media('products-benefits.webp', 'Businessman in a suit smiling at his laptop'),
      media('benefit-automation.svg', ''),
      media('benefit-visibility.svg', ''),
      media('benefit-integration.svg', ''),
      media('benefit-scalable.svg', ''),
    ])

  // ---- products ----------------------------------------------------------------
  const productIds: number[] = []
  for (const name of PRODUCTS) {
    productIds.push(await upsert('products', { name: { equals: name } }, { name, status: 'upcoming', summary: PRODUCT_SUMMARY, icon: productIcon }))
  }

  // ---- featured testimonial ------------------------------------------------------
  const testimonial = await upsert(
    'testimonials',
    { name: { equals: 'David Jacob' } },
    {
      name: 'David Jacob',
      role: 'Head of Data & Analytics',
      headline: 'Manual effort down 40%, with complete confidence.',
      quote:
        'Customer360 transformed our SAP operations end-to-end, reducing manual effort by 40% and helping our teams move faster with complete confidence.',
    },
  )

  // ---- page -------------------------------------------------------------------------
  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  const fromHome = (type: Block['blockType']) => {
    const b = home?.layout?.find((x) => x.blockType === type)
    return b ? [stripIds(b) as Block] : []
  }

  const layout: Block[] = [
    {
      blockType: 'hero',
      visualStyle: 'framed',
      tag: 'Products',
      heading: 'Our Next-Generation Enterprise Products',
      description: 'Customer360 is developing intelligent tools to simplify operations and accelerate transformation',
      decorImage: heroPerson,
    },
    {
      blockType: 'statement',
      background: 'surface',
      tag: 'Behind the Vision',
      text: 'We’re building enterprise products that make work simpler, smarter, and more connected, helping teams save time, reduce complexity, and unlock meaningful results all day, every day',
      highlights: 'simpler, smarter, | connected,',
      avatars: [a1, world, a2, a3, a4],
    },
    {
      blockType: 'productGrid',
      tag: 'Upcoming Products',
      heading: 'Next-Gen Tools',
      description:
        'We’re building intelligent, future-ready products crafted to simplify workflows, connect data, and elevate how enterprises operate at scale',
      products: productIds,
    },
    {
      blockType: 'featuredTestimonial',
      tag: 'Testimonial',
      heading: 'Proven Results with Customer360',
      testimonial,
      image: testimonialPerson,
    },
    {
      blockType: 'benefits',
      tag: 'Benefits',
      heading: 'Why Choose Our Products',
      image: benefitsPhoto,
      items: [
        { icon: automation, title: 'Intelligent Automation', description: 'Reduce manual effort with smart workflows that automate repetitive tasks and free teams to focus on high-value work.' },
        { icon: visibility, title: 'Real-Time Visibility', highlighted: true, description: 'Gain instant insights across systems with unified dashboards, accurate reporting, and always-up-to-date data.' },
        { icon: integration, title: 'Seamless Integration', description: 'Connect SAP, ERP, and AI tools effortlessly — ensuring your technology ecosystem works together without friction.' },
        { icon: scalable, title: 'Scalable for the Future', description: 'Built to support growth, enabling you to evolve processes, add capabilities, and expand globally without rework.' },
      ],
    },
    ...fromHome('cta'),
  ]

  const data = {
    title: 'Products',
    slug: 'products',
    pageBackground: 'light' as const,
    layout,
    meta: {
      title: 'Enterprise AI Products | Customer360',
      description:
        'Next-generation enterprise products from Customer360: intelligent automation, real-time visibility and seamless SAP, ERP and AI integration that scales.',
      keyword: 'enterprise AI products',
    },
    seo: { pageType: 'CollectionPage' as const, breadcrumbLabel: 'Products', priority: 0.8, changeFrequency: 'monthly' as const },
  }

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'products' } }, limit: 1, depth: 0 })
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  else await payload.create({ collection: 'pages', data })
}
