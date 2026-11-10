import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials slider', plural: 'Testimonials sliders' },
  ...blockAdmin('testimonials', 'Client quotes in a slider with arrows'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'intro', label: 'Small text on the left', type: 'textarea' },
    {
      name: 'testimonials',
      label: 'Which testimonials to show',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
      admin: { description: 'Choose from your Testimonials list. Drag to change the order. To write a new one, go to Testimonials in the menu first.' },
    },
    anchorField,
  ],
}
