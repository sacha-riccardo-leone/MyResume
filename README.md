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
| Font | [Satoshi](https://www.fontshare.com/fonts/satoshi) — static 300/400 site-wide, plus a self-hosted variable face used only by the 404 |
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
| anything else | The 404 |

Language is a modifier on the view, so it stays a query parameter: `/cv?lang=en`.
French is the default and carries no parameter.

There is no file behind `/cv`, so the host has to serve `index.html` for paths
it does not recognise — `vercel.json` does that in production, and Vite's dev
and preview servers do it by default. Vercel checks the filesystem before
applying the rewrite, which is why the shipped PDFs and build assets still
resolve.

An unmatched path therefore reaches the app rather than the host's 404, and is
answered by `NotFound`. Because the host already replied 200, the page adds a
`noindex` meta while it is on screen so a crawler does not index a dead URL as
a real page — a true 404 status would need a server function, which this site
does not have.

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
through Chrome, and **fails if the CV no longer fits on a single page**.
Commit the regenerated PDFs along with your change.

That check is the one guarding the one-page CV. If the experience outgrows the
page the paginator opens a second one rather than clipping an entry, so nothing
is ever lost — but the export fails, so it cannot ship unnoticed. Either cut
something or raise `EXPECTED_PAGES` deliberately.

Keep the uppercase labels in the print layout at or below
`PRINT_LABEL_TRACKING` (0.08em). Above roughly 0.13em the letter-spacing
exceeds the font's space width and PDF text extractors read `MANDATS` as
`M A N D A T S`, which stops an ATS from recognising the section headings.
