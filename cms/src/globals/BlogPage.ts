import type { GlobalConfig } from 'payload'
import { triggerRebuildGlobal } from '../hooks/triggerRebuild'

/** Words used on every blog article's own page (the articles themselves live in Blog articles). */
export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog article pages',
  access: { read: () => true },
  admin: {
    group: 'Settings',
    description: 'Labels shared by every blog article page. The call-to-action at the bottom is copied from the Blog page.',
  },
  hooks: { afterChange: [triggerRebuildGlobal] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'listingLabel', label: 'Breadcrumb / back link', type: 'text', defaultValue: 'Blog', admin: { width: '50%' } },
        { name: 'listingPath', label: 'Blog page link', type: 'text', defaultValue: '/blog', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'tocLabel', label: 'Above the contents list', type: 'text', defaultValue: 'On this page', admin: { width: '33%' } },
        { name: 'readingTimeLabel', label: 'Reading time', type: 'text', defaultValue: '{n} min read', admin: { width: '33%', description: '{n} = minutes' } },
        { name: 'authorLabel', label: 'Before the author', type: 'text', defaultValue: 'By', admin: { width: '34%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'relatedHeading', label: 'Title above more articles', type: 'text', defaultValue: 'Keep reading', admin: { width: '50%' } },
        { name: 'relatedCount', label: 'How many more articles', type: 'number', defaultValue: 3, min: 0, max: 6, admin: { width: '50%', description: '0 hides the section.' } },
      ],
    },
  ],
}
