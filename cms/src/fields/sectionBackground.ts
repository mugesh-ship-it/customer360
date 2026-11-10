import type { SelectField } from 'payload'

export type SectionBackground = 'page' | 'surface' | 'tint' | 'white'

/** Section background picked from the Brand & design colours. */
export const sectionBackgroundField = (defaultValue: SectionBackground = 'page'): SelectField => ({
  name: 'background',
  label: 'Background',
  type: 'select',
  defaultValue,
  options: [
    { label: 'Page colour', value: 'page' },
    { label: 'Light grey', value: 'surface' },
    { label: 'Light brand tint', value: 'tint' },
    { label: 'White', value: 'white' },
  ],
  admin: { description: 'Colours come from Settings → Brand & design.' },
})
