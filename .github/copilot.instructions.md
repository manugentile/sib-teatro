
# Copilot Instructions: Astro + TinaCMS Starter

> Canonical agent guidance lives in `.github/copilot-instructions.md`.
> This file is kept for compatibility with tools that look for `copilot.instructions.md`.

## Project Architecture

- **Astro 5.x** is used for static site generation with Islands Architecture (server-rendered by default, selective client-side hydration).
- **TinaCMS** is the sole content management and schema system. All content types, fields, and validation are defined in `.tina/config.ts` using TypeScript objects (not Zod).
- **Content lives in `src/content/`** as Markdown/MDX files, managed and validated by TinaCMS.
- **Pages** are in `src/pages/` (including `[slug].astro` for dynamic blog post routes).
- **UI components** (Astro, Vue, React, etc.) are in `src/components/` and can be used in MDX.
- **TinaCMS admin UI** is served from `/public/admin/`.

## Key Conventions & Patterns

- **Do NOT use Astro Content Collections or Zod schemas.** All content structure is managed by TinaCMS.
- **Component naming:** Use PascalCase for all components.
- **MDX:** Custom components must be registered in the MDX context and added as templates in Tina’s schema to be available in the CMS UI.
- **Styling:** Use scoped styles in `.astro` components; global styles in `src/styles/global.css`.
- **Performance:** Default to zero JavaScript; hydrate only where needed.
- **SEO:** Use semantic HTML and Astro’s meta management.

## Developer Workflows

- **Add a blog post:** Create a `.md`/`.mdx` in `src/content/` with frontmatter matching Tina’s schema. Edit via TinaCMS at `/admin/index.html` (`npm run tina`).
- **Add a page:** Create a `.astro` or `.md` file in `src/pages/`.
- **Change content fields:** Edit `.tina/config.ts` and restart the dev server.
- **Add MDX component:** Create in `src/components/`, register in `[slug].astro`, and add to Tina schema.

## Essential Commands

| Command             | Action                                        |
| :------------------ | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start Astro dev server at `localhost:3000`    |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview the build locally                     |
| `npm run astro ...` | Run Astro CLI commands                        |
| `npm run tina`      | Start TinaCMS admin UI at `/admin/index.html` |

## References

- [Astro Docs](https://docs.astro.build)
- [TinaCMS Docs](https://tina.io/docs/)
- [Astro + Tina Example](https://github.com/withastro/astro/tree/latest/examples/blog)

---

**If any section is unclear or missing project-specific details, please specify so I can refine these instructions further.**
