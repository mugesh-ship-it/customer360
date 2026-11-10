import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const CaseStudiesBlock: Block = {
  slug: 'caseStudies',
  interfaceName: 'CaseStudiesBlock',
  labels: { singular: 'Case studies slider', plural: 'Case studies sliders' },
  ...blockAdmin('caseStudies', 'Title with arrows and a row of case-study cards that scrolls sideways'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    {
      name: 'caseStudies',
      label: 'Which case studies to show',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      required: true,
      admin: { description: 'Choose from Case studies. Drag to reorder.' },
    },
    anchorField,
  ],
}
