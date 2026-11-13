import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linkField } from '../fields/link'
import { rowLabel } from '../fields/rowLabel'
import { sectionBackgroundField } from '../fields/sectionBackground'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'Questions & answers (FAQ)', plural: 'FAQs' },
  ...blockAdmin('faq', 'Title on the left, questions that open to show their answer on the right'),
  fields: [
    sectionBackgroundField('page'),
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'intro', label: 'Text under the title', type: 'textarea' },
    linkField({ name: 'button', description: 'Optional, under the title, e.g. “Ask us something else” → /contact.' }),
    {
      name: 'items',
      label: 'Questions',
      labels: { singular: 'Question', plural: 'Questions' },
      type: 'array',
      minRows: 1,
      admin: rowLabel('question', 'Question'),
      fields: [
        { name: 'question', label: 'Question', type: 'text', required: true },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true, admin: { description: 'Plain text. A blank line starts a new paragraph.' } },
      ],
    },
    {
      name: 'addSchema',
      label: 'Tell Google these are FAQs',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Adds FAQ structured data. Use it on one page only (usually the FAQ page) to avoid duplicates.' },
    },
    anchorField,
  ],
}
