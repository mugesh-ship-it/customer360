import type { CollectionConfig, FieldHook } from 'payload'
import { seoText } from '../fields/design'
import { publishedOrLoggedIn } from '../access/publishedOrLoggedIn'
import { triggerRebuild, triggerRebuildOnDelete } from '../hooks/triggerRebuild'
import { previewURL } from '../preview'
import { slugify } from './CaseStudies'

const slugFromTitle: FieldHook = ({ value, data }) => (value ? slugify(String(value)) : data?.title ? slugify(String(data.title)) : value)

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog article', plural: 'Blog articles' },
  access: { read: publishedOrLoggedIn },
  // Drafts autosave (feeding live preview); only Publish changes the live site.
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 25 },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status'],
    description: 'Articles for the Blog. Each one gets its own page at /blog/<web address>.',
    preview: (doc, { req }) => previewURL('posts', doc?.id as string | number | undefined, req),
  },
  hooks: { afterChange: [triggerRebuild], afterDelete: [triggerRebuildOnDelete] },
  fields: [
    { name: 'title', label: 'Headline', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Web address',
      type: 'text',
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugFromTitle] },
      admin: { position: 'sidebar', description: 'The end of the link, e.g. /blog/ai-readiness-checklist. Empty = made from the headline.' },
    },
    {
      name: 'publishedAt',
      label: 'Published',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' }, description: 'Newest first on the Blog.' },
    },
    { name: 'author', label: 'Author', type: 'text', admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'excerpt', label: 'Summary', type: 'textarea', required: true, admin: { description: '1–2 sentences, shown on the article card and at the top of the article.' } },
            { name: 'coverImage', label: 'Cover image', type: 'upload', relationTo: 'media', admin: { description: 'Landscape, about 1600 × 900.' } },
            {
              name: 'content',
              label: 'Article',
              type: 'richText',
              required: true,
              admin: { description: 'Use “Heading 2” for each part. They become the “On this page” list.' },
            },
          ],
        },
        {
          label: 'Google & sharing',
          fields: [
            {
              name: 'meta',
              label: false,
              type: 'group',
              fields: [
                seoText('title', 'Title in Google', { min: 30, max: 60, hint: 'Empty = the headline' }),
                seoText('description', 'Description in Google', { min: 70, max: 160, textarea: true, hint: 'Empty = the summary' }),
                { name: 'image', label: 'Image when shared', type: 'upload', relationTo: 'media', admin: { description: '1200 × 630 px. Empty = the cover image.' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
