import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { blockAdmin } from './shared'

export const LongTextBlock: Block = {
  slug: 'longText',
  interfaceName: 'LongTextBlock',
  labels: { singular: 'Long text (policies, articles)', plural: 'Long texts' },
  ...blockAdmin('longText', 'A column of formatted text with headings and an “On this page” list beside it'),
  fields: [
    {
      name: 'content',
      label: 'Text',
      type: 'richText',
      required: true,
      admin: { description: 'Use “Heading 2” for each part. Headings become the “On this page” list.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'showContents', label: 'Show the “On this page” list', type: 'checkbox', defaultValue: true, admin: { width: '34%', style: { alignSelf: 'flex-end' } } },
        { name: 'contentsLabel', label: 'List title', type: 'text', defaultValue: 'On this page', admin: { width: '33%' } },
        {
          name: 'lastUpdated',
          label: 'Last updated',
          type: 'date',
          admin: { width: '33%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' }, description: 'Optional. Shown above the text.' },
        },
      ],
    },
    { name: 'lastUpdatedLabel', label: 'Text before the date', type: 'text', defaultValue: 'Last updated' },
    anchorField,
  ],
}
