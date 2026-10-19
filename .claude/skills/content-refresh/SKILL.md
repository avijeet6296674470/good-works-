---
name: content-refresh
description: Refresh a decaying or stale page. Marlowe rewrites and expands the copy, Beacon validates the SEO slots survive, the REAL freshness date is bumped (never a dynamic today), and the change is logged with a hypothesis. Use when a page is losing organic clicks, has gone stale, or the decay vein flagged it. Auto-fires on "refresh this page", "content decay", "update stale content", "this page is losing traffic", "freshness update".
---

# /content-refresh: refresh a decaying page

The fix for content decay: a page that ranked and slid, or went stale, gets a real content pass. **Not a cosmetic date bump.** The freshness date only moves when the content actually changed.

Usually surfaced by the decay vein in `/seo-opportunities` once post-launch data exists, or by a change to `BRAND-TRUTHS.md` (a price update, new hours) that makes a page factually stale **right now**. The second trigger works pre-launch too, and it is the more urgent of the two, because a wrong price on a live page costs money immediately.

Owned jointly: Marlowe for the text, Beacon for the slots.

## Steps

### 1. Diagnose the decay
Before rewriting, know **why** the page slid. Lost rankings on which queries? Stale facts? A competitor overtook it? A results-page feature change?

**Seasonal pages decay on the calendar**, and the refresh there is a re-dating for the next cycle rather than a rescue. Misreading the cycle as failure means rewriting something that was about to recover on its own.

**Do not rewrite blind.** The diagnosis becomes the refresh hypothesis, and a refresh with no hypothesis cannot be graded next month. Pre-launch, the only valid trigger is a factual change, and that change is the diagnosis.

### 2. Rewrite and expand (Marlowe)
- Facts only from `BRAND-TRUTHS.md` and the fact files. Lint against `docs/BANNED-WORDS.md`.
- **Address the diagnosed cause specifically**: refresh the stale facts, deepen the thin section, answer the striking-distance query, tighten the wordy passages. A general polish does not fix a specific decay.
- Default trim on wordy copy is about 30 percent, and it is almost always available.
- Voice per `voice` in the config, human register, no machine tells, no dashes, no search-spam patterns, nothing fabricated. Run `/humanize` and `/ai-check` before ship.

### 3. Validate the slots survive (Beacon)
- One semantic H1 with the keyword intact, correct heading order, no new duplicate title, H1 or description anywhere on the site.
- Title within 60 characters, description within 155, primary keyword intact and front-loaded per the ownership map.
- **The direct-answer block survives the rewrite.** It is the easiest thing to lose in an expansion, because expanding usually means inserting before it.
- Every fact traces to a source. A refresh never introduces a fabricated value and never introduces anything from `truth.forbiddenClaims`.
- Internal links and anchors still valid in the project's URL form, and alt text present on any new image.
- Route schema changes to Weave, keeping the FAQ array and its markup word-identical, and any weight impact to Pulse.

### 4. Bump the REAL freshness date
The freshness signal moves **only** because content genuinely changed in this pass. **Never a dynamic today, never a cosmetic bump on a page you did not edit.**

A dynamic date makes every page permanently "updated today", which is both untrue and, once noticed, a reason to discount every date on the site. A false freshness date is a trust regression that costs more than the freshness was worth.

### 5. Log it
Append a row via `/seo-log`: the type, the pages, the hypothesis (what the decay cause was and what the refresh should recover), the target metric, and a measure-on date. Mark anything staged but not pushed.

## Truth and safety
- Freshness date equals a real content pass only.
- No fabricated fact. Where a research document disagrees with `BRAND-TRUTHS.md`, the truths file wins.
- No em or en dashes. Banned words and search-spam patterns enforced. Names per `identity.nameRule`.
- **URL slugs never change in a refresh.** Keeping the URL is the entire point: it preserves the authority the page already earned, which is what makes a refresh cheaper than a new page.

## Done definition
- [ ] Decay cause diagnosed from real data or a real factual change, not guessed.
- [ ] Copy rewritten and expanded, lint clean, gates passed, tightened where wordy.
- [ ] Slots validated: heading structure, meta lengths, keyword, direct answer, links, alt, no fabricated fact.
- [ ] Freshness date bumped only because content actually changed.
- [ ] A ledger row appended with a hypothesis, a target metric and a measure-on date.
