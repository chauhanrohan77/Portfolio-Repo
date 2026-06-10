# rohanchauhan.dev

Portfolio site for Rohan Chauhan — AI Product Manager for regulated industries.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Deployed on [Vercel](https://vercel.com).

## Project structure

```
src/
├── content.config.ts          # Content Collections schema (Zod-validated)
├── content/projects/          # Case study content — edit these to update copy
│   ├── governance-copilot.md
│   ├── aml-triage.md
│   ├── job-hunt-copilot.md
│   ├── propos.md
│   └── wellness-marketplace.md
├── layouts/
│   ├── BaseLayout.astro       # HTML shell, SEO meta, Nav, Footer
│   └── CaseStudyLayout.astro  # Case study page structure
├── components/                # Reusable UI components
└── pages/
    ├── index.astro            # Landing page
    ├── [slug].astro           # Dynamic case study route
    └── 404.astro
public/
├── cv-rohan-chauhan.pdf       # Keep this current
└── robots.txt
```

## Updating content

Each case study lives in `src/content/projects/<slug>.md`. Frontmatter holds structured data (title, tags, links, metrics, architecture steps); the markdown body holds the prose.

To update a case study: edit the relevant `.md` file and push to `main` — Vercel deploys automatically.

To add a new project: create a new `.md` file with the required frontmatter fields (see `src/content.config.ts` for the Zod schema).

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Before going live

- [ ] Replace placeholder GitHub/demo links in each `.md` frontmatter
- [ ] Replace `[x]%` / `[N]` metric placeholders with real evaluation numbers
- [ ] Update the `About` bio and city in `src/pages/index.astro`
- [ ] Update the LinkedIn URL in `src/components/Footer.astro`
- [ ] Add `public/cv-rohan-chauhan.pdf`
- [ ] Update `site` in `astro.config.mjs` once the custom domain is confirmed
- [ ] Update the `Sitemap` URL in `public/robots.txt` to match the final domain

## Vercel deployment

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import from GitHub
3. Vercel auto-detects Astro — no manual build configuration needed (`vercel.json` is already set)
4. Add your custom domain under Project Settings → Domains
