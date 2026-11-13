import type { CollectionConfig } from 'payload'

/** Messages sent from the website's contact form (created by the /api/contact endpoint only). */
export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: { singular: 'Contact message', plural: 'Contact messages' },
  access: {
    create: () => false,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: '-createdAt',
  admin: {
    group: 'Inbox',
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'company', 'handled', 'createdAt'],
    description: 'Everything sent through the contact form, newest first. Tick “Handled” once you have replied.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', label: 'First name', type: 'text', admin: { width: '50%', readOnly: true } },
        { name: 'lastName', label: 'Last name', type: 'text', admin: { width: '50%', readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Email', type: 'email', required: true, admin: { width: '50%', readOnly: true } },
        { name: 'phone', label: 'Phone', type: 'text', admin: { width: '50%', readOnly: true } },
      ],
    },
    { name: 'company', label: 'Company', type: 'text', admin: { readOnly: true } },
    { name: 'message', label: 'Message', type: 'textarea', admin: { readOnly: true } },
    { name: 'page', label: 'Sent from', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'handled', label: 'Handled', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
