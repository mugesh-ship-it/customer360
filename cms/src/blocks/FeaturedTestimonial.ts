import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const FeaturedTestimonialBlock: Block = {
  slug: 'featuredTestimonial',
  interfaceName: 'FeaturedTestimonialBlock',
  labels: { singular: 'Featured testimonial', plural: 'Featured testimonials' },
  ...blockAdmin('featuredTestimonial', 'One large quote with a cut-out photo on a soft brand background'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      required: true,
      admin: { description: 'Pick one from Testimonials. Their words, name and job title are shown.' },
    },
    {
      name: 'image',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'A transparent PNG of a person works best. Shown on the right on desktop.' },
    },
    anchorField,
  ],
}
