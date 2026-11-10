import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const CaseStudyListBlock: Block = {
  slug: 'caseStudyList',
  interfaceName: 'CaseStudyListBlock',
  labels: { singular: 'Case studies list (filters + pages)', plural: 'Case studies lists' },
  ...blockAdmin('caseStudyList', 'Every case study in a two-column grid, with service filters and page numbers'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title (optional)', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'showFilters', label: 'Show service filters', type: 'checkbox', defaultValue: true, admin: { width: '34%', style: { alignSelf: 'flex-end' } } },
        { name: 'allLabel', label: '“All” filter text', type: 'text', defaultValue: 'All', admin: { width: '33%' } },
        { name: 'perPage', label: 'Case studies per page', type: 'number', defaultValue: 6, min: 2, max: 24, admin: { width: '33%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'emptyText', label: 'Text when a filter has no results', type: 'text', defaultValue: 'No case studies for this service yet.', admin: { width: '50%' } },
        { name: 'paginationLabel', label: 'Page numbers label (screen readers)', type: 'text', defaultValue: 'Case study pages', admin: { width: '50%' } },
      ],
    },
    anchorField,
  ],
}
