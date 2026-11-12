import type { CollectionConfig } from 'payload'
import { triggerRebuildOnDelete, triggerRebuildOnMediaChange } from '../hooks/triggerRebuild'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Images & Files' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'filename',
    description:
      'All images and videos used on the website. Uploading a new file here does not change the site until you pick it in a page. Editing or replacing an existing one updates the live site in a few minutes.',
  },
  hooks: { afterChange: [triggerRebuildOnMediaChange], afterDelete: [triggerRebuildOnDelete] },
  fields: [
    {
      name: 'alt',
      label: 'Short description of the image',
      type: 'text',
      admin: {
        placeholder: 'e.g. Team meeting in the London office',
        description: 'Helps visually impaired visitors and Google. Leave empty only for purely decorative images.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
    // Responsive raster variants are created automatically; SVGs and videos are served as-is.
    imageSizes: [
      { name: 'small', width: 640, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'large', width: 1440, formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
    adminThumbnail: 'small',
  },
}
