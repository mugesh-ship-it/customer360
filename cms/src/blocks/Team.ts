import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { linkField } from '../fields/link'
import { sectionBackgroundField } from '../fields/sectionBackground'
import { blockAdmin } from './shared'

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team grid', plural: 'Team grids' },
  ...blockAdmin('team', 'Title, text with a button, and photo cards of team members'),
  fields: [
    sectionBackgroundField('surface'),
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text on the right', type: 'textarea' },
    linkField({ name: 'button' }),
    {
      name: 'members',
      label: 'Who to show',
      type: 'relationship',
      relationTo: 'team-profiles',
      hasMany: true,
      required: true,
      admin: { description: 'Choose from “Our team”. Drag to change the order. Rows fill from the right, 3 per row.' },
    },
    anchorField,
  ],
}
