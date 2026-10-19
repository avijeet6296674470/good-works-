---
name: crawl-integrity
description: Use to scan the WHOLE site for invisible-until-it-hurts problems: pages returning 200 but serving broken, empty or error content (soft 404s), uncacheable pages, content that only renders after JavaScript, thin or duplicate pages, missing canonical, H1, meta or JSON-LD, noindex leaks on real pages, and stale hashed build assets that 404. These do not show when a human clicks around, but a crawler indexes them as real pages and they quietly drag site quality down. Cortex leads the crawl and render layer, routing on-page slots to Beacon, schema to Weave, cacheability to Pulse. Runtime proof only.
---

# /crawl-integrity: the full-site render and crawl scan

**The one job: catch the pages that lie to you.**

A page returning 200 while serving broken, empty or error content is a soft 404. A crawler indexes it as a real page, concludes the site is low quality, and demotes it. You do not see it clicking around, because you click the working one. This skill scans EVERY URL rather than a sample.

Runtime proof only, because a green build says nothing about what a crawler actually fetches.

## Targets and the rendering model
Read `stack.rendering` before interpreting anything. **The rendering model determines where a fix lives.** With plain server rendering, wrong HTML means wrong route code, and there is no cache to purge. With incremental or cached rendering, a stale page may be a cache artefact rather than a code defect, and treating one as the other wastes a day in either direction.

## Canonical grounding
- `brand.config.json`: `urls` (the canonical form, so a slash mismatch is detectable), `stack`, `enforcement.sourceGlobs`.
- `docs/CODE-CONVENTIONS.md`: the SEO invariants.
- `docs/BRAND-TRUTHS.md`, so a thin page is judged against real intent and no fix introduces an untraceable fact.

## The taxonomy: the invisible-until-it-hurts classes

1. **Soft 404 or error shell.** A 200 status plus error, empty or fallback content: a not-found message in the body, a blank main region, a raw undefined or object string, a rendered error boundary. *Cortex.*
2. **Application-shell leak.** Routes that are noindex by design missing their directive, or an API error rendering as a 200 content page. Any shell that is legitimately in the sitemap must render a real, indexable page. *Cortex, without touching frozen logic.*
3. **Uncacheable or slow rendering.** A page sending no-store, or rendering so slowly the vitals drag. *Pulse and Cortex.*
4. **Content invisible without JavaScript.** Primary content or JSON-LD missing from the raw served HTML and appearing only after hydration. **This is the core gate**: request each URL and expect the full page including the JSON-LD. *Cortex and Beacon.*
5. **Thin, duplicate or cannibalising.** Near-empty pages, or two URLs sharing a title, H1 or canonical. *Beacon.*
6. **Missing SEO essentials.** No H1 or more than one, no title, no absolute canonical in the project's form, no description, JSON-LD absent or client-injected. *Beacon for slots, Weave for schema.*
7. **Indexing-directive leak.** A real page accidentally noindexed or disallowed. **And the inverse trap: a page that is both noindexed and disallowed will never have its noindex read, so it can stay indexed forever.** *Cortex.*
8. **Redirect and slash integrity.** The non-canonical URL form must resolve to the canonical one in a single hop, with no chains and no 200 at both URLs. *Cortex.*
9. **Stale hashed build assets.** After a deploy, every content-hashed asset referenced in the served HTML must resolve. A 404 means the deploy shipped HTML and assets out of sync, which is an atomicity failure rather than a code bug. *Cortex and Pulse.*

## How to run it
1. **Full-site crawl** of every sitemap URL. Reuse `/site-crawl` to enumerate and pull per-URL signals. Flag: non-200, soft-404 markers in the body, a thin body, missing title, H1, canonical or JSON-LD, and no-store headers.
   ```bash
   # per URL against $HOST:
   H=$(curl -sSIL --max-time 25 "$HOST$U"); B=$(curl -sSL --max-time 25 -A 'Mozilla/5.0' "$HOST$U")
   echo "$H" | grep -i '^HTTP\|^cache-control'
   echo "$B" | grep -iqE 'not found|no data|please re-seed|\$NaN|\[object Object\]' && echo "SOFT404: $U"
   ```
   **Keep a marker list and extend it whenever a new failure phrase is discovered**, so the scan gets better rather than staying at whatever it caught first — the regex above is a starting set, not a fixed one.
2. **The no-JavaScript check.** For every URL, fetch plainly and require both the key page copy and the JSON-LD in the raw HTML. Confirm exactly one H1. Content present only after hydration is class 4, and the fix is server-side.
3. **Check the hashed assets resolve.** Grep the served HTML for asset references and request each. Any 404 is class 9.
4. **Slash and robots sweep.** Confirm the non-canonical form redirects in one hop, robots matches the spec and lists the sitemap, and the routes that should be noindexed are.
5. **After any deploy**, re-run against production, and interpret failures according to the rendering model rather than assuming a cold cache.

## Output
A table: URL, class, owner, fix. **Rank soft 404s and JavaScript-invisible schema first**, because they hit ranking hardest and are the least visible. A page is clean only when its raw-HTML fetch is a real, complete, indexable page with its JSON-LD inline. Log fixes via `/seo-log`.

## Done definition
- [ ] The full crawl ran against the target host and every flagged URL is triaged, fixed or an explicit accepted decision.
- [ ] No soft 404 reachable at 200, no unexpected no-store, and SEO essentials plus server-rendered JSON-LD present on every page, proven by request rather than by developer tools.
- [ ] Every referenced hashed asset resolves.
- [ ] Non-canonical URL forms redirect in one hop, the right routes are noindexed, robots and sitemap correct, and nothing is both noindexed and disallowed.

## Guardrails
- Runtime proof only. A green build is never evidence of what a crawler fetches.
- Never touch frozen logic to fix a crawl finding. Meta and robots wrappers only, each as its own reviewed change.
- Never write an em or en dash in the report.

## Boundaries
Beacon owns on-page slots and thin or duplicate content. Weave owns JSON-LD completeness. Pulse owns cacheability and vitals. Cortex owns the crawl, the render layer, the robots, sitemap and redirect code, and routes each finding to its owner.
