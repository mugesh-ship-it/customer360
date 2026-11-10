import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { rowLabel } from '../fields/rowLabel'
import { sectionBackgroundField } from '../fields/sectionBackground'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const IconCardsBlock: Block = {
  slug: 'iconCards',
  interfaceName: 'IconCardsBlock',
  labels: { singular: 'Icon cards (centred title)', plural: 'Icon cards' },
  ...blockAdmin('iconCards', 'Centred title and a row of cards with a round icon badge in the top corner'),
  fields: [
    sectionBackgroundField('tint'),
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'cards',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true, description: '3 per row on desktop.', ...rowLabel('title', 'Card') },
      fields: [
        { name: 'icon', label: 'Icon', type: 'upload', relationTo: 'media', admin: { description: 'Small SVG (about 32 px), shown in the round badge.' } },
        { name: 'title', label: 'Card title', type: 'text', required: true },
        { name: 'description', label: 'Card text', type: 'textarea' },
      ],
    },
    anchorField,
  ],
}
