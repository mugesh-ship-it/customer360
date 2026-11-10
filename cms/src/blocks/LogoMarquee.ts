import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { rowLabel } from '../fields/rowLabel'
import { blockAdmin } from './shared'

export const LogoMarqueeBlock: Block = {
  slug: 'logoMarquee',
  interfaceName: 'LogoMarqueeBlock',
  labels: { singular: 'Moving logo strip', plural: 'Moving logo strips' },
  ...blockAdmin('logoMarquee', 'A row of partner logos that slowly scrolls sideways'),
  fields: [
    {
      name: 'logos',
      label: 'Logos',
      labels: { singular: 'Logo', plural: 'Logos' },
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true, description: 'Drag rows to change the order.', ...rowLabel('name', 'Logo') },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Company name', type: 'text', required: true, admin: { width: '60%' } },
            {
              name: 'height',
              label: 'Logo size',
              type: 'number',
              defaultValue: 48,
              min: 20,
              max: 80,
              admin: { width: '40%', description: 'Height in pixels (usually 30–55).' },
            },
          ],
        },
        { name: 'logo', label: 'Logo image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'SVG or transparent PNG works best.' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Advanced settings (optional)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'speed', label: 'Scroll speed', type: 'number', defaultValue: 40, min: 10, max: 120, admin: { description: 'Seconds for one full loop. Bigger number = slower.' } },
        ...anchorField.fields,
      ],
    },
  ],
}
