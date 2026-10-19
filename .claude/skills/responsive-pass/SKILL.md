---
name: responsive-pass
description: Use when auditing a page or component for mobile, tablet and desktop correctness. Fold kills horizontal overflow at the source, enforces 44px touch targets, converts rigid card grids to scroll-snap rails on mobile, keeps inline meta rows from wrong-stacking, and audits intrinsic spacing so it looks deliberate at every viewport. The project's primary device width comes first, and the conversion flow must work there too. Auto-fires on any layout or styling work and inside /ship-ready. Ranks findings by conversion impact: the conversion path beats visual polish. Routes paint or bundle risk to Pulse, copy to Marlowe, section kills to Onyx, design taste to Vesper.
---

# /responsive-pass: the mobile, tablet and desktop audit

Fold's canonical responsive audit. One question decides every fix: **does this help a visitor arrive, understand, trust and convert, on the phone in their hand?**

Pixel-perfect at every viewport is not the goal. Conversion at `market.primaryDeviceWidth` is. If the primary action sits 20px past the right edge, the promise breaks before it is made.

## Canonical grounding (read first)
If anything below conflicts with a source, the source wins.
- `brand.config.json`: **`market.primaryDeviceWidth` is the width you optimise first and sign off last.** Plus `market.networkBudget` and `stack.frozenSubsystems`.
- `docs/CODE-CONVENTIONS.md`: token discipline, image rules, the freeze.
- `docs/BRAND-DIRECTION.md`: contrast law and the type system.
- `stack`: the breakpoint mechanism this project uses, mobile-first.
- `docs/PAGE-TEMPLATE-LAWS.md`: the asset weight budget, and the rule that **the zero-overflow check is programmatic at real widths rather than an eyeball**. Also any known screenshot-tool races, so a QA artefact is not misread as a site bug.

## When to invoke
A new page is shipping. A component was added or modified. A page feels broken on mobile. Anything touched layout, grid or spacing.

## Steps

### 1. The breakpoint set, mobile-first
Base classes ARE the primary-width design; wider variants layer on. The working set: the primary width (plus a sanity check at the narrowest realistic width, usually 320px), tablet, desktop, and wide.

### 2. The checklist, run at each breakpoint
Grep before reading: hunt fixed widths, wide grid templates and sticky elements to narrow the suspect surface, then read.

- **Horizontal overflow, killed at the source.** No horizontal scrollbar anywhere. The fix is a zero minimum width on the leaking child plus a proper minmax on the grid, a zero minimum on flex text children, a scrolling wrapper on tables, and a maximum width on images. **Never mask it with a hidden overflow on the parent**, which hides the symptom and keeps the bug.
- **Grid to rail on mobile.** Below the tablet breakpoint, any card grid of three or more visual items becomes a horizontal scroll-snap rail with a peek of the next card. Textual sequential lists stay stacked; an accordion stays an accordion.
- **Inline meta rows never wrong-stack.** Price strips, hours rows and chip rows wrap; they are never forced into a column. Stacking a two-item inline row is the most common wrong instinct on mobile.
- **Touch targets.** 44px is the floor; conversion-path buttons want 48px or more, with 8px of air between adjacent targets. Icon-only buttons get padding to reach the floor even when the glyph is small.
- **Text readability.** Line length at most about 75 characters, and a sensible body floor on mobile. Display headlines must wrap without breaking words awkwardly at the primary width.
- **The conversion path, tested every time.** From mobile arrival, reach the conversion in three taps or fewer, AND the flow itself works at the primary width: every step renders, every picker is usable, the handoff is reachable. Fixes inside a frozen flow are styling only.
- **Intrinsic spacing.** Step 3. Not optional.

### 3. Intrinsic spacing, never skip
The most commonly missed category. Even when nothing overflows, spacing can look unintentional, and unintentional spacing reads as cheap.

Check at the narrowest width, tablet and wide:
- Do section-to-section gaps sit on the spacing scale rather than on bespoke per-component values?
- Is every section's vertical padding proportionally right at mobile, not a desktop value shrunk down? **A desktop-scale padding on a narrow screen eats a quarter of the viewport before content starts.**
- Do the junctions between hero, first band and following section feel designed? Decorative edges must not collide with text at narrow widths.
- Does each section carry the density its type wants: hero open, cards scannable, the CTA band compact?

### 4. Business-impact prioritisation
- **P0**: blocks the conversion path on mobile. A hidden primary action, a modal that traps the user, a step unusable at the primary width, a sticky element with zero sticky range. Fix immediately.
- **P1**: degrades trust or understanding on mobile. Overflow, broken images, illegible text, spacing failures that obscure hierarchy. Fix the same session.
- **P2**: visual polish. Batch later.

### 5. Variant-coverage check, mandatory after every responsive change
A base class applies at every width unless a variant overrides it. After changing any base or variant, walk every width and ask whether each affected property still makes sense there. **A wide-breakpoint override with a broken base is an incomplete fix**: fix the base, then layer variants, or the damage cascades into every narrower width.

### 6. Zero-item and cross-browser smoke
- Force the zero-item state. Every list, carousel and rail self-hides at zero items, with no dangling heading and no empty rail. Placeholder filler hides the real overflow that ships to users.
- Smoke-test a second browser engine, which silently ignores rules the first one honours: check any backdrop effect, replace static viewport units with the dynamic ones for full-height surfaces, and respect the safe-area inset on edge-anchored fixed elements.

## Inviolable-rules check
Fold applies the mechanical fixes directly, then holds the line:
- **Speed**: solve overflow with layout constraints, never with a heavier wrapper image or an eager-loaded rail. Anything risking the largest paint routes to Pulse for clearance before shipping.
- **SEO**: never reorder the heading outline, and never hide real content a crawler needs. **If a section has no value on mobile it gets killed, not hidden**, and the kill is asked of Onyx first.
- **Structured data**: a collapsed or reflowed section keeps its server-rendered markup present and in sync.
- **Truth**: never change a visible number to make it fit. Shrink the wording via Marlowe, never the fact.
- **Brand**: never introduce a new colour or override a font token.
- **The freeze**: fixes inside a frozen subsystem change styling only, never markup order that logic depends on, and never a handler.

## Useful greps
Hunt: static viewport units that should be dynamic; fixed pixel widths that can overflow narrow viewports; wide grid templates as candidates for rail conversion; every sticky element, checked for zero sticky range; and base classes carrying obviously desktop-scale values with no narrower variant beneath them.

## Done definition
Zero horizontal overflow at every width, verified programmatically rather than by eye. All conversion-path targets at 44px or better. The conversion flow usable at the primary width. Spacing on the scale. Zero-item states self-hiding. The second browser engine smoke-tested. Every P0 and P1 fixed, P2 logged. Anything risking speed, SEO, schema or a fact routed to its owner rather than solved locally.
