import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { rowLabel } from '../fields/rowLabel'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

const text = (name: string, label: string, defaultValue: string, width = '50%') =>
  ({ name, label, type: 'text', defaultValue, admin: { width } }) as const

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  labels: { singular: 'Contact form & offices', plural: 'Contact forms' },
  ...blockAdmin('contactForm', 'Contact form on the left, email, phone and office addresses on the right'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'intro', label: 'Text under the title', type: 'textarea' },
    {
      type: 'collapsible',
      label: 'Form',
      admin: { description: 'Messages arrive in Inbox → Contact messages.' },
      fields: [
        { type: 'row', fields: [text('firstNameLabel', '“First name”', 'First name'), text('lastNameLabel', '“Last name”', 'Last name')] },
        { type: 'row', fields: [text('emailLabel', '“Email”', 'Work email'), text('phoneLabel', '“Phone” (optional field)', 'Phone number')] },
        { type: 'row', fields: [text('companyLabel', '“Company”', 'Company / organisation'), text('messageLabel', '“Message”', 'How can we help?')] },
        { type: 'row', fields: [text('submitLabel', 'Button text', 'Send message'), text('sendingLabel', 'Button text while sending', 'Sending…')] },
        {
          name: 'consentText',
          label: 'Text under the button',
          type: 'text',
          defaultValue: 'We’ll use your information only to respond to your enquiry. Read our {privacy policy}.',
          admin: { description: 'Words in {curly brackets} link to the privacy page below.' },
        },
        { name: 'privacyUrl', label: 'Privacy page link', type: 'text', defaultValue: '/privacy' },
        { type: 'row', fields: [text('successHeading', 'Thank-you title', 'Thank you!'), text('successText', 'Thank-you text', 'Your message is on its way. We’ll get back to you within one business day.')] },
        { name: 'errorText', label: 'Text if sending fails', type: 'text', defaultValue: 'Sorry, something went wrong. Please try again or email us directly.' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact details & offices',
      fields: [
        { type: 'row', fields: [text('email', 'Email', ''), text('phone', 'Phone', '')] },
        { name: 'officesHeading', label: 'Title above the offices', type: 'text', defaultValue: 'Our offices' },
        {
          name: 'offices',
          label: 'Offices',
          labels: { singular: 'Office', plural: 'Offices' },
          type: 'array',
          admin: rowLabel('city', 'Office'),
          fields: [
            { type: 'row', fields: [{ name: 'city', label: 'City', type: 'text', required: true, admin: { width: '50%' } }, { name: 'phone', label: 'Phone (optional)', type: 'text', admin: { width: '50%' } }] },
            { name: 'address', label: 'Address', type: 'textarea', admin: { description: 'One line per row.' } },
          ],
        },
      ],
    },
    anchorField,
  ],
}
