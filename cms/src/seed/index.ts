/**
 * Seeds the CMS with the Home Page content from the Figma design.
 * Run: npm run seed   (safe to re-run; it replaces seeded docs)
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedSeoAndDesign } from './seoAndDesign'
import { seedAbout } from './about'
import { seedServices } from './services'
import { seedServiceDetail } from './serviceDetail'
import { seedProducts } from './products'
import { seedCaseStudies } from './caseStudies'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaDir = path.resolve(dirname, '../../seed/media')

const payload = await getPayload({ config })

// ---- reset seeded collections ----------------------------------------------
for (const collection of ['pages', 'case-studies', 'services', 'testimonials', 'team-profiles', 'media'] as const) {
  await payload.delete({ collection, where: { id: { exists: true } } })
}

// ---- media -----------------------------------------------------------------
const media: Record<string, number> = {}
const upload = async (key: string, file: string, alt: string) => {
  const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(mediaDir, file) })
  media[key] = doc.id as number
}

await Promise.all([
  upload('logo', 'logo-mark.webp', 'Customer360 logo'),
  upload('heroDecor', 'hero-union.svg', ''),
  upload('servicenow', 'logo-servicenow.svg', 'ServiceNow'),
  upload('sap', 'logo-sap.svg', 'SAP'),
  upload('aws', 'logo-aws.svg', 'Amazon Web Services'),
  upload('azure', 'logo-azure.svg', 'Microsoft Azure'),
  upload('walkme', 'logo-walkme.svg', 'WalkMe, an SAP company'),
  upload('googlecloud', 'logo-googlecloud.svg', 'Google Cloud'),
  upload('cloudLeft', 'about-cloud-left.webp', ''),
  upload('cloudRight', 'about-cloud-right.webp', ''),
  upload('featureSap', 'feature-sap.svg', 'Isometric server stack illustration'),
  upload('featureData', 'feature-data-ai.svg', 'Isometric AI chip illustration'),
  upload('featureErp', 'feature-erp.svg', 'Isometric laptop syncing with the cloud'),
  upload('david', 'testimonial-david.webp', 'Portrait of David'),
  upload('ted', 'testimonial-ted.webp', 'Portrait of Ted'),
  upload('map', 'world-map.webp', 'Dotted world map with Customer360 offices'),
  upload('robot', 'cta-robot.webp', 'Humanoid AI robot'),
  upload('robotTurn', 'cta-robot-turn.mp4', 'Humanoid AI robot turning to face the viewer'),
  upload('robotTurnMobile', 'cta-robot-turn-mobile.mp4', 'Humanoid AI robot turning to face the viewer'),
  upload('iconPhone', 'icon-phone.svg', 'Phone'),
  upload('iconPhoneAlt', 'icon-phone-alt.svg', 'Mobile'),
  upload('iconMail', 'icon-mail.svg', 'Email'),
  upload('facebook', 'social-facebook.svg', 'Facebook'),
  upload('instagram', 'social-instagram.svg', 'Instagram'),
  upload('x', 'social-x.svg', 'X'),
])

// ---- testimonials ----------------------------------------------------------
const quote =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec justo lobortis, hendrerit mauris fermentum, hendrerit felis. Sed nec mattis nunc, a lacinia sapien.'
const testimonials = await Promise.all(
  [
    { name: 'David', role: 'Head of Data & Analytics', avatar: media.david },
    { name: 'Ted', role: 'Head of Data & Analytics', avatar: media.ted },
    { name: 'David', role: 'Head of Data & Analytics', avatar: media.david },
    { name: 'Ted', role: 'Head of Data & Analytics', avatar: media.ted },
  ].map((t) =>
    payload.create({
      collection: 'testimonials',
      data: { ...t, headline: 'Every transformation milestone was met, smarter, faster, cleaner.', quote },
    }),
  ),
)

// ---- home page -------------------------------------------------------------
const contact = { label: 'Contact Us', url: '/contact', newTab: false }

await payload.create({
  collection: 'pages',
  data: {
    title: 'Home',
    slug: 'home',
    meta: {
      title: 'Customer360 — Intelligent AI Digital Enterprise Solutions',
      description:
        'Customer360 delivers SAP, Data, and AI solutions to enterprises worldwide, helping them simplify operations and accelerate transformation.',
    },
    layout: [
      {
        blockType: 'hero',
        heading: 'Intelligent AI Digital Enterprise Solutions',
        highlight: 'Intelligent AI',
        description:
          'We’re a forward-thinking company driven by innovation and impact. We turn clarity and purpose into meaningful results for businesses.',
        button: contact,
        decorImage: media.heroDecor,
      },
      {
        blockType: 'logoMarquee',
        speed: 40,
        logos: [
          { name: 'ServiceNow', logo: media.servicenow, height: 32 },
          { name: 'SAP', logo: media.sap, height: 50 },
          { name: 'AWS', logo: media.aws, height: 51 },
          { name: 'Microsoft Azure', logo: media.azure, height: 55 },
          { name: 'WalkMe', logo: media.walkme, height: 55 },
          { name: 'Google Cloud', logo: media.googlecloud, height: 41 },
        ],
      },
      {
        blockType: 'statement',
        text: 'We enable global organizations to simplify complexity, improve agility, and deliver measurable outcomes across SAP, Data, and AI ecosystems.',
      },
      {
        blockType: 'servicesWheel',
        anchorId: 'services',
        tag: 'Our Services',
        heading: 'Intelligent AI digital adoption solutions for enterprise',
        description:
          'Our team blends strategy, creativity, and technology to make AI practical, ethical, and impactful. From data engineers to experience designers, every member plays a part in driving human-centric innovation for enterprises worldwide.',
        button: { label: 'Explore Solutions', url: '/services', newTab: false },
        services: [
          { label: 'AI Data Migration' },
          { label: 'AI Accelerators', highlighted: true },
          { label: 'AI Digital Adoption' },
          { label: 'AI Automated Testing' },
          { label: 'AI for Intelligent Decisions' },
          { label: 'AI Data Profiling & Mapping' },
          { label: 'AI End-User Enablement' },
        ],
      },
      {
        blockType: 'stats',
        items: [
          { value: '98%', label: 'Client Retention Rate' },
          { value: '10+', label: 'Years of Expertise' },
          { value: '50+', label: 'Global clients' },
          { value: '24', label: 'Hours Global support' },
        ],
      },
      {
        blockType: 'aboutBanner',
        anchorId: 'about',
        text: 'We’re a collective of strategists, data engineers, designers, and technologists helping enterprises transform with AI and human intelligence. Our mission is to make AI practical, ethical, and impactful for every organization.',
        button: { label: 'More about us', url: '/about', newTab: false },
        backgroundLeft: media.cloudLeft,
        backgroundRight: media.cloudRight,
      },
      {
        blockType: 'features',
        tag: 'Why choose us',
        heading: 'Why Customer360',
        intro: 'Combining AI, data, and human insight to deliver measurable transformation.',
        items: [
          {
            title: 'Deep SAP Expertise',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus.',
            illustration: media.featureSap,
          },
          {
            title: 'Strong Data & AI Capabilities',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus.',
            illustration: media.featureData,
          },
          {
            title: 'Cross-Platform ERP Knowledge',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus.',
            illustration: media.featureErp,
          },
        ],
      },
      {
        blockType: 'testimonials',
        tag: 'Testimonials',
        heading: 'Trusted by Industry Leaders',
        intro: 'Our AI-first delivery model has helped global enterprises innovate faster and scale smarter.',
        testimonials: testimonials.map((t) => t.id),
      },
      {
        blockType: 'globalReach',
        anchorId: 'contact',
        tag: 'Get in touch',
        heading: 'Intelligent AI Enterprise Solutions, Delivered Globally',
        description:
          'We deliver SAP, Data, and AI solutions to enterprises worldwide, helping them simplify operations and accelerate transformation',
        button: { label: 'Contact us', url: '/contact', newTab: false },
        image: media.map,
      },
      {
        blockType: 'cta',
        heading: 'Let’s Build the Future, Together',
        button: { label: 'Talk to Our Experts', url: '/contact', newTab: false },
        image: media.robot,
        turnVideo: media.robotTurn,
        turnVideoMobile: media.robotTurnMobile,
      },
    ],
  },
})

// ---- globals ---------------------------------------------------------------
await payload.updateGlobal({
  slug: 'header',
  data: {
    brandName: 'Customer360',
    logo: media.logo,
    cta: contact,
    navLinks: [
      { label: 'Home', url: '/' },
      { label: 'Services', url: '/#services' },
      { label: 'Products', url: '/products' },
      { label: 'About Us', url: '/#about' },
      { label: 'Resources', url: '/resources' },
    ],
  },
})

await payload.updateGlobal({
  slug: 'footer',
  data: {
    contactHeading: 'Contact Us',
    contactItems: [
      { label: '+00 00000000', url: 'tel:+0000000000', icon: media.iconPhone },
      { label: '+00 00000000', url: 'tel:+0000000000', icon: media.iconPhoneAlt },
      { label: 'enquiry@customer360.com', url: 'mailto:enquiry@customer360.com', icon: media.iconMail },
    ],
    socialHeading: 'Social Media',
    socials: [
      { label: 'Facebook', url: 'https://facebook.com', icon: media.facebook },
      { label: 'Instagram', url: 'https://instagram.com', icon: media.instagram },
      { label: 'X', url: 'https://x.com', icon: media.x },
    ],
    columns: [
      {
        heading: 'Services',
        links: [
          'AI for Intelligent Decisions',
          'AI Accelerators',
          'AI Data Migration',
          'AI End-User Enablement',
          'AI Data Profiling & Mapping',
          'AI Digital Adoption',
          'AI Automated Testing',
        ].map((label) => ({ label, url: '/#services' })),
      },
      { heading: 'Products', links: ['Product 1', 'Product 2', 'Product 3'].map((label) => ({ label, url: '/products' })) },
      { heading: 'About us', links: [{ label: 'About Us', url: '/#about' }, { label: 'Careers', url: '/careers' }] },
      { heading: 'Resources', links: [{ label: 'Case Study', url: '/case-studies' }, { label: 'Blog', url: '/blog' }] },
    ],
    brandName: 'Customer360',
    copyright: '© 2018 - 25 customer360 - All Rights Reserved',
    legalLinks: [
      { label: 'FAQ', url: '/faq' },
      { label: 'Privacy', url: '/privacy' },
      { label: 'Terms & Condition', url: '/terms' },
    ],
  },
})

await seedSeoAndDesign(payload, { logo: media.logo, shareImage: media.robot })

await seedAbout(payload)
await seedServices(payload)
await seedServiceDetail(payload)
await seedProducts(payload)
await seedCaseStudies(payload)

payload.logger.info('✅ Seed complete')
process.exit(0)
