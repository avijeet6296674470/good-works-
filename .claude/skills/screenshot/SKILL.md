---
name: screenshot
description: Capture screenshots of any live URL (or local page) at desktop + mobile + tablet viewports, full-page or above-the-fold, plus single-element shots. Use to grab evidence for an audit report / teardown video, to compare a client site vs competitors, or to document a before/after. Headless-Chrome via Playwright; no API key.
---

# Screenshot — headless capture for audits & teardowns

Reusable, project-agnostic. Pulls pixel-accurate screenshots of any page so an audit/video has real
evidence (hero, mobile overflow, CWV overlays, competitor comparisons) instead of descriptions.

## One-time setup
```bash
# Playwright bundles its own Chromium — most robust path.
npm i -D playwright            # or: npx playwright@latest ...
npx playwright install chromium
```
Output goes to `./screenshots/` by default — create it: `mkdir -p screenshots`.

## Fast path — capture script
The pack already ships this script at `$WEBSITE_PACK/scripts/shot.mjs`. Call it
per URL/viewport; the local dev target is http://localhost:3000 (`npm run dev`
in `the app directory`).
```js
// $WEBSITE_PACK/scripts/shot.mjs  — usage: node shot.mjs <url> <out.png> [device] [fullpage]
import { chromium, devices } from 'playwright';
const [,, url, out, device = 'desktop', full = 'true'] = process.argv;
const presets = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  tablet:  devices['iPad (gen 7)'],
  mobile:  devices['iPhone 14 Pro'],
};
const browser = await chromium.launch();
const ctx = await browser.newContext(presets[device] ?? presets.desktop);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1200);                         // let lazy/animated content settle
await page.screenshot({ path: out, fullPage: full === 'true' });
await browser.close();
console.log('saved', out);
```

## Common captures
```bash
SHOT="$WEBSITE_PACK/scripts/shot.mjs"

# Full-page desktop + mobile of a local dev page (npm run dev in the app directory)
node "$SHOT" "http://localhost:3000/"         screenshots/home-desktop.png desktop true
node "$SHOT" "http://localhost:3000/"         screenshots/home-mobile.png  mobile  true

# Above-the-fold only (hero / first impression) — set fullpage=false
node "$SHOT" "http://localhost:3000/pricing/" screenshots/pricing-fold.png desktop false

# The live site or a competitor for a side-by-side
node "$SHOT" "the canonical base URL/" screenshots/live-home-mobile.png mobile true
```

## Single-element shot (e.g. just the booking widget / a broken section)
Add to the script or run inline: `await page.locator('SELECTOR').screenshot({ path: out })`.

## Tips for audit-grade shots
- **Mobile overflow proof:** capture `mobile` full-page; horizontal scrollbars / cut-off content show real responsive bugs (pair with `/responsive-pass`).
- **Consistency:** use `deviceScaleFactor: 2` (retina) so shots look crisp in a recorded video / PDF.
- **Cookie/consent banners** obscure the hero — dismiss first: `await page.click('text=Accept', { timeout: 3000 }).catch(()=>{})` before the screenshot.
- **Annotate later:** raw PNGs land in `./screenshots/`; mark them up in the report/video editor.
- **No-Node fallback:** `chrome --headless --screenshot --window-size=1440,900 --hide-scrollbars "URL"` works if Playwright isn't available (full-page needs `--screenshot` + DevTools protocol; Playwright is preferred).

## Done definition
Every page under audit has a desktop + mobile shot saved under `./screenshots/`, named `{page}-{viewport}.png`, ready to drop into the teardown deck / video / PDF.
