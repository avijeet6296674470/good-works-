---
name: lead-magnet
description: >
  Use to produce a lead-magnet PDF end to end: the guide, checklist, worksheet, or one-sheet a
  reader keeps, gated behind an honest email capture that funnels toward the site's real
  conversion. The conversion strategist specs the offer, the gate, and the CTA ladder; Press
  generates the PDF (via `/html-to-pdf` by default, or the Gamma API for long-form bodies) with
  the project's brand and real imagery, builds the cover separately, and uploads it; Cortex wires
  the download gate and any CRM sync this project has; Trace fires the capture event. Auto-fires
  on "lead magnet", "gated PDF", "guide download", "one-sheet download", "content upgrade", "make
  a downloadable". Consult before building any download gate or Gamma script.
---

# /lead-magnet: produce and wire a gated lead-magnet PDF

The job: ship a PDF worth keeping, gated behind an honest email exchange, that reaches the site's
real conversion path and fires a tracked event. A lead magnet is not a brochure — it's the first
proof the brand does careful work, delivered before the reader has paid a cent. Four owners in
sequence: **the conversion strategist** (the offer and the funnel), **Press** (the PDF), **Cortex**
(the capture route and any CRM sync), **Trace** (the event).

## Canonical grounding (read first)
- `brand.config.json` — `identity`, `palette`, `type`, `assets.cdnDomain`, and whatever this
  project's stack actually is (framework, database, CRM if any — don't assume one that isn't
  configured).
- `docs/BRAND-TRUTHS.md` and `docs/BANNED-WORDS.md` — canonical facts and the vocabulary lint. If a
  needed fact isn't in a source, note it and ask rather than inventing it.
- `docs/BRAND-DIRECTION.md` — the palette, type stack, and any recurring motif.

## Step 1: the conversion strategist specs the offer and the gate
Before any generation, the conversion strategist delivers a short spec:
- **The offer.** The single ownable promise, the format (checklist, guide, worksheet, one-sheet),
  the hook on the cover, the one number or insight that proves the brand understands the reader's
  problem.
- **The gate.** Placement (teaser or first page visible, then the gate, then the download), fields
  (name plus email — name personalizes the follow-up), a value-named button label (never
  "Submit"), and an honest trust line. No dark patterns, no confirm-shaming.
- **The CTA ladder.** Every magnet ladders to the site's real conversion (a booked call, a form, a
  purchase). Primary CTA copy, where it repeats, the secondary path, honest urgency only.
Marlowe ratifies the visible copy. No new site voice is authored here.

## Step 2: Press builds the PDF (content sign-off first)
See `press-document-specialist.md` for the full engine detail. In short: content adapted from
approved copy (Hook → Promise → Proof → Path), brand inheritance baked in from `brand.config.json`,
cover built separately and merged, uploaded to `assets.cdnDomain` at a fresh versioned key.

## Step 3: Cortex wires the capture and any CRM sync
- The gate posts to a server route (or server action) that validates the payload server-side,
  writes the lead to this project's own database FIRST (the single origin of truth), then syncs
  outbound to a CRM **only if this project has one configured** — never assume a specific CRM
  vendor; read it from the project's own integration docs or ask.
- Idempotency on the write and any sync (a stable natural key — email plus the magnet id plus a
  time window) so a retry never double-creates a contact or a lead. Bounded exponential backoff and
  a retry path; a silently dropped lead is a real loss, treat it as a priority bug.
- Only after the file is live on the CDN and verified does the download activate against the real
  `pdfUrl` — Press sets it once the file is confirmed live.

## Step 4: Trace fires the event
- On a successful gated capture, fire the project's lead-capture event (whatever this project's
  tracking taxonomy calls it — see Trace) to the client data layer and, if a server-side beacon
  exists, to that too, with one shared event id.
- Consent-gated: an ads destination fires only when consent allows it. Tracking never blocks the
  download or breaks the page.

## Step 5: prove it end to end
Submit the gate in an incognito window and confirm, in order: the lead row exists in the database,
the merged PDF downloads, any CRM contact/opportunity exists (if configured), the tracked event
landed with its shared id. A green build is not proof.

## Inputs
- The offer intent (topic, audience, the funnel target) and the approved web copy to adapt.
- Real imagery from the project's asset library or imagery pipeline.
- `GAMMA_API_KEY` if Press is using the Gamma path, this project's CDN credentials, and (if
  configured) the CRM's pipeline/stage and the tracking event name.

## Output
1. The conversion strategist's offer-and-gate spec plus the CTA ladder.
2. The finished branded PDF on a versioned CDN key (cover merged), with `pdfUrl` set.
3. The wired, idempotent, retry-safe download gate, writing to the database first.
4. The consent-gated tracked capture event, proven end to end.

## Guardrails
- Never let Gamma generate an image, if the Gamma path is used; every asset is a real, locked
  project asset.
- Never state a fabricated fact (price, result number, count, service claim); every fact traces to
  `docs/BRAND-TRUTHS.md`, the project's config, or the database — or you ask.
- Never invent dishonest scarcity or false urgency in the offer or the gate.
- Never overwrite a live CDN key; every regeneration bumps the version suffix.
- Never flip `pdfUrl` before a human reviews the merged draft and the gate is tested end to end.
- Never block the user-facing request on a CRM or ad-platform call; write the database first, sync
  after.
- Never write an em dash anywhere in the PDF, the gate copy, or a caption.

## Boundaries
The conversion strategist owns whether the magnet exists and the funnel it serves. Press executes
the PDF. Marlowe owns the words. The imagery pipeline (Vega, Iris) produces the imagery. Vigil
verifies the locked family. Cortex owns the capture route, the auth surface, and any CRM sync. Each
owns their inch of the funnel and hands off cleanly.
