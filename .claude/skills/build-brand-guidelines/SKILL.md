---
name: build-brand-guidelines
description: Assemble the Brand Guidelines DOCUMENT from the locked assets plus generated imagery, laid into a polished, navigable HTML deck rendered to PDF. Use to produce or update the brand book (cover, big idea, logos, colour, type, sub-brands, image grammar, iconography, motion, voice, applications). Directed by Vega, imagery by Iris. Built section by section, reviewable at every step.
---

# /build-brand-guidelines: assemble the brand book

Produce the Brand Guidelines document. Content comes from two sources only: **the locked assets in the brand source directory**, and imagery generated through `/brand-image` and `/visual-language-explore`.

The written law it documents is `docs/BRAND-DIRECTION.md`, and **the book never contradicts it**. Built section by section, each reviewable and revisable, never a one-shot dump. A brand book produced in one pass is a brand book nobody agreed to.

## What it produces
A navigable document, written to a working output path this project has chosen for internal deliverables:
- An HTML index and stylesheet, **set in the brand system itself**, because a guidelines document that does not follow its own rules is not credible.
- An assets folder: brand assets copied from the source, plus generated imagery with prompts logged.
- The PDF deliverable, rendered via `$WEBSITE_PACK/scripts/pdf.mjs` with backgrounds printing.

## The section blueprint

1. **Cover.** The primary lockup on a brand surface, with one charged moment from the system.
2. **Contents.**
3. **The big idea.** `identity.promise`, the positioning, and what the business actually is.
4. **Voice.** The modes from `voice.modes`, each with what it is for and a real example, the tagline bank, the copy formula, and a pointer to the banned-words file.
5. **Logos.** Every lockup and every variant, which background each sits on, the compact mark and where it is mandatory, clear space, minimum sizes, and the dos and don'ts.
6. **Colour.** The palette table with exact hexes, the contrast law from `palette.contrastLaws`, and the accent rule: it marks the one thing that matters, never decoration.
7. **Typography.** Each face with its role and, critically, **what it is not for**. Licence position recorded.
8. **Sub-brands.** The system table from `identity.subBrands`, and the rule that two systems never share one surface.
9. **Image grammar.** The grammar shown with real examples: the ground treatment, framing, how subjects sit, overlays, type over image, the motifs. Plus `imagery.peopleTreatment` with sample plates, and **the do-not wall**, which is the most-used page in any brand book.
10. **The decorative library.** Every pattern, frame and overlay, with usage notes.
11. **Motion.** The restraint, the one-moment-per-page rule, reduced motion, and where a sub-brand may break the restraint.
12. **Applications.** The site, share cards at the right dimensions, avatars, and any physical surface the brand touches.

## Procedure
1. **Read** `docs/BRAND-DIRECTION.md` and `docs/BRAND-TRUTHS.md`, and inventory the brand source. Confirm with Vega which sections are ready and which still need imagery.
2. **Generate missing imagery**: `/visual-language-explore` if the treatment is not settled, then `/brand-image` to finish the chosen one. Costs logged against the budget.
3. **Lay out each spread** in semantic HTML and CSS using the brand system. **Set type in HTML for crispness**; baked-in image text only where the image IS the specimen.
4. **Render to PDF** with backgrounds on.
5. **Review section by section with the user.** Spreads are proposals. Capture agreement and disagreement, revise, and **when a decision lands, update `docs/BRAND-DIRECTION.md` so the law and the book stay in sync.** A book that drifts from the law is worse than no book, because people follow the pretty one.

## Guardrails
- The book **documents** the locked system; it does not invent. Any new device goes through the user before it enters the book.
- Facts in the book come from `docs/BRAND-TRUTHS.md` only.
- No em or en dashes anywhere in the book's copy, and no banned words. A guidelines document that breaks its own lint is a self-inflicted wound.
- All imagery through the one provider, prompts logged and reproducible, costs reported.
- Marks are sacred: never recoloured, stretched, skewed or reconstructed, always the correct variant for the background.

## Dependencies
The skills `/brand-image`, `/visual-language-explore` and `/html-to-pdf` · `$WEBSITE_PACK/scripts/pdf.mjs` · the brand source directory · `docs/BRAND-DIRECTION.md` · `docs/BRAND-TRUTHS.md` · `docs/ASSET-LIBRARY.md`.
