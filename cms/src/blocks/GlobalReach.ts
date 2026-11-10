import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { linkField } from '../fields/link'
import { blockAdmin } from './shared'

export const GlobalReachBlock: Block = {
  slug: 'globalReach',
  interfaceName: 'GlobalReachBlock',
  labels: { singular: 'Title with wide image (World map)', plural: 'Titles with wide image' },
  ...blockAdmin('globalReach', 'Large title, short text and button, with a full-width image below'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text on the right', type: 'textarea' },
    linkField({ name: 'button' }),
    { name: 'image', label: 'Wide image', type: 'upload', relationTo: 'media' },
    anchorField,
  ],
}
