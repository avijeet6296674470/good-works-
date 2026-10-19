---
name: lighthouse-audit
description: Pull real Core Web Vitals + Lighthouse scores (Performance, SEO, Accessibility, Best-Practices) for any live URL — both field data (real Chrome users, CrUX) and lab data. Use to put hard numbers in an audit/video ("their mobile LCP is 6.2s, ours target <2.5s") and to compare a client vs 3 competitors. PageSpeed Insights API (no key needed for low volume) or local Lighthouse CLI.
---

# lighthouse-audit — real CWV + Lighthouse numbers for the audit

Reusable, project-agnostic. The performance-engineer agent and `/performance-pass` reason about *causes*;
this skill produces the *scores and field metrics* you quote on screen. Numbers win vendor bake-offs.

## Path A — PageSpeed Insights API (fastest, gives FIELD data = real users)
Works with no key at low volume; for batches set `PAGESPEED_API_KEY` (free Google API key).
```bash
URL="https://CLIENT.com/"
KEY="${PAGESPEED_API_KEY:+&key=$PAGESPEED_API_KEY}"

# Mobile run → pull the metrics that matter
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=$URL&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices$KEY" \
| jq '{
    perf:  .lighthouseResult.categories.performance.score,
    seo:   .lighthouseResult.categories.seo.score,
    a11y:  .lighthouseResult.categories.accessibility.score,
    bp:    .lighthouseResult.categories["best-practices"].score,
    lab_LCP: .lighthouseResult.audits["largest-contentful-paint"].displayValue,
    lab_CLS: .lighthouseResult.audits["cumulative-layout-shift"].displayValue,
    lab_TBT: .lighthouseResult.audits["total-blocking-time"].displayValue,
    field_LCP: .loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category,
    field_INP: .loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category,
    field_CLS: .loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category
  }'
```
Swap `strategy=desktop` for the desktop profile. Scores are 0–1 (×100 for the familiar 0–100).

## Compare a client against competitors (the money shot for the video)
```bash
for site in client.com rivalA.com rivalB.com rivalC.com; do
  echo "== $site =="
  curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://$site/&strategy=mobile&category=performance" \
  | jq -r '"perf \(.lighthouseResult.categories.performance.score*100｜floor)  LCP \(.lighthouseResult.audits["largest-contentful-paint"].displayValue)  CLS \(.lighthouseResult.audits["cumulative-layout-shift"].displayValue)"'
  sleep 1
done
```
(If the `｜floor` glyph trips jq, use `(.score*100|floor)` — plain pipe.)

## Path B — local Lighthouse CLI (full HTML report, no quota, more control)
```bash
npm i -g lighthouse        # bundles a headless Chrome runner
lighthouse "https://CLIENT.com/" \
  --only-categories=performance,seo,accessibility,best-practices \
  --form-factor=mobile --screenEmulation.mobile \
  --output=html --output=json \
  --output-path=./reports/client-home \
  --chrome-flags="--headless"
# → ./reports/client-home.report.html  (embed/screenshot for the deck)
#   ./reports/client-home.report.json  (jq the same metrics as above)
```

## What to quote in the audit
- **Field CWV verdict** (FAST / AVERAGE / SLOW per metric) — this is Google's *ranking-relevant* real-user data; lab is diagnostic only. Lead with field when CrUX has data.
- **LCP** (target < 2.5s), **INP** (< 200ms), **CLS** (< 0.1). Call the failing one by name + the cause (route to `/performance-pass`).
- **The gap:** client's mobile perf score vs the best competitor vs your target. One slide.

## Notes
- CrUX field data only exists for pages with enough real traffic; small sites show lab-only — say so, don't imply field data exists.
- Run mobile first — it's almost always the weaker, more decisive profile.
- Rate-limit: space calls ~1s without a key; get a free key for sweeping many pages.

## Done definition
Each audited page (client + each competitor) has a saved Lighthouse/PSI result; the headline CWV + category scores are pulled into the scorecard with the failing metric and its cause named.
