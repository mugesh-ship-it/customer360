import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionBackgroundField } from '../fields/sectionBackground'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Big statement', plural: 'Big statements' },
  ...blockAdmin('statement', 'One large centred sentence'),
  fields: [
    sectionBackgroundField('page'),
    sectionTagField,
    { name: 'text', label: 'Statement', type: 'textarea', required: true, admin: { description: 'A single bold sentence, shown large and centred.' } },
    {
      name: 'highlights',
      label: 'Words to colour',
      type: 'text',
      admin: {
        placeholder: 'simpler, smarter, | connected,',
        description: 'Phrases from the statement to show in the brand colour. Separate phrases with “|”. Copy them exactly.',
      },
    },
    {
      name: 'avatars',
      label: 'Small round images below',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      maxRows: 8,
      admin: { description: 'Optional row of faces or icons under the statement. Square images look best.' },
    },
    anchorField,
  ],
}
