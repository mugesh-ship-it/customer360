# Customer360 — Marketing Site

Astro + Tailwind CSS v4 frontend, with all content managed in **Payload CMS** (open source, self-hosted in `/cms`).

```
├── src/                 Astro site
│   ├── components/
│   │   ├── global/      Navbar, Footer, Button, SectionTag, CmsImage, GridDivider
│   │   ├── sections/    One component per CMS block (Hero, ServicesWheel, …)
│   │   └── RenderBlocks.astro   blockType → component map
│   ├── lib/cms.ts       Payload REST client + media helpers (types shared from /cms)
│   ├── layouts/Layout.astro     fonts, SEO, Lenis, reveal-on-scroll
│   └── styles/global.css        design tokens + Client-First system classes
└── cms/                 Payload CMS (Next.js, SQLite)
    ├── src/blocks/      Section blocks editors can add to any page
    ├── src/collections/ Pages, Testimonials, Media, Users
    ├── src/globals/     Header, Footer
    └── src/seed/        Seeds the Home Page content from the Figma design
```

## Run locally

```bash
# 1. CMS (http://localhost:3000/admin — create your admin user on first visit)
cd cms && npm install && npm run seed && npm run dev

# 2. Site (http://localhost:4321) — in another terminal
npm install && npm run dev
```

In `astro dev` every request reads the CMS, so content edits show on refresh.
`npm run build` produces a fully static site; set `REBUILD_HOOK_URL` in `cms/.env` to trigger a redeploy after edits.

## Pages

- **Home** (`home`) and **About Us** (`about`, Figma node 481:16166). Refresh About content without touching other pages:
  `cd cms && npx payload run src/scripts/seed-about.ts`
- About-specific blocks: *Title, text & card row* (`cardGrid`), *Values* (`values`), *Steps accordion* (`approach`), *Team grid* (`team`).
  People for the Team grid live in **Content → Our team**.

## Adding a new section

1. Create a block in `cms/src/blocks/` and register it in `cms/src/blocks/index.ts`
2. `cd cms && npm run generate:types`
3. Add a component in `src/components/sections/` and map it in `RenderBlocks.astro`

New pages need no code: create a page in the CMS with a slug (e.g. `about`) and it is built at `/about`.

## Conventions

- **Client-First** naming: `section_[name]`, `[name]_component`, `[name]_[element]`, plus global classes
  (`padding-global`, `container-large`, `padding-section-*`, `heading-style-*`, `text-size-*`, `button is-*`).
  Global classes live in `global.css` (`@layer components`); one-off layout uses Tailwind utilities.
- **Motion**: Lenis (`lerp: 0.1`, auto rAF), a single IntersectionObserver for `[data-reveal]`,
  CSS-only marquees. Everything animates only `transform`/`opacity` and is disabled under `prefers-reduced-motion`.

## Design tokens

Every colour, font, text size, width, spacing and radius is a CSS variable (`src/styles/global.css`).
Editors change them in **Settings → Brand & design**; `Layout.astro` prints the saved values as a `:root` block.
Defaults live in `cms/src/design/tokens.ts` (keep in step with `global.css`).

- Colours: `primary-25…950`, `neutral-25…900`, `page`, `ink`, `muted` → `bg-primary-700`, `text-neutral-900`, `text-ink`
- Type: `--font-size-display|h1|h2|h3|large|regular|small` (fluid clamp) used by `heading-style-*` / `text-size-*`
- Layout: `--size-container-*`, `--padding-global-*`, `--section-*`, `--button-height(-large)`, `rounded-button`, `rounded-card`
- Never hard-code hex values or pixel sizes that should follow the brand.

## SEO & marketing

- **Settings → SEO & tracking**: site name/URL, title pattern, default title/description/share image, favicons,
  indexing switch (turn off on staging), Search Console/Bing codes, robots rules, business details (Organization JSON-LD),
  GA4 / GTM / Meta Pixel / LinkedIn / Hotjar / Clarity IDs, custom head/body code, 404 page text, llms.txt summary.
- **Per page** (“Google & sharing” + “Advanced SEO” tabs): title & description with live character counters, share image,
  focus keyword, noindex/nofollow, sitemap options, canonical, schema page type, breadcrumb label, custom JSON-LD.
- **Settings → Redirects**: 301/302s, output to `/_redirects` (Netlify / Cloudflare Pages).
- Generated: `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/404`, and JSON-LD (Organization, WebSite, WebPage, BreadcrumbList).
- Code: `src/lib/seo.ts`, `src/components/global/Seo.astro`, `src/components/global/Tracking.astro`, `src/lib/design.ts`.
- Fill only the new settings without re-seeding: `cd cms && npx payload run src/scripts/seed-seo.ts`

## Editor experience (admin)

- Welcome dashboard with shortcuts (`cms/src/components/admin/Welcome.tsx`)
- Menu groups: **Content** (Pages, Testimonials, Images) and **Settings** (Top menu, Footer, Team members)
- "Add section" picker shows a thumbnail of each section (`cms/public/admin/blocks/*.jpg`)
- Plain-language labels, placeholders and help text; technical options hidden under "Advanced settings"
- List rows show their own text (e.g. "AI Accelerators") via `cms/src/components/admin/RowLabel.tsx`
- "Preview" button on pages opens the live page (`SITE_URL` in `cms/.env`)
