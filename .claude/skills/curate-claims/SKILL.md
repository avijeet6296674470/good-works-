---
name: curate-claims
description: >
  Use to turn a raw client report (an analytics export, an ad-platform dashboard, a CRM or leads
  export, a monthly report) into approved, business-intel-safe, on-brand outcome claims, written
  into the case study or fact file as a PUBLIC (approved) block plus an INTERNAL (basis) block.
  Runs a redaction gate (never publish raw spend, budget, dollar cost-per-lead, or private
  revenue) and a calibration pass (concrete numbers, sustained over peak for the headline, the
  real range of wins, not one cherry-picked stat). The output feeds `/proof-card` and
  `/wire-proof`. Auto-fires on "what can we quote from this", "curate the claims from this
  report", "turn this dashboard into claims", "is this figure safe to publish", "activate this
  case study from the data".
---

# /curate-claims: raw client data to intel-safe, approved claims

The step before any proof gets designed or placed. A raw report becomes a certified set of claim
lines: the sharpest true statement of the outcome, framed to sell, with zero fabrication and zero
leaked business intelligence. This sits upstream of the whole proof pipeline — `/proof-card` and
`/wire-proof` both assume the claims they're working from already passed through here.

## Canonical grounding (read first)
- The raw source you're handed: an export, a dashboard capture, a report file.
- The case study or fact file this data belongs to, and its index if the project keeps one of
  strongest-first case studies.
- `docs/BRAND-TRUTHS.md`, `docs/BANNED-WORDS.md`, `truth.forbiddenClaims` in `brand.config.json`.

## When to invoke
- "What can we quote from this report?"
- "New data landed for this client, curate the claims."
- "Is this figure safe to put on the site?"
- Activating a case study that's been sitting with no real data yet, once real data arrives.

## The redaction line (non-negotiable)
- **Never publish:** ad spend, budget, dollar cost-per-lead or dollar cost-per-acquisition, raw
  private revenue or margin, or any figure a competitor could reverse-engineer into business
  intelligence about the client.
- **Safe to publish:** percentages and lifts, multipliers (6X, doubled), a ROAS multiple, lead or
  booking or review *counts*, ranking positions, conversion rates, timeframes.
- When genuinely in doubt, treat the figure as intelligence. Redact it, quote the lift or the
  multiple instead — the shape of the win survives even when the raw number can't be shown.

## The durability test (run before calibration — a number that fails this never reaches wording)
Every candidate number gets read as if a skeptical competitor is trying to discredit it in front of
the buyer. All five questions must have an answer before the number is a claim at all:
1. **Which month?** A single month is a peak until proven otherwise — is this a multi-month
   average or range, or one best month dressed as the norm?
2. **Over what?** Account-level, or one campaign/channel/page? A single-channel figure is never the
   whole account's number. Say which.
3. **How much, on how many?** A huge multiple on a tiny sample is a rounding artifact, not a
   result — 47X on 5 conversions is not the same claim as 47X on 500.
4. **Then what?** What happened after the peak? If it collapsed, a window that conveniently ends at
   the peak is cherry-picked — extend it or state the trend honestly.
5. **Says who?** Which report, which line, what date span? Owner-stated is fine, but it's labelled
   owner-stated, never dressed as measured data.

**The named failure modes** — catch the pattern, then apply the fix:
- **Peak-picking** — leading with the single best period. Fix: state the average and the sustained
  range across the full span.
- **Slice-as-whole** — quoting one campaign/channel/product's number as if it were the whole
  account's. Fix: use the whole-account number, or explicitly label the slice.
- **Driver-in-disguise** — a blended figure that's really carried by one dominant driver (e.g. a
  brand-search campaign, one viral post). Fix: report the figure with the dominant driver excluded,
  or label it "blended, X included."
- **Window-fitting** — a date range that conveniently ends the month before a collapse. Fix: extend
  the window or state the recent trend honestly.
- **Unsourced** — a number in the draft that traces to no report line. Fix: find the source or pull
  the number.
- **Stale** — a figure quoted as current that's actually months old. Fix: date it, or refresh it.
- **Vanity metric** — impressions/clicks dressed as revenue or bookings. Fix: name it for what it
  is.
- **Scope inflation** — implying the brand built or owns what it only consulted on or contributed
  to. Fix: state the real scope.
- **Small-absolute** — a tiny raw count that reads as unserious once printed. Fix: use a ratio or
  percentage instead for a lean dataset.

When two framings of the same result are both defensible, ship the lower, safer one — the durable
number survives a hostile second question; the inflated one gets the brand caught on a sales call.

## The calibration (house style, apply every time)
1. **Concrete over vague.** "55% lower" or "6X," never "more than half" or "significantly
   improved."
2. **Sustained over peak for the headline.** A single best month is a highlight, not the
   headline — a peak is allowed only when explicitly framed as "up to," never presented as the
   norm.
3. **Show the range of wins**, not one collapsed stat — efficiency, growth, volume, conversion,
   and structural change are usually different numbers; use the ones that are real rather than
   flattening everything into a single multiple that overstates or understates the real picture.
4. **Every claim carries its timeframe.** A number with no "over what period" is not a claim yet,
   it's a fragment.

## Steps
1. **Read the source end to end.** Find the real metrics. Note the baseline and the sustained
   later level, not just the best single point.
2. **Run the durability test on every candidate number** (above) — which month, over what, how
   much on how many, then what, says who. Name any failure mode it hits and fix it before moving
   on; a number that fails this doesn't get to calibration.
3. **Compute the lifts.** Percentage change, multiple, sustained versus peak. Keep the arithmetic
   — a claim you can't show the math for doesn't ship.
4. **Run the redaction gate.** Strip spend, budget, and dollar cost-per-X from anything destined
   to be public; convert what you can into a ratio or a percentage instead.
5. **Write the claims in this project's voice**, per `voice` in `brand.config.json`. Short,
   concrete, calibrated. No banned vocabulary, no hype the data doesn't actually support.
6. **Write the split.** Update the case study or fact file with a **PUBLIC** block (the approved,
   publishable lines) and an **INTERNAL** block (the basis and the raw figures, explicitly marked
   not for publication). Mark anything not yet confirmed as `[confirm publishable]` or
   `[confirm]` rather than shipping it provisionally and hoping nobody asks.
7. **Update the index**, if the project keeps a tiered index of case studies — move this client
   into the tier the real data now supports, and clear any placeholder note.
8. **Hand off.** Name explicitly what's now clearable for `/proof-card` and `/wire-proof`, and
   flag anything still needing a sign-off before it can ship.

## Done when
- The case study or fact file has an approved PUBLIC block and a clearly separated, unpublishable
  INTERNAL block.
- No spend, budget, or dollar cost-per-X figure appears in any public line.
- Every public claim is real, sourced, timeframed, and safe for the client to see themselves.
- Any index or tier list reflects the update.

## Guardrails
- Never publish a figure that could function as competitive intelligence about the client's
  spend or margin.
- Never round a number in the brand's favour — the exact figure, or nothing.
- Never present a peak as the sustained norm.
- A flagged `[confirm]` or `[confirm publishable]` item does not reach `/proof-card` or
  `/wire-proof` until it clears.
