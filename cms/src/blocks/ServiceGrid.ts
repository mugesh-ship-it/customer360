import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const ServiceGridBlock: Block = {
  slug: 'serviceGrid',
  interfaceName: 'ServiceGridBlock',
  labels: { singular: 'Services grid', plural: 'Services grids' },
  ...blockAdmin('serviceGrid', 'Centred title and illustrated service cards with an arrow link'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'services',
      label: 'Which services to show',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      admin: { description: 'Choose from Services. Drag to reorder. Cards are laid out 3 · 2 · 2 like the design (the pattern repeats).' },
    },
    anchorField,
  ],
}
