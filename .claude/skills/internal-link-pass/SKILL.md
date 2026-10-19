---
name: internal-link-pass
description: Weaver's site-wide internal-link sculpting pass. Detect orphan pages, wire the hub-and-spoke clusters, flow link equity to the conversion path, and apply the anchor-text plan (descriptive and varied, anchors from the keyword map, never exact-match-stuffed). Traces the real link graph in the code, not the sitemap. Every change logged. Auto-fires on "internal link pass", "link sculpting", "orphan pages", "topic clusters", "anchor text plan", "link equity".
---

# /internal-link-pass: site-wide link sculpting

Shapes the whole-site link graph so authority flows to what converts. **Owned by Weaver.** The whole-site graph is Weaver's; the per-page slot is Beacon's.

This pass runs on the current link graph **without needing any external data**, which makes it one of the few genuinely useful SEO passes available pre-launch.

## Steps

### 1. Build the current graph from the code, not the sitemap
Trace real link elements in the source. **Separate the edge types**: navigation, footer and CTA bands are structural, while contextual body links carry the real equity. Averaging them hides the problem, because a page whose only inbound links are sitewide chrome is functionally an orphan whatever the raw count says.

Do not infer the graph from the sitemap. The sitemap is a list of what exists, not a map of what points where.

### 2. Detect orphans and under-linked money pages
- **Orphans**: fewer than two internal links pointing in, weighting contextual links heaviest. Policy pages and galleries are the usual suspects.
- **Under-linked money pages**: the conversion URLs and the pages that feed them, not receiving their share of contextual inbound links.
- **The three-click rule**: every URL reachable from the home page within three clicks.

### 3. Wire the clusters
Map every page to its cluster from the vertical overlay's archetypes, and wire up and down:
- **A hub and its spokes.** Spokes link up to the hub and across to each other where a reader would genuinely go next. The hub links down to its strongest spokes.
- **The discovery hub**, the top-of-funnel entry point, linking down to every offering and across to the practical pages; offerings and segments link up to it where a visitor is still deciding.
- **The segment cluster.** Each segment page links to the offerings it sells, to any bundle page, and to the conversion or enquiry path. Segments cross-link each other **only where genuinely relevant**, not everywhere possible.
- **Any sub-brand page**, linked from every page whose story includes it.
- **Content pieces**: every piece links up to its pillar's money page and gets at least one contextual link in before it ships.
- **Breadcrumbs everywhere**, on every inner page, matching the markup Weave emits.

### 4. Flow equity to the pages that convert
Sculpt contextual links from the highest-authority pages toward the conversion URLs. **Do not over-link: roughly two to five contextual links per section**, because more dilutes each one. The conversion stays one click from every content section.

**Rebalance where a thin page hoards links a money page needs.** This is extremely common and nobody notices, because the thin page is usually in the footer.

### 5. Apply the anchor-text plan
- Anchors come from the keyword-ownership map: a link carries language matching the destination's own owned term. Never "click here" or "learn more".
- **Varied**: never the same exact anchor to one URL more than two or three times sitewide.
- Keyword-relevant but never exact-match-stuffed, and **an anchor never carries a keyword another page owns**, because that manufactures cannibalisation from the inside.
- Every href in the project's URL form.

Beacon validates each target against the map; Marlowe writes the words.

### 6. Implement and verify destinations
Add the real links in the right components and body copy. **Every link points at a 200-status, indexable page in the canonical URL form.** Never a noindexed route, never a redirect chain, never a 404. Slugs never change without approval; route any redirect need to Cortex.

### 7. Log it
Append a links-type ledger row per sculpt: the pages, the hypothesis for what the flow should move, a target metric, and a measure-on date. Update the cluster plans.

## Truth and safety
- Links only to real, indexable pages in the right URL form. No cannibalising anchors.
- No em or en dashes. Anchors lint clean, with no raw keyword chips as visible labels.
- Any fact an anchor states traces to `docs/BRAND-TRUTHS.md`.
- Every change logged.

## Done definition
- [ ] The real graph traced from the code, with structural and contextual edges separated.
- [ ] Orphans and under-linked money pages listed; the three-click rule verified.
- [ ] Cluster wiring applied, including breadcrumbs everywhere.
- [ ] The anchor plan applied, targets validated by Beacon and words by Marlowe.
- [ ] Every new link verified to a 200 indexable destination.
- [ ] Each sculpt logged with a hypothesis and a measure-on date.
