# Resume — Sacha Riccardo Leone

Online resume available in four languages (FR / EN / DE / IT), with a print-ready PDF layout.

## Tech stack

| Layer | Tool |
|-------|------|
| Design | [Figma](https://www.figma.com) — initial layout and component design |
| Framework | [React](https://react.dev) 18 + TypeScript |
| Build tool | [Vite](https://vite.dev) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Icons | [Lucide React](https://lucide.dev) |
| Font | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| Hosting | [Vercel](https://vercel.com) — auto-deploys from `main` |

## Getting started

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
```

The output is written to `dist/`.

## Routing

Three views, at real paths rather than query strings, because this URL goes on
a printed CV:

| Path | View |
|------|------|
| `/` | The gate |
| `/cv` | The resume — this is the link to put in applications |
| `/work` | "Full experience" (parked; the gate no longer offers it) |

Language is a modifier on the view, so it stays a query parameter: `/cv?lang=en`.
French is the default and carries no parameter.

There is no file behind `/cv`, so the host has to serve `index.html` for paths
it does not recognise — `vercel.json` does that in production, and Vite's dev
and preview servers do it by default. Vercel checks the filesystem before
applying the rewrite, which is why the shipped PDFs and build assets still
resolve. One consequence: an unknown path renders the gate rather than a 404.

The site used `?cv` and `?work` until October 2026 and those links are already
out in sent applications, so they are still accepted and rewritten to the path
form on load. **Don't remove that fallback.**

## Regenerating the downloadable PDFs

The "Download PDF" button serves a static file from `public/`, one per
language, rather than calling `window.print()` — asking the visitor's browser
to render the PDF makes the result depend on their device, and iOS Safari
produces a broken file. Shipping the PDF as an asset gives every recruiter the
same verified document.

The trade-off is that those files can drift from the site, so **re-run this
after any change to the CV content or the print layout**:

```bash
npm run pdf
```

It builds the site, serves the production bundle, prints all four languages
through Chrome, and fails loudly if the paginator stops producing exactly two
pages. Commit the regenerated PDFs along with your change.

Keep the uppercase labels in the print layout at or below
`PRINT_LABEL_TRACKING` (0.08em). Above roughly 0.13em the letter-spacing
exceeds the font's space width and PDF text extractors read `MANDATS` as
`M A N D A T S`, which stops an ATS from recognising the section headings.
