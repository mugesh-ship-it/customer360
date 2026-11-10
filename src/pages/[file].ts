/**
 * /_redirects — the CMS "Redirects" list in the format Netlify and Cloudflare
 * Pages read at deploy time. (On Vercel, map these in vercel.json instead.)
 */
import type { APIRoute } from 'astro';
import { getRedirects } from '../lib/cms';

// Astro ignores _-prefixed files in pages/, so the name comes from a param.
export const getStaticPaths = () => [{ params: { file: '_redirects' } }];

export const GET: APIRoute = async () => {
  const redirects = await getRedirects();
  const lines = redirects
    .filter((r) => r.from?.startsWith('/') && r.to && !/\s/.test(r.from + r.to))
    .map((r) => `${r.from} ${r.to} ${r.type || '301'}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
