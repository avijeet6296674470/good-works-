---
name: proof-card
description: >
  Use to compose a polished, on-brand, site-ready proof CARD from a real client screenshot plus
  its real metric: the full pipeline in order (crop the region, redact any PII, annotate the one
  accent metric, frame it in browser or card chrome, resize to a web-ready format). The result is
  a single asset a proof stack or a case-study hero can drop in. Vesper approves the framing and
  the on-brand finish. The metric and label are pulled verbatim from the case study, never
  invented. Auto-fires on "make a proof card", "build a results card from this screenshot", "turn
  this dashboard into a site asset", "browser-frame this and brand it", "proof asset for the work
  page".
---

# /proof-card: compose a site-ready proof card from a real screenshot

The finished unit of visual proof. A raw dashboard becomes one clean, on-brand card: the region
that matters, the private stuff gone, the one accent number called out, wrapped in tasteful
chrome, and sized for the web. **Vesper** approves the framing and confirms it looks like this
brand, not a generic screenshot. The number is never invented — it comes straight from the case
study `/curate-claims` already certified.

## Canonical grounding (read first)
- `tools/imgtool.py` (the full command set: `crop`, `redact`, `annotate`, `frame`, `resize` —
  this skill orchestrates `/crop` and `/annotate` as its middle steps).
- The case study or fact file for the client this card is for (the real metric, the label, the
  permission status).
- `docs/BRAND-TRUTHS.md` and `truth.forbiddenClaims`: real proof only, no fabricated stats, redact
  PII, the accent used only at the payoff.
- `docs/BRAND-DIRECTION.md`: the finish this card must match — mono labels, accent restraint,
  the palette, generous space.
- `assets.preferredFormat` and `assets.maxImageBytes` in `brand.config.json` for the delivery
  format and size ceiling.

## When to invoke
- "Make a proof card from this dashboard."
- "Turn this results screenshot into a site asset."
- "Browser-frame this and brand it for the work page."
- Any request that starts from a real screenshot and ends at a placed, on-brand proof asset.

## Inputs (extract from the prompt, do not ask unless truly missing)
1. **Source screenshot**: the real dashboard or results capture.
2. **Client or case-study slug**: to read the real metric, label, and permission line.
3. **Frame style**: `browser` (a screenshot of a live page or dashboard, with an optional real
   URL) or `card` (a clean padded frame with an optional caption).
4. **Target width**: the delivery width for this placement — a card in a grid needs less than a
   hero.

## Step 1: pull the real metric (before any pixels)

Read the case study or fact file. Take the exact, sourced figure and its label. Note the
permission line and any `[confirm publishable]` flag. **If the number you'd highlight isn't a
sourced, already-certified figure, stop and ask** — this skill never invents or estimates a
metric, it only presents one `/curate-claims` already cleared. A `[confirm]`-flagged name or a
withheld figure rides through to `/wire-proof` unresolved; don't publish the card past a working
stack until it clears.

## Step 2: crop the region

Probe, then crop to the panel that actually carries the metric (`/crop`). A tight region reads far
better than a full-page export shrunk into a card.

```bash
python3 tools/imgtool.py probe raw.png
python3 tools/imgtool.py crop raw.png step1-crop.png --rect 80,300,700,300
```

## Step 3: redact PII

Scrub every client name, email, account ID, phone, address, and any withheld spend or revenue
figure (`/annotate`'s redact step). Redaction comes before the highlight so no private value
survives into a later file.

```bash
python3 tools/imgtool.py redact step1-crop.png step2-redact.png --rect 24,16,300,36
```

## Step 4: annotate the one accent metric

One accent highlight, one mono label, the verbatim figure. Optional single arrow (`/annotate`).

```bash
python3 tools/imgtool.py annotate step2-redact.png step3-annot.png \
  --mark "type=highlight;rect=110,120,520,160;label=<the real, sourced figure>"
```

## Step 5: frame (browser or card chrome)

Wrap it in on-brand chrome. `browser` for a live-page or dashboard feel (pass the real URL when
the shot is of a public page — never a fake domain); `card` for a padded, captioned frame:

```bash
# Dashboard or app screenshot
python3 tools/imgtool.py frame step3-annot.png step4-frame.png --style browser --url app.example.com

# Clean padded card with a mono caption
python3 tools/imgtool.py frame step3-annot.png step4-frame.png --style card --caption "<client, channel>"
```

## Step 6: resize for delivery

Deliver at the placement width in `assets.preferredFormat`, sized and compressed:

```bash
python3 tools/imgtool.py resize step4-frame.png proof-card-<slug>.webp --width 1200 --webp --quality 82
```

Keep the file well under `assets.maxImageBytes`. Upload to a **fresh, versioned asset key**,
never overwrite a live one, and confirm the public URL resolves before any component wires it up.
Once placed, hand to Vigil (`/brand-asset-integrity`) to confirm the right locked family sits
alongside it.

## Step 7: Vesper approves

Vesper checks the finished card against the brand's own finish standard: chrome tasteful, not
toy-like; the accent highlight is the only accent; the mono label is clean; corners are tight;
spacing breathes. If it could be any agency's screenshot, it isn't done.

## Output
1. A single site-ready proof card, versioned, hosted, region cropped, PII redacted, one accent
   metric annotated, framed, sized.
2. The pipeline record: source, the exact figure and its case-study source line, every redacted
   region, the frame style, the delivery URL.
3. Vesper's on-brand sign-off (or the fix list).

## Guardrails
- **Pull the real metric, never invent one.** Not sourced in the case study? Stop and ask.
- **Redact before highlight.** PII is gone before any accent is drawn.
- **One accent per card.** The accent is the payoff. A second accent element is a defect.
- **Honest chrome.** A browser frame carries the real URL or none — never a fake domain, never a
  fake dashboard.
- **Delivery discipline.** Sized to format, fresh versioned key, never overwrite a live one,
  confirm the URL resolves.
- **Respect the flags.** A `[confirm]` name or a `[confirm publishable]` figure doesn't go past a
  working stack until the project owner signs off.
- No em or en dashes in any caption, label, or record.

## Boundaries
Vesper owns the framing taste and the on-brand pass. `/crop` and `/annotate` are the sub-steps
this skill runs. Cortex wires the resolved asset into a component. Vigil confirms the right
locked brand family sits on the surface. Placing the finished card into a full proof block with a
quote and a photo is `/wire-proof`. Sign-off on a flagged name or figure is the project owner's.
