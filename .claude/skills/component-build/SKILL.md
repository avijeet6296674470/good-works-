---
name: component-build
description: >
  The 70 percent default. Use when building, adding or fixing a single component, widget, strip
  or styled surface, NOT a full new page. Sequences Vesper (design spec), Cortex (token code)
  and Fold (responsive audit), with an optional Marlowe copy pass when the surface carries
  visible text. Faster than /page-build, deeper than ad-hoc editing. Trigger words: build a
  component, add a section element, fix this styling, the button or card or strip is broken,
  overlapping, hidden, sticky bug, z-index bug, spacing bug, hover state, badge, pill, CTA band,
  wire an image into a component.
---

# /component-build: single-component lifecycle

The workhorse loop. One self-contained surface at a time: Vesper specs it, Cortex codes it against the tokens, Fold proves it responsive, Marlowe approves any visible text.

Design law for every surface is `docs/PAGE-TEMPLATE-LAWS.md`; where it conflicts with older guidance, it wins. The styling mechanism comes from `stack.css` and `stack.tokenSystem`. Whatever the mechanism, the rule is the same: **utilities are the mechanism, tokens are the vocabulary, and raw colour values are banned outside the token file.**

## Reuse before you build (read FIRST)

Check the project's own component library before building anything, and extend what is there. Build new only when nothing covers the surface, and new code must consume the tokens and match the library's patterns so it looks native. **Cloning a card, hero or accordion that already exists is a defect.**

**Frozen subsystems are restyle-only.** Anything in `stack.frozenSubsystems` accepts styling changes, token values and approved copy, nothing else. If the request needs frozen logic changed, STOP and escalate.

## When to invoke
Any prompt describing a self-contained surface rather than a full page: build a widget for a location, add an element to a section, fix a styling symptom, something is broken or overlapping or hidden, any stacking or sticky or z-index or spacing bug, any badge or pill or CTA element, or wiring an image into a component.

## Inputs (extract from the prompt, do not ask unless truly missing)
1. **What it is and does.**
2. **Location**: which route or component, above or below what.
3. **Copy**: pull existing approved strings first; flag if new copy is needed.
4. **Assets**: check the shipping asset root and the brand source first. A genuinely new image is a `/brand-image` job, never an inline generation.

---

## Step 0: check the library, then grep

Scan the component library for something that already does this. If it exists, extend it and stop. Then grep to confirm there is not a second local implementation of the same idea, which is how a codebase ends up with three different buttons.

If a pattern (a class combination, an arbitrary value) would appear on three or more surfaces, flag it for `/css-portable-extract` after this skill completes.

---

## Step 1: Vesper design spec

Produce a concise layout spec BEFORE any code. It answers:

- **Visual shape**: layout direction, dimensions, radius, background treatment, and which brand motif if any.
- **Colour**: which tokens. Palette and contrast law from `docs/BRAND-DIRECTION.md` and `palette.contrastLaws`. **The accent is the payoff**, marking the CTA or the price or the one thing that matters, never decoration. One sub-brand system per surface.
- **Typography**: which role for which text, from `type`.
- **Hover and focus**: what changes, duration, easing. **Always define the focus-visible state.**
- **Responsive transform**: how it changes from `market.primaryDeviceWidth` upward, mobile-first.

**CSS discipline, apply before writing a line:**

1. **The sticky containing-block trap.** Sticky range equals the containing block's height minus the element's height. If the parent is the same height as the sticky child, the range is zero and it scrolls away immediately. Make the WRAPPER sticky and the child relative. This one wastes more debugging time than any other layout bug, because nothing looks wrong in the code.
2. **Z-index scale.** Use the project's existing steps. Never sprinkle magic numbers; if a step is missing, add it as a token.
3. **Never blanket-position children.** A rule that sets position and z-index on every child silently breaks absolutely positioned decorations.
4. **Pair every prefixed property with its unprefixed form**, and verify in a second browser rather than assuming the build handles it.
5. **Mobile-first cascade.** Base classes ARE the primary-width design; wider variants layer on. Never design desktop-first and patch mobile, because the patch cascades downward into every narrower width.

---

## Step 2: assets (only if the component needs imagery)

Check `docs/ASSET-LIBRARY.md` and the shipping asset root BEFORE producing anything.

If an existing asset fits, use it, then hand to **Vigil** to confirm the right family is on this surface. If a genuinely new image is required it goes through `/brand-image` or `/generate-image`, never ad hoc inside this loop. Only optimised deliverables ship, inside `assets.maxImageBytes`.

---

## Step 3: Cortex code

- **Semantic markup first**, then classes. A typed props interface, no untyped escape hatches.
- **Tokens only**: every colour, radius, shadow and font through a token. No raw values, no arbitrary colour utilities, no importance overrides. Inline styles only for a custom property or a genuinely dynamic value.
- **Repeats become tokens**: an arbitrary size, radius or tracking used twice becomes a token or a utility.
- **Icons** from the project's single icon system, with decorative ones hidden from assistive technology.
- **Images**: real elements with alt, dimensions and lazy loading unless it is the largest-paint element, plus a source set where variants exist. Decorative images take empty alt; meaningful ones take real alt from Marlowe. **Reserve the box** so loading adds no reflow.
- **Data**: any rendered value imports from a fact file or comes from `BRAND-TRUTHS.md`. Never a hardcoded literal or an approximated number. Not in a source? ASK.
- **No em or en dashes** in any shipped string.

Type-check after writing, and flag only errors this component introduced. **A green type-check is not a build**; if the component is load-bearing, run the real build before calling it shipped.

---

## Step 4: Fold responsive check

**Viewports**, describing what renders at each: the primary device width (text wraps cleanly, targets at 44px, no horizontal overflow), the tablet breakpoint (layout transitions correctly, no collapsing gaps), and desktop (appropriate density, decorative layers positioned correctly).

**Structural**: any sticky element has a containing block taller than itself; any fixed element sits within the z-index scale; prefixed properties verified in a second browser; any fixed width over 300px on a flex or grid child flagged as an overflow risk; dynamic viewport units used where the static ones miscalculate on mobile. If the component sits on the conversion path, that path still works at the primary width.

---

## Step 5: Marlowe copy (only if the surface has visible text)

Pull existing approved strings first; write new only where nothing covers the slot. Voice per `voice` in the config and `docs/BRAND-DIRECTION.md`. Lint every string against `docs/BANNED-WORDS.md`. Every fact from `BRAND-TRUTHS.md` or a fact file. **Never defensive** — a component never explains what it isn't, or argues with an objection nobody raised. State the strength, show the proof, move on.

---

## Step 6: five-invariants check

The surface must leave all five no worse than it found them.

- **UX**: reserved box on every image, targets at 44px, focus-visible present, reduced motion respected, empty and error and loading states handled. If it sits on the conversion path, that path stays reachable.
- **Speed**: no oversized asset, no render-blocking addition, lazy where it should be. If it is a largest-paint candidate or touches the bundle, hand to Pulse.
- **SEO**: correct heading level. **A display line styled large is not a heading tag**, and promoting it to one to win visual weight is a real and common defect. Alt text on meaningful images, no important content trapped behind client-only rendering.
- **Structured data**: if the component feeds a JSON-LD node, it renders from the same source array as the markup, server-side.
- **Truth**: every rendered value traces to a source. Not in one? ASK.

If the surface touches speed, SEO or schema in a way this loop cannot fully verify, delegate to the owner and run `/ship-ready`.

## Done definition

- [ ] Five invariants held, or delegated to the owner plus the gate run
- [ ] Renders across the width range with no breaks and no horizontal overflow
- [ ] All touch targets at 44px or better
- [ ] Mobile-first: base classes are the primary-width design
- [ ] Tokens only; repeats promoted or flagged for `/css-portable-extract`
- [ ] Type-check clean with no new errors
- [ ] All visible copy linted, facts sourced
- [ ] Right assets used, imagery composed rather than generated ad hoc
- [ ] No existing library component duplicated
- [ ] The freeze respected
