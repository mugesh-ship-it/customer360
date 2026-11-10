import * as migration_20261110_114419_initial from './20261110_114419_initial';

export const migrations = [
  {
    up: migration_20261110_114419_initial.up,
    down: migration_20261110_114419_initial.down,
    name: '20261110_114419_initial'
  },
];
