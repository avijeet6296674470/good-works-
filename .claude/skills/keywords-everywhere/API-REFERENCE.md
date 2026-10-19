# Keywords Everywhere API — Reference

Saved from the official documentation (June 2026). Sources:
- Overview / examples: <https://keywordseverywhere.com/api-documentation.html>
- Interactive reference (Swagger, live): <https://api.keywordseverywhere.com/docs/#/>
- MCP setup: <https://api.keywordseverywhere.com/docs/#/mcp_integration>
- Get a key: <https://keywordseverywhere.com/first-install-addon.html>

> The interactive `/docs/#/` reference is a JS Swagger UI that loads its spec authenticated with your
> key, so the per-parameter detail for the secondary endpoints is best confirmed live there with the key
> filled in. The core `get_keyword_data` endpoint below is documented verbatim from the official page;
> the secondary endpoints are listed with their official purpose.

---

## Basics

| | |
|---|---|
| **Base URL** | `https://api.keywordseverywhere.com/v1` |
| **Auth** | `Authorization: Bearer YOUR_API_KEY` (same key as the browser extension) |
| **Format** | `Accept: application/json` |
| **Cost** | 1 credit per keyword returned. Every response reports `credits` (remaining) + `credits_consumed`. |
| **Plans** | API key is free; calls draw from the same credit pool as the extension. Since June 2025 every API method works on all plans (incl. Bronze). |
| **Not a rank tracker** | Returns keyword data + what a domain/URL currently ranks for; does NOT monitor positions over time. |

---

## Endpoint catalog (from the official docs)

| Category | Endpoint(s) | What you get |
|----------|-------------|--------------|
| Keyword metrics | **Get Keyword Data** | Search volume, CPC, competition + 12-month trend for up to 100 keywords/request |
| Keyword ideas | **Related Keywords**, **People Also Search For** | Suggestions for a seed keyword, each with volume, CPC, competition |
| Site keywords | **Domain Keywords**, **URL Keywords** | The keywords a domain or single page already ranks for |
| Traffic | **Domain Traffic Metrics**, **URL Traffic Metrics** | Estimated monthly organic traffic for a domain or page |
| Backlinks | **Domain & Page Backlinks** (all or unique) | Backlinks and referring domains for a site or page |
| Account | **Get Credit Balance**, **Countries**, **Currencies** | Remaining credits; supported country + currency codes |

---

## Get Keyword Data  — `POST /v1/get_keyword_data`

The primary endpoint. Up to **100 keywords per request**.

### Parameters (form-encoded body)
| Param | Required | Default | Notes |
|-------|----------|---------|-------|
| `kw[]` | yes | — | Keyword to look up. Repeat the param for each keyword (max 100). |
| `country` | no | `us` | 2-letter country code (see Countries endpoint for the supported list). |
| `currency` | no | `usd` | Currency for CPC (see Currencies endpoint). |
| `dataSource` | no | `gkp` | `gkp` = Google Keyword Planner only; `cli` = Keyword Planner + clickstream blend. |

### Example request (verbatim from official docs)
```bash
curl -X POST "https://api.keywordseverywhere.com/v1/get_keyword_data" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -d "dataSource=gkp" \
  -d "country=us" \
  -d "currency=usd" \
  -d "kw[]=digital marketing"
```
Add more `kw[]` values (up to 100) in the same call.

### Example response (verbatim from official docs)
```json
{
  "data": [
    {
      "keyword": "digital marketing",
      "vol": 90500,
      "cpc": { "currency": "$", "value": "9.96" },
      "competition": 0.62,
      "trend": [
        { "month": "January",  "year": 2026, "value": 110000 },
        { "month": "February", "year": 2026, "value": 90500 }
      ]
    }
  ],
  "credits": 148520,
  "credits_consumed": 1,
  "time": 0.31
}
```

### Field meanings
- **`vol`** — average monthly search volume (Google Keyword Planner source).
- **`cpc`** — `{ currency, value }`, advertiser cost-per-click.
- **`competition`** — Google Ads advertiser-competition metric, **0–1**. This is *ad* competition, NOT organic ranking difficulty. Don't present it as "how hard to rank."
- **`trend[]`** — last 12 months of `{ month, year, value }`; use for seasonality.
- **`credits`** — credits remaining on the account after this call.
- **`credits_consumed`** — credits this call used (= number of keywords returned).
- **`time`** — server processing time (seconds).

---

## Secondary endpoints (purpose; confirm exact params in the live `/docs/#/`)

- **Related Keywords** / **People Also Search For** — POST a seed keyword (`kw`) + `country`/`currency`; returns idea lists each with volume/CPC/competition. Use for content-gap + cluster expansion.
- **Domain Keywords** / **URL Keywords** — POST a `domain` / `url`; returns the keywords that site/page already ranks for. Use for **competitor gap analysis**.
- **Domain Traffic Metrics** / **URL Traffic Metrics** — estimated monthly organic traffic for a domain/page. Use to size a competitor.
- **Domain & Page Backlinks** (all or unique) — backlink + referring-domain data. Use for off-page/authority comparison.
- **Get Credit Balance** — check remaining credits **before** a large sweep (no/low credit cost).
- **Countries** / **Currencies** — the valid `country` / `currency` codes for the other endpoints.

---

## MCP server (recommended for Claude Code)

Keywords Everywhere runs an MCP server so AI tools/coding assistants pull data with no glue code.

- Server: `https://mcp.keywordseverywhere.com/mcp`
- Auth: your normal API key (Bearer) or OAuth.
- Clients: ChatGPT, Claude Desktop, **Claude Code**, Cursor, VS Code, Windsurf, Qodo Gen.
- Add to Claude Code:
  ```bash
  claude mcp add --transport http keywords-everywhere https://mcp.keywordseverywhere.com/mcp \
    --header "Authorization: Bearer $KEYWORDS_EVERYWHERE_API_KEY"
  ```
- Per-client setup: <https://api.keywordseverywhere.com/docs/#/mcp_integration>

---

## Credit-conservation tips
- Dedupe + lowercase your keyword list before calling (each returned keyword = 1 credit).
- Batch up to 100 `kw[]` per request (fewer HTTP round-trips, same credit cost).
- Check **Get Credit Balance** before big sweeps.
- More: <https://keywordseverywhere.com/conserving-credits.html>
