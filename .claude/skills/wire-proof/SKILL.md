---
name: wire-proof
description: >
  Use to make sure real proof is actually USED on the site, not sitting unread in a proof folder.
  Maps the proof body (case studies, client screenshots, owner photos, testimonials, and the
  proof cards `/proof-card` produced) onto the pages where proof belongs. Picks the strongest
  case studies, assembles each proof block (annotated screenshot card, real metric, real quote,
  owner photo where one exists), respects the sensitive-data flags, and never ships a placeholder
  or an unconfirmed name. Onyx directs, Marlowe owns the quote copy. Auto-fires on "wire up the
  proof", "is the proof actually used", "build the work page proof", "assemble the proof stack",
  "put the case studies on the site", "proof audit".
---

# /wire-proof: get the real proof onto the page

Real proof that sits in a folder sells nothing. This skill closes that specific gap: it maps the
proof body onto the pages where a strong claim needs backing, so every result the site states out
loud is backed by a real card, a real number, a real quote, and — where one exists — a real face.
**Onyx** directs the selection and placement; **Marlowe** owns the quote wording and the alt text.

## Canonical grounding (read first)
- The tiered index of case studies, if the project keeps one — the strongest studies (a real
  number *and* a real quote) first, the sign-off list, any `[confirm]` names, any `[confirm
  publishable]` figures, the honest gaps.
- The proof body: individual case studies, client screenshots, owner photos, testimonial text,
  and the proof cards `/proof-card` has already produced.
- `docs/BRAND-TRUTHS.md` and `truth.forbiddenClaims`: real proof only, never fabricate a stat or a
  quote, no placeholder ever ships, redact PII.
- `docs/BRAND-DIRECTION.md`: proof reads as one system — consistent card aspect, a mono metric
  layer, accent restraint, generous space.
- If the project separates which clients may be named versus shown only anonymized, that
  separation is binding: showing a client's creative or screenshot can be fine while publishing
  their exact number under their name is not. Check the project's own anonymize list before citing
  a figure by name.

## When to invoke
- "Wire up the proof on the work page."
- "Is the proof actually being used anywhere?"
- "Assemble the proof stack for the homepage."
- "Put the strongest case studies on the site."
- A proof audit before ship.

## Inputs (extract from the prompt, do not ask unless truly missing)
1. **Target surface(s)**: a work/portfolio index, an individual case-study page, or an on-page
   proof stack (homepage, a vertical or segment page).
2. **Tier or selection**: default to the strongest studies (real number and real quote together);
   a vertical page filters to its own vertical.
3. **The sign-off state**: which names are still `[confirm]` and which figures are still
   `[confirm publishable]`.

## Pick the proof format first (the decision ladder)
A real screenshot is one proof format among several — not the default for every number. Before
assembling a block, pick deliberately:
- **A real number to compare or plot** (a result across periods, a trend, a before/after) → a real
  **coded chart**, built from real data, never a decorative graphic with the number drawn into the
  pixels. Route the build to Cortex.
- **One result that needs context to feel earned** (a competitive market, a crowded field) → a
  **framed-context block**: the number alongside the real context that makes it impressive.
- **A growth story told as events over time** (locations opened, milestones hit) → a **timeline or
  milestone format** with real dated markers, not a single bare stat.
- **A feeling or decorative accent, not a claim** → a decorative motif from the image grammar, with
  the real sourced number sitting in adjacent text — the image carries the feeling, the text carries
  the fact, and the two are never fused into one baked-in image.
- **The real product, UI, or a genuine before/after captured live** → a real screenshot: `/proof-card`
  (crop, redact, annotate one metric, frame).

**Vary the format across a proof-dense surface.** A page with six proof blocks in the identical
shape reads as monotony, not momentum — rotate through screenshots, quote cards, stat blocks, and
coded charts so adjacent blocks never share a shape. This is the same "no two adjacent sections
share a shape" discipline Onyx applies at the page level, applied within a proof stack specifically.

## Step 1: pick the studies

Take the strongest available studies for the surface — the ones with a real number *and* a real
quote, not just one or the other. For a vertical or segment page, filter to that vertical. Don't
reach into the thin or flagged studies to pad a stack; two strong blocks beat six weak ones.

## Step 2: inventory each block

For each chosen study, collect the four parts of a proof block, plus the flags:
- **Annotated screenshot card**: a `/proof-card` from the real dashboard or site capture. If it
  doesn't exist yet, queue `/proof-card`.
- **Real metric**: the headline number and its mono label, verbatim from the case study.
- **Real quote**: with the owner name and business. Marlowe owns any trimming — for length only,
  never for meaning.
- **Owner photo**: cropped to the shared portrait aspect via `/crop`, if one exists. Note plainly
  where a face is missing rather than filling the gap with a stand-in.
- **The flags**: is the owner name `[confirm]`? Is any cited figure `[confirm publishable]`?

## Step 3: respect the sensitive-data flags (the gate)

Before a block goes on a live surface:
- **Redact PII** on every screenshot. Confirm `/proof-card`'s redact step actually ran.
- **A `[confirm]` owner name does not ship.** Hold the block, or show it without the name, until
  the project owner signs off. Never invent or guess a name.
- **A `[confirm publishable]` figure is not cited** until it clears. Publish the outcome metrics
  that are cleared; withhold raw revenue and spend by default.
- **Never ship a placeholder** as if it were real. An empty photo slot is a quote card without a
  face, never a stock photo standing in for one.

## Step 4: assemble each proof block on the surface

Hand Cortex the assembled block per this project's own page pattern for the surface. Each block
carries: the annotated card, the mono metric, the quote with the confirmed name and business, the
owner portrait (or an honest faceless quote card where none exists). Keep one card aspect across
any grid, and the accent color reserved for the metric only, so the stack reads as one system.

## Step 5: prove it's actually used

Walk every target surface and confirm the proof is placed, not just prepared: the index renders
real cards, each page's proof section pulls real studies. Grep the codebase for any hard-coded
placeholder text, a fabricated number, or a stock testimonial, and remove it. A proof folder full
of assets and a page full of placeholders is the exact failure this skill exists to prevent.

## Output
1. Each target surface wired with real proof blocks: annotated card, real metric, real quote with
   a confirmed name, owner photo (or an honest faceless card).
2. A coverage map: every strong on-site claim mapped to the proof block backing it, and every gap
   flagged (missing face, `[confirm]` name, `[confirm publishable]` figure, a vertical with no
   real data yet).
3. Confirmation that no placeholder, unconfirmed name, or fabricated figure remains on any
   surface.

## Guardrails
- Never ship a placeholder or an unconfirmed owner name. A flagged name is held or shown nameless
  until the owner signs off.
- Never fabricate a stat, a quote, or a face. No stock face fills an empty slot.
- Redact PII before publish, on every screenshot in a block.
- Withhold what's flagged; publish the cleared outcome metrics.
- One system: one card aspect across a grid, the accent only on the metric.
- Do not pad. Two strong blocks beat six thin ones.
- No em or en dashes in any assembled copy, alt text, or the coverage map.

## Boundaries
Onyx directs selection and placement and owns whether a block is strong enough to feature.
`/proof-card` and `/crop` produce the screenshot assets. Marlowe owns the quote wording (length
trims only) and the alt text. Cortex wires the assembled blocks into components. Vigil confirms
the right locked brand family on the surface. Sign-off on a `[confirm]` name, a `[confirm
publishable]` figure, or a genuine data gap is the project owner's, and no block ships past that
gate without it.
