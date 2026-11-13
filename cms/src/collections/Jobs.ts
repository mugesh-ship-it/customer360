import type { CollectionConfig } from 'payload'
import { publishedOrLoggedIn } from '../access/publishedOrLoggedIn'
import { triggerRebuild, triggerRebuildOnDelete } from '../hooks/triggerRebuild'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job', plural: 'Jobs' },
  access: { read: publishedOrLoggedIn },
  // Publish to list a role on the Careers page; Unpublish to take it down.
  versions: { drafts: true, maxPerDoc: 10 },
  defaultSort: 'order',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'employmentType', '_status'],
    description: 'Open roles. Published jobs appear on the Careers page; unpublish one to take it down.',
  },
  hooks: { afterChange: [triggerRebuild], afterDelete: [triggerRebuildOnDelete] },
  fields: [
    { name: 'title', label: 'Job title', type: 'text', required: true, admin: { placeholder: 'AI Solutions Consultant' } },
    {
      type: 'row',
      fields: [
        { name: 'location', label: 'Location', type: 'text', admin: { width: '50%', placeholder: 'Sydney / Remote' } },
        {
          name: 'employmentType',
          label: 'Type',
          type: 'select',
          defaultValue: 'full-time',
          options: [
            { label: 'Full time', value: 'full-time' },
            { label: 'Part time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Internship', value: 'internship' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'summary', label: 'Short summary', type: 'textarea', required: true, admin: { description: 'One or two sentences, shown before “View role”.' } },
    { name: 'description', label: 'Full description', type: 'richText', admin: { description: 'About the role, what you’ll do, what we’re looking for… Use “Heading 3” for each part.' } },
    { name: 'applyUrl', label: 'Apply link', type: 'text', admin: { placeholder: 'https://…  or  mailto:…', description: 'Empty = the default set on the Careers page section.' } },
    { name: 'order', label: 'Order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower numbers show first.' } },
  ],
}
