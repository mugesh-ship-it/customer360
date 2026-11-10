/** Section background options (cms/src/fields/sectionBackground.ts) → token classes. */
const backgrounds = {
  page: 'bg-page',
  surface: 'bg-surface',
  tint: 'bg-primary-100',
  white: 'bg-white',
} as const;

export const sectionBg = (value?: string | null) => backgrounds[(value ?? 'page') as keyof typeof backgrounds] ?? backgrounds.page;
