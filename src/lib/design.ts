/**
 * Turns the CMS "Brand & design" settings into CSS variables and a Google
 * Fonts URL. Only valid values are printed; anything missing falls back to the
 * defaults declared in src/styles/global.css.
 */
import { colorScales, baseColors, fonts, sizes, typeScale, fluid, pxToRem } from '../../cms/src/design/tokens';
import type { Design } from './cms';

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0;
/** Strip anything that could escape a CSS declaration. */
const cssSafe = (v: string) => v.replace(/[;{}<>\\]/g, '').trim();
const quoteFamily = (f: string) => `"${cssSafe(f).replace(/"/g, '')}"`;

type Groups = Record<string, Record<string, unknown> | null | undefined>;

export function designCss(design: Design | null | undefined): string {
  if (!design) return '';
  const d = design as unknown as Groups & { typeScale?: Record<string, { min?: number; max?: number } | null> };
  const vars: string[] = [];
  const set = (name: string, value: string | null | undefined) => value && vars.push(`${name}:${value}`);

  // Colours
  for (const scale of Object.keys(colorScales) as (keyof typeof colorScales)[]) {
    for (const shade of Object.keys(colorScales[scale].shades)) {
      const v = d[scale]?.[shade];
      if (typeof v === 'string' && HEX.test(v)) set(`--color-${scale}-${shade.slice(1)}`, v);
    }
  }
  for (const key of Object.keys(baseColors)) {
    const v = d.base?.[key];
    if (typeof v === 'string' && HEX.test(v)) set(`--color-${key}`, v);
  }

  // Fonts
  for (const [role, def] of Object.entries(fonts)) {
    const f = d[role] as { family?: string; fallback?: string } | undefined;
    if (f?.family?.trim()) set(def.cssVar, `${quoteFamily(f.family)}, ${cssSafe(f.fallback || def.fallback)}`);
  }

  // Type scale
  for (const [key, def] of Object.entries(typeScale)) {
    const t = d.typeScale?.[key];
    if (t && isNum(t.min) && isNum(t.max)) set(`--font-size-${key}`, fluid(t.min, t.max, def.vw));
  }

  // Layout sizes (stored in groups: containers / gutter / section / buttons)
  for (const [key, def] of Object.entries(sizes)) {
    const v = d[def.group]?.[key];
    if (isNum(v)) set(def.cssVar, key.startsWith('radius') && v >= 999 ? '9999px' : pxToRem(v));
  }

  return vars.length ? `:root{${vars.join(';')}}` : '';
}

/** One Google Fonts stylesheet URL for every font role (deduplicated). */
export function googleFontsUrl(design: Design | null | undefined): string {
  const d = (design ?? {}) as unknown as Groups;
  const families = new Map<string, Set<string>>();
  for (const [role, def] of Object.entries(fonts)) {
    const f = d[role] as { family?: string; weights?: string } | undefined;
    const family = (f?.family || def.family).trim();
    const weights = (f?.weights ?? def.weights)
      .split(/[;,\s]+/)
      .map((w) => w.trim())
      .filter((w) => /^\d{3}$/.test(w));
    const set = families.get(family) ?? new Set<string>();
    weights.forEach((w) => set.add(w));
    families.set(family, set);
  }
  const params = [...families].map(([family, w]) => {
    const name = encodeURIComponent(family).replace(/%20/g, '+');
    const list = [...w].sort();
    return `family=${name}${list.length ? `:wght@${list.join(';')}` : ''}`;
  });
  return `https://fonts.googleapis.com/css2?${params.join('&')}&display=swap`;
}
