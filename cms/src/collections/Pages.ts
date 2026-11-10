import type { CollectionConfig } from 'payload'
import { pageBlocks } from '../blocks'
import { triggerRebuild } from '../hooks/triggerRebuild'
import { seoText } from '../fields/design'

const siteUrl = process.env.SITE_URL || 'http://localhost:4321'
const pagePath = (slug?: string | null) => (!slug || slug === 'home' ? '/' : `/${slug}`)

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Every page of the website. Open a page, then edit its sections one by one.',
    preview: (doc) => `${siteUrl}${pagePath(doc?.slug as string)}`,
  },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: 'title', label: 'Page name', type: 'text', required: true, admin: { description: 'For your reference in the admin.' } },
    {
      name: 'slug',
      label: 'Web address',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'The end of the page link, e.g. “about” → yoursite.com/about. The Home page must stay “home”.',
      },
    },
    {
      name: 'pageBackground',
      label: 'Page background',
      type: 'select',
      defaultValue: 'page',
      options: [
        { label: 'Standard', value: 'page' },
        { label: 'Lighter', value: 'light' },
      ],
      admin: { position: 'sidebar', description: 'Colours come from Settings → Brand & design (Page background / Greys 50).' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page sections',
          description: 'Sections appear on the page in this order. Drag to reorder, click a section to open it, or use “Add section”.',
          fields: [
            {
              name: 'layout',
              label: 'Sections',
              labels: { singular: 'Section', plural: 'Sections' },
              type: 'blocks',
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          label: 'Google & sharing',
          description: 'How this page looks in Google results and when shared on social media.',
          fields: [
            {
              name: 'meta',
              label: false,
              type: 'group',
              fields: [
                seoText('title', 'Title in Google', { min: 30, max: 60, hint: 'Put the main keyword first' }),
                seoText('description', 'Description in Google', { min: 70, max: 160, textarea: true, hint: 'Summarise the page and invite the click' }),
                {
                  name: 'image',
                  label: 'Image when shared',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: '1200 × 630 px. Empty = the default share image from SEO & tracking.' },
                },
                {
                  name: 'keyword',
                  label: 'Main search phrase',
                  type: 'text',
                  admin: {
                    placeholder: 'e.g. SAP data migration services',
                    description: 'For your reference: the phrase you want this page found for. Use it in the title, the description and the main heading.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Advanced SEO',
          description: 'Leave these alone unless you know you need them.',
          fields: [
            {
              name: 'seo',
              label: false,
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'noindex', label: 'Hide from Google', type: 'checkbox', defaultValue: false, admin: { width: '33%', description: 'For thank-you pages, landing pages for ads, etc.' } },
                    { name: 'nofollow', label: 'Don’t follow links on this page', type: 'checkbox', defaultValue: false, admin: { width: '33%' } },
                    { name: 'hideFromSitemap', label: 'Leave out of the sitemap', type: 'checkbox', defaultValue: false, admin: { width: '33%' } },
                  ],
                },
                {
                  name: 'canonical',
                  label: 'Original page link (canonical)',
                  type: 'text',
                  admin: { placeholder: 'https://…', description: 'Only if this page copies content from another page. Empty = this page’s own address.' },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'pageType',
                      label: 'Page type (for Google)',
                      type: 'select',
                      defaultValue: 'WebPage',
                      options: [
                        { label: 'Standard page', value: 'WebPage' },
                        { label: 'About page', value: 'AboutPage' },
                        { label: 'Contact page', value: 'ContactPage' },
                        { label: 'FAQ page', value: 'FAQPage' },
                        { label: 'Listing page (blog, case studies…)', value: 'CollectionPage' },
                        { label: 'Product / service page', value: 'ItemPage' },
                      ],
                      admin: { width: '34%' },
                    },
                    {
                      name: 'changeFrequency',
                      label: 'Changes about',
                      type: 'select',
                      defaultValue: 'monthly',
                      options: ['daily', 'weekly', 'monthly', 'yearly'].map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
                      admin: { width: '33%' },
                    },
                    {
                      name: 'priority',
                      label: 'Importance in sitemap',
                      type: 'number',
                      min: 0,
                      max: 1,
                      defaultValue: 0.7,
                      admin: { width: '33%', step: 0.1, description: '0 – 1. Home page = 1.' },
                    },
                  ],
                },
                {
                  name: 'breadcrumbLabel',
                  label: 'Short name in breadcrumbs',
                  type: 'text',
                  admin: { placeholder: 'About', description: 'Shown in Google’s breadcrumb trail. Empty = page name.' },
                },
                {
                  name: 'schema',
                  label: 'Extra structured data (JSON-LD)',
                  type: 'json',
                  admin: { description: 'Advanced. A JSON-LD object or list, added to this page as-is.' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
