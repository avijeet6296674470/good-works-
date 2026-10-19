# Token architecture

How design tokens are named, grouped and enforced, whatever the CSS mechanism.

---

## The one rule

**Every colour, radius, shadow, font, and every repeated spacing or timing value
comes from a token. Raw values live in exactly one file and nowhere else.**

That file is `enforcement.tokenFiles` in the config, and the code guard enforces
it. Everything below is how to make that rule survive contact with a real build.

---

## Groups

Namespace by role, not by appearance. `--color-accent`, never `--color-orange`.

| Group | Holds | Notes |
|---|---|---|
| `--color-*` | Every colour in the palette, by role | The largest group by far. |
| `--font-*` | The typeface stack per role | Display, body, and any third role. |
| `--text-*` | The type scale | Sizes with their line heights, not sizes alone. |
| `--radius-*` | Corner radii | Three or four steps. More is indecision. |
| `--shadow-*` | Elevation | Including any non-standard treatment the brand uses. |
| `--space-*` | The spacing scale | Only if the framework does not already provide one. |
| `--z-*` | The stacking scale | **Name every layer.** See below. |
| `--motion-*` | Durations and easings | |

**Why role names.** A token called `--color-orange` becomes a lie the day the
brand's orange becomes red, and by then it is used in ninety places. A token
called `--color-accent` survives a rebrand as a one-line change.

## The stacking scale

Name every layer that exists, and use nothing else:

```
--z-base        content
--z-raised      cards, elevated surfaces
--z-sticky      the mobile rail, sticky bars
--z-header      site header
--z-overlay     backdrops
--z-modal       dialogs, drawers
--z-toast       transient messages
```

**A magic z-index number in a component is a defect.** It works until two
components disagree, and then it is a debugging session, because the numbers say
nothing about intent. If a layer is missing, add it here rather than picking a
number.

## Promotion: when a value becomes a token

**A value used twice is a token.** Not three times, not five. Twice.

Three promotion levels; pick the lowest that solves it:

1. **A token**, for a repeated *value*.
2. **A utility**, for a repeated *combination* of properties.
3. **A component**, for a repeated *markup shape*, and only when the structure repeats, not just the styling.

Reaching for level 3 when level 1 would do produces a component with nine props
that nobody wants to touch. Route through `/css-portable-extract`.

## Naming utilities

Utilities describe **the treatment, not the page**. A utility named after the
page it was born on will never be reused on another one, which defeats the
purpose of promoting it.

## Semantic aliases

Where a framework or a component library expects specific token names, alias
them to the brand roles rather than duplicating values:

```
--color-primary:  var(--color-accent)
--color-card:     var(--color-surface)
```

**One source value, many names.** Duplicating the hex means the two drift, and
the drift is invisible until a rebrand.

## What the guard enforces

From `enforcement.rules`:

- No raw colour values outside the token file.
- No arbitrary colour utilities.
- No importance overrides.
- No inline styles except a custom property or a genuinely dynamic value.
- No hosted font links.

**Test the guard after installing it.** It fails open by design, so a
misconfigured guard is indistinguishable from a passing one. Break a rule on
purpose in a policed file and confirm it blocks.

## Documenting the tokens

The token file is the machine-readable source. `docs/BRAND-DIRECTION.md` section
1 is the human one, and it carries what the token file cannot: **the accent rule,
and the contrast law.**

Those two are the difference between a palette and a design system. A token file
lists colours; only the prose says which one is the payoff and which pairing is
forbidden.
