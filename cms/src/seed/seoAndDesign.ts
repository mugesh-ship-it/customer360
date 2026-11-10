/** SEO & tracking + Brand & design settings. Used by the full seed and by src/scripts/seed-seo.ts. */
import type { Payload } from 'payload'

export async function seedSeoAndDesign(payload: Payload, ids: { logo?: number; shareImage?: number }) {
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Customer360',
      siteUrl: process.env.SITE_URL?.startsWith('https://') ? process.env.SITE_URL.replace(/\/$/, '') : 'https://www.customer360.com',
      titleTemplate: '%s | Customer360',
      defaultTitle: 'Customer360 — SAP, Data & AI Solutions for Enterprises',
      defaultDescription:
        'Customer360 delivers SAP, Data and AI solutions that help enterprises worldwide simplify operations and accelerate transformation.',
      defaultShareImage: ids.shareImage,
      favicon: ids.logo,
      appleTouchIcon: ids.logo,
      themeColor: '#175cd3',
      allowIndexing: true,
      llmsSummary:
        'Customer360 is an SAP, Data and AI consultancy. We help enterprises migrate data, adopt AI, automate testing and get more from SAP, ServiceNow, AWS, Azure and Google Cloud.',
      organization: {
        type: 'ProfessionalService',
        legalName: 'Customer360',
        logo: ids.logo,
        email: 'enquiry@customer360.com',
        description: 'SAP, Data and AI solutions for enterprises worldwide.',
        sameAs: [{ url: 'https://facebook.com' }, { url: 'https://instagram.com' }, { url: 'https://x.com' }],
      },
      notFound: {
        heading: 'Page not found',
        text: 'The page you are looking for has moved or no longer exists.',
        button: { label: 'Back to home', url: '/', newTab: false },
      },
    },
  })

  // Brand & design: saving with no data stores the token defaults.
  await payload.updateGlobal({ slug: 'design', data: {} })
}
