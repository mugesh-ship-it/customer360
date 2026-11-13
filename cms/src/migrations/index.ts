import * as migration_20261110_114419_initial from './20261110_114419_initial';
import * as migration_20261112_080903_drafts from './20261112_080903_drafts';
import * as migration_20261112_082940_autosave from './20261112_082940_autosave';
import * as migration_20261113_073923_blog_careers_contact from './20261113_073923_blog_careers_contact';
import * as migration_20261113_080000_add_missing_pages from './20261113_080000_add_missing_pages';

export const migrations = [
  {
    up: migration_20261110_114419_initial.up,
    down: migration_20261110_114419_initial.down,
    name: '20261110_114419_initial',
  },
  {
    up: migration_20261112_080903_drafts.up,
    down: migration_20261112_080903_drafts.down,
    name: '20261112_080903_drafts',
  },
  {
    up: migration_20261112_082940_autosave.up,
    down: migration_20261112_082940_autosave.down,
    name: '20261112_082940_autosave',
  },
  {
    up: migration_20261113_073923_blog_careers_contact.up,
    down: migration_20261113_073923_blog_careers_contact.down,
    name: '20261113_073923_blog_careers_contact',
  },
  {
    up: migration_20261113_080000_add_missing_pages.up,
    down: migration_20261113_080000_add_missing_pages.down,
    name: '20261113_080000_add_missing_pages',
  },
];
