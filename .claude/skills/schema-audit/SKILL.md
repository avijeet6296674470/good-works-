---
name: schema-audit
description: Use for any Schema.org or JSON-LD audit: inventory a page's structured data, confirm it server-renders, map the entity @id graph against the registry, validate against Schema.org and the rich-results tester, confirm the markup matches what the page visibly shows, cross-check every marked-up fact against the truths and fact files, and produce a prioritised gap report. Weave owns the JSON-LD layer end to end. Boundary: Beacon decides WHICH schema a page carries (run /seo-audit for that); Weave validates and completes the JSON-LD itself. Output is a gap report plus fixes, not a rebuild.
---

# /schema-audit: the structured-data checklist

Weave's canonical audit. The goal is two-sided: classic rich results, and citation by answer engines. Structured data is how a machine knows, without guessing, what this business is, where, when, and at what price.

**Weave audits before building**, because the fastest way to lose is to bolt a second entity node onto a page that already references the first one. Output is a gap report plus fixes, never a rebuild.

## Canonical grounding (read first)
If anything below conflicts with a source, the source wins.
- The project's schema spec: the entity registry, the per-page blocks, the consistency rules. **Where it carries a stale value, `BRAND-TRUTHS.md` overrides it**, and anything the truths file flags as provisional stays flagged.
- `docs/BRAND-TRUTHS.md`: the only publishable facts, and the claims policy.
- `brand.config.json`: `truth.forbiddenClaims` (markup this site must never emit), `market` (currency code, address format, area served), `urls.canonicalBase`.
- `docs/CODE-CONVENTIONS.md`: server-rendered JSON-LD through the SEO helpers, entity facts referenced by `@id` rather than redeclared.
- The in-code fact files: contact details, hours, geo, socials, and every price. Byte-identical everywhere.
- `docs/BANNED-WORDS.md`: no em or en dashes in any string field either.
- `docs/CONTENT-PLAN.md` and the FAQ bank: the markup and the visible FAQ render from ONE source array and both mirror the bank word for word.
- `reference/verticals/<vertical.overlay>.md` section 4: which types belong in this vertical and which are forbidden here.

## The entity `@id` registry
The project's schema spec owns the registry: one stable `@id` per real-world entity, assigned once and **never changed after launch**, because changing an `@id` is indistinguishable from deleting an entity and creating a new one.

The typical shape: an organisation node, a website node, a logo image node, the primary business or product node that owns the contact details, and one node per distinct offering, each referenced from the pages that mention it. Per page, a page node, a breadcrumb node, and an FAQ node where applicable. All URLs in schema use the absolute canonical form.

## Boundary with Beacon
Beacon decides WHICH schema a page needs; that call lives in `/seo-audit`. Weave owns the JSON-LD underneath: completeness, validity, the graph, and server-render. Loop Beacon back in on any change that alters a visible heading, an anchor, or the keyword intent of a marked-up block.

## Inputs
The page route, to request the rendered HTML, plus the source files that emit its JSON-LD. And the fact files behind any marked-up number.

## Steps

### 1. Inventory the existing JSON-LD
List every type present in the **rendered** HTML and the file that emits it. Note any page emitting nothing.
```bash
# In the rendered HTML (what crawlers actually see):
curl -s "$HOST/PAGE/" | grep -o '"@type":"[^"]*"' | sort | uniq -c
# In source (which file emits it):
grep -rln "application/ld+json" src
```

### 2. Confirm server-render, the critical gate
The JSON-LD must be in the raw HTML the server sends, not injected after hydration.
```bash
curl -s "$HOST/PAGE/" | grep '"@type":"FAQPage"'   # repeat per type on the page
```
- PASS: the type strings appear directly in the source, inside a plain script block.
- FAIL: the schema only appears after client code runs — often visible as an *escaped* form of the same string buried inside a serialized client-hydration payload, which means it was injected client-side and is invisible to a non-JS crawler. **If a crawler has to execute JavaScript to find it, assume it will not.**

### 3. Check the graph integrity
- Each real-world entity uses its registry `@id`. No invented ids, no drift.
- No entity fully redeclared on a page that does not own it. It is referenced by `@id` instead, with no duplicated contact details, geo or hours.
- **No two nodes share an `@id` with different bodies.** This duplicate-with-drift is the single most common graph defect and it is invisible without checking for it deliberately.
  ```bash
  curl -s "$HOST/PAGE/" | grep -o '"@id":"[^"]*"' | sort | uniq -d
  ```
- The page's nodes are bound into one graph rather than floating.
- **`FAQPage` versus `QAPage`, the difference matters.** `FAQPage` is for a fixed set of the site's own questions, written once. `QAPage` is for real user-generated Q&A with a best answer, and needs the signals of one (an asker, an answer count, dates) to be honest. Using either for the other is a type mismatch that undermines rich-result eligibility even though both surfaces look FAQ-shaped.
- **Only a `Product`, `Service`, or `Event` node may carry a review or rating aggregate.** Check the node type is actually eligible before attaching `aggregateRating` — not just that the number behind it is real.
- `sameAs` carries only profiles that genuinely exist. Never invent one to fill the array.

### 4. Validate
For each type: valid against Schema.org with required properties present, and passing the rich-results tester for the target result.

Type-specific completeness follows the vertical overlay. Common requirements: the business or product node carrying name, URL, contact, image, price range and currency from `market.currencyCode`, a full address matching `market.addressFormat`, geo, and opening hours where applicable. Offering nodes carrying a provider reference, an area served, and an offer with a price from a fact file. Breadcrumbs on every inner page with positions on every item.

**Anything in `truth.forbiddenClaims` is a P0 defect wherever it appears.** Rating and review markup requires a real, verifiable corpus; there is no version of this rule that bends.

### 5. Confirm content-schema parity
- Every fact in the JSON-LD is visible on the page.
- The FAQ count in the markup equals the count rendered, word for word, both from the same array.
- **No schema for content the page does not show.** A menu with no visible menu, an offer with no visible price: that is a manual-action risk, not an optimisation.

### 6. Cross-check the locked facts
Contact details byte-identical to the fact file in every node that carries them. Prices pulled from the fact file rather than hand-typed, because a hand-typed price drifts the first time the page changes. Hours correct. Any provisional value still flagged provisional. No em or en dash in any string. Names matching `identity.nameRule`. Every value traces to a source, or you ASK.

### 7. Walk the gap catalogue
For this page type, is each applicable type present? The recurring high-value misses: an FAQ node on a page that visibly renders an FAQ, breadcrumbs on an inner page, an offer missing its currency or its conversion URL, list items missing positions, and a page node binding the page into the graph.

### 8. The answer-engine text file
If the project ships one, its facts must match the validated markup exactly. If it does not, note that and move on rather than creating one inside this audit.

## Output

| Page | Has | Missing or thin | Add (priority) | What it unlocks |
|---|---|---|---|---|

**List correctness defects first**: any forbidden markup, FAQ count drift, duplicate `@id`, contact drift, client-injected schema, or a stale fact. Then the ranked opportunity list. Implement through the existing helpers. Re-run steps 2 and 4 after the change, finish with a clean type-check, and log via `/seo-log`.

## Guardrails
- Never redeclare the root entity per page instead of referencing it.
- Never duplicate an `@id` across nodes with different bodies, and never leave a node orphaned.
- Never emit anything in `truth.forbiddenClaims`. This is the brightest line in the file.
- Never mark up content the page does not visibly show.
- Never inject JSON-LD client-side.
- Never write an em or en dash in any string field.
- Never hand-type a value a fact file already owns.

## Done definition
Every emitted type server-renders and validates. The graph matches the registry with no duplicates or orphans. Every marked-up fact is visible on the page and traces to a source. Zero forbidden markup. The gap report logged with correctness defects fixed first. Type-check clean. Anything touching a visible heading or keyword intent routed back to Beacon, and the shipped change logged.
