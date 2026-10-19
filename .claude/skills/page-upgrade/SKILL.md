---
name: page-upgrade
description: The playbook for making a dashboard report page genuinely useful — name its job, lead with the answer, add honest trends, faceted + typed filters, tabulation, drill-downs, and graceful empty/single-point/huge-data states. Use when building or upgrading any client-facing dashboard/report page (a rankings view, a search-performance view, a citations view, an AI-visibility view, or any similar data page a project has).
---

# Making a report page genuinely useful

Applies whenever this project has a dashboard-style report page — not every
website-pack project will. A page earns its place only if a busy person gets
the answer in ~5 seconds and can drill for the why. If this project has its own
page-standard, data-view, and data-lifecycle documents, they're the acceptance
criteria and this skill is how you get there; if not, treat the steps below as
the standard to establish (a shared table component, a lazy-load/pagination
convention) rather than assuming one already exists. Follow these steps in
order. The non-negotiables in the project's own `CLAUDE.md` and
`brand.config.json` `truth.forbiddenClaims` bind every step.

## 1. Name the job (one sentence)
"This page answers _____ for _____." If you can't, stop — you'll build a junk
drawer. Name the audience (agency operator vs client) and the single decision the
page supports.

## 2. Lead with the answer
- The hero is the metric/verdict that job needs, with its delta vs last period.
- Real numbers only, traceable to the payload. Missing → `—`, never a guess.
- Field data over lab data (GSC field metrics, not simulated scores).

## 3. Trend — honest, and graceful when sparse
- Plot a real series from the derived/snapshot layer. Reverse the axis where
  lower is better (position). Moving averages use measured points only — never
  interpolate to fake days.
- **Sparse states are a feature, not an afterthought.** 0 points → a clear empty
  state; 1 point → render it AS a chart (the baseline dot on real axes) with a
  caption, not a blank box or a paragraph. (This is the Rankings 1-run lesson.)

## 4. Filters that match how people think
- **Facets** (category chips): multi-select = OR within a facet, AND across
  facets. Use `values:` for multi-tag rows (a keyword with several SERP
  features). Put them on the labelled facet row.
- **Typed filters** (`textFilters`): Search-Console-style per-dimension inputs
  (Query, Page) with contains / excludes / regex.
- **Date range** for time series.
- Filters compose, reset via one clear, and always show an honest count.

## 5. Tabulation — always the project's shared table component
Sort (numeric-aware, nulls last), search, pagination with a real "X of Y",
selection + bulk actions (admin/agency only, auto-hidden for a lower role),
CSV/JSON/Excel export of the filtered view or selection, row expansion for
detail. Pass real numbers as the underlying value (formatted only for display)
so sort is numeric and export gets typed cells. Never a raw, unstyled table
that can silently truncate.

## 6. Drill-down, lazy
Heavy per-row detail loads on expand, not on page load — a parent row that
expands into its own detail rows/answers is the general shape, whatever this
project's own version of that pattern looks like.

## 7. Encode state in form
Pills, dots, severity stripes so what needs attention reads at a glance. Semantic
colour (good/warn/crit) is separate from the accent.

## 8. Verify
- `cd ui && npx tsc -b --noEmit && npm run build` — clean (strict TS).
- Curl the endpoint; the count the UI shows must equal the API array length (or
  an honest `{rows,total}` for server mode). No gap = no silent truncation.
- Sanity-check role gating: writes agency-only, client read-only.

## 9. Calibrate — don't over-build
Match investment to the page's job. A utility table doesn't need a hero; a
headline metric does deserve a real trend. Cut any chart/column/filter that
doesn't change a decision. Over-built pages bury the answer and read as generic.

## Done means
- [ ] The job is nameable and the answer leads.
- [ ] Trend renders gracefully at 0 / 1 / many points.
- [ ] Facets (OR/AND) + typed filters + date range where they help, composing.
- [ ] Every table is a DataTable with sort/search/paginate/export/select.
- [ ] Heavy detail is lazy; state is encoded in form.
- [ ] tsc + build clean; shown count == API count; roles gated.
- [ ] Nothing fabricated, nothing silently truncated, nothing over-built.
