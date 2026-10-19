---
name: migration-audit
description: Use when planning or validating the launch URL-migration for the site, the single most dangerous SEO event because this build replaces the live legacy site at `identity.legacyDomain`. Covers the GSC-driven 301 map, URL-scheme cleanup, canonical alignment, robots/noindex/sitemap governance, backend de-indexing, WordPress blog-URL preservation, and the go-live cutover. Bridge leads (data-driven, treats every mapped redirect as a hypothesis to disprove), pulling in Beacon (on-page slots and anchors), Weave (schema url and @id), Cortex (the redirect layer this stack uses), Pulse (redirect latency). REQUIRES Google Search Console page-level data before finalizing any redirect. Auto-fires on "redirect", "301", "migration", "canonical", "robots", "sitemap", "noindex", "de-index", "GSC", "launch cutover", "will this hurt SEO".
---

# /migration-audit: Launch SEO-safety pass (Bridge)

The one job: move the site to its new URLs (and eventually onto the production host, replacing the legacy site at `identity.legacyDomain`) without losing a single point of search equity, and keep the backend out of Google forever. A green build is not safety. Runtime status-code proof is. Owned by **Bridge**.

## Canonical grounding (read first)
- `brand.config.json`: `identity.legacyDomain`, `urls` (the canonical form and the trailing-slash policy), `stack` (where redirects are configured on this stack).
- `docs/CODE-CONVENTIONS.md` and `docs/BANNED-WORDS.md` (no em or en dashes, including in a config comment).
- `docs/BRAND-DIRECTION.md` and `docs/BRAND-TRUTHS.md` (the offerings, so a redirect target maps to the right new page rather than a plausible-looking one).
- The site-architecture document and the current-site inventory (the new URL scheme, and the old URLs that seed the map. **If either is missing, note it and drive the scheme from the data, never from a guess.**)

## Gate 0: do we have the ground truth? (STOP if not)
Do NOT finalize a redirect map from folder structure or a draft alone. Confirm you have, or explicitly request:
- [ ] **GSC Performance to Pages export, 6 months, all queries** (URL, clicks, impressions, position) from the live legacy site at `identity.legacyDomain`. The list of URLs that actually matter.
- [ ] **GSC Index to Pages** report (Indexed plus the "Why not indexed" buckets).
- [ ] **Full old-site URL inventory** (a crawl export or the live `sitemap.xml`) with status codes and existing redirects. Run `/site-crawl` against the live host if no export exists.
- [ ] **Backlink export** (GSC Links or a backlink tool). Old URLs with external links are mandatory 1:1 redirects.
- [ ] **The WordPress blog URL list.** Every ranking post URL is high-value and preserved 1:1 or redirected to its exact new equivalent.

If any is missing, name it and ask. A confidently-wrong map is worse than waiting for the data.

## 1. Reconcile the draft map against the data
For every old URL that has traffic OR links:
- Confirm the mapped target exists, returns **200**, and is **indexable** (not noindex, blocked, or redirected).
- Confirm it is the **closest true equivalent**, never a lazy home-redirect (Google treats a bulk-to-home redirect as a soft-404 and drops the equity).
- Flag every old URL with **no clean target** as an explicit decision item (nearest parent hub, content to rebuild, or an intentional 410). Never silently send it to `/`.
- Drop pure-noise URLs (no traffic, no links, no equivalent) from the 301 map deliberately and document the drop.

## 2. De-chain, de-loop, 301-normalize
- **Relative, host-agnostic paths only.** Every `source` and `destination` is a path (`/old/` to `/new/`), never a full URL with a host, so the map survives the move from staging to the production host with zero rework. Grep the map for `http` and `://`. There should be none.
- Every entry is a **single 301 hop** (`permanent: true` in the Next.js `redirects()`). Grep the map: no target may also be a source (a chain). Zero loops.
- Align **trailing-slash and host** so canonicalization happens once, consistent with the `trailingSlash` config and any host-normalizing middleware. Do not create a competing rule.
- Decide query and anchor handling explicitly.
- **301 only**, never 302 or 307. A 302 does not pass equity durably.

## 3. Canonicals, sitemap, robots (crawl hygiene)
- Every indexable page: an absolute self-referencing canonical (`${SITE_URL}/path/`), never pointing at a redirected or noindex URL.
- The sitemap route: ONLY canonical, 200, indexable public URLs. No redirected, noindex, or backend URLs (a redirected URL in the sitemap is a mixed signal and a crawl-budget leak).
- The robots route: correct `Disallow` for `/admin` and all of `/api` (plus any preview, catalog, or auth surface) and one valid `Sitemap:` line that flips correctly with the indexing flag. Staging stays noindex forever; only the production host opens to crawlers.

## 4. Backend de-indexing (permanent seal)
- The edge or middleware layer keeps `/admin` and all of `/api` (plus any preview, catalog, or auth surface) on `X-Robots-Tag: noindex, nofollow` even after the indexing flag is on. Prove the coverage is total.
- Add a **guardrail** so a newly-added backend route cannot silently become indexable (a check that any non-public route group carries noindex).

## 5. Implement (with Cortex)
- Redirects in the redirect configuration (or the edge) plus any host or slug logic in the edge or middleware layer.
- Keep it fast (Pulse): prefer config or edge redirects over per-request origin work.

## 6. Prove at runtime (the real gate)
- **Curl every source URL** and assert `301` plus the exact `Location`, and that the Location returns `200` in ONE hop. Script it across the whole map and save the pass/fail table.
  ```bash
  # for each source path S with expected target T against $HOST:
  curl -sSI "$HOST$S" | awk 'BEGIN{IGNORECASE=1}/^HTTP/{c=$2}/^location:/{l=$2}END{print c, l}'
  ```
- `curl -I` a backend path and a public path with the indexing flag both on and off. Confirm noindex where expected.
- Validate `sitemap.xml` contents (all 200 and indexable) and `robots.txt`.

## 7. Cutover and monitoring
- Launch checklist: point `SITE_URL`, canonicals, OG, schema, and the sitemap at the production host; turn the indexing flag on for production only; the full map live; the backend still sealed; the sitemap submitted in GSC; a Change-of-Address filed if the host changes; the old property retained to watch.
- Post-launch: watch GSC Coverage and crawl stats for 404 spikes, redirect errors, soft-404s, and "Discovered not indexed". Fix within the week.

## Inputs
- The GSC page-level export, index report, old-site URL inventory, backlink export, and WordPress blog URL list (Gate 0).
- The draft redirect map and the new URL scheme (from the site-architecture document, if the project has one).
- The live host to curl against.

## Output
1. A validated redirect table: `source | 301 target | status proof | source evidence (clicks/links) | notes`, with every no-clean-target URL flagged as a decision.
2. A crawl-hygiene report (canonicals, sitemap, robots, backend-noindex): pass or fix.
3. The runtime curl-proof table.
4. The cutover checklist plus the post-launch monitoring plan.

## Guardrails
- Never finalize a redirect map without the GSC page-level data to validate it against. ASK for it.
- Never bulk-redirect old URLs to the homepage (soft-404 equity loss).
- Never ship a chain, a loop, or a 302 where a 301 is meant.
- Never hardcode a host into a redirect `source` or `destination`.
- Never let a WordPress blog URL that ranks 404 at launch.
- Never let `/admin` or `/api` be reachable and indexable after go-live.
- Never write an em dash in a config, a note, or a redirect comment.
- Bridge blocks launch on anything not provably safe, and shows the evidence.

## Boundaries
Beacon owns on-page slots (H1, meta, anchors, internal links) and supplies the target intent when a redirect alters a link. Weave owns the JSON-LD `@id` and `url` graph when a URL changes. Cortex implements the redirect configuration and middleware. Pulse owns redirect latency (edge versus origin). Bridge owns URLs, status codes, canonicals, robots, sitemaps, and the migration itself.
