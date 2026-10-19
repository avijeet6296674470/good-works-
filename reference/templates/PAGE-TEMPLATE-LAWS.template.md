# <FILL: BRAND NAME> — PAGE TEMPLATE LAWS

**The design law for every page after the first.**

Where this file conflicts with older guidance, **this file wins.**

> **Write this AFTER the first page locks, never before.**
>
> Written up front it is a guess. Written after one page has survived design,
> build, responsive and a real review, it is the most valuable document in the
> set: it holds the recipe that worked, the calibration that took three
> attempts, and the trap that cost an afternoon.
>
> Every later page inherits all of that instead of rediscovering it. That is the
> entire return on the document, and it only exists if the laws are extracted
> while the reasons are still fresh.

---

## 1. The hero recipe

<FILL: exactly what the locked hero is made of, in order. The elements, their sizes, what carries the largest paint, what sits on top of what, and what is reserved empty.>

**The gate**: <FILL: the test a hero must pass. Typically: it says what this is, shows it, and offers one action in the accent colour. A hero that could belong to any business in the category fails automatically.>

## 2. Spacing and rhythm

<FILL: the section cadence that survived review. The vertical scale, the alternation rule, and the junction treatments.>

## 3. Decorative asset calibration

<FILL: the sizes that actually work, per placement. This is the section that saves the most time, because "make it a bit smaller" is discovered independently on every page otherwise.>

**The layering law**: <FILL: the stacking order, as a rule rather than a set of numbers. Which layer may never be covered, and by what.>

> Layering rules are the ones that get broken silently, because a covered
> element still exists in the markup and only looks wrong on one breakpoint.

## 4. Interrupt patterns

<FILL: any pattern-interrupt device the brand uses, and critically, its rate limit and where it is allowed. An interrupt used everywhere stops interrupting, which is the whole physics of the move.>

## 5. Type and icon truths

<FILL: the practical discoveries. Which sizes actually work at which widths. Which glyphs are safe.>

**<FILL: any font trap.>** <FILL: partial or demo font cuts that render certain characters as a watermark, faces whose numerals are unusable at small sizes, an icon set whose glyph names changed between versions. Obscure, and each one has reached production somewhere. Anything mechanical here also goes into `enforcement.rules.fontDigitTraps`.>

## 6. Imagery and weight

<FILL: the locked styles, and the reuse rule.>

**Every referenced asset stays within <FILL: `assets.maxImageBytes`>.** Recompress and downscale to roughly twice the rendered width.

**The largest-paint element is eager and prioritised. Everything else is lazy.**

<FILL: any known QA-tooling race, for example a screenshot tool that force-decodes lazy images so an empty frame in a capture is a tool artefact rather than a site bug. Write it down: it will be misdiagnosed at least once otherwise.>

## 7. The per-page gate

The checklist every page passes before it ships. Gate reads this section.

- [ ] <FILL: each law above, restated as a check>
- [ ] <FILL: the hero gate>
- [ ] <FILL: the layering law>
- [ ] <FILL: the weight budget>
- [ ] Zero horizontal overflow, verified programmatically at real widths rather than by eye
- [ ] <FILL: anything else the first page taught you>

## 8. In-page voice reminders

<FILL: the voice traps that only appear once a page is assembled and you can see all the copy together. A claim stated twice. Two of the same joke on one page. Decorative chips that read as buttons. These are invisible in a copy deck and obvious on the built page.>

---

## Adding a law

When a page teaches something the next page should not have to relearn, **add it
here in the same session**, while the reason is still known.

A law with no reason attached gets deleted by whoever finds it inconvenient. Write
the reason.
