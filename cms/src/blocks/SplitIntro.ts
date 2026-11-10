import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const SplitIntroBlock: Block = {
  slug: 'splitIntro',
  interfaceName: 'SplitIntroBlock',
  labels: { singular: 'Title & text + image', plural: 'Title & text + image' },
  ...blockAdmin('splitIntro', 'Big title and a paragraph on one side, a photo on the other'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'text', label: 'Paragraph', type: 'textarea', admin: { description: '1–3 sentences under the title.' } },
    {
      type: 'row',
      fields: [
        { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media', admin: { width: '50%', description: 'Roughly square. Cropped to fill its box.' } },
        {
          name: 'imagePosition',
          label: 'Photo position',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    anchorField,
  ],
}
