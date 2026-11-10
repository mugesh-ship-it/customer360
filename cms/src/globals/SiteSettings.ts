import type { GlobalConfig } from 'payload'
import { seoText } from '../fields/design'
import { linkField } from '../fields/link'
import { rowLabel } from '../fields/rowLabel'
import { triggerRebuildGlobal } from '../hooks/triggerRebuild'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'SEO & tracking',
  access: { read: () => true },
  admin: {
    group: 'Settings',
    description: 'How the whole website appears in Google and on social media, plus analytics and tracking codes.',
  },
  hooks: { afterChange: [triggerRebuildGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ------------------------------------------------------------------
        {
          label: 'Website basics',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', label: 'Website name', type: 'text', required: true, defaultValue: 'Customer360', admin: { width: '50%' } },
                {
                  name: 'siteUrl',
                  label: 'Live website address',
                  type: 'text',
                  required: true,
                  defaultValue: 'https://www.customer360.com',
                  admin: { width: '50%', placeholder: 'https://www.example.com', description: 'Used for Google, the sitemap and share links. No slash at the end.' },
                  validate: (v: unknown) => (typeof v === 'string' && /^https?:\/\/[^\s/]+[^\s]*[^/]$/.test(v) ? true : 'Start with https:// and leave off the slash at the end'),
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'titleTemplate',
                  label: 'Page title pattern',
                  type: 'text',
                  defaultValue: '%s | Customer360',
                  admin: { width: '50%', description: '%s is replaced by the page title, e.g. “About us | Customer360”.' },
                },
                {
                  name: 'language',
                  label: 'Language code',
                  type: 'text',
                  defaultValue: 'en',
                  admin: { width: '25%', placeholder: 'en-GB', description: 'e.g. en, en-GB, de' },
                },
                {
                  name: 'locale',
                  label: 'Social locale',
                  type: 'text',
                  defaultValue: 'en_GB',
                  admin: { width: '25%', placeholder: 'en_GB', description: 'For Facebook/LinkedIn.' },
                },
              ],
            },
            seoText('defaultTitle', 'Default title in Google', { min: 30, max: 60, hint: 'Used when a page has no title of its own' }),
            seoText('defaultDescription', 'Default description in Google', { min: 70, max: 160, textarea: true, hint: 'Used when a page has no description' }),
            {
              type: 'row',
              fields: [
                {
                  name: 'defaultShareImage',
                  label: 'Default share image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: '1200 × 630 px. Shown when a page is shared on LinkedIn, X, WhatsApp…' },
                },
                {
                  name: 'favicon',
                  label: 'Browser tab icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '25%', description: 'Square PNG or SVG, at least 512 px.' },
                },
                {
                  name: 'appleTouchIcon',
                  label: 'Phone home-screen icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '25%', description: 'Square PNG, 180 px.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'twitterHandle', label: 'X / Twitter handle', type: 'text', admin: { width: '50%', placeholder: '@customer360' } },
                { name: 'themeColor', label: 'Browser bar colour (phones)', type: 'text', admin: { width: '50%', placeholder: '#175cd3' } },
              ],
            },
          ],
        },
        // ------------------------------------------------------------------
        {
          label: 'Search engines',
          fields: [
            {
              name: 'allowIndexing',
              label: 'Let Google show this website in search results',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Untick on staging or test copies so they never show up in Google.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'googleVerification', label: 'Google Search Console code', type: 'text', admin: { width: '50%', description: 'Only the content="…" value of the verification tag.' } },
                { name: 'bingVerification', label: 'Bing Webmaster code', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'robotsExtra',
              label: 'Extra robots.txt rules',
              type: 'textarea',
              admin: { placeholder: 'Disallow: /thank-you', description: 'Advanced. One rule per line, added for all crawlers.' },
            },
            {
              name: 'llmsSummary',
              label: 'Summary for AI assistants (llms.txt)',
              type: 'textarea',
              admin: {
                description: 'A short plain-English summary of what the company does. ChatGPT, Claude and similar tools read it from /llms.txt.',
              },
            },
          ],
        },
        // ------------------------------------------------------------------
        {
          label: 'Business details',
          description: 'Shown to Google as structured data. Helps with the knowledge panel, logo in results and local search.',
          fields: [
            {
              name: 'organization',
              label: false,
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'type',
                      label: 'Business type',
                      type: 'select',
                      defaultValue: 'Organization',
                      options: [
                        { label: 'Company / organisation', value: 'Organization' },
                        { label: 'Corporation', value: 'Corporation' },
                        { label: 'Local business (has a shop or office visitors come to)', value: 'LocalBusiness' },
                        { label: 'Professional service', value: 'ProfessionalService' },
                      ],
                      admin: { width: '40%' },
                    },
                    { name: 'legalName', label: 'Legal company name', type: 'text', admin: { width: '60%' } },
                  ],
                },
                { name: 'logo', label: 'Logo for Google', type: 'upload', relationTo: 'media', admin: { description: 'Square or wide, at least 112 px, PNG or SVG.' } },
                { name: 'description', label: 'About the business', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'email', label: 'Email', type: 'email', admin: { width: '33%' } },
                    { name: 'phone', label: 'Phone', type: 'text', admin: { width: '33%', placeholder: '+44 20 1234 5678' } },
                    { name: 'foundingYear', label: 'Founded (year)', type: 'text', admin: { width: '33%', placeholder: '2018' } },
                  ],
                },
                {
                  name: 'address',
                  label: 'Address',
                  type: 'group',
                  fields: [
                    { name: 'street', label: 'Street', type: 'text' },
                    {
                      type: 'row',
                      fields: [
                        { name: 'city', label: 'City', type: 'text', admin: { width: '25%' } },
                        { name: 'region', label: 'County / state', type: 'text', admin: { width: '25%' } },
                        { name: 'postalCode', label: 'Postcode', type: 'text', admin: { width: '25%' } },
                        { name: 'country', label: 'Country code', type: 'text', admin: { width: '25%', placeholder: 'GB' } },
                      ],
                    },
                  ],
                },
                {
                  name: 'sameAs',
                  label: 'Official profiles',
                  labels: { singular: 'Profile', plural: 'Profiles' },
                  type: 'array',
                  admin: { description: 'LinkedIn, X, Crunchbase, Wikipedia… Tells Google these accounts are yours.', ...rowLabel('url', 'Profile') },
                  fields: [{ name: 'url', label: 'Profile link', type: 'text', required: true, admin: { placeholder: 'https://www.linkedin.com/company/…' } }],
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------------
        {
          label: 'Analytics & tracking',
          description: 'Paste only the ID. The site adds the code for you. Leave empty to turn a tool off.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'gaId', label: 'Google Analytics 4 ID', type: 'text', admin: { width: '33%', placeholder: 'G-XXXXXXXXXX' } },
                { name: 'gtmId', label: 'Google Tag Manager ID', type: 'text', admin: { width: '33%', placeholder: 'GTM-XXXXXXX' } },
                { name: 'metaPixelId', label: 'Meta (Facebook) Pixel ID', type: 'text', admin: { width: '33%', placeholder: '123456789012345' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'linkedinPartnerId', label: 'LinkedIn Insight Tag ID', type: 'text', admin: { width: '33%', placeholder: '1234567' } },
                { name: 'hotjarId', label: 'Hotjar site ID', type: 'text', admin: { width: '33%', placeholder: '1234567' } },
                { name: 'clarityId', label: 'Microsoft Clarity ID', type: 'text', admin: { width: '33%', placeholder: 'abcdefghij' } },
              ],
            },
            {
              name: 'headCode',
              label: 'Extra code in <head>',
              type: 'code',
              admin: { language: 'html', description: 'Advanced. Pasted into every page’s <head>. A mistake here can break the site.' },
            },
            {
              name: 'bodyCode',
              label: 'Extra code before </body>',
              type: 'code',
              admin: { language: 'html', description: 'Advanced. Chat widgets and similar.' },
            },
          ],
        },
        // ------------------------------------------------------------------
        {
          label: 'Page not found',
          description: 'The page visitors see when a link is broken (404).',
          fields: [
            {
              name: 'notFound',
              label: false,
              type: 'group',
              fields: [
                { name: 'heading', label: 'Heading', type: 'text', defaultValue: 'Page not found' },
                { name: 'text', label: 'Text', type: 'textarea', defaultValue: 'The page you are looking for has moved or no longer exists.' },
                linkField({ name: 'button', label: 'Button' }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
