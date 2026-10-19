---
name: brand-asset-integrity
description: Use to verify the RIGHT LOCKED ASSET is used everywhere it appears: card, hero, section background, social share card, schema image, favicon and logo lockups. Verified by reading pixels and tracing the reference, never by trusting a filename. Vigil leads the audit, the discrepancy report and the pre-ship guardrail, pulling Marlowe for alt copy, Pulse and Cortex for optimisation and wiring, Weave for the schema image, and Vega for brand-fit and new-asset decisions. Auto-fires on "is the right asset used everywhere", "wrong image", "brand-asset audit", "which asset is this surface using", any image audit, and the pre-ship asset gate.
---

# /brand-asset-integrity: the right-locked-asset-everywhere audit

Confirm every surface shows the right locked asset in the right variant for its background. A wrong, ad-hoc or off-variant asset standing in for a locked one is a brand-trust failure.

**Verify by reading the pixels and tracing the code reference, not by trusting a path.** A file named like the logo is not the logo, and this is the single most common way an audit produces a false pass.

## Canonical grounding (read first)
- `docs/BRAND-DIRECTION.md`: the palette hexes, the asset inventory, the contrast law, the sub-brand systems.
- `brand.config.json`: `assets` (the brand source, the shipping root, the size ceiling), `identity.subBrands`, `identity.nameRule`, `imagery.approvedInSceneText`.
- `docs/ASSET-LIBRARY.md`: what exists, web-ready.
- The brand source directory: the masters, in every issued variant.

## The locked roster
Take it from `docs/ASSET-LIBRARY.md` and the brand source. Every project's roster differs, but the shape is constant: a primary lockup in several variants, **a compact mark that is the only one legible at small sizes** (the favicon, app icon and avatar mark, always), a wordmark per sub-brand, and the decorative set of patterns, frames and overlays.

Icons come from one system only. A second icon system on the same site is a defect even when both look fine.

## The four laws of asset integrity

1. **Right locked asset.** The mark on a surface is the actual locked file or an approved optimised derivative, never a look-alike, a redrawn version or a generated imitation. Confirm by reading the pixels.
2. **Right variant for the background.** Dark variants on light surfaces, light variants on dark and on busy imagery. Each sub-brand's surfaces carry that sub-brand's own mark. **A sub-brand's devices never appear on another system's surface**, and vice versa.
3. **One coherent family per surface.** The hero, the card, the share image and the schema image for the same page agree with each other. The favicon and every avatar is the compact mark. The share card is exactly the dimensions the platform expects.
4. **Honest, optimised, described, sacred.** Sized modern-format variants served from the project's own asset root, real image elements with a source set, descriptive alt on meaningful images and intentional empty alt only on genuine decoration, everything inside `assets.maxImageBytes`. The marks are never recoloured, skewed, stretched or reconstructed. Alt text and nearby copy carry no dashes and no banned words.

## Steps

### 1. Map every reference
Grep the asset names across the source and the shipping root. Enumerate: cards, hero, feature rows, section backgrounds carrying patterns or frames, the share image, the schema image, the favicon and app icons, and every logo lockup.

**Trace each one: surface, to import or URL, to the actual file bytes.** The resolver chain is where the bug hides, and it is invisible unless you walk it.

### 2. Look: read the pixels
Open the served asset AND the locked master. Compare mark geometry, variant, palette hexes and background pairing. Sample actual hex values where fidelity is in question.

Classify each surface: correct asset and variant, wrong asset, wrong variant for its background, ad-hoc or generated imitation, recoloured or skewed mark, palette drift, or mismatched against the other surfaces on the same page.

### 3. Discrepancy report
Per surface: file and line, the current asset path, the verdict, the expected locked asset and variant, and the surface it breaks. **Rank by visibility**: favicon, hero and share image first, because those are the ones seen by people who never reach the page.

### 4. Fix
Pull the correct master from the brand source, optimise to sized web-weight variants, and place under the shipping root. **Never edit the source archive.** Update the reference, then re-verify by re-reading the served file rather than assuming the edit worked.

### 5. Guardrail
Wire or extend a deterministic pre-ship check: every mark reference resolves to a file that matches an approved derivative of a locked master; the favicon is the compact mark; the share image exists at the right dimensions for every indexable page; the variant matches its background; nothing exceeds the size ceiling; no content image is missing descriptive alt.

### 6. Generalise
Run steps 1 to 3 across every key page. **If one surface drifted, others have.** Leave a per-page asset-family map as the record.

## Output
1. The per-surface discrepancy report, ranked by visibility.
2. The fix, with re-verification of every surface.
3. The pre-ship guardrail entry.
4. A per-page asset-family map.

## Guardrails
- Never trust a filename. "It looks like the logo" is not verification.
- Never accept a generated or redrawn imitation where a locked master belongs. **New assets are Vega's call, never an audit side effect.**
- Never allow a variant against background mismatch, or a sub-brand system mix.
- Never allow a recoloured, skewed or stretched mark, or the accent used as decoration instead of the single payoff.
- Never write an em or en dash in a report, a note or an alt-text suggestion.

## Boundaries
Vega and the creative panel own whether an image earns its place and the generation of new assets. Marlowe owns alt-text wording; Vigil flags weak or missing alt and hands over the wording. Pulse and Cortex own image performance and the wiring; Vigil specs the fix, they implement. Weave owns the schema node; Vigil verifies its image resolves to the right family.
