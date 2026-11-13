import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linkField } from '../fields/link'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const JobListBlock: Block = {
  slug: 'jobList',
  interfaceName: 'JobListBlock',
  labels: { singular: 'Open roles', plural: 'Open roles' },
  ...blockAdmin('jobList', 'Every published job from Careers → Jobs, each opening to show the full description'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'intro', label: 'Text under the title', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'applyLabel', label: 'Apply button text', type: 'text', defaultValue: 'Apply now', admin: { width: '33%' } },
        { name: 'moreLabel', label: '“Read more” text', type: 'text', defaultValue: 'View role', admin: { width: '33%' } },
        { name: 'lessLabel', label: '“Read less” text', type: 'text', defaultValue: 'Hide role', admin: { width: '34%' } },
      ],
    },
    {
      name: 'defaultApplyUrl',
      label: 'Where “Apply” goes when a job has no link of its own',
      type: 'text',
      admin: { placeholder: 'mailto:careers@yourcompany.com  or  https://…' },
    },
    {
      type: 'collapsible',
      label: 'When there are no open roles',
      fields: [
        { name: 'emptyHeading', label: 'Title', type: 'text', defaultValue: 'No open roles right now' },
        { name: 'emptyText', label: 'Text', type: 'textarea', defaultValue: 'We’re always happy to hear from people who care about practical, human AI. Send us your CV and we’ll be in touch when something fits.' },
        linkField({ name: 'emptyButton', description: 'e.g. “Send your CV” → mailto:… or /contact' }),
      ],
    },
    anchorField,
  ],
}
