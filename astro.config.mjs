// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // Live address, used for absolute URLs. The CMS "SEO & tracking" → Live website address takes priority.
  site: SITE_URL || undefined,
  // The site is static; only /preview/* (CMS draft preview) renders on request, as a Vercel function.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
