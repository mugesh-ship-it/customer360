import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { rowLabel } from '../fields/rowLabel'
import { blockAdmin } from './shared'

export const ApproachBlock: Block = {
  slug: 'approach',
  interfaceName: 'ApproachBlock',
  labels: { singular: 'Steps accordion + illustration', plural: 'Steps accordions' },
  ...blockAdmin('approach', 'Title, expandable steps on the left and an illustration on the right'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'items',
      label: 'Steps',
      labels: { singular: 'Step', plural: 'Steps' },
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true, description: 'Visitors click a step to open it. The first step starts open.', ...rowLabel('title', 'Step') },
      fields: [
        { name: 'title', label: 'Step title', type: 'text', required: true },
        { name: 'description', label: 'Text shown when open', type: 'textarea' },
        {
          name: 'caption',
          label: 'Label above the illustration',
          type: 'text',
          admin: { placeholder: 'Insight-Driven Thinking', description: 'Shown with the step number while this step is open. Empty = step title.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'illustration', label: 'Illustration', type: 'upload', relationTo: 'media', admin: { width: '50%', description: 'SVG or PNG, shown beside the steps on desktop.' } },
        {
          name: 'arrangement',
          label: 'Layout',
          type: 'select',
          defaultValue: 'stepsLeft',
          options: [
            { label: 'Steps left, illustration right (with step label)', value: 'stepsLeft' },
            { label: 'Photo left, steps right', value: 'imageLeft' },
          ],
          admin: { width: '50%', description: '“Photo left” crops the image to fill its box and hides the step label.' },
        },
      ],
    },
    anchorField,
  ],
}
