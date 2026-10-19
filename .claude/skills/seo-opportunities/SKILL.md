---
name: seo-opportunities
description: Prospector's focused opportunity-mining pass. Reads the search-console and analytics snapshots post-launch and mines five veins: striking-distance keywords at positions 5 to 20, low-click-through high-impression title and meta rewrites, content decay, keyword cannibalisation, and new topics from search demand. Pre-launch it mines the keyword map, the citation gaps and the content pillar queue instead. Returns a list ranked by impact times confidence over effort, feeding the backlog and the content calendar. Auto-fires on "keyword opportunities", "striking distance", "what to write about", "content decay", "cannibalization", "ctr gaps".
---

# /seo-opportunities: focused opportunity mining

The opportunity engine of the monthly programme, runnable on its own. **Owned by Prospector.**

It reads the snapshots in `enforcement.seoDataDir` (the SEO data directory from `brand.config.json`), cross-references the keyword-ownership table at `urls.keywordMapFile` (one primary keyword per URL, no two pages competing), and writes opportunity rows into the backlog and new-topic rows into the content calendar.

**Pre-launch state.** Before launch and verification there is no search data, **and none may be invented**. Mine what exists instead: coverage gaps against the keyword map, the citation gaps from `/local-seo-audit`, the findings from `/ai-visibility-audit`, and the content pillar queue. **Say plainly which veins are dormant until data arrives**, rather than producing a thin list that looks like the real thing.

## The five veins

### 1. Striking distance, positions 5 to 20
Queries already ranking on or just off page one, one on-page push from real gains. **The highest-return work available**, because the page already has authority and needs a nudge rather than a rewrite. Rank by impressions multiplied by the position gap. Each routes to Beacon for the slot and Marlowe for the text.

### 2. Low click-through, high impression
Pages earning impressions but converting them below what their position should yield. **Pure upside with no new content required.** Flag the page, the query, and current against expected. Marlowe rewrites the title and description, Beacon confirms the keyword survives.

### 3. Content decay
Pages losing clicks month over month, which needs at least two months of snapshots to trend. Diagnose the cause: lost rankings, stale facts, a competitor, a results-page feature change. Usually a refresh rather than a new page, so route to `/content-refresh`. Rank by clicks lost.

**Seasonal pages decay on the calendar, not from weakness.** Do not misread the cycle and rewrite something that was about to recover.

### 4. Keyword cannibalisation
Two or more URLs competing for one primary keyword, visible as a flip-flopping ranking URL. **Watch the structural risk pairs**: a discovery hub against a segment page, a category hub against its own spokes, a bundle page against the hubs it draws from. These are predictable from the site's own architecture, so check them even without a signal.

Resolve by consolidation, re-pointed internal links or canonicals: Beacon for ownership, Cortex for redirects, Weaver for the link tangle.

### 5. New topics from search demand
- **Impression with no page**: queries earning impressions with nothing dedicated to them.
- **Rising queries**: trending up across trailing snapshots, watched six to eight weeks ahead against this market's own calendar.
- **Question queries**: the answer-engine and FAQ seam, and the most under-exploited of the three.

Each becomes a calendar row with intent, pillar and an internal-link plan. **No internal-link plan means it does not ship**, because orphans do not rank.

## Ranking discipline
**Never dump an unranked list.** Each opportunity carries real evidence with its source, the move, the owner, the expected metric and rough effort. Sort by impact times confidence over effort.

The team will almost always propose the long-form post. A striking-distance term at position 6 with a one-line fix beats it every time.

## Truth and safety
- No fabricated data. Every figure traces to a snapshot; missing or pre-launch data gets named as such.
- Brand facts trace to `docs/BRAND-TRUTHS.md` and the fact files.
- Vocabulary bans apply to any proposed topic or title.
- No em or en dashes.

## Logging
This pass mines and queues; it does not ship page changes itself. Opportunities go to the backlog and topics to the calendar. **When an opportunity is later shipped, that change is logged with a hypothesis and a measure-on date**, which is how the prediction gets graded next month and how the mining stays honest.

## Done definition
- [ ] All five veins mined against the latest snapshots, or the pre-launch substitutes mined and the dormant veins named.
- [ ] The keyword map checked for cannibalisation and existing coverage before proposing anything net new.
- [ ] A ranked list produced, each item with evidence, owner, expected metric and effort.
- [ ] Rows written to the backlog and the calendar.
- [ ] The list handed to Almanac, and each item routed to its build owner.
