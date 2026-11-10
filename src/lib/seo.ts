/**
 * Builds everything search engines and social networks read from a page:
 * title, description, canonical, robots, Open Graph / X cards and JSON-LD.
 * Page values win; "SEO & tracking" settings fill the gaps.
 */
import { mediaUrl, pagePath, populated, type Media, type Page, type SiteSetting } from './cms';

export type SeoInput = {
  /** Page name (used in the title pattern and breadcrumbs). */
  title: string;
  /** Path on the site, e.g. "/about". */
  path: string;
  meta?: Page['meta'];
  seo?: Page['seo'];
  /** Force noindex (e.g. the 404 page). */
  noindex?: boolean;
};

export type SeoData = ReturnType<typeof buildSeo>;

const trimSlash = (url: string) => url.replace(/\/+$/, '');

/** Live site origin: CMS setting first, then the SITE_URL env var. */
export function siteOrigin(settings: SiteSetting | null | undefined): string {
  return trimSlash(settings?.siteUrl || import.meta.env.SITE_URL || process.env.SITE_URL || 'http://localhost:4321');
}

export function buildSeo(input: SeoInput, settings: SiteSetting) {
  const origin = siteOrigin(settings);
  const siteName = settings.siteName || '';
  const isHome = input.path === '/';

  const pageTitle = input.meta?.title?.trim();
  const template = settings.titleTemplate?.includes('%s') ? settings.titleTemplate : `%s | ${siteName}`;
  // The SEO title is used as-is; otherwise the page name goes through the pattern.
  const title = pageTitle || (isHome && settings.defaultTitle) || template.replace('%s', input.title);

  const description = input.meta?.description?.trim() || settings.defaultDescription?.trim() || '';
  const url = `${origin}${input.path === '/' ? '/' : input.path}`;
  const canonical = input.seo?.canonical?.trim() || url;

  const indexable = settings.allowIndexing !== false && !input.noindex && !input.seo?.noindex;
  const follow = settings.allowIndexing !== false && !input.seo?.nofollow;
  const robots = [
    indexable ? 'index' : 'noindex',
    follow ? 'follow' : 'nofollow',
    ...(indexable ? ['max-image-preview:large', 'max-snippet:-1', 'max-video-preview:-1'] : []),
  ].join(', ');

  const imageDoc = populated<Media>(input.meta?.image) || populated<Media>(settings.defaultShareImage);
  const image = imageDoc
    ? {
        url: mediaUrl(imageDoc, 'large')!,
        width: imageDoc.sizes?.large?.width ?? imageDoc.width ?? undefined,
        height: imageDoc.sizes?.large?.height ?? imageDoc.height ?? undefined,
        alt: imageDoc.alt || title,
        type: imageDoc.sizes?.large?.mimeType ?? imageDoc.mimeType ?? undefined,
      }
    : null;

  return {
    title,
    description,
    url,
    canonical,
    robots,
    indexable,
    image,
    siteName,
    lang: settings.language || 'en',
    locale: settings.locale || 'en_GB',
    twitter: settings.twitterHandle ? `@${settings.twitterHandle.replace(/^@/, '')}` : undefined,
    themeColor: settings.themeColor || undefined,
    favicon: populated<Media>(settings.favicon),
    appleTouchIcon: mediaUrl(settings.appleTouchIcon, 'small'),
    googleVerification: settings.googleVerification || undefined,
    bingVerification: settings.bingVerification || undefined,
    jsonLd: buildJsonLd({ input, settings, origin, url, title, description, image: image?.url }),
  };
}

function buildJsonLd({
  input,
  settings,
  origin,
  url,
  title,
  description,
  image,
}: {
  input: SeoInput;
  settings: SiteSetting;
  origin: string;
  url: string;
  title: string;
  description: string;
  image?: string;
}) {
  const org = settings.organization;
  const orgId = `${origin}/#organization`;
  const siteId = `${origin}/#website`;
  const clean = <T extends Record<string, unknown>>(o: T) =>
    Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length)));

  const a = org?.address;
  const address =
    a && (a.street || a.city || a.postalCode)
      ? clean({
          '@type': 'PostalAddress',
          streetAddress: a.street,
          addressLocality: a.city,
          addressRegion: a.region,
          postalCode: a.postalCode,
          addressCountry: a.country,
        })
      : undefined;

  const logo = mediaUrl(org?.logo) || mediaUrl(settings.favicon);

  const organization = clean({
    '@type': org?.type || 'Organization',
    '@id': orgId,
    name: settings.siteName,
    legalName: org?.legalName,
    url: `${origin}/`,
    logo: logo ? { '@type': 'ImageObject', url: logo } : undefined,
    image: org?.type === 'LocalBusiness' || org?.type === 'ProfessionalService' ? logo : undefined,
    description: org?.description,
    email: org?.email,
    telephone: org?.phone,
    foundingDate: org?.foundingYear,
    address,
    sameAs: org?.sameAs?.map((s) => s.url).filter(Boolean),
    contactPoint:
      org?.email || org?.phone
        ? clean({ '@type': 'ContactPoint', contactType: 'customer service', email: org?.email, telephone: org?.phone })
        : undefined,
  });

  const website = clean({
    '@type': 'WebSite',
    '@id': siteId,
    url: `${origin}/`,
    name: settings.siteName,
    description: settings.defaultDescription,
    inLanguage: settings.language || 'en',
    publisher: { '@id': orgId },
  });

  const isHome = input.path === '/';
  const breadcrumb = !isHome
    ? {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: input.seo?.breadcrumbLabel || input.title, item: url },
        ],
      }
    : undefined;

  const webpage = clean({
    '@type': input.seo?.pageType || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: settings.language || 'en',
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
    primaryImageOfPage: image ? { '@type': 'ImageObject', url: image } : undefined,
    breadcrumb: breadcrumb ? { '@id': breadcrumb['@id'] } : undefined,
  });

  const graph: Record<string, unknown>[] = [organization, website, webpage];
  if (breadcrumb) graph.push(breadcrumb);

  // Editor-supplied JSON-LD (object or array), appended to the graph.
  const extra = input.seo?.schema;
  if (extra && typeof extra === 'object') {
    for (const node of Array.isArray(extra) ? extra : [extra]) {
      if (node && typeof node === 'object') {
        const { ['@context']: _ctx, ...rest } = node as Record<string, unknown>;
        graph.push(rest);
      }
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/** JSON for a <script type="application/ld+json">, safe against "</script>" injection. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export { pagePath };
