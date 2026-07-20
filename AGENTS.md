# AGENTS.md - Project Rules for Astro + TinaCMS Starter

> **Canonical source**: This file consolidates all project instructions from `.github/` directory.
> All agents (Copilot, Vibe, etc.) must follow these rules automatically.

---

## Project Architecture

- **Astro 5.x** is used for static site generation with Islands Architecture (server-rendered by default, selective client-side hydration).
- **TinaCMS** is the sole content management and schema system. All content types, fields, and validation are defined in `.tina/config.ts` using TypeScript objects (not Zod).
- **Content lives in `src/content/`** as Markdown/MDX files, managed and validated by TinaCMS.
- **Pages** are in `src/pages/` (including `[slug].astro` for dynamic blog post routes).
- **UI components** (Astro, Vue, React, etc.) are in `src/components/` and can be used in MDX.
- **TinaCMS admin UI** is served from `/public/admin/`.

## Content Structure

- **Blog posts**: `src/content/posts/*.{md,mdx}` → route `src/pages/posts/[...slug].astro`
- **"Chi siamo"**: `src/content/chi_siamo/*.{md,mdx}` → route `src/pages/chi-siamo/[...slug].astro`
- Posts have fields: `title` (required), `description`, `heroImage`, `pubDate`, and MDX body.
- "Chi siamo" has fields: `title` (required), `description`, `pubDate`, `sideImage`, `mainImage`, and MDX body.
- Images referenced in frontmatter usually use `/uploads/...` paths backed by files in `public/uploads/`.

## Critical Rules - NEVER BREAK

- **Do NOT use Astro Content Collections or Zod schemas.** All content structure is managed by TinaCMS.
- **Do NOT hand-edit `.tina/__generated/`** (generated artifacts like `client.ts`, `types.ts`, `schema.gql`).
- Treat `.tina/config.ts` as the authoritative content schema (fields, labels, templates).
- After editing `.tina/config.ts`, restart `npm run tina` so schema + generated types stay in sync.

## Development Conventions

- **Component naming**: Use PascalCase for all components.
- **MDX**: Custom components must be registered in the MDX context and added as templates in Tina's schema to be available in the CMS UI.
- **Styling**: Use scoped styles in `.astro` components; global styles in `src/styles/global.css`.
- **TailwindCSS v4 + DaisyUI** are wired through `src/styles/global.css`. Tailwind config is `tailwind.config.js` (extends colors/fonts via CSS variables; `darkMode: 'class'`).
- **UI**: Prefer extending existing DaisyUI component classes (`navbar`, `btn`, `carousel`, etc.) over introducing a new styling approach.
- **Performance**: Default to zero JavaScript; hydrate only where needed (use Astro client directives).
- **SEO**: Use semantic HTML and Astro's meta management.

## MDX Development Standards

MDX is enabled via `@astrojs/mdx` in `astro.config.mjs`.

- MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax, unlocking the ability to mix JavaScript and UI Components into Markdown content.
- To support an embedded component in MDX **and** make it editable in Tina:
  1. Build the component in `src/components/`
     - Example: `src/components/Counter.astro` wraps `src/components/VueCounter.vue` and hydrates with `client:visible`
  2. Register it in the page renderer by passing the mapping to MDX `<Content />`
     - Example: `src/pages/posts/[...slug].astro` uses `<Content components={{ Counter }} />`
  3. Add a matching template under the collection's rich-text field in `.tina/config.ts`
     - Example: `Counter` template under the `post.body` field
- **Note**: [Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) are still required to create interactive components. Otherwise, all components in your MDX will render as static HTML (no JavaScript) by default.

## Developer Workflows

- **Add a blog post**: Create a `.md`/`.mdx` in `src/content/` with frontmatter matching Tina's schema. Edit via TinaCMS at `/admin/index.html` (`npm run tina`).
- **Add a page**: Create a `.astro` or `.md` file in `src/pages/`.
- **Change content fields**: Edit `.tina/config.ts` and restart the dev server.
- **Add MDX component**: Create in `src/components/`, register in `[slug].astro`, and add to Tina schema.

## Dev Environment

- Local dev (Astro only): `npm run dev`
- Local dev (Astro + Tina GraphQL/admin): `npm run tina`
  - Admin UI: `http://localhost:4321/admin/index.html`
  - Tina's local GraphQL endpoint is generated/configured under `.tina/__generated/` (see `.tina/__generated__/client.ts`)
- Production build/preview: `npm run build` / `npm run preview`
- Branch detection is environment-driven in `.tina/config.ts` (`HEAD` / `VERCEL_GIT_COMMIT_REF` → fallback `main`)

## Essential Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Astro dev server at `localhost:3000` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the build locally |
| `npm run astro ...` | Run Astro CLI commands |
| `npm run tina` | Start TinaCMS admin UI at `/admin/index.html` |

## Project-Specific Gotchas

- `astro.config.mjs` has `site: 'https://example.com'` which affects sitemap/RSS; update it when deploying.
- Slugs are derived from filenames in `getStaticPaths()` (see `src/pages/posts/[...slug].astro`). Renaming a content file changes its URL.

## References

- [Astro Docs](https://docs.astro.build)
- [TinaCMS Docs](https://tina.io/docs/)
- [Astro + Tina Example](https://github.com/withastro/astro/tree/latest/examples/blog)
- [MDX Syntax Documentation](https://mdxjs.com/docs/what-is-mdx)
- [Astro MDX Usage Documentation](https://docs.astro.build/en/guides/markdown-content/#markdown-and-mdx-pages)

---

**If any section is unclear or missing project-specific details, specify so the instructions can be refined further.**
