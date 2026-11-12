import type { CollectionConfig } from 'payload'
import { triggerRebuild, triggerRebuildOnDelete } from '../hooks/triggerRebuild'

/** People shown on the website (not admin logins — those are "Team members" under Settings). */
export const TeamProfiles: CollectionConfig = {
  slug: 'team-profiles',
  labels: { singular: 'Team profile', plural: 'Our team' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
    description: 'People shown in “Team” sections on the website. Add someone here, then pick them in a page’s Team section.',
  },
  hooks: { afterChange: [triggerRebuild], afterDelete: [triggerRebuildOnDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', label: 'Job title', type: 'text', admin: { width: '50%', placeholder: 'Head of Data Engineering' } },
      ],
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Portrait, at least 600 × 760 px. The rounded shape is applied automatically.' },
    },
    { name: 'linkedin', label: 'LinkedIn profile (optional)', type: 'text', admin: { placeholder: 'https://www.linkedin.com/in/…' } },
  ],
}
