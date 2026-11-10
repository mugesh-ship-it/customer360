/**
 * About Us page content (Figma node 481:16166) + the team profiles it shows.
 * Used by the full seed and by src/scripts/seed-about.ts (non-destructive).
 */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'
import type { Page } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaDir = path.resolve(dirname, '../../seed/media')

type Block = NonNullable<Page['layout']>[number]
/** Deep copy without row ids, so copied blocks get fresh ones. */
const stripIds = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stripIds)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).filter(([k]) => k !== 'id').map(([k, v]) => [k, stripIds(v)]))
      : value
const strip = (block: Block) => stripIds(block) as Block

export async function seedAbout(payload: Payload) {
  /** Reuse a media doc by filename, or upload it from seed/media. */
  const media = async (file: string, alt: string) => {
    const found = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1, depth: 0 })
    if (found.docs[0]) return found.docs[0].id as number
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(mediaDir, file) })
    return doc.id as number
  }

  const [heroDecor, alignment, confidence, ethics, handshake, approachArt] = await Promise.all([
    media('hero-union.svg', ''),
    media('mission-alignment.svg', 'Grid of linked circles'),
    media('mission-confidence.svg', 'Ring of dots radiating outwards'),
    media('mission-ethics.svg', 'Mirrored arches meeting in the middle'),
    media('values-handshake.jpg', 'Two colleagues shaking hands in an office'),
    media('approach-illustration.svg', 'Four connected circles representing the steps of our approach'),
  ])

  // ---- team profiles ---------------------------------------------------------
  const people = [
    { name: 'Mathew Conor', file: 'team-mathew.jpg' },
    { name: 'Lisa James', file: 'team-lisa.jpg' },
    { name: 'Liam Lee', file: 'team-liam.jpg' },
    { name: 'Anne W', file: 'team-anne.jpg' },
    { name: 'Matt', file: 'team-matt.jpg' },
  ]
  const members: number[] = []
  for (const p of people) {
    const photo = await media(p.file, `Portrait of ${p.name}`)
    const existing = await payload.find({ collection: 'team-profiles', where: { name: { equals: p.name } }, limit: 1, depth: 0 })
    const data = { name: p.name, role: 'Lorem ipsum dolor', photo }
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'team-profiles', id: existing.docs[0].id, data })
      : await payload.create({ collection: 'team-profiles', data })
    members.push(doc.id as number)
  }

  // ---- shared sections: copy from the Home page so both stay consistent -------
  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  const fromHome = <T extends Block['blockType']>(type: T) => {
    const b = home?.layout?.find((x) => x.blockType === type)
    return b ? [strip(b)] : []
  }
  const contact = { label: 'Contact Us', url: '/contact', newTab: false }
  const joinTeam = { label: 'Join our team', url: '/careers', newTab: false }
  const teamText =
    'Our team blends strategy, creativity, and technology to make AI practical, ethical, and impactful. From data engineers to experience designers, every member plays a part in driving human-centric innovation for enterprises worldwide.'

  const layout: Block[] = [
    {
      blockType: 'hero',
      tag: 'Who We Are',
      heading: 'Shaping the Future With Purpose',
      description: 'We’re a forward-thinking company driven by innovation and impact. We turn clarity and purpose into meaningful results for businesses.',
      button: contact,
      decorImage: heroDecor,
    },
    {
      blockType: 'cardGrid',
      background: 'tint',
      tag: 'Our Mission',
      heading: 'Turning Possibilities Into Real-World Outcomes',
      description: teamText,
      button: joinTeam,
      cards: [
        { title: 'Alignment', description: 'We turn ambitious ideas into actionable pathways, ensuring vision and execution stay connected.', illustration: alignment },
        { title: 'Confidence', description: 'We enable organizations to move forward with clarity, insight, and purposeful direction.', illustration: confidence },
        { title: 'Ethics', description: 'We design responsibly, creating outcomes that are transparent, fair, and human-centered.', illustration: ethics },
      ],
    },
    {
      blockType: 'values',
      tag: 'What We Stand For',
      heading: 'Principles That Guide Every Decision',
      items: [
        { title: 'Integrity', description: 'We stay honest, transparent, and accountable, no shortcuts, no compromises.' },
        { title: 'Innovation', description: 'We stay honest, transparent, and accountable, no shortcuts, no compromises.' },
        { title: 'Responsibility', description: 'We stay honest, transparent, and accountable, no shortcuts, no compromises.' },
      ],
      image: handshake,
    },
    {
      blockType: 'approach',
      tag: 'Our approach',
      heading: 'Our Human-Centered AI Approach',
      items: [
        {
          title: 'Insight-Led Understanding',
          description: 'We start with your data, people and goals, so every recommendation is grounded in evidence.',
          caption: 'Insight-Driven Thinking',
        },
        {
          title: 'Human-Centered Design',
          description: 'Every solution is crafted with usability, clarity, and meaningful human impact in mind.',
          caption: 'People-First Design',
        },
        {
          title: 'Collaborative Iteration',
          description: 'We build in short cycles with your teams, testing and refining until it works in the real world.',
          caption: 'Shared Progress',
        },
        {
          title: 'Outcome-Focused Execution',
          description: 'We measure success by business results, and keep improving long after go-live.',
          caption: 'Measurable Impact',
        },
      ],
      illustration: approachArt,
    },
    {
      blockType: 'team',
      background: 'surface',
      tag: 'Our team',
      heading: 'The Minds Behind Intelligent Transformation',
      description: teamText,
      button: joinTeam,
      members,
    },
    ...fromHome('testimonials'),
    ...fromHome('globalReach'),
    ...fromHome('logoMarquee'),
    ...fromHome('cta'),
  ]

  const data = {
    title: 'About Us',
    slug: 'about',
    layout,
    meta: {
      title: 'About Customer360 | SAP, Data & AI Experts',
      description:
        'Meet the team behind Customer360. Our human-centred approach to SAP, Data and AI helps enterprises turn possibilities into real-world outcomes.',
      keyword: 'about Customer360',
    },
    seo: { pageType: 'AboutPage' as const, breadcrumbLabel: 'About', priority: 0.8, changeFrequency: 'monthly' as const },
  }

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'about' } }, limit: 1, depth: 0 })
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  else await payload.create({ collection: 'pages', data })
}
