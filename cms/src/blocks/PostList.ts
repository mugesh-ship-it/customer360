import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linkField } from '../fields/link'
import { sectionBackgroundField } from '../fields/sectionBackground'
import { sectionTagField } from '../fields/sectionTag'
import { blockAdmin } from './shared'

export const PostListBlock: Block = {
  slug: 'postList',
  interfaceName: 'PostListBlock',
  labels: { singular: 'Blog articles', plural: 'Blog articles' },
  ...blockAdmin('postList', 'Grid of blog articles, newest first'),
  fields: [
    sectionBackgroundField('page'),
    sectionTagField,
    { name: 'heading', label: 'Title (optional)', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'limit', label: 'How many to show', type: 'number', defaultValue: 0, min: 0, max: 60, admin: { width: '50%', description: '0 = all articles (for the Blog page). 3 works well elsewhere.' } },
        { name: 'hideWhenEmpty', label: 'Hide the section when there are no articles', type: 'checkbox', defaultValue: false, admin: { width: '50%', style: { alignSelf: 'flex-end' } } },
      ],
    },
    { name: 'emptyText', label: 'Text when there are no articles', type: 'text', defaultValue: 'Our first articles are on their way. Check back soon.' },
    linkField({ name: 'button', description: 'Optional, under the grid, e.g. “All articles” → /blog.' }),
    anchorField,
  ],
}
