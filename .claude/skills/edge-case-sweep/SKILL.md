---
name: edge-case-sweep
description: The adversarial edge-case matrix for a dashboard page + its endpoints — cardinality (0/1/many/huge), null fields, silent truncation (count-match), auth roles, pagination bounds, export correctness, sparse-chart rendering, typed/faceted filters incl. invalid regex, and sort stability. Use to QA a page before calling it done, or to stress an endpoint.
---

# Edge-case sweep

Test the day it breaks, not the happy path. The project's own `CLAUDE.md` and
`brand.config.json` `truth.forbiddenClaims` are the oracles: fabricating a number,
hiding a row, or leaking across roles is a bug. This skill applies whenever the
project has an internal dashboard-style surface (a client-reporting view, an
admin panel, anything with rows, filters and roles) — confirm the dev server
address, any auth header this project's stack actually uses, and a real test
identifier (a client slug, a project id) from the project's own setup docs
before running it; never carry one over from a different project. Verify every
finding with a concrete repro before reporting it.

## 1. Cardinality
- **0 rows** — does the empty state show (not a blank panel or a crash)?
- **1 row / 1 run** — single-point trends must render as a chart with the point,
  not an empty box or a text paragraph. One-item lists paginate/sort fine.
- **Largest real set** — the 3k+ GSC queries, 300 keywords, 189 referring
  domains: does it paginate honestly and stay responsive? Server-mode views must
  return `{rows,total}` and show the true total.

## 2. Silent truncation (count-match)
Grep the project's own backend/data-layer files (wherever `stack.framework`
says API routes and data access actually live) and the page for `[:N]`,
`.slice(`, `.head(`, `limit`. For each list, curl the endpoint and assert:
shown count == API array length, OR an honest `{rows,total}`. A cap without a
surfaced total is a bug. Known-legit pattern to not flag: a slice used for a
small summary card (e.g. "top 3 movers") or a truncated display string (e.g. a
shortened timestamp) — those aren't silent truncation of real data.

## 3. Null / missing fields
A keyword with no rank/URL, a domain with no cited pages, a client with no run, a
month with no data. Expect `—`, never `NaN` / `undefined` / `Invalid Date` /
crash. Numbers formatted only in render; the raw `value` stays numeric/null.

## 4. Auth / roles
Read the project's own route/auth layer: every write endpoint calls its
role-gate function; every read endpoint calls its view-gate (or an inline
role/tenant-slug check). A less-privileged role must 404/403 on another
tenant's or client's slug. In the UI, admin-only controls (selection,
bulk-action, edit) are hidden for a lower role, not just rejected by the API
— verify both.

## 5. Pagination bounds
First page, last page, a page index past the end (should clamp), a filter that
shrinks results below the current page (page resets), server-mode offset past
total (empty, not error).

## 6. Export correctness
CSV / JSON / XLSX of: the full filtered view, and the selection only. Server-mode
export must page through the ENTIRE filtered set (loop to `total`), not stop at
the per-request cap. Exported headers == visible columns; numbers export as
numbers.

## 7. Filters
- Facet multi-select = OR within a facet, AND across facets (non-empty results
  where expected).
- Typed filters: contains / excludes / regex, including an **invalid regex**
  (must not throw — falls back to match-all). Combined filters compose.
- The clear button resets query + facets + typed filters + page, and the count.

## 8. Sort
Numeric columns sort numerically (a metric passed as a formatted string `"1,234"`
would sort lexically — flag it), strings sort naturally, nulls last, stable.

## 9. Never-fabricate scan
Any hardcoded metric/date/count not traceable to the payload — a stale month
literal, a made-up budget, a placeholder count presented as real.

## Report
`Severity | Area | file:line | Repro (curl/input/state) | Expected vs Actual`,
ranked most-severe first, then a SHIP / FIX-FIRST verdict per page and the single
highest-priority bug. Reproduced defects only — no padding.
