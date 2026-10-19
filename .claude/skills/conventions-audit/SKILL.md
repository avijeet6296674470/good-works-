---
name: conventions-audit
description: >
  Canon's audit of a file, directory or diff against docs/CODE-CONVENTIONS.md, the single
  engineering standard. Runs the two-pass review: (1) the mechanical pass, the same checks
  .claude/hooks/code_guard.py enforces (em and en dashes, raw colour outside the token file,
  arbitrary colour utilities, importance overrides, inline appearance styles, hosted font links)
  plus the token rules the hook cannot see per line, then (2) Canon's craft-and-structure read
  of the code (repeated section shapes, the symmetric card-grid crutch, boxy-everything, generic
  centre stacks, non-token values the grep missed, naming and typed-props discipline, facts
  sourced from the fact files). Reports findings split into HARD (must fix, blocks ship) and
  CRAFT (route to Onyx and Vesper), each with the exact fix. Part of /ship-ready.
---

# /conventions-audit: the code-conventions audit

Canon's audit of any file, directory or diff against `docs/CODE-CONVENTIONS.md`. Run it before code is marked done, and as part of `/ship-ready`.

The standard is not "does it lint" but **"is it hygienic AND unmistakably this brand"**. A component can pass every grep and still ship the generic look that is a defect here, because the site's whole argument is that this business is not the interchangeable option. This audit catches both. Findings come back split into HARD (blocks the ship) and CRAFT (routes to design), each with file, line and the exact fix.

## Canonical grounding (read first)
- `docs/CODE-CONVENTIONS.md`: the standard.
- `brand.config.json` `enforcement`: which rules are on, the token files, and `grandfathered`, the list of documented exceptions. **Telling an inherited exception apart from a fresh violation is most of the job.**
- `.claude/hooks/code_guard.py`: the mechanical rules pass 1 runs.
- `docs/BRAND-DIRECTION.md`: palette contrast law, typography, sub-brand systems, image grammar.
- `docs/BANNED-WORDS.md`: the string lint this audit spot-checks in code.

## Inputs
The target: a file, a directory, or a diff. Include the route file **and the components behind it**, not just the route, because the craft read needs the actual markup and the relevant tokens.

## How to run
1. Run pass 1. Record every hit with file and line.
2. Run pass 2 by opening the code. Walk each check.
3. Split findings into HARD and CRAFT. Give every finding the exact fix and its owner.
4. Output the findings table. The code is done only when every HARD item is fixed and every CRAFT item is resolved or routed.

## Step 1: pass 1, the mechanical checks (blocking)

The rules the guard enforces on edit, run here as greps over the whole target, scoped to `enforcement.sourceGlobs`:

- Em and en dashes in shipped strings; comments exempt.
- Raw colour values in code strings; colours live only in `enforcement.tokenFiles`.
- Arbitrary colour utilities, banned outright.
- Importance overrides; fix the specificity problem instead.
- Inline style objects not setting a custom property.
- Hosted font links; fonts are self-hosted.
- Raw colour values in stylesheets outside the token file.
- Anything in `enforcement.rules.bannedSchemaTypes`.

Plus the rules the hook cannot see per line:
- **Repeated arbitrary values.** An arbitrary size, radius or tracking that appears twice becomes a token or a utility. Route to `/css-portable-extract`.
- **Real image elements with alt.** Content imagery is a real element with alt, dimensions, lazy loading except the largest-paint element, and a source set where variants exist. A CSS background image is for decoration only. Hunt for background-image usage carrying content.
- **Grandfathered exceptions only** from `enforcement.grandfathered`, and each one should have a reason and an end date.

Every hit is a HARD finding. Fix the trivial ones directly, route the structural ones to Cortex, and re-run until clean.

## Step 2: pass 2, the craft-and-structure read

The grep cannot see the failures that matter most. Open the actual route and component files.

**Structure and the not-vanilla bar** (route CRAFT failures to Onyx and Vesper):
- **Repeated section shape.** Map the shape of each section down the page. Hero, three equal cards, another hero, three more cards is the number one template tell. Two adjacent sections sharing a shape means one gets redesigned.
- **The symmetric card-grid crutch.** Find every map into a symmetric equal-height card grid. Allowed only for a genuinely uniform set, and even then the symmetry gets broken with an offset, a varied span, or a feature item. The brand has its own motifs; use them.
- **Boxy everything.** Every block a rounded card with a soft shadow. Depth comes from layering, colour fields and typography, not from wrapping each thing in a box. Flag glassmorphism, gradient blobs and bento grids: none of them are any brand's system, which is exactly the problem.
- **The generic centre stack.** Centred heading over centred copy over centred button, all the way down. A strong left edge and deliberate asymmetry carry more force.
- **The one test.** For each section: with CSS off, is the document semantic and crawlable, with one H1, clean heading order, real text, and no headline baked into an image? With CSS on, could this section belong to any agency's template? If yes, it fails.

**Hygiene the grep missed** (HARD unless noted):
- **Headings.** Exactly one H1, levels never skipped, and a display line styled large is not promoted to a heading tag it does not deserve.
- **Non-token values.** A magic pixel value that should be a token, a near-literal hiding in a gradient or shadow, an arbitrary duration where a token exists.
- **Naming.** Consistent casing conventions for components, props interfaces, route files, hooks, utilities, constants and custom properties.
- **Typed props.** Every component has a typed interface, no untyped escape hatches, shared shapes imported rather than redeclared.
- **Facts sourced.** Every price, hour, duration, phone number or address in code comes from a fact file. A hardcoded fact anywhere else is HARD.
- **Single-source FAQ.** Visible text and markup render from the same array.
- **URL form.** Internal links match `urls.trailingSlash`.
- **The freeze.** If the diff touches anything in `stack.frozenSubsystems`, confirm only styling, tokens, approved copy or an approved fix changed. Logic drift is HARD and blocks everything.
- **Component reuse.** A new card, section or accordion duplicating something in the library is a defect. Extend the existing one.

## Step 3: split and route
- **HARD** (blocks the ship): every mechanical hit, plus non-token values, missing or untyped props, wrong heading structure, a hardcoded fact, freeze drift, duplicated components. Canon fixes the trivial mechanical ones directly and routes structural ones to Cortex.
- **CRAFT** (routes to design, does not go forward to Gate): repeated section shapes and dead sections to Onyx; boxy, symmetric, off-token or generic-centre-stack treatments to Vesper. **Canon does not hand-fix these**, because a craft failure patched to pass an audit is still a craft failure.

## Step 4: output

| Item | Kind | File:line | Rule | Fix | Owner |
|---|---|---|---|---|---|

## Guardrails
- Never pass code forward on a green grep alone. Pass 2 is the gate.
- Never let a repeated section shape, a symmetric card-grid crutch, boxy everything, or a generic centre stack ship. Route it.
- Never hand-fix a craft failure to force a pass.
- Never allow a raw colour outside the token file, an arbitrary colour utility, an importance override, or a hosted font link.
- Never write an em or en dash in a finding, a note or a fix.

## Done definition
Pass 1 clean, documented exceptions aside. Pass 2 walked, every HARD finding fixed or routed to Cortex and confirmed, every CRAFT finding routed to Onyx or Vesper. The findings table logged. The one test holds on every section. Only then does the code move forward to Gate.
