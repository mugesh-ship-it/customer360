import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { rowLabel } from '../fields/rowLabel'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const IconListBlock: Block = {
  slug: 'iconList',
  interfaceName: 'IconListBlock',
  labels: { singular: 'Icon list (two columns)', plural: 'Icon lists' },
  ...blockAdmin('iconList', 'Centred title on a soft sky, then a two-column list of icons, titles and text'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'items',
      label: 'Points',
      labels: { singular: 'Point', plural: 'Points' },
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true, description: 'Filled top to bottom, left column first. An even number looks best.', ...rowLabel('title', 'Point') },
      fields: [
        { name: 'icon', label: 'Icon', type: 'upload', relationTo: 'media', admin: { description: 'SVG, about 60 × 60 px.' } },
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Text', type: 'textarea' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Background clouds',
      admin: { initCollapsed: true, description: 'Soft images behind the title. Leave empty for just the blue glow.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'backgroundLeft', label: 'Left cloud image', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
            { name: 'backgroundRight', label: 'Right cloud image', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
          ],
        },
      ],
    },
    anchorField,
  ],
}
