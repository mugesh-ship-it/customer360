import type { GlobalConfig } from 'payload'
import { linkField } from '../fields/link'
import { rowLabel } from '../fields/rowLabel'
import { triggerRebuildGlobal } from '../hooks/triggerRebuild'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Top menu',
  access: { read: () => true },
  admin: { group: 'Settings', description: 'The logo, menu and button at the top of every page.' },
  hooks: { afterChange: [triggerRebuildGlobal] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'brandName', label: 'Company name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
      ],
    },
    linkField({ name: 'cta', label: 'Button (top right)' }),
    {
      name: 'navLinks',
      label: 'Menu links',
      labels: { singular: 'Menu link', plural: 'Menu links' },
      type: 'array',
      admin: { description: 'Shown when visitors click the menu icon. Drag to reorder.', ...rowLabel('label', 'Link') },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Text', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'url', label: 'Goes to', type: 'text', required: true, admin: { width: '50%', placeholder: '/about' } },
          ],
        },
      ],
    },
  ],
}
