---
name: html-to-pdf
description: Render any HTML (an audit report, scorecard, one-pager) into a clean, print-ready PDF deliverable — headless Chrome (pixel-perfect, CSS print rules, page breaks) or Pandoc (Markdown→PDF). Use to turn the audit findings / designed-report-style report HTML into a polished PDF to hand the client. Free, no API key. This is the project's PDF path.
---

# html-to-pdf — turn the audit into a deliverable PDF

Reusable, project-agnostic. The audit findings live as HTML/Markdown; the client wants a PDF they can
keep and forward. This renders one to print quality, locally, free — full control over the layout via your
own HTML/CSS (no third-party PDF service).

## Path A — headless Chrome (pixel-perfect, honors your CSS)
Best for a designed report HTML (like the client report pages).
```bash
# Windows Chrome path; adjust if needed.
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="reports/client-audit.pdf" \
  "file:///E:/ABSOLUTE/PATH/report.html"
# Or a live URL: "$CHROME" --headless --print-to-pdf=out.pdf "http://localhost:3000/..."
```
Make it print well with a print stylesheet in the HTML:
```css
@media print {
  @page { size: A4; margin: 14mm; }
  .page-break { break-after: page; }
  a[href]::after { content: " (" attr(href) ")"; font-size: .8em; color:#666; }  /* show link targets */
  nav, .no-print { display: none; }
}
```

## Path B — Playwright (programmatic, full control over page breaks/headers) — THE default here
The pack already ships this script at `$WEBSITE_PACK/scripts/pdf.mjs` — use it
rather than rewriting: `node "$WEBSITE_PACK/scripts/pdf.mjs" <htmlPathOrUrl> <out.pdf>`.
```js
// $WEBSITE_PACK/scripts/pdf.mjs  — node pdf.mjs <htmlPathOrUrl> <out.pdf> [footerLabel]
import { chromium } from 'playwright';
import path from 'path';
const [,, src, out, footerLabel] = process.argv;
const url = src.startsWith('http') ? src : 'file://' + path.resolve(src);
const label = footerLabel || path.basename(out, path.extname(out)).replace(/[-_]/g, ' ');
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.emulateMedia({ media: 'print' });
await p.pdf({ path: out, format: 'A4', printBackground: true,
  margin: { top:'14mm', bottom:'14mm', left:'12mm', right:'12mm' },
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `<div style="font-size:9px;width:100%;text-align:center;color:#888">${label} · <span class="pageNumber"></span>/<span class="totalPages"></span></div>` });
await b.close();
```
The footer label defaults to the output filename if you don't pass one — always pass a real label
for a client-facing deliverable rather than relying on the filename default.
`printBackground: true` is essential or colored scorecard cells/charts come out white.

## Path C — Markdown → PDF (Pandoc, fastest for text-heavy findings)
```bash
winget install --id JohnMacFarlane.Pandoc   # plus MiKTeX for the PDF engine
pandoc AUDIT-FINDINGS.md -o reports/audit.pdf \
  --pdf-engine=xelatex -V geometry:margin=1in --toc
```

## Recipe — ship the audit as a PDF
1. Assemble findings as one HTML (cover + scorecard + per-section PASS/FAIL tables + screenshots from `/screenshot` + CWV from `/lighthouse-audit`).
2. Add the `@media print` block above; insert `<div class="page-break">` between sections.
3. Render with Path A or B → `reports/client-audit.pdf`.
4. Eyeball it: backgrounds present? no clipped tables? links resolve? page breaks clean?

## Notes
- Embed images as relative paths next to the HTML (or base64) so they resolve in headless mode.
- For huge reports, prefer Playwright (Path B) — predictable `networkidle` wait + explicit margins.
- Keep the source HTML; re-rendering on edits is instant. Version the PDF per client/date.
- **This is the default engine, not the only one.** For a lead-magnet PDF built from long-form
  approved copy rather than a designed report, `/lead-magnet` and the `press-document-specialist`
  agent use the Gamma API as a secondary path — see that agent for when it's actually a better fit
  than rendering your own HTML.

## Done definition
A print-ready `reports/{client}-audit.pdf` renders with backgrounds, clean page breaks, working links, and embedded evidence — ready to hand to the client.
