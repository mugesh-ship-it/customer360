import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { linkField } from '../fields/link'
import { rowLabel } from '../fields/rowLabel'
import { sectionBackgroundField } from '../fields/sectionBackground'
import { blockAdmin } from './shared'

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: { singular: 'Title, text & card row', plural: 'Title, text & card rows' },
  ...blockAdmin('cardGrid', 'Big title, text with a button on the right, and a row of illustrated cards'),
  fields: [
    sectionBackgroundField('tint'),
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text on the right', type: 'textarea' },
    linkField({ name: 'button' }),
    {
      name: 'cards',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true, description: '3 per row on desktop.', ...rowLabel('title', 'Card') },
      fields: [
        { name: 'illustration', label: 'Illustration', type: 'upload', relationTo: 'media' },
        { name: 'title', label: 'Card title', type: 'text', required: true },
        { name: 'description', label: 'Card text', type: 'textarea' },
      ],
    },
    anchorField,
  ],
}
