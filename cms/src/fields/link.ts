import type { GroupField } from 'payload'

type LinkOptions = {
  name?: string
  label?: string
  required?: boolean
  description?: string
}

/** Reusable button: text + where it goes. Same controls everywhere on the site. */
export const linkField = ({
  name = 'link',
  label = 'Button',
  required = false,
  description = 'Leave the button text empty to hide the button.',
}: LinkOptions = {}): GroupField => ({
  name,
  label,
  type: 'group',
  admin: { description },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Button text',
          type: 'text',
          required,
          admin: { width: '40%', placeholder: 'e.g. Contact Us' },
        },
        {
          name: 'url',
          label: 'Goes to',
          type: 'text',
          required,
          admin: { width: '40%', placeholder: '/contact  or  https://…' },
        },
        {
          name: 'newTab',
          label: 'Open in new tab',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '20%', style: { alignSelf: 'flex-end', paddingBottom: 10 } },
        },
      ],
    },
  ],
})
