import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { rowLabel } from '../fields/rowLabel'
import { blockAdmin } from './shared'

export const ValuesBlock: Block = {
  slug: 'values',
  interfaceName: 'ValuesBlock',
  labels: { singular: 'Values (stepped columns + photo)', plural: 'Values sections' },
  ...blockAdmin('values', 'Title, then full-width columns that step down, with a photo at the end'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'items',
      label: 'Values',
      labels: { singular: 'Value', plural: 'Values' },
      type: 'array',
      minRows: 1,
      maxRows: 4,
      admin: { initCollapsed: true, description: '3 looks best. Each one sits a little lower than the last.', ...rowLabel('title', 'Value') },
      fields: [
        { name: 'title', label: 'Value', type: 'text', required: true, admin: { placeholder: 'Integrity' } },
        { name: 'description', label: 'Short text', type: 'textarea' },
      ],
    },
    { name: 'image', label: 'Photo at the end of the row', type: 'upload', relationTo: 'media', admin: { description: 'Portrait photo. Cropped to fill the column.' } },
    anchorField,
  ],
}
