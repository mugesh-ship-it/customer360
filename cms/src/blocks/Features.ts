import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { rowLabel } from '../fields/rowLabel'
import { blockAdmin } from './shared'

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: { singular: 'Feature cards', plural: 'Feature cards' },
  ...blockAdmin('features', 'Title and cards with an illustration, title and short text'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'intro', label: 'Small text on the left', type: 'textarea' },
    {
      name: 'items',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true, description: 'Cards are laid out in a zig-zag. 3 looks best.', ...rowLabel('title', 'Card') },
      fields: [
        { name: 'title', label: 'Card title', type: 'text', required: true },
        { name: 'description', label: 'Card text', type: 'textarea' },
        { name: 'illustration', label: 'Illustration', type: 'upload', relationTo: 'media' },
      ],
    },
    anchorField,
  ],
}
