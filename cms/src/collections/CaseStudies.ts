import type { CollectionConfig, FieldHook } from 'payload'
import { seoText } from '../fields/design'
import { rowLabel } from '../fields/rowLabel'
import { triggerRebuild } from '../hooks/triggerRebuild'

/** "Accelerating Digital Adoption…" → "accelerating-digital-adoption…" */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

/** Fill the web address from the headline when it is left empty. */
const slugFromTitle: FieldHook = ({ value, data }) => (value ? slugify(String(value)) : data?.title ? slugify(String(data.title)) : value)

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  access: { read: () => true },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'service', 'client', 'publishedAt'],
    description: 'Client success stories. Each one gets its own page at /case-studies/<web address> and appears on the Case Studies page.',
    preview: (doc) => `${process.env.SITE_URL || 'http://localhost:4321'}/case-studies/${doc?.slug ?? ''}`,
  },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: 'title', label: 'Headline', type: 'text', required: true, admin: { placeholder: 'Accelerating Digital Adoption Across 20,000 Employees' } },
    {
      name: 'slug',
      label: 'Web address',
      type: 'text',
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugFromTitle] },
      admin: { position: 'sidebar', description: 'The end of the link, e.g. /case-studies/global-retail-migration. Empty = made from the headline.' },
    },
    {
      name: 'publishedAt',
      label: 'Published',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' }, description: 'Newest first on the Case Studies page.' },
    },
    {
      type: 'tabs',
      tabs: [
        // ------------------------------------------------------------------
        {
          label: 'Card',
          description: 'What visitors see on the case-study cards.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'service',
                  label: 'Service',
                  type: 'relationship',
                  relationTo: 'services',
                  admin: { width: '50%', description: 'Shown above the headline and used for the filter buttons.' },
                },
                {
                  name: 'url',
                  label: 'Card goes to (optional)',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'https://…', description: 'Only to link somewhere else. Empty = this case study’s own page.' },
                },
              ],
            },
            {
              name: 'tags',
              label: 'Tags',
              labels: { singular: 'Tag', plural: 'Tags' },
              type: 'array',
              maxRows: 4,
              admin: { description: 'Short outcome labels shown as pills. 2 looks best.', ...rowLabel('label', 'Tag') },
              fields: [{ name: 'label', label: 'Tag', type: 'text', required: true }],
            },
          ],
        },
        // ------------------------------------------------------------------
        {
          label: 'Story page',
          description: 'The case study’s own page.',
          fields: [
            { name: 'excerpt', label: 'Intro', type: 'textarea', admin: { description: '1–2 sentences under the headline. Also used in Google if no description is set.' } },
            {
              type: 'row',
              fields: [
                { name: 'client', label: 'Client', type: 'text', admin: { width: '34%', placeholder: 'Global retail leader' } },
                { name: 'industry', label: 'Industry', type: 'text', admin: { width: '33%', placeholder: 'Retail' } },
                { name: 'duration', label: 'Timeline', type: 'text', admin: { width: '33%', placeholder: '6 months' } },
              ],
            },
            {
              name: 'coverImage',
              label: 'Cover image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Wide image, about 1600 × 700 px. Empty = the service illustration on a brand panel.' },
            },
            {
              name: 'results',
              label: 'Key results',
              labels: { singular: 'Result', plural: 'Results' },
              type: 'array',
              maxRows: 4,
              admin: { description: 'Big numbers shown under the cover image. 3 looks best.', ...rowLabel('label', 'Result') },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', label: 'Number', type: 'text', required: true, admin: { width: '30%', placeholder: '40%' } },
                    { name: 'label', label: 'What it means', type: 'text', required: true, admin: { width: '70%', placeholder: 'less manual effort' } },
                  ],
                },
              ],
            },
            {
              name: 'content',
              label: 'Story',
              type: 'richText',
              admin: {
                description: 'Use “Heading 2” for each part of the story (Challenge, Approach, Results…). They become the “On this page” list; “Heading 3” shows as a sub-item.',
              },
            },
          ],
        },
        // ------------------------------------------------------------------
        {
          label: 'Google & sharing',
          fields: [
            {
              name: 'meta',
              label: false,
              type: 'group',
              fields: [
                seoText('title', 'Title in Google', { min: 30, max: 60, hint: 'Empty = headline + site name' }),
                seoText('description', 'Description in Google', { min: 70, max: 160, textarea: true, hint: 'Empty = the intro' }),
                { name: 'image', label: 'Image when shared', type: 'upload', relationTo: 'media', admin: { description: '1200 × 630 px. Empty = the cover image.' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
