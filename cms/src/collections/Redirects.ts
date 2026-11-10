import type { CollectionConfig } from 'payload'
import { triggerRebuild } from '../hooks/triggerRebuild'

const path = (v: unknown) =>
  typeof v === 'string' && /^\/[^\s]*$/.test(v) ? true : 'Start with / , e.g. /old-page'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },
  access: { read: () => true },
  admin: {
    group: 'Settings',
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type'],
    description: 'Send visitors (and Google) from an old link to a new one, so you keep your rankings when pages move.',
  },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'from', label: 'Old link', type: 'text', required: true, unique: true, validate: path, admin: { width: '40%', placeholder: '/old-page' } },
        { name: 'to', label: 'New link', type: 'text', required: true, admin: { width: '40%', placeholder: '/new-page  or  https://…' } },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          defaultValue: '301',
          options: [
            { label: 'Permanent (301)', value: '301' },
            { label: 'Temporary (302)', value: '302' },
          ],
          admin: { width: '20%' },
        },
      ],
    },
  ],
}
