import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linkField } from '../fields/link'
import { blockAdmin } from './shared'

export const AboutBannerBlock: Block = {
  slug: 'aboutBanner',
  interfaceName: 'AboutBannerBlock',
  labels: { singular: 'Sky banner (About)', plural: 'Sky banners' },
  ...blockAdmin('aboutBanner', 'Centred paragraph on a soft sky background with a button'),
  fields: [
    { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
    linkField({ name: 'button' }),
    {
      type: 'collapsible',
      label: 'Background clouds',
      admin: { initCollapsed: true },
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
