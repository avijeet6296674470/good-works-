# <FILL: BRAND NAME> — REVIEW BOARD

The document a human reads when the build is done and they need to check it
without trusting anyone's word for it.

> **Why it exists.** "It's finished" is not reviewable. A review board turns a
> claim into a walkable list: here is every page, here is what was verified, here
> is the command that verified it, and here is what is still open. The reviewer
> can spot-check any line rather than accepting the summary.

---

## Verified against the running site, not asserted

| Check | Result | How it was verified |
|---|---|---|
| <FILL: SEO and structured data, N pages> | <FILL: n/n> | <FILL: the exact command> |
| <FILL: responsive, N URLs by M widths> | <FILL: n/n> | <FILL> |
| Type-check | <FILL> | <FILL> |
| Production build | <FILL> | <FILL> |
| Image budget | <FILL: spent of ceiling> | <FILL> |

**Every row names the tool that produced it.** A result with no command behind
it is a claim, and the point of this table is to contain no claims.

**Report counts, not adjectives.** "18 of 18 clean" is reviewable. "SEO is in
good shape" is not.

<FILL: spell out what a clean result actually means per page, so the reviewer knows what was and was not checked. This paragraph is what stops "clean" from meaning whatever the reader hopes.>

---

## The pages

<FILL: every page, grouped by type, with its URL.>

For each: <FILL: what it is, what it does, and anything the reviewer should look at specifically.>

---

## The ship gate

<FILL: date. Every line executed against the running server, not asserted.>

| Gate | Result |
|---|---|
| <FILL> | <FILL> |

---

## Known open items

| Item | Owner | Blocking? | Notes |
|---|---|---|---|

**This section is the most important one in the document.** A review board with
an empty open-items list is either a finished project or a dishonest one, and
the second is far more common.

Anything that needs the client, anything deferred, anything a specialist flagged
and nobody resolved: it goes here, with a named owner. **A launch blocker gets
named as a launch blocker**, at the top, in plain words.

---

## How to walk this

<FILL: how the reviewer starts the site, where the captures are, what order to look in, and what to look for.>

Disagreement is expected and useful. Note it against the page rather than fixing
it in place, so the change goes back through the pipeline that produced it and
the documents stay true.
