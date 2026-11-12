import * as migration_20261110_114419_initial from './20261110_114419_initial';
import * as migration_20261112_080903_drafts from './20261112_080903_drafts';
import * as migration_20261112_082940_autosave from './20261112_082940_autosave';

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
    name: '20261112_082940_autosave'
  },
];
