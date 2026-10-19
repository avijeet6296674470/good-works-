---
name: css-portable-extract
description: >
  Use when promoting a repeated styling pattern into the design system: a repeated arbitrary
  value becomes a token, a repeated utility combination becomes a utility class in the token
  file, a repeated markup-plus-classes shape becomes a component in the library. Cortex and
  Vesper coordinate to spot the duplication, choose the right promotion level, migrate one
  usage, and log it so the next page reuses it instead of forking. Prevents the "five different
  hero class soups" problem. Trigger words: extract this, make this reusable, this section
  looks the same as X, promote to a token, we keep copying these classes, turn this into a
  shared component, stop duplicating this styling.
---

# /css-portable-extract: promote repeated styling into the system

Turn a copied pattern into a single source of truth so it stops being duplicated by hand. Cortex owns the code and the contract, Vesper owns the design parity.

The rule from `docs/CODE-CONVENTIONS.md`: **if an arbitrary value repeats twice, it becomes a token or a utility. A repeated section pattern becomes a component, not a copy.**

## The three promotion levels: pick the lowest that solves it

1. **A token**: a repeated *value*, meaning a size, radius, tracking, shadow or duration. Add it to the token file so it becomes a first-class utility. Every colour is already a token by law; this extends the same discipline to the other repeat offenders.
2. **A utility class**: a repeated *combination*, such as an edge treatment, a rotation-and-shadow stack, or an eyebrow label style. One rule in the token file, consumed as a single class.
3. **A component**: a repeated *markup shape*, meaning structure plus classes plus props. **Only when structure repeats, not just styling.** Check the existing library first; extending a component beats adding a fourteenth one.

Reaching for level 3 when level 1 would do is the common error, and it produces a component with nine props that nobody wants to touch.

## Five invariants, never regress

Extraction is a refactor, so the rendered output must be identical.

- **UX**: the promoted pattern keeps every reserved image box, target size, focus and reduced-motion behaviour, and every responsive variant from the original. Verify parity at each width.
- **Speed**: no new dependency, no heavier asset path, no change to loading strategy.
- **SEO**: a promoted component stays structure-agnostic. **It renders the heading level its consumer passes and never hardcodes one**, because a component that bakes in an H2 will eventually be used where an H3 belongs and nobody will notice.
- **Structured data**: any JSON-LD stays with the consumer route, never buried inside a shared component where it becomes invisible.
- **Truth**: parity means every literal value the source rendered is preserved exactly. A refactor never edits a fact. Any bulk character sweep is encoding-aware, never byte-mode.

## When to invoke
You are about to copy a class string from one surface to another: stop, extract first. A pattern exists in two or more places with minor variation. The same arbitrary value appears twice. A new page needs a treatment that already lives bespoke elsewhere. An audit flagged a pattern on three or more surfaces.

## Steps

### 1. Identify
Find the duplication: grep for repeated arbitrary values and count them, and grep for a distinctive class fragment across surfaces. Compare the duplicated sites and **separate what differs from what is shared**. The shared part gets promoted; the differences stay as props or content. Getting this line wrong is what produces an over-parameterised component.

### 2. Choose the level and name it
- Token names follow the existing vocabulary in the token file.
- Utility names **describe the treatment, not the page**, so any surface can adopt them. A utility named after the page it was born on will not be reused.
- Components use the library's conventions, with typed props.
- No leaking: a promoted utility or component reads only from tokens, never a raw value, and never assumes what wraps it.

### 3. Build the promotion
Add it at the chosen level, keeping every responsive variant, reserved box and interaction behaviour from the source. Type-check green.

### 4. Migrate the FIRST usage
Replace the bespoke pattern on ONE surface. Verify visual parity against the pre-extract state at every width, with Vesper signing off. Run `/responsive-pass` if the pattern is layout-bearing.

### 5. DO NOT mass-migrate
Other surfaces keep their bespoke classes and keep working. **Do not touch already-shipped pages just because they duplicate the pattern**, because a refactor with no functional benefit is pure regression risk. Schedule it as a separate opportunistic cleanup — this is exactly what Lattice (the design-system centralization agent) does as a dedicated pass; hand it the list rather than mass-migrating inline here.

The win compounds anyway: every NEW surface uses the promotion.

## Done definition
- The promotion exists at the right level: a token, a utility in the token file, or a typed component in the library.
- One usage migrated and verified, with rendered layout unchanged and parity confirmed at every width, and no speed, SEO, schema or truth regression.
- Type-check green, and the conventions audit's mechanical pass still clean: the promotion removed arbitrary-value hits rather than adding raw values outside the token file.
- Other duplicate-bearing surfaces logged for a future cleanup pass.
