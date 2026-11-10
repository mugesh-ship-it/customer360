import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team member', plural: 'Team members' },
  admin: { group: 'Settings', useAsTitle: 'email', description: 'People who can log in and edit the website.' },
  auth: true,
  fields: [{ name: 'name', type: 'text' }],
}
