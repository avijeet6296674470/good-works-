# Vertical overlays

The pack's core is vertical-neutral. These files carry the assumptions that
differ by business type, so an agent can be specific without being wrong.

Selected by `vertical.overlay` in `brand.config.json`. One per project.

| Overlay | For | Default |
|---|---|---|
| [`local-business.md`](local-business.md) | A physical place people go to | yes |
| [`saas.md`](saas.md) | A subscription product bought after evaluation | |
| [`ecommerce.md`](ecommerce.md) | A catalogue sold online | |
| [`agency.md`](agency.md) | A service business selling expertise | |
| `none` | No overlay. Agents ask instead of assuming. | |

`local-business` is the default because it is where this pack's depth actually
came from. The others are written to the same structure and are honest about
being thinner.

---

## What an overlay is allowed to contain

Every overlay answers the same nine questions in the same order, so swapping one
for another swaps a complete set of assumptions rather than leaving a mixture.

1. **What a conversion is**, ranked, plus the measurement trap that vertical
   walks into
2. **Funnel shape**, and where the visitor actually lands
3. **Page architecture**: the archetypes and what each one owns
4. **Schema**: which types, and which are forbidden here
5. **Off-site surfaces** that carry ranking or citation weight
6. **Conversion furniture**: the concrete on-page apparatus
7. **Analytics taxonomy**: stable event names
8. **What this overlay must not assume**
9. **Truth traps specific to this vertical**

Section 9 is the one to read first. Each vertical has its own characteristic
dishonesty, and knowing which one you are exposed to is worth more than the rest
of the file.

## What an overlay must never contain

- **Geography, currency, language or platform names.** Those live in `market`.
  An overlay that names a specific directory or map platform has smuggled a
  locale in and must be corrected. Refer to `market.citationPlatforms` instead.
- **Brand specifics.** No client names, no palettes, no voice.
- **Framework or stack assumptions.** The code layer is framework-agnostic.
- **Anything that contradicts the five invariants.** Overlays add specificity;
  they never lower the floor.

## Writing a new overlay

Copy the nine-section structure from `local-business.md`. Keep it under roughly
200 lines: an overlay is a set of assumptions, not a textbook. If a section has
nothing vertical-specific to say, write one line saying the core rules apply
unchanged rather than padding it.

Register it in `vertical.overlayOptions` in `brand.config.example.json`, add a
row to the table above, and add its question to `/init-brand`.
