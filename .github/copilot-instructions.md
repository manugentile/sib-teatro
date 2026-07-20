# Copilot instructions (Astro + TinaCMS starter)

## Big picture

- Astro 5 site; routing lives in `src/pages/` and layouts/components in `src/layouts/` + `src/components/`.
- Content is file-based MDX under `src/content/` and is rendered via `Astro.glob()` in dynamic routes:
  - Blog posts: `src/content/posts/*.{md,mdx}` → route `src/pages/posts/[...slug].astro`
  - “Chi siamo”: `src/content/chi_siamo/*.{md,mdx}` → route `src/pages/chi-siamo/[...slug].astro`
- TinaCMS is the schema + editor for those files:
  - Schema/config: `.tina/config.ts`
  - Admin output: `public/admin/` (Tina `build.outputFolder = "admin"`)
  - Media uploads: `public/uploads/` (Tina `mediaRoot = "uploads"`)

## Dev workflow (what to run)

- Local dev (Astro only): `npm run dev`
- Local dev (Astro + Tina GraphQL/admin): `npm run tina`
  - Admin UI: `http://localhost:4321/admin/index.html`
  - Tina’s local GraphQL endpoint is generated/configured under `.tina/__generated__/` (see `.tina/__generated__/client.ts`).
- Production build/preview: `npm run build` / `npm run preview`

## Content conventions

- Posts live in `src/content/posts/` (see fields in `.tina/config.ts`): `title` (required), `description`, `heroImage`, `pubDate`, and MDX body.
- “Chi siamo” lives in `src/content/chi_siamo/`: `title` (required), `description`, `pubDate`, `sideImage`, `mainImage`, and MDX body.
- Images referenced in frontmatter usually use `/uploads/...` paths backed by files in `public/uploads/`.

## TinaCMS conventions (source of truth)

- Treat `.tina/config.ts` as the authoritative content schema (fields, labels, templates).
- Do **not** hand-edit `.tina/__generated__/` (generated artifacts like `client.ts`, `types.ts`, `schema.gql`).
- After editing `.tina/config.ts`, restart `npm run tina` so schema + generated types stay in sync.
- Branch detection is environment-driven in `.tina/config.ts` (`HEAD` / `VERCEL_GIT_COMMIT_REF` → fallback `main`).

## MDX + embedded components (Astro ↔ Tina)

- MDX is enabled via `@astrojs/mdx` in `astro.config.mjs`.
- To support an embedded component in MDX **and** make it editable in Tina:
  1. Build the component in `src/components/`.
     - Example: `src/components/Counter.astro` wraps `src/components/VueCounter.vue` and hydrates with `client:visible`.
  2. Register it in the page renderer by passing the mapping to MDX `<Content />`.
     - Example: `src/pages/posts/[...slug].astro` uses `<Content components={{ Counter }} />`.
  3. Add a matching template under the collection’s rich-text field in `.tina/config.ts`.
     - Example: `Counter` template under the `post.body` field.

## Styling system

- TailwindCSS v4 + DaisyUI are wired through `src/styles/global.css` (Tailwind `@import "tailwindcss";` and DaisyUI `@plugin "daisyui";`).
- Tailwind config is `tailwind.config.js` (extends colors/fonts via CSS variables; `darkMode: 'class'`).
- UI commonly uses DaisyUI component classes (`navbar`, `btn`, `carousel`, etc.). Prefer extending existing patterns over introducing a new styling approach.

## Project-specific gotchas

- `astro.config.mjs` has `site: 'https://example.com'` which affects sitemap/RSS; update it when deploying.
- Slugs are derived from filenames in `getStaticPaths()` (see `src/pages/posts/[...slug].astro`). Renaming a content file changes its URL.
