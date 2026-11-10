// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // Live address, used for absolute URLs. The CMS "SEO & tracking" → Live website address takes priority.
  site: SITE_URL || undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});
