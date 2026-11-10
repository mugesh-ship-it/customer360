import type { GlobalConfig } from 'payload'
import { triggerRebuildGlobal } from '../hooks/triggerRebuild'

/** Words used on every case study's own page (the stories themselves live in Case studies). */
export const CaseStudyPage: GlobalConfig = {
  slug: 'case-study-page',
  label: 'Case study pages',
  access: { read: () => true },
  admin: {
    group: 'Settings',
    description: 'Labels and sections shared by every case study page. The big call-to-action at the bottom is copied from the Case Studies page.',
  },
  hooks: { afterChange: [triggerRebuildGlobal] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'listingLabel', label: 'Breadcrumb / back link', type: 'text', defaultValue: 'Case Studies', admin: { width: '50%' } },
        { name: 'listingPath', label: 'Case Studies page link', type: 'text', defaultValue: '/case-studies', admin: { width: '50%' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Detail labels',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'clientLabel', label: '“Client”', type: 'text', defaultValue: 'Client', admin: { width: '25%' } },
            { name: 'industryLabel', label: '“Industry”', type: 'text', defaultValue: 'Industry', admin: { width: '25%' } },
            { name: 'serviceLabel', label: '“Service”', type: 'text', defaultValue: 'Service', admin: { width: '25%' } },
            { name: 'durationLabel', label: '“Timeline”', type: 'text', defaultValue: 'Timeline', admin: { width: '25%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'resultsLabel', label: 'Above the key results', type: 'text', defaultValue: 'Key results', admin: { width: '33%' } },
            { name: 'tocLabel', label: 'Above the contents list', type: 'text', defaultValue: 'On this page', admin: { width: '33%' } },
            { name: 'readingTimeLabel', label: 'Reading time', type: 'text', defaultValue: '{n} min read', admin: { width: '34%', description: '{n} = minutes' } },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'More case studies (bottom of the page)',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'relatedTag', label: 'Small label', type: 'text', defaultValue: 'More Success Stories', admin: { width: '50%' } },
            { name: 'relatedHeading', label: 'Title', type: 'text', defaultValue: 'Keep Exploring Our Impact', admin: { width: '50%' } },
          ],
        },
        { name: 'relatedCount', label: 'How many to show', type: 'number', defaultValue: 4, min: 0, max: 8, admin: { description: 'Same service first, then the newest. 0 hides the section.' } },
      ],
    },
  ],
}
