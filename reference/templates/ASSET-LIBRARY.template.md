# <FILL: BRAND NAME> — ASSET LIBRARY

What exists, web-ready, and how it was made.

**Read this before commissioning anything.** The creative panel checks it first,
and Vigil audits against it.

> **Why an inventory rather than just a folder.** A folder tells you a file
> exists. It does not tell you what the file is for, which variant it is, what
> prompt made it, or whether the near-identical one next to it is the newer
> version. Without those, the cheapest path is always to generate a new one, and
> that is how a brand ends up with four almost-matching heroes.

---

## The reuse rule

**Existing asset, then derived asset, then new generation. In that order.**

A regenerated version of an existing subject never matches the one already
shipped. The mismatch is more visible than either image would have been alone,
and it costs money to create.

Deriving is free: crop, recolour within the palette, resize, reframe. **Never
regenerate to fix a crop.**

---

## Brand masters

Source: <FILL: the brand source directory. Never edited, only read from.>

| Asset | Variants | Format | Use |
|---|---|---|---|
| <FILL: the primary lockup> | <FILL: which backgrounds each variant is for> | <FILL> | <FILL> |
| <FILL: the compact mark> | <FILL> | <FILL> | **The only mark legible small. The favicon, app icon and every avatar.** |
| <FILL: sub-brand marks> | <FILL> | <FILL> | <FILL> |
| <FILL: patterns> | | <FILL> | <FILL> |
| <FILL: frames> | | <FILL> | <FILL> |
| <FILL: decorative overlays> | | <FILL> | <FILL> |

## Shipping assets

Root: <FILL: `assets.brandRoot`>. Optimised copies. **Every served asset traces
back to a locked master or a logged generation.**

| Path | What | Where used | Bytes | Source |
|---|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> | <FILL: the master, or the generation record> |

**An asset in this folder with no traceable source is the bug.** It means
something improvised got wired to a surface, and it will drift.

## Generated imagery

| Asset | Subject | Model | Size | Cost | Prompt record |
|---|---|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> | <FILL> | <FILL: where the exact prompt is stored> |

**The prompt record is the point of this table.** A prompt that produced a
keeper is a reusable recipe: it is how the next asset matches, and it is the
single biggest cost saver available. An asset with no recorded prompt cannot be
extended, only replaced.

**Raws and masters** live at <FILL: outside the shipping folder>, permanently.
Only optimised deliverables ship.

## Reference set

<FILL: the approved style references. The images that define what "on-brand" looks like for this project, which a new generation is judged against.>

## Cast

<FILL: where the brand renders recurring people or characters: the canonical reference for each, generated once. Regenerating a cast member from scratch will not match, and that is the whole reason this section exists.>

---

## Gaps

| Needed | For | Blocked on | Priority |
|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> |

## Retired

| Asset | Retired on | Replaced by | Why |
|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> |

> Keep the retired list. Without it a superseded export gets rediscovered in an
> old folder and wired to a new surface, and it looks correct to everyone who
> did not remember it was replaced.
