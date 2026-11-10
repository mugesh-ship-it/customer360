import type { GlobalConfig } from 'payload'
import { rowLabel } from '../fields/rowLabel'
import { triggerRebuildGlobal } from '../hooks/triggerRebuild'

const simpleLinks = (name: string, label: string, singular: string) => ({
  name,
  label,
  labels: { singular, plural: label },
  type: 'array' as const,
  admin: { ...rowLabel('label', singular) },
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'label', label: 'Text', type: 'text' as const, required: true, admin: { width: '50%' } },
        { name: 'url', label: 'Goes to', type: 'text' as const, admin: { width: '50%', placeholder: '/privacy' } },
      ],
    },
  ],
})

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: { read: () => true },
  admin: { group: 'Settings', description: 'The blue area at the bottom of every page.' },
  hooks: { afterChange: [triggerRebuildGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact & social',
          fields: [
            { name: 'contactHeading', label: 'Contact title', type: 'text', defaultValue: 'Contact Us' },
            {
              name: 'contactItems',
              label: 'Contact details',
              labels: { singular: 'Contact detail', plural: 'Contact details' },
              type: 'array',
              admin: { ...rowLabel('label', 'Contact') },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', label: 'Shown as', type: 'text', required: true, admin: { width: '50%', placeholder: '+44 20 1234 5678' } },
                    {
                      name: 'url',
                      label: 'Link',
                      type: 'text',
                      admin: { width: '50%', placeholder: 'tel:+442012345678  or  mailto:hello@…', description: 'Phone: start with tel:  ·  Email: start with mailto:' },
                    },
                  ],
                },
                { name: 'icon', label: 'Small icon', type: 'upload', relationTo: 'media' },
              ],
            },
            { name: 'socialHeading', label: 'Social title', type: 'text', defaultValue: 'Social Media' },
            {
              name: 'socials',
              label: 'Social media links',
              labels: { singular: 'Social link', plural: 'Social links' },
              type: 'array',
              admin: { ...rowLabel('label', 'Social') },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', label: 'Network', type: 'text', required: true, admin: { width: '50%', placeholder: 'LinkedIn' } },
                    { name: 'url', label: 'Profile link', type: 'text', required: true, admin: { width: '50%', placeholder: 'https://…' } },
                  ],
                },
                { name: 'icon', label: 'Icon', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Menu columns',
          fields: [
            {
              name: 'columns',
              label: 'Columns',
              labels: { singular: 'Column', plural: 'Columns' },
              type: 'array',
              admin: { initCollapsed: true, ...rowLabel('heading', 'Column') },
              fields: [{ name: 'heading', label: 'Column title', type: 'text', required: true }, simpleLinks('links', 'Links', 'Link')],
            },
          ],
        },
        {
          label: 'Bottom line',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'brandName', label: 'Company name', type: 'text', admin: { width: '40%' } },
                { name: 'copyright', label: 'Copyright text', type: 'text', admin: { width: '60%' } },
              ],
            },
            simpleLinks('legalLinks', 'Small links', 'Link'),
          ],
        },
      ],
    },
  ],
}
