import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linkField } from '../fields/link'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Top banner (Hero)', plural: 'Top banners' },
  ...blockAdmin('hero', 'Big title with intro text and button, shown at the very top'),
  fields: [
    sectionTagField,
    { name: 'heading', label: 'Main title', type: 'text', required: true, admin: { description: 'The big headline visitors see first. Keep it short.' } },
    {
      name: 'highlight',
      label: 'Words to highlight',
      type: 'text',
      admin: {
        placeholder: 'e.g. Intelligent AI',
        description: 'Copy a few words exactly as they appear in the title. They get an animated brand-colour gradient. Leave empty for none.',
      },
    },
    { name: 'description', label: 'Intro text', type: 'textarea', admin: { description: '1–2 sentences under the title.' } },
    linkField({ name: 'button' }),
    {
      type: 'row',
      fields: [
        { name: 'decorImage', label: 'Image on the right', type: 'upload', relationTo: 'media', admin: { width: '50%', description: 'Shown on desktop only.' } },
        {
          name: 'visualStyle',
          label: 'Image style',
          type: 'select',
          defaultValue: 'plain',
          options: [
            { label: 'As uploaded', value: 'plain' },
            { label: 'Cut-out photo on brand shapes', value: 'framed' },
            { label: 'Centred title over a wide banner', value: 'banner' },
          ],
          admin: {
            width: '50%',
            description: '“Cut-out photo” works best with a transparent PNG of a person. “Wide banner” centres the title and runs the image edge to edge under it (transparent PNG, about 1920 × 1080).',
          },
        },
      ],
    },
    anchorField,
  ],
}
