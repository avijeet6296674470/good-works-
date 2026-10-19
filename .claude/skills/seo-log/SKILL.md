---
name: seo-log
description: A quick utility that appends a single row to the SEO change ledger for any SEO-relevant change (date, change, type, pages, hypothesis, metric, measure-on date). This is the "nothing escapes the ledger" primitive, and every skill that ships an SEO change ends by calling it. Auto-fires on "log this change", "add to the change log", "record this seo change", "changelog entry".
---

# /seo-log: append to the ledger

The smallest and most-used utility in the programme. Every SEO-relevant change ships with a row in the file `enforcement.ledgerFile` names, which is the spine of the whole system.

**If it is not in the ledger, it did not happen.** Not as a slogan: in three months nobody will remember why a title changed, and an ungraded change teaches nothing.

## What counts as SEO-relevant
Meta title or description, H1, canonical, schema, internal links, visible copy, freshness date, redirects, robots or indexing directives, sitemap, and off-page work (business profile, citations, links). If a change touched any SEO surface, it gets a row.

## The row shape
Rows group by month, newest at the top:

`Date · Change · Type · Pages · Why / hypothesis · Metric · Measure on · Result`

- **Date**: the real ship or stage date.
- **Change**: one precise sentence of what changed.
- **Type**: one of `technical`, `on-page`, `schema`, `content`, `links`, `freshness`, `off-page`, `infra`.
- **Pages**: the affected URLs or the scope.
- **Why / hypothesis**: what you believe will happen, and why. **A change with no measurable hypothesis is a guess.** Do not log it as done; give it a hypothesis first, or admit it was a preference.
- **Metric**: the single number this should move. **Pre-launch there is no traffic data**, so the metric is a verifiable state instead, such as a valid rich result in the testing tool, or indexation within a stated window. Never an invented traffic number.
- **Measure on**: the grading date. **For pre-launch rows the clock starts at launch, not at commit.** Write it launch-relative if the date is not fixed.
- **Result**: blank, or marked as staged, until it ships and is graded.

## Steps
1. Read the current ledger and find this month's table, creating a new month section if the month rolled over.
2. Add the row at the top of that table, filling every column.
3. If the change is committed but not deployed, mark it staged.
4. If it came out of the backlog, update or remove the backlog item. Shipped items move to the log.

## Truth and safety
- Real dates only, never a placeholder and never a dynamic today for a freshness claim.
- **Hypothesis and metric are mandatory.** No ungradable "did stuff" rows, because those are what turn a programme into an invoice.
- No fabricated numbers. Post-launch they trace to real data; pre-launch, name the verifiable state instead.
- No em or en dashes.
- Brand facts in any row text trace to `docs/BRAND-TRUTHS.md`.

## Done definition
- [ ] A complete row added to the top of the current month's table.
- [ ] Hypothesis, metric and measure-on date present, with pre-launch rows using launch-relative dates.
- [ ] Any corresponding backlog item updated or removed.
