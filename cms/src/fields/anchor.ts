import type { CollapsibleField } from 'payload'

/**
 * Technical option tucked away in a closed "Advanced" panel so it never
 * gets in the client's way. (Collapsible is layout-only; data stays `anchorId`.)
 */
export const anchorField: CollapsibleField = {
  type: 'collapsible',
  label: 'Advanced settings (optional)',
  admin: { initCollapsed: true },
  fields: [
    {
      name: 'anchorId',
      label: 'Section link name',
      type: 'text',
      admin: {
        placeholder: 'e.g. services',
        description: 'Lets menu links jump to this section, e.g. “/#services”. Lowercase, no spaces. Most people can ignore this.',
      },
    },
  ],
}
