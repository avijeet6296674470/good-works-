---
name: polish-page
description: >
  Opens a LIVE, already-built page, screenshots it top to bottom, diagnoses look/feel/copy/
  scannability/AI-slop against the pack's own anti-slop checklists, and fixes it — structure first,
  then the project's real assets, then final polish. Use to take a page from "built" to genuinely
  compelling, on an existing page rather than a new build. Auto-fires on "polish this page", "make
  this page less AI-generated", "this page feels off", "tighten up this page", "make this more
  scannable".
---

# /polish-page: the diagnose-and-fix loop for a page that's already built

A page can pass `/ship-ready` and still read as generic. This skill is the loop that catches what a
mechanical gate can't: the wall of text nobody reads, the section that screams template, the CTA
that hides. It doesn't build new pages — that's `/page-build` — it takes an existing one and makes
it excellent.

## Canonical grounding (read first)
- **Canon's "named slop patterns"** and **Gate's "three-second slop test"** — the checklist this
  skill diagnoses against. Read those first rather than re-deriving a new list; this skill is the
  *procedure* that applies that existing checklist to a live page, not a second source of truth for
  what counts as slop.
- `docs/PAGE-TEMPLATE-LAWS.md` and `docs/BANNED-WORDS.md` for the copy side of the diagnosis.
- Whatever this project's own real asset kit is (spots, patterns, decorative motifs from the image
  grammar) — the fix's second pass reaches for these, never a generic stock look.

## The loop
1. **Look.** Screenshot the live page top to bottom — `scripts/shot.mjs` (headless, multiple
   viewports) or a browser automation tool if one's available. Force lazy images to load, wait for
   any reveal animations, capture every section, not just the fold.
2. **Diagnose** against the checklist:
   - **AI-slop patterns** (the #1 target — see Canon's list): uniform grids of identical cards, the
     same accent treatment on every block, walls of dense body text, label-then-sentence cards,
     verbatim-repeated section shapes. This is what makes a page read as machine-generated.
   - **Scannability.** Can a reader in a hurry get the point in three seconds? Are answers chunked,
     key phrases bolded, lists used where lists belong?
   - **Hierarchy and rhythm.** Does each section have a distinct shape, or is the whole page one
     texture top to bottom? Is the primary CTA obvious?
   - **Real assets.** Is the project's own asset kit used where it adds meaning, or is the page flat
     and un-punctuated?
   - **Copy.** The project's voice, no em dashes, no banned words, no filler.
3. **Fix, in this order — never skip ahead:**
   1. **Structure first.** Chunk dense text, add sub-heads, bold the scannable phrase, break a
      uniform grid into a featured item plus varied supporting items.
   2. **Then the project's real assets.** A decorative motif around a stat, a background pattern at
      low opacity, a divider that adds rhythm — never a sticker slapped onto unfixed structure. A
      graphic added to a wall of text is new slop, not a fix.
   3. **Then final polish.** Spacing, alignment, the small craft details.
4. **Re-look.** Screenshot again, confirm it genuinely reads better, iterate if it doesn't.

## Guardrails
- **Structure beats decoration.** If a section is unscannable, fix the text before reaching for any
  graphic.
- **Break repetition.** Never leave a grid of identical blocks — a featured-lead-plus-varied layout
  is the default cure.
- **On-brand only.** The project's real tokens, real voice, real asset kit. No new one-off styles
  invented for this one page.
- **Prioritize by what matters.** Run this on the pages that carry real traffic or conversion weight
  first — a legal page or a rarely-visited utility page doesn't need this pass.

## Boundaries
This skill diagnoses and fixes an existing page; `/page-build` builds a new one. Canon owns the
slop checklist itself; this skill applies it. `/component-build` handles a single surface in
isolation; this skill works the whole page as one pass.
