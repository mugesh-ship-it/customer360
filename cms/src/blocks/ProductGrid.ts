import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const ProductGridBlock: Block = {
  slug: 'productGrid',
  interfaceName: 'ProductGridBlock',
  labels: { singular: 'Product grid', plural: 'Product grids' },
  ...blockAdmin('productGrid', 'Title and text on the left, product cards in a 2-column grid on the right'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text', type: 'textarea' },
    {
      name: 'products',
      label: 'Which products to show',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
      admin: { description: 'Choose from Products. Drag to reorder.' },
    },
    anchorField,
  ],
}
