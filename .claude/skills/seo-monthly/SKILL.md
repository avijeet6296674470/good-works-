---
name: seo-monthly
description: The master monthly SEO run. Orchestrates the full cadence: pull data post-launch, grade last month's changes, sweep technical health, mine opportunities, plan the work, execute, and write the monthly report. Almanac leads, routing crawl work to Cortex, schema to Weave, opportunities to Prospector, links to Weaver and copy to Marlowe. Output: a written monthly report, a re-prioritised backlog, and ledger entries. Auto-fires on "monthly seo", "run the seo month", "seo report", "seo status", "monthly run", "seo cadence".
---

# /seo-monthly: the master monthly run

The recurring, compounding loop that **is** the SEO programme. Run on or around the first. This orchestrates every specialist through the seven-step cadence and ends with a written report and a fully updated ledger.

Everything reads from and writes to the SEO working root (`enforcement.seoDataDir` for snapshots, `enforcement.ledgerFile` for the change log, both under the same internal tree). **The client's external report is hand-produced from the internal one**; they never see the machinery.

**Owned by Almanac.** It reuses `/seo-audit`, `/crawl-integrity`, `/site-crawl` and `/performance-pass` as technical limbs, and routes mining to `/seo-opportunities`, sculpting to `/internal-link-pass`, refreshes to `/content-refresh` and the local layer to `/local-seo-audit`.

## Pre-launch mode
Until the site is live and verified there are no snapshots, **and no number may be invented to fill the gap.** The run degrades gracefully:
- Step 1 becomes "confirm what data exists", which is usually none. Note it.
- Step 2 grades launch-verifiable hypotheses (rich-result validity, crawlability, ledger completeness) instead of traffic.
- Steps 3, 5 and 6 run at full strength. Technical health, the backlog and execution do not need traffic data.
- Step 4 mines the keyword map and the local and answer-engine findings instead.
- The first post-launch actions: verify the search console, submit the sitemap, and baseline-snapshot everything.

## Before you start
Re-read `docs/BRAND-TRUTHS.md` and the SEO conventions. Open last month's report, the current ledger and the backlog. **Create missing programme files rather than skipping steps.**

Confirm which data sources are live. If one is not wired, pull what you can manually and **note the gap. Never fabricate a number.**

## The seven steps

### 1. Pull data
Snapshot into the dated data directories. Every figure that lands in the report traces to a snapshot. Missing data is marked as missing, never as a plausible figure.

### 2. Grade last month, which OPENS the report
For every ledger row whose measure-on date has arrived: state the hypothesis, the baseline, the actual, and a verdict of worked, no effect, or regressed. **Write the honest result back into the row.**

A change never graded is a guess. This section is non-negotiable, and putting it first rather than last is deliberate: **a report that opens with results cannot quietly become a report about activity.**

### 3. Technical health
- **Cortex**: `/crawl-integrity` and `/site-crawl` across every sitemap URL.
- **Weave**: `/schema-audit` for rich-result errors, graph integrity and FAQ parity.
- **Pulse**: `/performance-pass`, especially the conversion path and hero images.

Collect every finding into the backlog with an owner.

### 4. Mine opportunities
Hand to **Prospector** via `/seo-opportunities`. Returns a list ranked by impact times confidence over effort.

### 5. Plan the work
- Re-prioritise the backlog with the new findings and opportunities.
- Wire new pieces into the calendar with their internal-link plan: Prospector supplies the topic, Weaver designs the links.
- Refresh the keyword map's position column from the snapshot, or leave it honestly empty.

**5a. The content pipeline.**
- **Produce next month's briefs** via `/content-briefs`.
- **Track prior briefs through the pipeline**, advancing every calendar row through its lifecycle. Anything published past its measure-on date gets graded in step 2.
- **Route under-performers to refresh** rather than to a net-new piece. Last month's misses become this month's refreshes, and that loop is what stops a content programme from only ever growing.

### 6. Execute
Ship the top prioritised items with their owners: slots to Beacon, text to Marlowe, schema to Weave, routes and robots to Cortex, vitals to Pulse, sculpting to Weaver, refreshes and profile work to their skills.

**Every shipped change gets its ledger row with a hypothesis, a target metric and a measure-on date BEFORE it counts as done.** Staged but unpushed is marked as such, and the clock starts at push.

### 7. Report
Write the dated monthly report: the executive summary with impact and numbers first; the grading from step 2; the technical health snapshot; what was done this month grouped by theme; the opportunities identified, each with its backlog row; the next month plan of three to five items; and a metrics table trended against last month, with honest empty cells.

## Truth and safety
- No fabricated metric, count, ranking or quote. Every number traces to a real source or is named as missing. **Pre-launch means empty cells, not plausible ones.**
- Freshness dates trace to a real content pass, never a dynamic today.
- **Credentials never appear in chat or in a tracked file.**
- No em or en dashes. Ranges use "to".
- Brand facts trace to `docs/BRAND-TRUTHS.md` and the fact files, or you ask.

## Done definition
- [ ] Snapshots pulled, or the gap named honestly.
- [ ] Every due ledger row graded.
- [ ] Technical health run, findings in the backlog with owners.
- [ ] Opportunities mined and the link graph assessed; the backlog re-prioritised.
- [ ] The content pipeline advanced, published pieces past their date graded, under-performers routed to refresh.
- [ ] Executed items each logged with a hypothesis and a measure-on date.
- [ ] The monthly report written and the keyword map's positions refreshed or left honestly empty.
