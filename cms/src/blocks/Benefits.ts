import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { rowLabel } from '../fields/rowLabel'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const BenefitsBlock: Block = {
  slug: 'benefits',
  interfaceName: 'BenefitsBlock',
  labels: { singular: 'Benefits list', plural: 'Benefits lists' },
  ...blockAdmin('benefits', 'Title and photo on the left, a list of icon cards on the right'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media' },
    {
      name: 'items',
      label: 'Benefits',
      labels: { singular: 'Benefit', plural: 'Benefits' },
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { ...rowLabel('title', 'Benefit') },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'icon',
              label: 'Icon',
              type: 'upload',
              relationTo: 'media',
              admin: { width: '50%', description: 'One-colour SVG. It is recoloured to match the card.' },
            },
          ],
        },
        { name: 'description', label: 'Text', type: 'textarea' },
        {
          name: 'highlighted',
          label: 'Highlight this card',
          type: 'checkbox',
          admin: { description: 'Shown in the brand colour until a visitor hovers another card.' },
        },
      ],
    },
    anchorField,
  ],
}
