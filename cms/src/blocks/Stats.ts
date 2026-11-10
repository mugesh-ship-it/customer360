import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { rowLabel } from '../fields/rowLabel'
import { blockAdmin } from './shared'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Big numbers', plural: 'Big numbers' },
  ...blockAdmin('stats', 'Large key figures that scroll sideways, e.g. 98% client retention'),
  fields: [
    {
      name: 'items',
      label: 'Numbers',
      labels: { singular: 'Number', plural: 'Numbers' },
      type: 'array',
      minRows: 1,
      admin: { ...rowLabel('value', 'Number') },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', label: 'Number', type: 'text', required: true, admin: { width: '35%', placeholder: '98%' } },
            { name: 'label', label: 'What it means', type: 'text', required: true, admin: { width: '65%', placeholder: 'Client Retention Rate' } },
          ],
        },
      ],
    },
    anchorField,
  ],
}
