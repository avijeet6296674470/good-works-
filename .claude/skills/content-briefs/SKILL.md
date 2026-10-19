---
name: content-briefs
description: The repeatable monthly brief generator for the content programme. Mines the search-console snapshots once the site is live (pre-launch it draws from the project's content pillars), CROSS-REFERENCES every candidate against the live pages and the keyword map to classify NEW (a genuine gap) against REFRESH (an existing page that already earns impressions but under-performs), and produces fully self-contained, writer-ready briefs. Owned by Prospector; orchestrates Beacon for slots, Weaver for internal links and Marlowe for voice, titles and FAQ copy. Auto-fires on "content briefs", "blog topics", "what should we write about next", "next N posts", "writer-ready briefs".
---

# /content-briefs: repeatable writer-ready briefs

The content engine of the monthly programme, runnable on its own. Turns demand evidence into briefs **a writer can execute from the file alone**, which is the whole test: if the writer has to ask a question, the brief is not finished.

Owned by **Prospector**, orchestrating Beacon, Weaver and Marlowe. Everything reads from and writes into `enforcement.seoDataDir` (from `brand.config.json`).

If the content route does not exist yet, briefs queue in the calendar with a status saying so. The point is that this runs **every month and self-tracks**, not as a one-off.

## The pillars
Every topic belongs to exactly one pillar, and **every pillar feeds a money page.** Take the pillar set from the project's content plan and the vertical overlay's page archetypes. A pillar with no money page behind it produces traffic that goes nowhere, which is the most common way a content programme quietly fails while looking busy.

Seasonal pillars are scheduled six to eight weeks ahead of the date, against **this market's** calendar rather than a generic one.

## The one lesson that governs every pick: NEW against REFRESH

**Before recommending anything net new, check whether an existing page already targets that query.**

A page with high impressions and low click-through is a REFRESH opportunity that almost always beats net-new content: it already earns the impressions and simply fails to convert them into clicks. And the site's existing pages already own the big commercial intents, one primary keyword per URL. **A new piece must never compete with an existing page for its own keyword.** It supports it.

Never propose net new for a query an existing page already owns.

## Steps

### 1. Mine demand (Prospector)
Post-launch: load the newest snapshot and pull candidates from five seams: question and informational queries, striking distance at positions 5 to 20, impression-with-no-page gaps, seasonal spikes six to eight weeks ahead, and high-impression low-click-through, which is the refresh goldmine.

Pre-launch, where no data exists and **none may be invented**: draw from the pillars, the keyword map's secondary columns, and real volume data. **Mark each candidate's evidence source honestly**, because a candidate labelled with its source can be challenged and one without a source cannot.

### 2. Cross-reference the live pages
For EVERY candidate, before it becomes a brief:
- Check the live sitemap and, once it exists, the content index. Spot-check which URL currently ranks for the query.
- Cross-check the keyword-ownership table. **No piece may take a page's primary keyword.**
- Apply the high-impression low-click-through rule. If an existing page already targets the query, classify it REFRESH, **keep the existing URL to preserve earned authority**, and route it to `/content-refresh`.
- Only queries with no existing owner become NEW briefs.

### 3. Produce the top N fully self-contained briefs
Every fact, keyword, link and rule stated inline. The structure:

1. **Status**: NEW, or REFRESH plus the exact existing URL. Keep it; do not create a new slug.
2. **Working title plus three alternative H1s**, all keyword-forward, none template-shaped, with the pillar named.
3. **Keywords**: primary and secondary, **each with its evidence and that evidence's source.**
4. **Search intent and who the reader is**, from the audience in `BRAND-TRUTHS.md` and `market`.
5. **Why this topic**: the data-backed rationale, or the named gap.
6. **Target word count.**
7. **The full heading outline.** It MUST include a direct-answer opening of 40 to 60 words that stands alone, question-format headings where a real search asks one, and a closing FAQ block.
8. **Must-include facts**: the verified block, ONLY from `BRAND-TRUTHS.md`. The writer uses only these. **Anything not traceable is written as "confirm with client", never guessed**, because a guessed fact in a brief becomes a published fact.
9. **The internal links table**: outbound with anchor and destination, always including the pillar's money page, plus suggested inbound links from existing pages. **No link plan means the piece does not ship**, because orphans do not rank.
10. **Meta**: title within 60 characters, description within 155.
11. **Schema**: the article type plus an FAQ block with the exact on-page questions and answers. Nothing from `truth.forbiddenClaims`.
12. **CTA guidance**, pointing at the primary conversion or the enquiry path.
13. **Image guidance**: all imagery through the creative panel and the single provider, people per `imagery.peopleTreatment`, all in-image text specified verbatim from the approved set.
14. **Voice and compliance**: reproduce the lint rules inline. No dashes, no machine-writing vocabulary, no search-spam patterns, no fabricated proof, names per `identity.nameRule`, humour within its policy.

### 4. Anti-hallucination
Every price, duration, capacity, hour and address traces to `BRAND-TRUTHS.md` or a fact file. **Never trust a research document over the truths file.** Any untraceable fact is marked for confirmation. Savings use honest arithmetic, recomputed rather than repeated.

### 5. Save, calendar, log
Save each brief to a dated folder with a per-batch readme carrying the rationale and the new-against-refresh split. Append each as a calendar row. Log the batch via `/seo-log` with a hypothesis, a target metric and a measure-on date per brief.

## Who does what
- **Prospector** leads: mines the seams, makes the new-against-refresh call, routes refreshes.
- **Beacon**: keyword ownership and the on-page slots; validates no cannibalisation.
- **Weaver**: the internal-link plan per brief.
- **Marlowe**: voice, the title options and the FAQ copy; lints and runs the gates.

## Done definition
- [ ] Demand mined, with every source named.
- [ ] EVERY candidate cross-referenced against the live pages and the keyword map, and classified.
- [ ] Refreshes routed; only unowned queries became new briefs.
- [ ] The top N briefs written in the full structure, plus a batch readme.
- [ ] Every fact traced or marked for confirmation.
- [ ] Each brief on the calendar; the batch logged to the ledger.
