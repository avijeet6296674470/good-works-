---
name: seo-audit
description: Use when auditing a page or set of pages for on-page, technical and answer-engine SEO correctness. Beacon runs the checklist: one semantic H1 and heading order, meta title and description, canonical and share tags, alt text, contextual anchors, the internal-link map, which schema the page carries, and the answer-engine surfaces (direct answer block, question headings, FAQ). Reports findings PASS or FAIL with the exact fix or owner. Beacon decides which schema a page needs; the JSON-LD itself routes to Weave via /schema-audit. Does not write copy; route to Marlowe via /copy-pass.
---

# /seo-audit: the page SEO checklist

Beacon's canonical pre-ship audit. Run it before any page is marked done. Reports findings as a checklist with PASS or FAIL plus the exact fix or the owner it routes to.

## Canonical grounding (read first)
If anything below conflicts with a source, the source wins.
- `brand.config.json`: `urls` (the canonical form and the trailing-slash policy), `market` (what local intent means here, if anything), `truth.forbiddenClaims`.
- `docs/BRAND-TRUTHS.md`: the ONLY publishable facts. Not in a source? ASK, never invent.
- `docs/BANNED-WORDS.md`: the lint, including the search-spam patterns.
- `docs/CODE-CONVENTIONS.md`: the SEO invariants and the ledger rule.
- The keyword ownership map at `urls.keywordMapFile`: one primary keyword per URL, the meta plans, the question bank. **Where a research document carries a stale fact, `BRAND-TRUTHS.md` wins.**
- `docs/CONTENT-PLAN.md` and the per-page decks in `docs/copy/`: the final metas the audit checks the rendered page against.
- `reference/verticals/<vertical.overlay>.md` sections 3 and 4: the archetypes and which schema belongs here.

## Inputs
The page's route file plus its SEO helper usage, **and the rendered HTML**. Request the route rather than trusting the code alone; the two disagree more often than anyone expects. Plus the keyword-ownership row for this URL and its sibling pages of the same type, to catch duplicate headings, titles and descriptions.

## How to run
1. Read the route file, its metadata source, and the rendered HTML.
2. Walk sections 1 to 9. Mark each item PASS, FAIL or not applicable.
3. For each FAIL, state the exact problem and the fix. Apply trivial slot fixes directly; route text to Marlowe, code and structure to Cortex, JSON-LD to Weave, robots and sitemap work to Cortex with Beacon supplying the intent.
4. Output the findings table. Log SEO-affecting fixes via `/seo-log`.

## 1. Heading structure
- Exactly one semantic H1 carrying the primary keyword, unique sitewide. Grep the H1 string across the routes; no second page reuses it.
- Headings take real question form where a real search asks a question. **A heading that talks about search itself is an automatic FAIL.**
- No skipped levels.

## 2. Meta title and description
- Title within 60 characters, primary keyword front-loaded, brand at the end.
- Description within 155 characters: a benefit plus a reason to click, the primary keyword present naturally, and a real number where the map calls for one.
- The primary keyword appears in the first hundred words of body copy. Any location or qualifier tail appears at most once per paragraph.
- No two pages share a title, description or H1. If a slot reads stiff in the brand voice, negotiate: **voice wins the visible line, the keyword wins the meta and the anchor.**

## 3. The direct answer block, canonical and share tags
- A 40 to 60 word direct answer sits immediately after the H1: self-contained, answering the page's core question, with a real fact in it. This is the answer-engine surface.
- **The canonical is absolute and in the project's exact URL form** per `urls`. The share-tag URL matches it exactly. A canonical that disagrees with the served URL is a slow, quiet, expensive bug.
- Share title, description and a route-appropriate image are present, with explicit dimensions.
- The largest-paint element is eager and preloaded. Note it here; the full budget is Pulse's.

## 4. Alt text and images
- Every image has descriptive alt plus dimensions. Decorative images take an intentional empty alt, empty rather than missing.
- Alt text is descriptive and contextual, never keyword-stuffed, never a raw keyword chip.
- Images are local assets served as real elements with a source set where sizes exist. No CSS background carrying content.

## 5. Anchor text
- Contextual anchors, never "click here" or "learn more".
- Varied across the site: no single phrase to the same URL more than two or three times.
- Every internal href in the project's URL form.

## 6. Internal-link map
- The page links to its parent hub and its siblings.
- Segment pages cross-link to the offerings they sell and to the conversion.
- The conversion is one click from any section, and the page is within three clicks of home.
- **The page has at least two inbound internal links.** Route graph-level tangles to Weaver.

## 7. Answer-engine surfaces
- The direct answer plus question-format headings drawn from the map's question bank.
- An FAQ block on every page the map assigns one, with visible text and markup from the same source array.
- **Consistent entity naming everywhere**, matching `identity.name` and `identity.nameRule`, so the knowledge graph resolves one clean entity rather than three near-misses.

## 8. URL and canonical hygiene
- The URL follows the project scheme. Slugs never change without explicit approval.
- The canonical points to itself. Internal links, sitemap and schema all use the same form.
- Facts render from the fact files, with no hand-typed copies in the route.

## 9. Launch-SEO check
- One H1, unique meta, absolute self-referencing canonicals, alt on every meaningful image, and **nothing important trapped behind client-only rendering**. Request the raw HTML to prove content and metadata render server-side.
- Robots allows the crawlers you want, blocks only what should never be indexed, and lists the sitemap. The sitemap carries every indexable URL in the canonical form.
- **No page is both noindexed and disallowed.** A blocked URL is never fetched, so its noindex is never read, and it can stay indexed indefinitely. These two mechanisms are not interchangeable, and confusing them is the most common serious error in this whole checklist.

## Inviolable-rules check
- **No em or en dashes** in any indexable field. Ranges use "to".
- **No fabricated fact** in any slot. Trace it or ASK.
- **Nothing from `truth.forbiddenClaims`**, anywhere. Automatic FAIL.
- **No search-spam patterns**: query-echo openers, keyword chips as labels, stacked variants, keyword lists dressed as content.
- **Hand the JSON-LD to Weave.** Beacon decides which schema the page carries; Weave validates it.
- **Note UX and speed regressions for their owners** and route them rather than fixing them here.

## Useful greps

Run these against `enforcement.sourceGlobs` before trusting a manual pass. Adapt the path/pattern for the project's actual framework and heading-class convention.

```bash
# Duplicate H1 across the codebase (paste the H1 string)
grep -rn 'YOUR_HEADING_CLASS' src | grep -i "{H1 STRING}"
# Double-URL bug: the site's own base URL accidentally prepended onto an already-absolute asset URL
grep -rn 'https://[^"]*https://' src
# Bare /path/ canonicals (should always be absolute)
grep -rn 'canonical' src | grep -v 'SITE_URL\|http'
# "click here" / "learn more" anchors
grep -rni '>click here<\|>learn more<' src
# Em dash / en dash in indexable fields
grep -rn "—\|–" src
```

The double-URL bug is worth knowing by name even if the grep above needs adapting: a base-URL prefix meant for relative paths gets applied to a URL that's already absolute (a CDN asset, an already-fully-qualified canonical), producing a broken doubled-protocol string that's easy to miss visually but fails every crawler that tries to fetch it.

## Output

| Item | Status | Fix | Owner |
|---|---|---|---|

## Guardrails
- Never let two pages share an H1, title or description.
- Never sign off a page missing a title, a description, the direct answer, or the schema its type requires.
- Never leave a page with fewer than two inbound links, or more than three clicks from home.
- Never let a slot state a fabricated fact. Trace it or ASK.
- Never write an em or en dash in an indexable field.
- Never pass a heading that markets to the search engine instead of the human.

## Done definition
All nine sections pass, plus the inviolable-rules check. JSON-LD routed to Weave. No fabricated fact or forbidden claim in any slot. UX and speed regressions routed. Findings logged. Every SEO-affecting change gets its ledger row via `/seo-log`.
