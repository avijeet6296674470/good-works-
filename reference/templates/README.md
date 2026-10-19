# The governance doc templates

These are the documents that give the agents their teeth. Without them the cast
is a set of opinions; with them it is a system that can refuse work.

`/init-brand` generates a project's copies from these. You can also copy one by
hand when a project grows into needing it.

---

## How a template is written

Every template has three kinds of content, marked so you can tell them apart.

| Marker | Meaning |
|---|---|
| Plain prose | **Keep it.** The reasoning is the point, and deleting it is how a governance doc decays into a form nobody reads. |
| `<FILL: ...>` | Replace with the project's answer. |
| `> Why this section exists` | The failure it prevents. Read it once; keep it if the team is new to the pack. |

**An empty section is a finding, not a formatting problem.** A truths file with
no pricing table on a business that charges money means nobody has established
what the prices are, and that is worth surfacing rather than tidying away.

---

## The documents

**The four that everything reads.** Generate these on every project.

| Template | Becomes | Read by |
|---|---|---|
| `BRAND-TRUTHS.template.md` | `docs/BRAND-TRUTHS.md` | Every agent, every skill. The keystone. |
| `BANNED-WORDS.template.md` | `docs/BANNED-WORDS.md` | Every copy surface, and the guard |
| `BRAND-DIRECTION.template.md` | `docs/BRAND-DIRECTION.md` | Design and the creative panel |
| `CODE-CONVENTIONS.template.md` | `docs/CODE-CONVENTIONS.md` | Cortex, Canon, and the code guard |

**The build layer.** Generate when the project starts building pages.

| Template | Becomes | Read by |
|---|---|---|
| `CONTENT-PLAN.template.md` | `docs/CONTENT-PLAN.md` | Onyx, Beacon, Marlowe, Atlas |
| `PAGE-TEMPLATE-LAWS.template.md` | `docs/PAGE-TEMPLATE-LAWS.md` | Everyone building a page. **Written after the first page locks**, not before. |
| `CHROME-SPEC.template.md` | `docs/CHROME-SPEC.md` | Atlas, Cortex |
| `ASSET-LIBRARY.template.md` | `docs/ASSET-LIBRARY.md` | The creative panel, Vigil |
| `ICON-SYSTEM.template.md` | `docs/ICON-SYSTEM.md` | Vesper, Cortex |
| `IMAGE-CONFIG.template.md` | `docs/IMAGE-CONFIG.md` | The creative panel |

**The programme layer.** Generate when the work becomes ongoing.

| Template | Becomes | Read by |
|---|---|---|
| `CHANGE-LOG.template.md` | `_agency-internal/seo/CHANGE-LOG.md` | Almanac, and every skill that ships an SEO change |
| `REVIEW-BOARD.template.md` | `docs/REVIEW-BOARD.md` | Whoever runs a review round |
| `AUTONOMY-CHARTER.template.md` | `docs/AUTONOMY-CHARTER.md` | Only if the project will run unattended |

**The operating manual.**

| Template | Becomes |
|---|---|
| `PROJECT-CLAUDE.template.md` | The project's own `CLAUDE.md` |

---

## The rule that makes these work

**A governance document is only load-bearing if something reads it and can
refuse.** A file nobody consults is decoration with a maintenance cost.

So each template names its readers, and the agents name their documents. If you
add a document, add its readers. If you find a document nothing reads, either
wire it in or delete it.

## PAGE-TEMPLATE-LAWS is written last

It is the one template that **cannot be filled in at the start**, because it
records the laws extracted from the first page that actually locked: the hero
recipe that worked, the spacing that survived review, the trap that cost an
afternoon.

Written up front it is a guess. Written after the first page locks it is the
most useful document in the set, because every later page inherits it instead of
rediscovering it.

## The worked example

`examples/` holds a complete, real, filled-in set from a shipped build. Read it
when a template's instruction is clear but the shape of a good answer is not.

**It is reference, not a starting point.** Never copy a value out of it into a
live project: every number in there belongs to a different business, and a
plausible-looking wrong fact is the exact failure this whole system exists to
prevent.
