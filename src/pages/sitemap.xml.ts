/** /sitemap.xml — every indexable CMS page. Submit this URL in Google Search Console. */
import type { APIRoute } from 'astro';
import { getPageSummaries, getSiteSettings, pagePath } from '../lib/cms';
import { siteOrigin } from '../lib/seo';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const [settings, pages] = await Promise.all([getSiteSettings(), getPageSummaries()]);
  const origin = siteOrigin(settings);
  const indexing = settings.allowIndexing !== false;

  const urls = indexing
    ? pages
        .filter((p) => !p.seo?.noindex && !p.seo?.hideFromSitemap && !p.seo?.canonical)
        .map((p) => {
          const isHome = p.slug === 'home';
          const priority = isHome ? 1 : (p.seo?.priority ?? 0.7);
          return [
            '  <url>',
            `    <loc>${esc(origin + pagePath(p.slug))}</loc>`,
            `    <lastmod>${new Date(p.updatedAt).toISOString()}</lastmod>`,
            `    <changefreq>${p.seo?.changeFrequency || 'monthly'}</changefreq>`,
            `    <priority>${Math.min(1, Math.max(0, priority)).toFixed(1)}</priority>`,
            '  </url>',
          ].join('\n');
        })
    : [];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
