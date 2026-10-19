---
description: Multi-mechanism web scraper. Tries scraping methods in order until one succeeds. Use when you need to read the full content of a URL (not just a search snippet). Always use this before citing or quoting from a source.
---

# Scrape Skill

## Purpose

Extract full text content from a URL using the best available method. Fallback through 6 mechanisms in order until content is retrieved.

## When to use

- Before citing any stat from a source (verify the page actually says it)
- When a Brave search snippet is too short to write from
- When you need the full methodology or detail from a page
- When you want to cross-reference multiple claims from one source

## Mechanism order (try in sequence)

### Mechanism 1: Jina AI Reader (try first)

Prepend `https://r.jina.ai/` to the target URL.

```bash
curl -s -H "Accept: text/plain" "https://r.jina.ai/[TARGET_URL]"
```

**Good for:** Most article pages, blog posts, documentation
**Fails on:** Heavily JavaScript-rendered SPAs, paywalled content, login-required pages

If response is > 500 characters of actual text content → success. Use it.
If response is empty, nav-only, or an error → move to Mechanism 2.

---

### Mechanism 2: Direct Fetch with Rotated Headers

Plain HTTP fetch with realistic browser headers.

```bash
curl -s \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8" \
  -H "Accept-Language: en-US,en;q=0.5" \
  -H "Referer: https://www.google.com/" \
  -H "DNT: 1" \
  -L \
  "[TARGET_URL]"
```

**User-Agent rotation pool (cycle through these):**
1. `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36`
2. `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36`
3. `Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0`
4. `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`
5. `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15`

**Referer rotation pool:**
- `https://www.google.com/`
- `https://www.bing.com/`
- `https://duckduckgo.com/`
- `https://www.reddit.com/`
- Direct (no referer)

**Good for:** Standard HTML pages
**Fails on:** JS-rendered SPAs, Cloudflare protection, heavy bot detection

If raw HTML is returned but needs parsing: extract text between `<article>`, `<main>`, `<p>` tags. Strip all `<script>`, `<style>`, `<nav>`, `<footer>` blocks first.

---

### Mechanism 3: Playwright (headless Chromium)

For JavaScript-rendered pages that return empty content from curl.

```typescript
import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 800 },
  extraHTTPHeaders: {
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://www.google.com/'
  }
})
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
const content = await page.evaluate(() => document.body.innerText)
await browser.close()
```

**Good for:** SPA-heavy sites, React/Next.js rendered content, anything that needs JS execution
**Fails on:** Cloudflare challenge pages, login-gated content, CAPTCHAs

---

### Mechanism 4: Puppeteer

Alternative headless browser. Use if Playwright fails.

```typescript
import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})
const page = await browser.newPage()
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36')
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
const content = await page.evaluate(() => document.body.innerText)
await browser.close()
```

Same use case as Playwright with different rendering engine internals. Often gets through when Playwright doesn't on specific sites.

---

### Mechanism 5: Firecrawl API

For deep crawls or sites that need structured extraction. Requires `FIRECRAWL_API_KEY` env var.

```bash
curl -s -X POST "https://api.firecrawl.dev/v1/scrape" \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "[TARGET_URL]", "formats": ["markdown"]}'
```

**Good for:** Clean markdown extraction, multi-page crawls, structured content
**Use when:** You need multiple related pages from a domain (e.g., all sections of a report)

---

### Mechanism 6: Google Cache or Archive

Last resort for pages that block all direct access.

Try Wayback Machine:
```
https://web.archive.org/web/[TARGET_URL]
```

Or try Archive.ph:
```
https://archive.ph/[TARGET_URL]
```

---

## What to extract

After getting the page content, extract:
1. **The specific stat or claim** you were looking for
2. **The exact sentence/paragraph it appears in** (for accurate attribution)
3. **The publication date** (for citing recency)
4. **The author or organization** (for credibility signaling)
5. **Any caveats or qualifications** the source itself mentions

## Failure handling

If all 6 mechanisms fail:
- Do not fabricate or infer content from the URL alone
- Note in your research: "Could not access [URL] — citing from search snippet only"
- If the snippet is too thin to cite accurately, skip this source and find a different one
- Never hallucinate content from a URL you couldn't scrape

## Rate limiting awareness

- Don't hit the same domain more than 3 times in a minute
- If Jina returns 429 (rate limit), wait 10 seconds and retry once, then fall through
- Firecrawl has API rate limits — use sparingly, not for every single URL

## Output format

Return the extracted content as clean text, stripped of navigation, ads, footers, and other non-article elements. The research agent should receive only the article body.
