import type { CollectionConfig } from 'payload'
import { triggerRebuild, triggerRebuildOnDelete } from '../hooks/triggerRebuild'

/** The company's own products. Shown in "Product grid" sections. */
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Product', plural: 'Products' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'updatedAt'],
    description: 'Products you build. Pick them in a page’s “Product grid” section.',
  },
  hooks: { afterChange: [triggerRebuild], afterDelete: [triggerRebuildOnDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Product name', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          defaultValue: 'upcoming',
          options: [
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Available', value: 'available' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'summary', label: 'One-line summary', type: 'textarea', admin: { description: 'About 10–15 words, shown on the product card.' } },
    {
      type: 'row',
      fields: [
        { name: 'icon', label: 'Icon', type: 'upload', relationTo: 'media', admin: { width: '50%', description: 'Small square icon (SVG works best), shown in the round badge.' } },
        { name: 'url', label: 'Goes to (optional)', type: 'text', admin: { width: '50%', placeholder: '/products/…' } },
      ],
    },
  ],
}
