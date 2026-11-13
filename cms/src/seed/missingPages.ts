/**
 * Contact, Careers, FAQ, Blog, Resources, Privacy and Terms pages, plus redirects from the old site's
 * addresses. Non-destructive: a page or redirect that already exists (by slug / old link) is left
 * alone, so editors' changes are never overwritten. Used by the data migration (production and
 * previews) and by `npm run seed:pages` (local).
 *
 * Privacy, Terms, contact details and the careers intro are copied from the previous website.
 */
import type { Payload, PayloadRequest } from 'payload'
import type { Page } from '../payload-types'

type Block = NonNullable<Page['layout']>[number]
type PageData = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

// ---------------------------------------------------------------------------
// Lexical rich text from simple parts
// ---------------------------------------------------------------------------
type Part = { h2: string } | { h3: string } | { p: string } | { ul: string[] }

const EMAIL = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g
const textNode = (text: string) => ({ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 })
/** Text with email addresses turned into mailto links. */
const inline = (text: string) =>
  text
    .split(EMAIL)
    .filter(Boolean)
    .map((piece) =>
      /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(piece)
        ? {
            type: 'link',
            fields: { url: `mailto:${piece}`, newTab: false, linkType: 'custom' },
            children: [textNode(piece)],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 3,
          }
        : textNode(piece),
    )
const base = { direction: 'ltr', format: '', indent: 0, version: 1 }

export const lexical = (parts: Part[]) => ({
  root: {
    type: 'root',
    ...base,
    children: parts.map((part) => {
      if ('h2' in part) return { type: 'heading', tag: 'h2', ...base, children: inline(part.h2) }
      if ('h3' in part) return { type: 'heading', tag: 'h3', ...base, children: inline(part.h3) }
      if ('ul' in part)
        return {
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          start: 1,
          ...base,
          children: part.ul.map((item, i) => ({ type: 'listitem', value: i + 1, ...base, children: inline(item) })),
        }
      return { type: 'paragraph', textFormat: 0, textStyle: '', ...base, children: inline(part.p) }
    }),
  },
})

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const CONTACT_EMAIL = 'info@customer360.com'
const CONTACT_PHONE = '+61 403 852 104'

const privacy: Part[] = [
  { h2: 'Introduction' },
  {
    p: 'At Customer360, we are committed to protecting your privacy and ensuring that your personal information is handled with transparency and care. This Privacy Policy explains how we collect, use, and safeguard the information you provide when engaging with our website, services, or communication channels. By using our site, you acknowledge and agree to the practices outlined here.',
  },
  { h2: 'Information We Collect' },
  {
    p: 'When you interact with Customer360, you may provide personal information such as your name, email address, phone number, company details, and any message or inquiry you submit. In addition to the information you voluntarily provide, our website automatically gathers certain technical data, including your IP address, browser type, device information, and general usage patterns. Cookies and similar tracking technologies may also be used to improve your browsing experience and help us understand how visitors navigate our site.',
  },
  { h2: 'How We Use Your Information' },
  {
    p: 'We use your information to respond to inquiries, provide access to resources, deliver updates or communications you have opted in to receive, and support the services you request. Your data also helps us improve the performance, functionality, and security of our website. Customer360 does not sell your personal information. However, your data may be shared with trusted service providers who support our operations, such as hosting partners, email platforms, or analytics tools. These partners follow strict confidentiality and data protection standards. We may also disclose information if required by law or when necessary to protect our legal rights.',
  },
  { h2: 'Data Security' },
  {
    p: 'Your personal information is stored securely using industry-standard measures designed to prevent unauthorized access, loss, or misuse. While we take every reasonable precaution to protect your data, no online system can guarantee absolute security. We retain your information only for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws and regulations.',
  },
  { h2: 'Your Rights' },
  {
    p: 'Depending on your location, you may have certain rights regarding your personal information. These rights may include accessing the data we hold about you, requesting corrections or updates, withdrawing consent, opting out of communications, or asking us to delete your information. If you wish to exercise any of these rights or request clarification, you may contact us at privacy@customer360.ai.',
  },
  { h2: 'Cookies and Tracking' },
  {
    p: 'Our website may use cookies and similar technologies to enhance user experience, monitor site performance, and analyze visitor interactions. These technologies help us refine our content and ensure the website functions effectively. You may choose to disable cookies through your browser settings, though this may affect certain features or functionality.',
  },
  { h2: 'Third-Party Links' },
  {
    p: 'Customer360 may include links to external websites for additional information or resources. These third-party sites operate independently and have their own privacy policies. We are not responsible for the content or data practices of external websites and encourage you to review their policies before providing personal information.',
  },
  { h2: 'Children’s Privacy' },
  {
    p: 'Our services and website are not directed toward children under the age of 16, and we do not knowingly collect personal information from minors. If we become aware that information from a child under 16 has been provided, we will delete it promptly.',
  },
  { h2: 'Updates to This Policy' },
  {
    p: 'We may revise this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Updates will be posted on this page with an updated “Last Updated” date. We encourage you to review this policy periodically to stay informed about how your information is protected.',
  },
  { h2: 'Contact Us' },
  { p: 'If you have questions or concerns about this Privacy Policy, please contact us at legal@customer360.ai or through our website.' },
]

const terms: Part[] = [
  { h2: 'Welcome to Customer360' },
  {
    p: 'Welcome to Customer360, and thank you for visiting our website. By accessing or using our site, you agree to comply with the Terms and Conditions outlined below. These terms are designed to ensure a safe, transparent, and trustworthy experience for all users. If you do not agree with any part of these Terms, we kindly ask that you discontinue the use of our website.',
  },
  { h2: 'Use of Our Website' },
  {
    p: 'Customer360 provides this website for informational and business purposes. You agree to use the site responsibly, respectfully, and in compliance with applicable laws. You may not attempt to disrupt the website, misuse its features, or engage in any activity that could harm our platform, services, or users. Unauthorized attempts to access restricted areas, systems, or data are strictly prohibited.',
  },
  { h2: 'Intellectual Property' },
  {
    p: 'All content on this website — including text, graphics, images, logos, layouts, and digital assets — is the property of Customer360 or its licensors. This content is protected by copyright and intellectual property laws. You may view or download material for personal or internal business use, but you may not reproduce, distribute, modify, or republish any content without prior written permission from Customer360.',
  },
  { h2: 'Accuracy of Information' },
  {
    p: 'We strive to ensure that the information on our website is accurate and up to date. However, Customer360 does not warrant that all content will always be complete, current, or error-free. We reserve the right to modify, update, or remove content at any time without prior notice.',
  },
  { h2: 'Third-Party Links' },
  {
    p: 'Our website may include links to third-party websites or services for your convenience. Customer360 is not responsible for the content, accuracy, or data practices of these external sites. Accessing third-party links is at your own discretion, and we encourage you to review their respective terms and policies.',
  },
  { h2: 'User Submissions' },
  {
    p: 'When you submit information through contact forms, registrations, or other interactive elements, you agree that the information is accurate and that Customer360 may use it in accordance with our Privacy Policy. You may not submit unlawful, harmful, or misleading content. Customer360 reserves the right to remove or disregard any inappropriate or unauthorized submissions.',
  },
  { h2: 'Restrictions on Use' },
  {
    p: 'You agree not to engage in activities that may interfere with website functionality, compromise security, introduce harmful code, or misuse any feature. You may not use this website for fraudulent purposes, to impersonate others, or to send unauthorized promotional content.',
  },
  { h2: 'Disclaimer of Warranties' },
  {
    p: 'Customer360 provides this website “as is” and “as available.” While we aim to maintain reliable and secure access, we do not guarantee uninterrupted service, error-free performance, or absolute accuracy of content. Your use of the site is at your own risk.',
  },
  { h2: 'Limitation of Liability' },
  {
    p: 'To the fullest extent permitted by law, Customer360 is not liable for any direct, indirect, incidental, or consequential damages arising from your use of — or inability to use — the website or any linked materials. This includes losses related to business operations, data, profits, or system performance.',
  },
  { h2: 'Indemnification' },
  {
    p: 'You agree to indemnify and hold harmless Customer360, its employees, partners, and affiliates from any claims or liabilities arising from your misuse of the website, violation of these Terms, or infringement of intellectual property or other rights.',
  },
  { h2: 'Changes to These Terms' },
  {
    p: 'Customer360 may update or revise these Terms and Conditions at any time. When changes are made, the updated version will be posted on this page with a revised “Last Updated” date. Continued use of the website after changes indicates acceptance of the updated terms.',
  },
  { h2: 'Governing Law' },
  {
    p: 'These Terms and Conditions are governed by the laws of operating country, without regard to conflict-of-law principles. Any disputes arising from your use of the website will be subject to the exclusive jurisdiction of the courts in that region.',
  },
  { h2: 'Contact Us' },
  { p: 'If you have questions or concerns about these Terms and Conditions, please contact us at legal@customer360.ai or through our website.' },
]

const faqs = (services: string[]) => [
  {
    question: 'What does Customer360 do?',
    answer:
      'We help organisations put AI to practical use across their enterprise systems — from strategy and governance through to data migration, testing and helping people adopt new software.',
  },
  {
    question: 'Which services do you offer?',
    answer: services.length
      ? `Our services are: ${services.join(', ')}. Each one has its own page under Services.`
      : 'See the Services page for the full list.',
  },
  {
    question: 'Where are you based?',
    answer: 'We have offices in Sydney, Melbourne, Brisbane and Singapore. You’ll find the addresses on the Contact page.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Send us a message through the Contact page with a little about your goals and current systems. We’ll get back to you to arrange a conversation with the right specialist.',
  },
  {
    question: 'Can I see examples of your work?',
    answer: 'Yes. Our case studies describe the challenge, our approach and the results for each client.',
  },
  {
    question: 'Are you hiring?',
    answer: 'Open roles are listed on the Careers page. If nothing fits right now, you’re welcome to send us your CV.',
  },
]

// ---------------------------------------------------------------------------
// Seeding
// ---------------------------------------------------------------------------
const stripIds = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stripIds)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).filter(([k]) => k !== 'id').map(([k, v]) => [k, stripIds(v)]))
      : value

const hero = (tag: string, heading: string, description: string): Block => ({ blockType: 'hero', tag, heading, description, visualStyle: 'plain' })

export async function seedMissingPages(payload: Payload, req?: PayloadRequest) {
  const opts = { req, overrideAccess: true, depth: 0 } as const
  const log = (msg: string) => payload.logger.info(`[pages] ${msg}`)

  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, ...opts })).docs[0]
  const cta = home?.layout?.filter((b) => b.blockType === 'cta').map((b) => stripIds(b) as Block) ?? []
  const caseStudies = await payload.find({ collection: 'case-studies', limit: 20, sort: '-publishedAt', ...opts })
  const services = await payload.find({ collection: 'services', limit: 50, sort: 'order', ...opts }).catch(() => ({ docs: [] }))
  const serviceTitles = (services.docs as { title?: string }[]).map((s) => s.title).filter((t): t is string => Boolean(t))

  const legal = (title: string, slug: string, description: string, content: Part[], meta: PageData['meta']): PageData => ({
    title,
    slug,
    pageBackground: 'page',
    layout: [hero('Legal', title, description), { blockType: 'longText', content: lexical(content), showContents: true, contentsLabel: 'On this page', lastUpdatedLabel: 'Last updated' } as Block],
    meta,
    seo: { pageType: 'WebPage', priority: 0.3, changeFrequency: 'yearly' },
  })

  const pages: PageData[] = [
    {
      title: 'Contact',
      slug: 'contact',
      pageBackground: 'page',
      layout: [
        hero('Contact us', 'Start Your AI Journey', 'Connect with us to explore partnerships, join our AI community, or reach our global teams.'),
        {
          blockType: 'contactForm',
          heading: 'Get in touch',
          intro: 'Tell us a little about what you’re working on and we’ll put you in touch with the right specialist.',
          email: CONTACT_EMAIL,
          phone: CONTACT_PHONE,
          officesHeading: 'Our offices',
          offices: [
            { city: 'Sydney', address: 'Level 17, Chifley Tower\n2 Chifley Square\nSydney NSW 2000' },
            { city: 'Melbourne', address: 'Level 27, 101 Collins Street\nMelbourne VIC 3000' },
            { city: 'Brisbane', address: 'Level 19, 10 Eagle Street\nBrisbane QLD 4000' },
            { city: 'Singapore', address: 'Level 39, Marina Bay Financial Centre Tower 2\n10 Marina Boulevard\nSingapore' },
          ],
        } as Block,
      ],
      meta: {
        title: 'Contact Customer360 | Talk to an AI Specialist',
        description: 'Get in touch with Customer360. Send us a message or visit our offices in Sydney, Melbourne, Brisbane and Singapore.',
        keyword: 'contact Customer360',
      },
      seo: { pageType: 'ContactPage', priority: 0.6, changeFrequency: 'yearly', breadcrumbLabel: 'Contact' },
    },
    {
      title: 'Careers',
      slug: 'careers',
      pageBackground: 'page',
      layout: [
        hero(
          'Careers',
          'Join the Team That’s Shaping the Future of AI',
          'At Customer360, we unite innovators and engineers who make AI practical, ethical, and human, turning ideas into real impact.',
        ),
        {
          blockType: 'jobList',
          tag: 'Open roles',
          heading: 'Your Next Career Move Starts Here',
          intro: 'Work alongside forward-thinking professionals who are passionate about AI, innovation, and shaping the future of digital transformation.',
          applyLabel: 'Apply now',
          moreLabel: 'View role',
          lessLabel: 'Hide role',
          defaultApplyUrl: `mailto:${CONTACT_EMAIL}?subject=Job%20application`,
          emptyHeading: 'No open roles right now',
          emptyText: 'We’re always happy to hear from people who care about practical, human AI. Send us your CV and we’ll be in touch when something fits.',
          emptyButton: { label: 'Send your CV', url: `mailto:${CONTACT_EMAIL}?subject=Career%20enquiry`, newTab: false },
        } as Block,
        ...cta,
      ],
      meta: {
        title: 'Careers at Customer360 | Join Our AI Team',
        description: 'Join Customer360 and help enterprises make AI practical, ethical and human. See our open roles or send us your CV.',
        keyword: 'Customer360 careers',
      },
      seo: { pageType: 'WebPage', priority: 0.5, changeFrequency: 'weekly', breadcrumbLabel: 'Careers' },
    },
    {
      title: 'FAQ',
      slug: 'faq',
      pageBackground: 'page',
      layout: [
        hero('FAQ', 'Frequently Asked Questions', 'Quick answers about who we are, what we do and how to work with us.'),
        {
          blockType: 'faq',
          tag: 'Good to know',
          heading: 'Your questions, answered',
          intro: 'Can’t find what you’re looking for? Send us a message and we’ll help.',
          button: { label: 'Contact us', url: '/contact', newTab: false },
          items: faqs(serviceTitles),
          addSchema: true,
        } as Block,
        ...cta,
      ],
      meta: {
        title: 'FAQ | Customer360 AI Services Explained',
        description: 'Answers to common questions about Customer360: our AI services, where we are based, how to get started and open roles.',
        keyword: 'Customer360 FAQ',
      },
      seo: { pageType: 'FAQPage', priority: 0.5, changeFrequency: 'monthly', breadcrumbLabel: 'FAQ' },
    },
    {
      title: 'Blog',
      slug: 'blog',
      pageBackground: 'page',
      layout: [
        hero('Blog', 'Insights on Practical, Human AI', 'Ideas, lessons and news from our teams on AI strategy, enterprise data and digital adoption.'),
        { blockType: 'postList', limit: 0, hideWhenEmpty: false, emptyText: 'Our first articles are on their way. Check back soon.' } as Block,
        ...cta,
      ],
      meta: {
        title: 'Blog | AI Insights from Customer360',
        description: 'Articles from Customer360 on AI strategy, enterprise data, test automation and digital adoption.',
        keyword: 'enterprise AI blog',
      },
      seo: { pageType: 'CollectionPage', priority: 0.6, changeFrequency: 'weekly', breadcrumbLabel: 'Blog' },
    },
    {
      title: 'Resources',
      slug: 'resources',
      pageBackground: 'page',
      layout: [
        hero('Resources', 'Learn From Real AI Projects', 'Case studies and articles to help you plan, deliver and scale AI across your organisation.'),
        ...(caseStudies.docs.length
          ? [
              {
                blockType: 'caseStudies',
                tag: 'Case studies',
                heading: 'Real Results. Proven Impact.',
                caseStudies: caseStudies.docs.map((d) => d.id),
              } as Block,
            ]
          : []),
        {
          blockType: 'postList',
          tag: 'From the blog',
          heading: 'Latest articles',
          limit: 3,
          hideWhenEmpty: true,
          button: { label: 'All articles', url: '/blog', newTab: false },
        } as Block,
        ...cta,
      ],
      meta: {
        title: 'Resources | Customer360 Case Studies & Insights',
        description: 'Case studies and articles from Customer360 on making AI practical across enterprise data, systems and teams.',
        keyword: 'AI case studies',
      },
      seo: { pageType: 'CollectionPage', priority: 0.6, changeFrequency: 'weekly', breadcrumbLabel: 'Resources' },
    },
    legal('Privacy Policy', 'privacy', 'How Customer360 collects, uses and protects your personal information.', privacy, {
      title: 'Privacy Policy | Customer360',
      description: 'How Customer360 collects, uses and protects your personal information, and the rights you have over your data.',
    }),
    legal('Terms & Conditions', 'terms', 'The terms that apply when you use the Customer360 website.', terms, {
      title: 'Terms & Conditions | Customer360',
      description: 'The terms and conditions that apply when you access or use the Customer360 website and its content.',
    }),
  ]

  for (const data of pages) {
    const found = await payload.find({ collection: 'pages', where: { slug: { equals: data.slug } }, limit: 1, draft: true, ...opts })
    if (found.docs[0]) {
      log(`/${data.slug} already exists, left as is`)
      continue
    }
    await payload.create({ collection: 'pages', data: { ...data, _status: 'published' }, ...opts })
    log(`created /${data.slug}`)
  }

  // Old website addresses → new pages, so links and Google rankings carry over at launch.
  const redirects = [
    { from: '/privacy-policy', to: '/privacy' },
    { from: '/terms-conditions', to: '/terms' },
    { from: '/case-study', to: '/case-studies' },
    { from: '/product-list', to: '/products' },
  ]
  for (const r of redirects) {
    const found = await payload.find({ collection: 'redirects', where: { from: { equals: r.from } }, limit: 1, ...opts })
    if (found.docs[0]) continue
    await payload.create({ collection: 'redirects', data: { ...r, type: '301' }, ...opts })
    log(`redirect ${r.from} → ${r.to}`)
  }
}
