/**
 * Design token defaults — the single source for the "Brand & design" settings.
 *
 * The CMS uses these as default values; the Astro site uses them to turn the
 * saved settings into CSS variables. `src/styles/global.css` declares the same
 * values so the site renders correctly even before the settings are saved.
 * Keep the three in step when you add a token.
 */

export const colorScales = {
  primary: {
    label: 'Brand colour',
    description: 'Buttons, links, highlights and tinted backgrounds. 25 is the lightest, 950 the darkest.',
    shades: {
      s25: '#f5faff',
      s50: '#eff8ff',
      s100: '#d1e9ff',
      s200: '#b2ddff',
      s300: '#84caff',
      s400: '#53b1fd',
      s500: '#2e90fa',
      s600: '#1570ef',
      s700: '#175cd3',
      s800: '#0f53c9',
      s900: '#194185',
      s950: '#102a56',
    },
  },
  neutral: {
    label: 'Greys',
    description: 'Text, borders and dark surfaces. 25 is the lightest, 900 the darkest.',
    shades: {
      s25: '#fdfdfd',
      s50: '#fafafa',
      s300: '#d5d7da',
      s400: '#a4a7ae',
      s500: '#717680',
      s600: '#535862',
      s700: '#414651',
      s800: '#252b37',
      s900: '#181d27',
    },
  },
} as const

export const baseColors = {
  page: { label: 'Page background', value: '#f5f5f5' },
  surface: { label: 'Alternate section background', value: '#efefef' },
  ink: { label: 'Logo text', value: '#1f2937' },
  muted: { label: 'Soft text', value: '#6b7280' },
} as const

export type ColorScale = keyof typeof colorScales
export type BaseColor = keyof typeof baseColors

/** Font roles. `weights` is a Google Fonts weight list, e.g. "400;600;700" (empty = regular only). */
export const fonts = {
  body: { label: 'Main font', family: 'Plus Jakarta Sans', weights: '300;500;600;700', fallback: 'ui-sans-serif, system-ui, sans-serif', cssVar: '--font-sans' },
  brand: { label: 'Logo font', family: 'Piazzolla', weights: '700', fallback: 'Georgia, serif', cssVar: '--font-brand' },
  accent: { label: 'Accent font', family: 'Sanchez', weights: '', fallback: 'Georgia, serif', cssVar: '--font-brand-alt' },
} as const

export type FontRole = keyof typeof fonts

/**
 * Type scale in px. Sizes grow smoothly from `min` (at `vw[0]` px wide) to
 * `max` (at `vw[1]` px wide). The viewport ranges reproduce the Figma build exactly.
 */
export const typeScale = {
  display: { label: 'Giant display text', min: 72, max: 198.88, vw: [522, 1441] },
  h1: { label: 'Heading 1', min: 40, max: 72, vw: [640, 1280] },
  h1Compact: { label: 'Heading 1 (compact)', min: 40, max: 64, vw: [640, 1280] },
  h2: { label: 'Heading 2', min: 26, max: 42, vw: [636, 1364] },
  h3: { label: 'Heading 3', min: 24, max: 24, vw: [375, 1440] },
  large: { label: 'Large text', min: 18, max: 20, vw: [375, 1440] },
  regular: { label: 'Body text', min: 16, max: 16, vw: [375, 1440] },
  small: { label: 'Small text', min: 14, max: 14, vw: [375, 1440] },
} as const

export type TypeSize = keyof typeof typeScale

/** Layout sizes in px → CSS variable. */
export const sizes = {
  containerLarge: { label: 'Wide content width', value: 1280, cssVar: '--size-container-large', group: 'containers' },
  containerMedium: { label: 'Medium content width', value: 1056, cssVar: '--size-container-medium', group: 'containers' },
  containerSmall: { label: 'Narrow content width', value: 832, cssVar: '--size-container-small', group: 'containers' },

  gutterMobile: { label: 'Phone', value: 20, cssVar: '--padding-global-mobile', group: 'gutter' },
  gutterTablet: { label: 'Tablet', value: 40, cssVar: '--padding-global-tablet', group: 'gutter' },
  gutterDesktop: { label: 'Desktop', value: 80, cssVar: '--padding-global-desktop', group: 'gutter' },

  sectionSmallMobile: { label: 'Small · phone', value: 48, cssVar: '--section-small-mobile', group: 'section' },
  sectionSmallDesktop: { label: 'Small · desktop', value: 64, cssVar: '--section-small-desktop', group: 'section' },
  sectionMediumMobile: { label: 'Medium · phone', value: 64, cssVar: '--section-medium-mobile', group: 'section' },
  sectionMediumDesktop: { label: 'Medium · desktop', value: 96, cssVar: '--section-medium-desktop', group: 'section' },
  sectionLargeMobile: { label: 'Large · phone', value: 80, cssVar: '--section-large-mobile', group: 'section' },
  sectionLargeDesktop: { label: 'Large · desktop', value: 128, cssVar: '--section-large-desktop', group: 'section' },

  buttonHeight: { label: 'Button height', value: 44, cssVar: '--button-height', group: 'buttons' },
  buttonHeightLarge: { label: 'Large button height', value: 52, cssVar: '--button-height-large', group: 'buttons' },
  radiusButton: { label: 'Button corner rounding', value: 9999, cssVar: '--radius-button', group: 'buttons' },
  radiusCard: { label: 'Card / menu corner rounding', value: 24, cssVar: '--radius-card', group: 'buttons' },
} as const

export type SizeKey = keyof typeof sizes

const rem = (px: number) => `${+(px / 16).toFixed(4)}rem`

/** Fluid `clamp()` that grows linearly between two viewport widths. */
export function fluid(minPx: number, maxPx: number, [vwMin, vwMax]: readonly [number, number] | readonly number[]): string {
  if (minPx === maxPx) return rem(minPx)
  const slope = (maxPx - minPx) / (vwMax - vwMin)
  const intercept = minPx - slope * vwMin
  const lo = Math.min(minPx, maxPx)
  const hi = Math.max(minPx, maxPx)
  return `clamp(${rem(lo)}, ${rem(intercept)} + ${+(slope * 100).toFixed(4)}vw, ${rem(hi)})`
}

export const pxToRem = rem
