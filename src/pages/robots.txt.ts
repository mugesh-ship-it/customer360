/** /robots.txt — blocks everything when "Let Google show this website" is off. */
import type { APIRoute } from 'astro';
import { getSiteSettings } from '../lib/cms';
import { siteOrigin } from '../lib/seo';

export const GET: APIRoute = async () => {
  const settings = await getSiteSettings();
  const lines = ['User-agent: *'];
  if (settings.allowIndexing === false) {
    lines.push('Disallow: /');
  } else {
    lines.push('Allow: /');
    const extra = (settings.robotsExtra || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /^(Allow|Disallow|Crawl-delay):/i.test(l));
    lines.push(...extra, '', `Sitemap: ${siteOrigin(settings)}/sitemap.xml`);
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
