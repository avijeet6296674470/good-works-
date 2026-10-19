# SEO change log — <FILL: BRAND NAME>

**The spine of the programme.** Every SEO-affecting change ever shipped, with a
hypothesis, a target metric and a date to measure on.

**If it is not in this file, it did not happen.**

> **Why.** Without a ledger, an SEO programme becomes an invoice: work happens,
> numbers move or do not, and nobody can connect the two. Six months in, nobody
> can say which change earned the ranking or which one lost it, so the same
> mistakes get repeated and the same wins get discovered again.
>
> The grading column is the part that makes it compound. A change with a
> hypothesis that never gets graded is just a change.

Agency-only. The client's report is produced by hand from this.

---

## How to add a row

Use `/seo-log`. It fills every column and refuses an ungradable entry.

**What counts as SEO-affecting**: meta title or description, an H1, a canonical,
schema, internal links, visible copy, a freshness date, a redirect, a robots or
indexing directive, the sitemap, and off-page work.

**Rules that keep the ledger honest:**

- **Real dates only.** Never a placeholder, and never a dynamic today for a freshness claim.
- **Hypothesis and metric are mandatory.** A change with no measurable hypothesis is a guess. Give it one, or admit it was a preference and log it as such.
- **Pre-launch rows measure from launch**, not from the commit, because the clock cannot start before there is traffic to measure. Write it launch-relative if the date is not fixed.
- **Pre-launch metrics are verifiable states**, not traffic numbers. "Valid rich result in the testing tool" is a real metric. An invented impression count is not.
- **Grade honestly.** Worked, no effect, or regressed. A ledger that only records wins is lying to the client and, more expensively, to the team.

---

## <FILL: YYYY-MM>

| Date | Change | Type | Pages | Why / hypothesis | Metric | Measure on | Result |
|---|---|---|---|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> | <FILL> | <FILL> | <FILL> | |

**Type** is one of: `technical`, `on-page`, `schema`, `content`, `links`,
`freshness`, `off-page`, `infra`.

**Result** stays empty until the measure-on date arrives, or reads as staged
until the change is actually live.

---

## Grading, monthly

Every month, `/seo-monthly` opens by grading every row whose date has arrived,
and writes the verdict back into the Result column.

**That grading opens the report rather than closing it.** A report that leads
with results cannot quietly become a report about activity.
