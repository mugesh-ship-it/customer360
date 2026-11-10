import type { CollectionConfig } from 'payload'
import { triggerRebuild } from '../hooks/triggerRebuild'

/** The company's services. Shown in "Services grid" sections and used as case-study categories. */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'url', 'updatedAt'],
    description: 'Each service you offer. Pick them in a page’s “Services grid” section; case studies can be filed under one.',
  },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: 'title', label: 'Service name', type: 'text', required: true },
    { name: 'summary', label: 'One-line summary', type: 'textarea', admin: { description: 'Shown under the name on service cards. About 15 words.' } },
    {
      name: 'illustration',
      label: 'Illustration',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'SVG works best. It is shown at its natural size, so keep illustrations at a similar scale.' },
    },
    {
      name: 'url',
      label: 'Goes to',
      type: 'text',
      admin: { placeholder: '/services/ai-data-migration', description: 'Where the arrow on the card links to. Empty = no link.' },
    },
  ],
}
