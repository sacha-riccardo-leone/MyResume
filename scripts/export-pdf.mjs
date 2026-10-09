/* Exports the printable CV to static PDFs in public/.
 *
 * Why these are files and not window.print(): asking the visitor's browser to
 * render the PDF means the output depends on their device, and iOS Safari
 * re-lays-out the print DOM and produces a broken file. Shipping the PDF as an
 * asset gives every recruiter the identical, verified document.
 *
 * The cost is that these files can drift from the site, so re-run this after
 * any change to the CV content or the print layout:
 *
 *     npm run pdf
 *
 * It prints from the production build, not the dev server, so what ships is
 * what was measured (minified CSS has bitten us before).
 */
import { preview } from "vite";
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public");
const LANGS = ["fr", "en", "de", "it"];
/* The CV is meant to be one sheet. If the paginator ever has to open a second
   page the content still survives — it spills rather than being clipped — but
   this export fails, so the regression cannot ship unnoticed. Raise it only
   with a deliberate decision that the CV is now two pages. */
const EXPECTED_PAGES = 1;
/* The paginator only watches the left column. The sidebar has no such net:
   one line too many and its grey box quietly grows toward the footer, still
   on one page, so the page count above cannot see it. Its last line box
   already dips 0.2 mm into the 6 mm bottom padding (the ink does not: that
   is half-leading), and any extra line costs ~3.5 mm — so allow 1 mm. */
const SIDEBAR_SLACK_MM = 1;

/** Public path of the shipped PDF for a language. Mirrored in the app by
 *  cvPdfHref() — keep the two in step. */
const fileFor = (lang) => `CV-Sacha-Riccardo-Leone-${lang.toUpperCase()}.pdf`;

const server = await preview({ preview: { port: 4173, open: false } });
const base = server.resolvedUrls.local[0].replace(/\/$/, "");

let browser;
const failures = [];
try {
  // The system Chrome, which is what the layout was verified against.
  browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();

  for (const lang of LANGS) {
    await page.goto(`${base}/cv?lang=${lang}`, { waitUntil: "networkidle" });

    /* The paginator measures the off-canvas print DOM and only settles once
       the webfonts have loaded — printing before that yields a clipped or
       three-page file. Wait for it, then check what it decided. */
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(
      (n) => document.querySelectorAll(".print-page").length === n,
      EXPECTED_PAGES,
      { timeout: 15_000 },
    ).catch(() => {});

    const pages = await page.locator(".print-page").count();
    if (pages !== EXPECTED_PAGES) {
      failures.push(`${lang}: paginator produced ${pages} pages, expected ${EXPECTED_PAGES}`);
      continue;
    }

    /* Room left under each column of page 1, in mm, measured on the same
       off-canvas print DOM the paginator measures. Printed every run, so the
       next "will this fit?" starts from a number instead of a guess. */
    const room = await page.evaluate(() => {
      const mm = (px) => (px * 25.4) / 96;
      const free = (col) => mm(
        col.getBoundingClientRect().bottom
        - parseFloat(getComputedStyle(col).paddingBottom)
        - col.lastElementChild.getBoundingClientRect().bottom,
      );
      const col = (name) => document.querySelector(`.print-page [data-print-col="${name}"]`);
      return { main: free(col("main")), sidebar: free(col("sidebar")) };
    });
    if (room.sidebar < -SIDEBAR_SLACK_MM) {
      failures.push(`${lang}: sidebar runs ${(-room.sidebar).toFixed(1)} mm into its bottom padding (limit ${SIDEBAR_SLACK_MM} mm)`);
      continue;
    }

    const file = path.join(OUT, fileFor(lang));
    await page.pdf({
      path: file,
      printBackground: true,
      preferCSSPageSize: true, // honour the @page rule in index.css
    });
    const { size } = await fs.stat(file);
    console.log(`  ${fileFor(lang).padEnd(34)} ${(size / 1024).toFixed(0)} kB · room: main ${room.main.toFixed(1)} mm, sidebar ${room.sidebar.toFixed(1)} mm`);
  }
} finally {
  await browser?.close();
  await server.close();
}

if (failures.length) {
  console.error("\nPDF export failed:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\n${LANGS.length} PDFs written to public/`);
