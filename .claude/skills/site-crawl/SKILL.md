---
name: site-crawl
description: Enumerate every URL on a site (via sitemap or a shallow link crawl) and pull per-page SEO signals: HTTP status, title, meta description, H1, canonical, robots, word count, JSON-LD presence. Use to inventory a site for an audit, find orphans, missing meta, broken pages or thin content, and to compare against competitors. Plain HTTP requests and text processing; no API key needed.
---

# /site-crawl: map a whole site for the audit

A reusable breadth pass. It turns "let me look at the site" into a structured inventory: one row per URL with the signals that decide an SEO audit. Feeds `/seo-audit` (the per-page deep dive), `/crawl-integrity` (the soft-404 taxonomy), and the scorecard.

Targets come from `urls.canonicalBase` for production and the project's dev server for local runs.

## Step 1: get the URL list

The sitemap is the best source of truth. Fetch it and extract every location. **Handle the sitemap-index case**: if what comes back is a list of child sitemaps rather than pages, fetch each child and concatenate. This trips up more crawls than any other single thing, and it fails quietly by returning a handful of URLs that look plausible.

With no sitemap, do a shallow one-hop crawl of the home page's internal links instead, and say in the output that the inventory is link-derived rather than complete.

Also fetch the robots file. It lists the sitemap and any disallowed paths, and a disallow that surprises you is itself a finding.

## Step 2: the per-URL signal sweep

For each URL, capture: HTTP status, title, meta description length, the first H1, the canonical, whether any JSON-LD is present, and an approximate word count from the tag-stripped body.

Write it as one row per URL in a tab-separated file so the flags in step 3 can be run mechanically rather than by eye.

**Be polite**: a short delay between requests and a clear user agent keeps you off rate limits. Do not hammer production.

## Step 3: flag the problems, which is where the value is

Run these over the inventory:
- **Bad status**: anything that is not 200. Redirects and errors both matter, for different reasons.
- **Missing title** or **missing H1**.
- **Description length** outside a sensible range, which usually means it was never written rather than that it was written badly.
- **Canonical shape**: absolute, and matching `urls.trailingSlash`. A relative or wrong-form canonical is a real defect and an easy one to miss.
- **No JSON-LD**, noting that policy pages may be intentional.
- **Thin pages** below a word threshold appropriate to the page type.
- **Duplicate titles**, which is the cannibalisation signal. The keyword map allows exactly one owner per term, so a duplicate is either a mistake or an ownership decision nobody made.

## Use it against competitors
Run steps 1 and 2 against competing sites when sizing the gap. The URL count alone gives a clean "they index N relevant pages" comparison, and their missing schema and thin pages are the opening.

## Notes
- **How a site renders changes how you read a thin result.** On a server-rendered site, thin HTML in a plain fetch is a real defect; route it to `/crawl-integrity`. On a client-rendered competitor, the same result means their content and schema are invisible to non-JavaScript crawlers, which is a finding in your favour rather than theirs. Do not report the two the same way.
- This is breadth. For depth on a single page, hand it to `/seo-audit` and `/schema-audit`.

## Done definition
An inventory file exists for the target host and any comparison sites, and the step 3 flags are triaged into the audit findings table with owners assigned.
