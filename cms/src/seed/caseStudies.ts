/**
 * Case Studies page (Figma node 628:6278) + the case studies themselves, with
 * rich-text stories for their own pages. Used by the full seed and by
 * src/scripts/seed-case-studies.ts (non-destructive: upserts by headline).
 */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'
import type { Page } from '../payload-types'
import { slugify } from '../collections/CaseStudies'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaDir = path.resolve(dirname, '../../seed/media')

type Block = NonNullable<Page['layout']>[number]
const stripIds = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stripIds)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).filter(([k]) => k !== 'id').map(([k, v]) => [k, stripIds(v)]))
      : value

// ---- tiny Lexical builders ---------------------------------------------------------
const base = { direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 }
/** Text with **bold** support. */
const t = (s: string) =>
  s
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) => {
      const bold = part.startsWith('**')
      return { type: 'text', text: bold ? part.slice(2, -2) : part, format: bold ? 1 : 0, detail: 0, mode: 'normal', style: '', version: 1 }
    })
const p = (s: string) => ({ ...base, type: 'paragraph', children: t(s), textFormat: 0, textStyle: '' })
const h = (tag: 'h2' | 'h3', s: string) => ({ ...base, type: 'heading', tag, children: t(s) })
const ul = (items: string[]) => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  children: items.map((s, i) => ({ ...base, type: 'listitem', value: i + 1, children: t(s) })),
})
const ol = (items: string[]) => ({ ...ul(items), listType: 'number', tag: 'ol' })
const quote = (s: string) => ({ ...base, type: 'quote', children: t(s) })
const doc = (...children: unknown[]) => ({ root: { ...base, type: 'root', children } })

type Seed = {
  title: string
  service: string
  tags: string[]
  publishedAt: string
  client: string
  industry: string
  duration: string
  excerpt: string
  results: { value: string; label: string }[]
  content: ReturnType<typeof doc>
}

/** A full story in the usual Challenge → Approach → Results shape. */
const story = (o: {
  overview: string
  challenge: string
  pains: string[]
  approach: string
  steps: { title: string; text: string }[]
  results: string
  wins: string[]
  quote: string
  next: string
}) =>
  doc(
    h('h2', 'Overview'),
    p(o.overview),
    h('h2', 'The Challenge'),
    p(o.challenge),
    ul(o.pains),
    h('h2', 'Our Approach'),
    p(o.approach),
    ...o.steps.flatMap((s) => [h('h3', s.title), p(s.text)]),
    h('h2', 'The Results'),
    p(o.results),
    ol(o.wins),
    quote(o.quote),
    h('h2', 'What’s Next'),
    p(o.next),
  )

const CASE_STUDIES: Seed[] = [
  {
    title: 'Accelerating Digital Adoption Across 20,000 Employees',
    service: 'AI Digital Adoption',
    tags: ['Human-Centric Enablement', 'AI-Powered Learning'],
    publishedAt: '2026-09-18',
    client: 'Global manufacturing group',
    industry: 'Manufacturing',
    duration: '7 months',
    excerpt: 'How in-app guidance and AI-personalised learning moved 20,000 employees onto a new S/4HANA landscape — without a drop in productivity.',
    results: [
      { value: '92%', label: 'active adoption within 90 days' },
      { value: '-48%', label: 'fewer support tickets after go-live' },
      { value: '3×', label: 'faster onboarding for new joiners' },
    ],
    content: story({
      overview:
        'A global manufacturer was moving 20,000 employees across 14 countries onto a new **SAP S/4HANA** landscape. The technology was ready; the people were not. Customer360 was asked to make the change feel effortless for every role, from the shop floor to finance.',
      challenge:
        'Classroom training had been booked months ahead, but by go-live most of it was forgotten. Early pilots showed users reverting to spreadsheets and email for tasks the new system already handled.',
      pains: [
        'Generic training that ignored the 40+ distinct roles in the business',
        'A support desk expecting 6,000 tickets in the first month',
        'No way to see where people were actually getting stuck',
      ],
      approach:
        'We replaced “train once, hope it sticks” with guidance that lives inside the work itself, and used AI to adapt it to every role and every user’s progress.',
      steps: [
        { title: 'Role-based journeys', text: 'We mapped the 120 most frequent tasks to each role and built step-by-step walkthroughs that appear right where the task happens.' },
        { title: 'AI-powered learning paths', text: 'Usage analytics feed a recommendation model that nudges each person toward the next skill they need — and skips what they already know.' },
        { title: 'Friction analytics', text: 'Heatmaps of abandoned steps showed the business exactly which screens and processes needed simplifying, week by week.' },
      ],
      results: 'Within three months, adoption was higher than any previous rollout in the group’s history, and the support desk saw half the expected volume.',
      wins: ['92% of employees actively using the new system within 90 days', 'Support tickets down 48% against forecast', 'New-joiner onboarding cut from three weeks to one'],
      quote: '“For the first time, a system change didn’t feel like a disruption. People just got on with their work.” — Chief Digital Officer',
      next: 'The same guidance layer is now being extended to the group’s HR and procurement platforms, using the friction analytics to prioritise what to simplify first.',
    }),
  },
  {
    title: 'Reimagining Data Migration for a Global Retail Leader',
    service: 'AI Data Migration',
    tags: ['Enterprise Transformation', 'Automation at Scale'],
    publishedAt: '2026-08-27',
    client: 'Global retail leader',
    industry: 'Retail',
    duration: '6 months',
    excerpt: 'Moving 1.2 billion records from legacy ERP to the cloud — with AI-driven mapping, automated validation and zero unplanned downtime.',
    results: [
      { value: '1.2B', label: 'records migrated' },
      { value: '40%', label: 'less manual effort' },
      { value: '0', label: 'hours of unplanned downtime' },
    ],
    content: story({
      overview:
        'A retailer with 3,000 stores needed to retire a 20-year-old ERP and move its product, supplier and customer data to a modern cloud platform — without interrupting trading during peak season.',
      challenge:
        'Decades of local customisation meant the same product could exist under different codes in different regions. Previous migration attempts had stalled on data quality.',
      pains: ['Over 1.2 billion records across 300 legacy tables', 'Inconsistent master data between regions', 'A hard deadline before the holiday trading freeze'],
      approach: 'We treated the migration as a data product: profiled first, mapped with AI, validated automatically and rehearsed until cut-over was routine.',
      steps: [
        { title: 'AI-assisted mapping', text: 'Machine-learning models proposed field mappings and de-duplication rules, which business owners reviewed instead of writing from scratch.' },
        { title: 'Automated reconciliation', text: 'Every load was reconciled record-by-record against the source, with exceptions routed to the right data owner automatically.' },
        { title: 'Rehearsed cut-over', text: 'Five full dress rehearsals reduced the final cut-over window from 72 hours to a single overnight run.' },
      ],
      results: 'The migration completed two weeks early, and stores traded normally through the switch.',
      wins: ['1.2 billion records migrated with 99.98% first-pass accuracy', '40% less manual mapping and validation effort', 'Zero hours of unplanned downtime during cut-over'],
      quote: '“We’d been told this migration was impossible before peak. Customer360 made it boring — which is exactly what you want.” — VP Enterprise Systems',
      next: 'The cleaned master data now powers a single product catalogue across all regions, and the reconciliation framework runs daily as an ongoing data-quality check.',
    }),
  },
  {
    title: 'Optimizing Quality Assurance with Intelligent Test Automation',
    service: 'AI Automated Testing',
    tags: ['Quality Engineering', 'Faster Releases'],
    publishedAt: '2026-07-30',
    client: 'International insurer',
    industry: 'Financial services',
    duration: '4 months',
    excerpt: 'Self-healing test automation took regression testing from three weeks to two days and let the team release every fortnight.',
    results: [
      { value: '2 days', label: 'full regression (was 3 weeks)' },
      { value: '85%', label: 'test coverage, up from 30%' },
      { value: '2×', label: 'more releases per quarter' },
    ],
    content: story({
      overview:
        'An insurer’s release calendar was dictated by testing: every SAP change required three weeks of manual regression across policy, claims and billing.',
      challenge: 'Existing automated tests broke with every UI change, so the team had quietly stopped maintaining them.',
      pains: ['Manual regression consuming 60% of QA capacity', 'Brittle scripts failing on cosmetic changes', 'Defects slipping into production after rushed releases'],
      approach: 'We introduced AI-driven, self-healing automation focused on the business processes that matter most.',
      steps: [
        { title: 'Risk-based test design', text: 'Change-impact analysis identifies which processes each transport touches, so only the relevant tests run.' },
        { title: 'Self-healing scripts', text: 'When a screen changes, the framework recognises elements by meaning rather than position and repairs the script itself.' },
      ],
      results: 'Regression is now a two-day, largely unattended run, and the team ships twice as often with fewer defects.',
      wins: ['Full regression in 2 days instead of 3 weeks', 'Automated coverage up from 30% to 85%', 'Production defects down 60% quarter on quarter'],
      quote: '“Testing used to be the bottleneck. Now it’s the reason we can move faster.” — Head of Quality Engineering',
      next: 'Automated tests are being wired into the CI pipeline so every change is verified before it reaches a test system.',
    }),
  },
  {
    title: 'Real-Time Decision Intelligence for a Logistics Network',
    service: 'AI for Intelligent Decisions',
    tags: ['Predictive Analytics', 'Operational Visibility'],
    publishedAt: '2026-07-02',
    client: 'European logistics provider',
    industry: 'Logistics',
    duration: '5 months',
    excerpt: 'Predictive models and live dashboards helped dispatchers reroute shipments before delays happened, not after.',
    results: [
      { value: '-27%', label: 'late deliveries' },
      { value: '15 min', label: 'from signal to decision' },
      { value: '€4.1M', label: 'annual savings' },
    ],
    content: story({
      overview: 'A logistics provider moving 50,000 shipments a day relied on next-morning reports to understand what had gone wrong the day before.',
      challenge: 'Data from SAP TM, telematics and warehouse systems lived in separate silos, so nobody had a live view of the network.',
      pains: ['Delays discovered only after customers complained', 'Dispatchers juggling five different tools', 'No shared definition of “at risk”'],
      approach: 'We connected the data, trained delay-prediction models and put the insight directly in front of the people who could act on it.',
      steps: [
        { title: 'Unified data layer', text: 'Shipment, vehicle and warehouse events stream into one model, refreshed every minute.' },
        { title: 'Delay prediction', text: 'Models score every shipment for delay risk and explain the drivers — weather, traffic, dock congestion.' },
        { title: 'Action-first dashboards', text: 'Dispatchers see only the shipments that need them, with recommended reroutes ready to approve.' },
      ],
      results: 'Problems are now handled while they can still be fixed, and on-time performance is the best in the company’s history.',
      wins: ['Late deliveries down 27%', 'Average time from risk signal to decision: 15 minutes', '€4.1M in annual penalty and overtime savings'],
      quote: '“We stopped reading yesterday’s news and started changing today’s outcome.” — Director of Network Operations',
      next: 'The models are being extended to capacity planning, forecasting demand by lane two weeks ahead.',
    }),
  },
  {
    title: 'Mapping 40 Legacy Systems into One Trusted Data Model',
    service: 'AI Data Profiling & Mapping',
    tags: ['Data Quality', 'Master Data'],
    publishedAt: '2026-06-11',
    client: 'Pharmaceutical group',
    industry: 'Life sciences',
    duration: '5 months',
    excerpt: 'AI profiling uncovered hidden duplicates and broken relationships across 40 systems, giving the business one version of the truth.',
    results: [
      { value: '40', label: 'source systems profiled' },
      { value: '-63%', label: 'duplicate master records' },
      { value: '8 wks', label: 'saved on the mapping phase' },
    ],
    content: story({
      overview: 'After a series of acquisitions, a pharmaceutical group ran 40 systems holding overlapping material, customer and supplier data.',
      challenge: 'Regulatory reporting depended on manual reconciliation, and nobody could say with confidence how many unique products the group sold.',
      pains: ['Duplicate and conflicting master data across sites', 'Undocumented custom fields in legacy systems', 'Strict validation requirements for regulated data'],
      approach: 'We profiled every source automatically, then used AI to suggest matches and mappings for data stewards to approve.',
      steps: [
        { title: 'Automated profiling', text: 'Every table and field was scanned for completeness, patterns and outliers in days rather than months.' },
        { title: 'Steward-in-the-loop matching', text: 'Suggested matches came with confidence scores and evidence, so stewards approved thousands of records an hour.' },
      ],
      results: 'The group now has one validated data model that feeds both operations and regulatory reporting.',
      wins: ['Duplicate master records reduced by 63%', 'Mapping phase completed eight weeks ahead of plan', 'Full audit trail for every validated decision'],
      quote: '“We finally know what we have — and we can prove it to the regulator.” — Global Head of Data Governance',
      next: 'The same profiling rules now run continuously, catching quality issues as new data is created.',
    }),
  },
  {
    title: 'Launching an AI Accelerator for Finance Close Automation',
    service: 'AI Accelerators',
    tags: ['Rapid Deployment', 'Finance Automation'],
    publishedAt: '2026-05-21',
    client: 'Energy & utilities company',
    industry: 'Energy',
    duration: '10 weeks',
    excerpt: 'A pre-built accelerator cut the monthly close from ten days to six, going live in under three months.',
    results: [
      { value: '6 days', label: 'monthly close (was 10)' },
      { value: '10 wks', label: 'from kickoff to live' },
      { value: '70%', label: 'of reconciliations automated' },
    ],
    content: story({
      overview: 'A utilities company’s finance team spent the first ten working days of every month closing the books, mostly on manual reconciliations.',
      challenge: 'A full custom build would have taken a year. The CFO wanted results within a quarter.',
      pains: ['Thousands of manual reconciliations each month', 'Late journal adjustments delaying reporting', 'Limited internal capacity for a large project'],
      approach: 'We deployed our finance-close accelerator — pre-built matching models and workflows — and tuned it to the company’s chart of accounts.',
      steps: [
        { title: 'Configure, don’t build', text: 'Seventy percent of the solution came ready-made; the project focused on the company-specific rules.' },
        { title: 'Exception-led workflow', text: 'Accountants only see the items the models can’t match, with suggested resolutions attached.' },
      ],
      results: 'The first automated close ran in week ten, and the team has closed in six days every month since.',
      wins: ['Monthly close reduced from ten days to six', 'Live in ten weeks from kickoff', '70% of reconciliations fully automated'],
      quote: '“The accelerator gave us a year’s worth of progress in a quarter.” — Group Financial Controller',
      next: 'The next phase extends the accelerator to intercompany eliminations and cash forecasting.',
    }),
  },
  {
    title: 'Empowering Frontline Teams with Self-Service Enablement',
    service: 'AI End-User Enablement',
    tags: ['Self-Service Support', 'Change Management'],
    publishedAt: '2026-04-30',
    client: 'Healthcare network',
    industry: 'Healthcare',
    duration: '4 months',
    excerpt: 'An AI assistant inside everyday tools gave 8,000 clinical and admin staff instant answers — and gave IT its evenings back.',
    results: [
      { value: '8,000', label: 'staff enabled' },
      { value: '-55%', label: '“how do I” tickets' },
      { value: '4.7/5', label: 'user satisfaction' },
    ],
    content: story({
      overview: 'A healthcare network introduced new scheduling and procurement processes across 30 sites, with staff working around the clock.',
      challenge: 'Frontline teams had no time for training, and the IT desk was overwhelmed with simple questions — especially at night.',
      pains: ['Shift workers missing scheduled training sessions', 'Repetitive tickets clogging the service desk', 'Inconsistent process knowledge between sites'],
      approach: 'We embedded an AI assistant and contextual help directly into the tools staff already used, available on every shift.',
      steps: [
        { title: 'Answers in context', text: 'The assistant knows which screen the user is on and answers with the exact steps for that task.' },
        { title: 'Knowledge that improves itself', text: 'Unanswered questions are reviewed weekly and turned into new guidance, so coverage keeps growing.' },
      ],
      results: 'Staff get help in seconds, at any hour, and the service desk can focus on genuine incidents.',
      wins: ['8,000 staff enabled across 30 sites', '“How do I” tickets down 55%', 'User satisfaction of 4.7 out of 5'],
      quote: '“Night-shift teams finally have the same support as everyone else.” — Director of Clinical Operations',
      next: 'The assistant is being rolled out to the network’s patient-facing administration teams.',
    }),
  },
]

export async function seedCaseStudies(payload: Payload) {
  const media = async (file: string, alt: string) => {
    const found = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1, depth: 0 })
    if (found.docs[0]) return found.docs[0].id as number
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(mediaDir, file) })
    return doc.id as number
  }
  const heroPerson = await media('case-studies-hero-person.webp', 'Smiling businessman giving a thumbs up')

  const services = await payload.find({ collection: 'services', limit: 100, depth: 0 })
  const serviceId = (title: string) => services.docs.find((s) => s.title === title)?.id

  for (const c of CASE_STUDIES) {
    const data = {
      title: c.title,
      slug: slugify(c.title),
      service: serviceId(c.service),
      url: '',
      tags: c.tags.map((label) => ({ label })),
      publishedAt: new Date(c.publishedAt).toISOString(),
      client: c.client,
      industry: c.industry,
      duration: c.duration,
      excerpt: c.excerpt,
      results: c.results,
      content: c.content,
    }
    const existing = await payload.find({ collection: 'case-studies', where: { title: { equals: c.title } }, limit: 1, depth: 0 })
    if (existing.docs[0]) await payload.update({ collection: 'case-studies', id: existing.docs[0].id, data: data as never })
    else await payload.create({ collection: 'case-studies', data: data as never })
  }

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
      tag: 'Case Study',
      heading: 'Real Results. Proven Impact.',
      description: 'Customer360 is developing intelligent tools to simplify operations and accelerate transformation',
      decorImage: heroPerson,
    },
    {
      blockType: 'caseStudyList',
      showFilters: true,
      allLabel: 'All',
      perPage: 6,
      emptyText: 'No case studies for this service yet.',
      paginationLabel: 'Case study pages',
    },
    ...fromHome('cta'),
  ]

  const data = {
    title: 'Case Studies',
    slug: 'case-studies',
    pageBackground: 'light' as const,
    layout,
    meta: {
      title: 'Case Studies: Real Results, Proven Impact | Customer360',
      description: 'See how Customer360 helps enterprises adopt SAP, migrate data, automate testing and make faster decisions with AI — real projects, measurable results.',
      keyword: 'SAP AI case studies',
    },
    seo: { pageType: 'CollectionPage' as const },
  }
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'case-studies' } }, limit: 1, depth: 0 })
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data: data as never })
  else await payload.create({ collection: 'pages', data: data as never })

  await payload.updateGlobal({ slug: 'case-study-page', data: {} as never })
}
