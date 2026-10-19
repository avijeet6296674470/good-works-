---
name: ship-ready
description: Use as the final gate before marking a page or surface done. Runs the two-tier pre-ship gate. Tier 1 is the deterministic floor (type-check green, guard greps, image weight budget, freeze check). Tier 2 is the four-lens adversarial diff review plus runtime proof (request the route, grep the served HTML for content and JSON-LD) plus a green build plus Gate sign-off. Nothing commits as done without this skill passing.
---

# /ship-ready: the final gate

Run this against every changed surface before it ships. **Nothing is marked done, and nothing SEO-affecting commits, until this passes.** Gate coordinates and signs off; specialists own their lenses.

## The five invariants: the pass criteria

This gate certifies a change left all five no worse than it found them.

- **UX**: no layout shift, touch targets at 44px, real empty, error and loading states, and the mobile path into the primary conversion works. *(Fold.)*
- **Speed**: server response sane, bundle in budget, sized and lazy images, largest paint inside the budget derived from `market.networkBudget`. *(Pulse.)*
- **SEO**: one H1, clean heading order, absolute canonical in the project's URL form, unique title and description, alt text, internal links, nothing important behind client-only rendering. *(Beacon.)*
- **Structured data**: server-rendered JSON-LD, `@id` references rather than redeclarations, nothing from `truth.forbiddenClaims`, visible text and markup from one array. *(Weave.)*
- **Truth**: no fabricated or approximated fact. Every value traces to a fact file or `BRAND-TRUTHS.md`, or was ASKed. *(Marlowe and Beacon; every lens owns it.)*

Any one failing blocks the ship.

## Core principle, read this first, every time

**Build-green is not works. Verify, then trust. Runtime proof is required.**

- A type-check and a build prove the code compiles and bundles, not that it renders the right content. A ship claim needs the real served HTML of every touched route, with the content and the JSON-LD present in it. Never "it builds".
- After any bulk, scripted or agent edit, run the full build rather than just the type-check. And confirm any bulk character sweep was encoding-aware rather than byte-mode, because a byte-mode sweep silently corrupts multi-byte characters and the damage surfaces weeks later.
- Every review finding, human or agent, is **a claim to check against ground truth**, not a fact to act on. Anything you cannot reproduce is flagged, not shipped, and never silently fixed.
- **Report counts, not adjectives**: "3 routes requested, 3 H1s found, 3 JSON-LD blocks with the expected type, 0 images over budget."
- **Follow redirects before concluding a tag is missing.** A route that redirects shows nothing useful at the first URL, and reporting that as an absent canonical is a false finding that costs someone an hour.

Canonical rules this gate enforces: `docs/CODE-CONVENTIONS.md`, `docs/BANNED-WORDS.md`, `docs/BRAND-TRUTHS.md`, `brand.config.json` `enforcement` and `truth`, and the per-page gate in `docs/PAGE-TEMPLATE-LAWS.md`.

## The gate: two tiers

### Tier 1: deterministic, always, blocking

Run these mechanically. **If Tier 1 fails, STOP**, fix, and re-run before any Tier 2 work. This is the floor, not the ship decision.

1. **Type-check green.**
2. **The guard sweep**, the same rules `.claude/hooks/code_guard.py` enforces, run as greps across the whole target rather than per edit: em and en dashes in shipped strings, raw colour values outside the token file, arbitrary colour utilities, importance overrides, hosted font links, and anything in `enforcement.rules.bannedSchemaTypes`. Zero matches required, the documented `enforcement.grandfathered` exceptions aside.
3. **Image weight budget**: nothing over `assets.maxImageBytes` ships without a written reason.
4. **Freeze check**: diff every path in `stack.frozenSubsystems`. Any change there must be styling, token values, approved copy, or an explicitly approved fix. **If logic moved, STOP.**

### Tier 2: the full gate

Run deliberately before anything is declared done. Beyond Tier 1 it must include, in order:

**1. Four-lens adversarial review of the diff.** Four lenses against the changed surfaces, each returning ranked findings:
- **Correctness (Cortex)**: logic errors, broken props, dead paths, freeze drift, facts hardcoded outside the fact files.
- **SEO and schema (Beacon and Weave)**: heading, title, meta and canonical per the conventions; markup and DOM parity; `@id` discipline; single-source FAQ; keyword slots per the ownership map.
- **UX and responsive (Fold)**: primary width first, overflow, touch targets, zero-item self-hide, real-data overflow.
- **Conventions and brand (Canon and Vigil)**: token discipline, `/conventions-audit` clean, the right assets on every surface, banned words, no fabricated proof.

Gate **verifies every load-bearing finding against ground truth before accepting it**: reproduce it in the rendered HTML or the source file, or flag it. Do not act on unverified claims, and do not let a plausible-sounding finding become a change.

**2. Runtime proof, mandatory.** A green build first, then with the server running, for every route touched: confirm the H1 is present in the initial served HTML rather than rendered later, a load-bearing fact is present, the JSON-LD block is present with the expected type, and the canonical is absolute and in the project's URL form. Record counts.

**3. A green production build.** A green type-check is not a build.

**4. Specialist audits**: `/performance-pass`, `/responsive-pass`, `/conventions-audit`, the polish pass, and the brand-asset check.

**5. Ledger check.** Every SEO-affecting change in the diff has its row in `enforcement.ledgerFile`. If it is not in the ledger, it did not happen.

**6. Gate sign-off.**

## Steps

**1. Gate: page-level completeness.** All required sections present per the approved section list; schema validates; internal links resolve with no 404s; all images have alt text; the mobile conversion path works end to end; no console errors. **Content-source parity** is part of this: page copy matches its deck, FAQs match the bank word for word, metas match the content plan. Drift in either direction fails, and shipped edits flow back into the deck before sign-off.

**2. Sheen: polish and integration.** Content bloat cut, missed cross-page integration found, asset cross-pollination, UX micro-patterns.

**3. Pulse: performance.** Against the budget from `market.networkBudget`, not against a generic target.

**4. Fold: responsive.** Zero horizontal overflow, targets at 44px, primary width first, every list self-hiding at zero items, and any frozen flow still usable at the primary width.

**5. Runtime proof** for every touched route, recorded as counts.

**6. Build proof.** Type-check and production build both green. If anything deploy-relevant changed, update the reinstatement checklist. **When the route being verified is a live deployment, not a local dev server, confirm the live build actually is the build just pushed, not a stale or failed one wearing a "success" status** — check for an unambiguous marker unique to this change (a string, an element, a build ID that did not exist in the previous build). A shared or generic marker lies just as easily as no marker at all; only something new to this specific build proves the deploy is real.

**7. Gate sign-off.** Gate walks the Tier 1 catalogue against the diff, verifies each finding against ground truth, confirms the ledger rows, and only then signs.

## Done definition

- Tier 1 passed.
- Tier 2 complete: the four-lens review with all load-bearing findings verified or resolved, runtime proof recorded as counts, a green build, all specialist audits passed, ledger rows present.
- Gate emits the sign-off line into the ship report:
  ```
  PRE-SHIP GATE: Tier1 PASS | 4-lens PASS (N findings, all verified/resolved)
  | runtime proof PASS (route -> H1/fact/JSON-LD counts) | typecheck PASS | build PASS
  | ledger rows N | Gate SIGNED OFF
  ```
- A short note appended to the session log.
- **Only now is the surface marked done.**
