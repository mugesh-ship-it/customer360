import type { TextField } from 'payload'

/** Small pill label shown above section headings ("Our Services", "Testimonials"...). */
export const sectionTagField: TextField = {
  name: 'tag',
  label: 'Small label above the title',
  type: 'text',
  admin: { placeholder: 'e.g. Our Services', description: 'The little blue pill above the big title. Leave empty to hide it.' },
}
