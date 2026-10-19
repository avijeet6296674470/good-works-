---
name: keywords-everywhere
description: Pull real keyword data (Google search volume, CPC, advertiser competition, 12-month trend, related keywords, "People Also Search For", and the keywords a domain/URL already ranks for) from the Keywords Everywhere REST API. Use to size keyword opportunity for the project's market and vertical (per `market.country` and `vertical.overlay` in `brand.config.json`), validate the keyword-ownership map, and build the competitor gap analysis for the audit. Needs KEYWORDS_EVERYWHERE_API_KEY (in .env). Costs 1 credit per keyword returned.
---

# keywords-everywhere: real search-volume data for the audit

Reusable, project-agnostic. The `seo-expert` agent builds the keyword-ownership map; this skill puts
**real numbers** (volume / CPC / competition / trend) behind every term so the audit says "'emergency plumber
{city}': 2,400/mo, competition 0.41, climbing" (illustrative) instead of guessing. Same API key as the browser extension.

> **Full API reference:** [`API-REFERENCE.md`](./API-REFERENCE.md) in this folder. Every endpoint, params, response shape.

## Setup
Key is already in `.env` as `KEYWORDS_EVERYWHERE_API_KEY`. `country`/`currency` come from the project's own `market.country` / `market.currencyCode` in `brand.config.json`, never hardcoded — a project outside the US needs real local volume, not US volume mislabeled as global.
```bash
export KE_KEY="$(grep -E '^KEYWORDS_EVERYWHERE_API_KEY=' .env | cut -d= -f2)"   # anchored ^ so the comment line isn't matched
export KE_COUNTRY="$(jq -r '.market.country // "us"' brand.config.json)"
export KE_CURRENCY="$(jq -r '.market.currencyCode // "usd"' brand.config.json)"
```
- Base URL: `https://api.keywordseverywhere.com/v1`
- Auth: `Authorization: Bearer $KE_KEY`
- **Cost: 1 credit per keyword returned.** Every response reports `credits` (remaining) + `credits_consumed`. Dedupe your keyword list before calling.

## Core call: Get Keyword Data (volume, CPC, competition, trend)
Up to **100 keywords per request**.
```bash
curl -s -X POST "https://api.keywordseverywhere.com/v1/get_keyword_data" \
  -H "Authorization: Bearer $KE_KEY" \
  -H "Accept: application/json" \
  -d "dataSource=gkp" \
  -d "country=$KE_COUNTRY" \
  -d "currency=$KE_CURRENCY" \
  -d "kw[]=<primary keyword for the vertical>" \
  -d "kw[]=<a second seed keyword>" \
  -d "kw[]=<a third seed keyword>" | jq
```
Response (per keyword): `vol`, `cpc.value`, `competition` (0 to 1 Google Ads advertiser competition, **not** ranking difficulty), `trend[]` (12 months). Plus top-level `credits`, `credits_consumed`, `time`.

```bash
# Rank a keyword list by volume, straight into a TSV for the audit deck:
curl -s -X POST "https://api.keywordseverywhere.com/v1/get_keyword_data" \
  -H "Authorization: Bearer $KE_KEY" -H "Accept: application/json" \
  -d "country=$KE_COUNTRY" -d "currency=$KE_CURRENCY" -d "dataSource=gkp" \
  $(while read k; do printf -- "--data-urlencode kw[]=%s " "$k"; done < keywords.txt) \
| jq -r '.data[] | [.vol, .competition, .cpc.value, .keyword] | @tsv' | sort -rn
```

## `dataSource`
- `gkp`: Google Keyword Planner only (advertiser data; volumes bucket to GKP ranges).
- `cli`: blend of Keyword Planner + clickstream (often more granular volumes). Pick one and stay consistent across the audit.

## Other endpoints (see API-REFERENCE.md for params)
| Need | Endpoint |
|------|----------|
| Keyword ideas for a seed | Related Keywords · People Also Search For |
| What a competitor already ranks for | Domain Keywords · URL Keywords |
| Competitor traffic estimate | Domain Traffic · URL Traffic |
| Backlink / referring-domain counts | Domain & Page Backlinks |
| Remaining credits | Get Credit Balance |
| Supported `country` / `currency` codes | Countries · Currencies |

## Audit workflows (where this wins the pitch)
1. **Validate the keyword-ownership map:** feed every primary keyword from `seo-expert`; confirm each has real volume and isn't a ghost term. Re-assign any URL whose primary keyword has ~0 volume.
2. **Opportunity sizing:** total monthly volume across the client's target term set = the "addressable search demand" slide.
3. **Competitor gap:** run Domain Keywords on each of the client's competitors (and the 3 vendors' demo sites); the terms they rank for that the client doesn't = your "here's what we'd capture" list.
4. **Trend hooks:** the `trend[]` array surfaces seasonality specific to this vertical (a service that spikes with weather, a booking category that spikes around holidays, a demand curve that climbs steadily year-round — whatever the 12-month shape actually shows for *this* project's terms): gold for the content-calendar recommendation.

## MCP alternative (zero glue code, lives inside Claude Code)
Keywords Everywhere runs an MCP server that plugs directly into Claude Code, so you can ask for keyword
data conversationally instead of curling:
```bash
claude mcp add --transport http keywords-everywhere https://mcp.keywordseverywhere.com/mcp \
  --header "Authorization: Bearer $KE_KEY"
```
Setup guide: https://api.keywordseverywhere.com/docs/#/mcp_integration · server: `mcp.keywordseverywhere.com/mcp`. (Use the MCP for ad-hoc lookups; use the REST calls above for scripted batch sweeps that you want reproducible in the report.)

## Notes
- KE is **not a rank tracker.** It returns volume/keyword data + what a site currently ranks for, not daily position monitoring. For rank tracking, that's a separate tool.
- Every returned keyword costs a credit, so check balance first on big sweeps (Get Credit Balance), and dedupe.

## Done definition
The keyword-ownership map has a real `vol`/`competition`/`cpc` against every primary term; the opportunity-size and competitor-gap numbers are pulled into the audit scorecard; credit balance was checked before any 100-keyword sweep.
