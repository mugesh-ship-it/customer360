import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { linkField } from '../fields/link'
import { rowLabel } from '../fields/rowLabel'
import { blockAdmin } from './shared'

export const ServicesWheelBlock: Block = {
  slug: 'servicesWheel',
  interfaceName: 'ServicesWheelBlock',
  labels: { singular: 'Services wheel', plural: 'Services wheels' },
  ...blockAdmin('servicesWheel', 'Title, short text and a wheel listing 7 services'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text beside the wheel', type: 'textarea' },
    linkField({ name: 'button' }),
    {
      name: 'services',
      label: 'Services on the wheel',
      labels: { singular: 'Service', plural: 'Services' },
      type: 'array',
      minRows: 7,
      maxRows: 7,
      admin: {
        initCollapsed: true,
        description:
          'The wheel always has 7 slices. The first service sits top-centre, then they go round clockwise. Tick “Show in blue” on the one you want to stand out.',
        ...rowLabel('label', 'Service'),
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Service name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'url', label: 'Goes to (optional)', type: 'text', admin: { width: '50%', placeholder: '/services/…' } },
          ],
        },
        { name: 'highlighted', label: 'Show in blue', type: 'checkbox', defaultValue: false },
      ],
    },
    anchorField,
  ],
}
