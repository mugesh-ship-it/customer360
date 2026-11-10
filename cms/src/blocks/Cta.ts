import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linkField } from '../fields/link'
import { blockAdmin } from './shared'

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'Closing call-to-action', plural: 'Closing calls-to-action' },
  ...blockAdmin('cta', 'Blue closing banner with image, big title and button, just above the footer'),
  fields: [
    { name: 'heading', label: 'Title', type: 'text', required: true },
    linkField({ name: 'button' }),
    { name: 'image', label: 'Image', type: 'upload', relationTo: 'media', admin: { description: 'Square image with a plain or transparent background works best. Also shown instead of the video for visitors who turn off animations.' } },
    {
      type: 'collapsible',
      label: 'Scroll animation (robot turn)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'turnVideo',
          label: 'Turn video (desktop & tablet)',
          type: 'upload',
          relationTo: 'media',
          filterOptions: { mimeType: { like: 'video/' } },
          admin: {
            description:
              'Short MP4 that plays forwards as visitors scroll down and backwards as they scroll up. Landscape, about 6 seconds. Export with every frame as a keyframe so scrolling stays smooth. Leave empty to show the image instead.',
          },
        },
        {
          name: 'turnVideoMobile',
          label: 'Turn video (phones)',
          type: 'upload',
          relationTo: 'media',
          filterOptions: { mimeType: { like: 'video/' } },
          admin: { description: 'Portrait version for screens under 768px wide. Optional: the desktop video is used if empty.' },
        },
      ],
    },
    anchorField,
  ],
}
