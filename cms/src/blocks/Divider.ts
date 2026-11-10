import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { blockAdmin } from './shared'

export const DividerBlock: Block = {
  slug: 'divider',
  interfaceName: 'DividerBlock',
  labels: { singular: 'Grid lines divider', plural: 'Grid lines dividers' },
  ...blockAdmin('divider', 'Thin decorative lines with a glowing dot, to separate two sections'),
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'nodes',
          label: 'Dots',
          type: 'select',
          defaultValue: '1',
          options: [
            { label: 'One (centre)', value: '1' },
            { label: 'Three', value: '3' },
          ],
          admin: { width: '34%' },
        },
        { name: 'lineUp', label: 'Line going up', type: 'checkbox', defaultValue: true, admin: { width: '33%', style: { alignSelf: 'flex-end' } } },
        { name: 'lineDown', label: 'Line going down', type: 'checkbox', defaultValue: true, admin: { width: '33%', style: { alignSelf: 'flex-end' } } },
      ],
    },
    anchorField,
  ],
}
