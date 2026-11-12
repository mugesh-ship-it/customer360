import type { CollectionConfig } from 'payload'
import { triggerRebuild, triggerRebuildOnDelete } from '../hooks/triggerRebuild'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'headline', 'updatedAt'],
    description: 'Client quotes. After adding one here, choose it in the Testimonials section of a page.',
  },
  hooks: { afterChange: [triggerRebuild], afterDelete: [triggerRebuildOnDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Person’s name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', label: 'Job title', type: 'text', admin: { width: '50%', placeholder: 'Head of Data & Analytics' } },
      ],
    },
    { name: 'headline', label: 'Short headline', type: 'text', required: true, admin: { description: 'One punchy line, shown in capitals.' } },
    { name: 'quote', label: 'Their words', type: 'textarea', required: true, admin: { description: '2–3 sentences works best.' } },
    { name: 'avatar', label: 'Photo', type: 'upload', relationTo: 'media', admin: { description: 'A square photo looks best. It is shown as a circle.' } },
  ],
}
