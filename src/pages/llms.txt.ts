/** /llms.txt — plain summary of the site for AI assistants (llmstxt.org). */
import type { APIRoute } from 'astro';
import { getPageSummaries, getSiteSettings, pagePath } from '../lib/cms';
import { siteOrigin } from '../lib/seo';

export const GET: APIRoute = async () => {
  const [settings, pages] = await Promise.all([getSiteSettings(), getPageSummaries()]);
  const origin = siteOrigin(settings);
  const summary = settings.llmsSummary || settings.defaultDescription || '';
  const list = pages
    .filter((p) => !p.seo?.noindex)
    .map((p) => `- [${p.meta?.title || p.title}](${origin}${pagePath(p.slug)})${p.meta?.description ? `: ${p.meta.description}` : ''}`);

  const body = [`# ${settings.siteName}`, '', ...(summary ? [`> ${summary.replace(/\n+/g, ' ')}`, ''] : []), '## Pages', '', ...list, '']
    .join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
