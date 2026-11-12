/**
 * Thin Payload REST client. All site content is fetched from the CMS at build
 * time (and on every request in `astro dev`, so edits show up on refresh).
 */
import type { Page, Header, Footer, Media, Testimonial, Design, SiteSetting, Redirect, TeamProfile, Service, CaseStudy, Product, CaseStudyPage } from '../../cms/src/payload-types';

export type { Page, Header, Footer, Media, Testimonial, Design, SiteSetting, Redirect, TeamProfile, Service, CaseStudy, Product, CaseStudyPage };
export type PageBlock = NonNullable<Page['layout']>[number];
export type BlockOf<T extends PageBlock['blockType']> = Extract<PageBlock, { blockType: T }>;
export type LinkValue = { label?: string | null; url?: string | null; newTab?: boolean | null } | null | undefined;

export const CMS_URL = (import.meta.env.CMS_URL || process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '');

async function request<T>(path: string): Promise<T> {
  // Fail fast if the CMS is down or hung, instead of the page hanging until undici's 5-minute headers timeout.
  let res: Response;
  try {
    res = await fetch(`${CMS_URL}/api${path}`, { signal: AbortSignal.timeout(10_000) });
  } catch (err) {
    throw new Error(`[cms] Could not reach the CMS at ${CMS_URL} (GET ${path}). Is it running? Start it with \`npm run dev:cms\`.`, { cause: err });
  }
  if (!res.ok) throw new Error(`[cms] ${res.status} ${res.statusText} — GET ${path}`);
  return res.json() as Promise<T>;
}

export async function getPageBySlug(slug: string, depth = 2): Promise<Page | null> {
  const q = new URLSearchParams({ 'where[slug][equals]': slug, depth: String(depth), limit: '1' });
  const data = await request<{ docs: Page[] }>(`/pages?${q}`);
  return data.docs[0] ?? null;
}

export async function getAllPageSlugs(): Promise<string[]> {
  const data = await request<{ docs: Pick<Page, 'slug'>[] }>(`/pages?limit=1000&depth=0&select[slug]=true`);
  return data.docs.map((d) => d.slug);
}

/** Lightweight page list for the sitemap and llms.txt (no section content). */
export type PageSummary = Pick<Page, 'id' | 'title' | 'slug' | 'updatedAt' | 'meta' | 'seo'>;
export async function getPageSummaries(): Promise<PageSummary[]> {
  const select = ['title', 'slug', 'updatedAt', 'meta', 'seo'].map((f) => `select[${f}]=true`).join('&');
  const data = await request<{ docs: PageSummary[] }>(`/pages?limit=1000&depth=0&sort=slug&${select}`);
  return data.docs;
}

export async function getRedirects(): Promise<Redirect[]> {
  const data = await request<{ docs: Redirect[] }>('/redirects?limit=1000&depth=0');
  return data.docs;
}

/**
 * Globals are shared by every page, so a build reads each one once instead of per page.
 * The cache expires after a minute so the on-demand draft preview never shows a stale
 * header, footer or design for long. `astro dev` always reads fresh.
 */
const once = <T>(fn: () => Promise<T>, ttlMs = 60_000) => {
  let p: Promise<T> | undefined;
  let at = 0;
  return () => {
    if (import.meta.env.DEV) return fn();
    if (!p || Date.now() - at > ttlMs) {
      at = Date.now();
      p = fn().catch((err) => {
        p = undefined;
        throw err;
      });
    }
    return p;
  };
};

export const getHeader = once(() => request<Header>('/globals/header?depth=1'));
export const getFooter = once(() => request<Footer>('/globals/footer?depth=1'));
export const getDesign = once(() => request<Design>('/globals/design?depth=0'));
export const getSiteSettings = once(() => request<SiteSetting>('/globals/site-settings?depth=1'));
export const getCaseStudyPage = once(() => request<CaseStudyPage>('/globals/case-study-page?depth=0'));

/** Every case study, newest first (cards + their own pages). Read once per build. */
export const getCaseStudies = once(async () => {
  const data = await request<{ docs: CaseStudy[] }>('/case-studies?limit=500&depth=2&sort=-publishedAt');
  return data.docs;
});

/** Link for a case-study card: its own page, unless the editor set another link. */
export const caseStudyHref = (c: Pick<CaseStudy, 'url' | 'slug'>) => c.url || (c.slug ? `/case-studies/${c.slug}` : null);

/** Path of a page from its slug ("home" → "/"). */
export const pagePath = (slug?: string | null) => (!slug || slug === 'home' ? '/' : `/${slug.replace(/^\/+/, '')}`);

/** Narrow a relationship/upload value to a populated document. */
export function populated<T extends object>(value: number | T | null | undefined): T | null {
  return value && typeof value === 'object' ? value : null;
}

/** Absolute URL for a media doc (optionally a generated size). */
export function mediaUrl(value: number | Media | null | undefined, size?: 'small' | 'large'): string | null {
  const m = populated(value);
  if (!m) return null;
  const url = (size && m.sizes?.[size]?.url) || m.url;
  return url ? absolute(url) : null;
}

const absolute = (url: string) => (url.startsWith('http') ? url : `${CMS_URL}${url}`);

/** `srcset` from the generated raster sizes (empty for SVGs). */
export function mediaSrcset(value: number | Media | null | undefined): string | undefined {
  const m = populated(value);
  if (!m || m.mimeType === 'image/svg+xml') return undefined;
  const entries = (['small', 'large'] as const)
    .map((s) => m.sizes?.[s])
    .filter((s): s is NonNullable<typeof s> => Boolean(s?.url && s.width && m.width && s.width < m.width))
    .map((s) => `${absolute(s.url!)} ${s.width}w`);
  if (!entries.length) return undefined;
  return [...entries, `${absolute(m.url!)} ${m.width}w`].join(', ');
}

export function linkAttrs(link: LinkValue) {
  if (!link?.url) return null;
  return {
    href: link.url,
    ...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  };
}

/** Collections the CMS can preview as drafts (see cms/src/preview.ts). */
export type PreviewCollection = 'pages' | 'case-studies';

/**
 * Latest draft of a document, for the on-demand preview route. The CMS checks the signed
 * `exp`/`sig` it generated for the editor; this site holds no secret of its own.
 */
export async function getPreviewDoc<T extends Page | CaseStudy>(
  collection: PreviewCollection,
  id: string,
  exp: string,
  sig: string,
): Promise<{ doc: T } | { error: string; status: number }> {
  const q = new URLSearchParams({ collection, id, exp, sig });
  const res = await fetch(`${CMS_URL}/api/preview-doc?${q}`, { signal: AbortSignal.timeout(10_000), cache: 'no-store' });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { error: body?.error || `The CMS answered ${res.status}.`, status: res.status };
  }
  return { doc: (await res.json()) as T };
}
