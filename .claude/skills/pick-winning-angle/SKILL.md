---
name: pick-winning-angle
description: >
  Picks the single winning angle, story arc, and headline highlight for a case study or proof
  point, using only claims `/curate-claims` has already certified. Scores candidate angles on a
  6-factor rubric, and checks the whole set of case studies for redundancy — no two clients should
  lead with the same buyer fear and the same number. Use after `/curate-claims` has cleared a
  client's numbers, before writing the case study or wiring the proof. Auto-fires on "which angle
  should we lead with", "pick the headline stat", "this case study needs a story", "do these case
  studies repeat themselves".
---

# /pick-winning-angle: which cleared claim actually leads

`/curate-claims` decides what's true and safe to publish. This skill decides which of those true,
safe claims is the one worth leading with — and makes sure the whole set of case studies reads as a
coherent argument, not a pile of similar numbers. It never adjusts or invents a number; it only
ranks and arranges what's already certified.

## Canonical grounding (read first)
- The output of `/curate-claims` for this client — the certified PUBLIC claims, with their
  timeframe and basis. This skill works only from what's already cleared; if a number hasn't been
  through `/curate-claims`, it isn't eligible here.
- The site's other live case studies or proof points, so redundancy can actually be checked against
  something.

## The winning-angle rubric (score each candidate angle 1-5, sum out of 30)
```
DURABILITY      Rests on a multi-month average or long tenure, not a peak? (already cleared)
CREDIBILITY     Would a skeptical buyer believe it without a second question?
SPECIFICITY     Concrete — numbers, names, a real timeframe — rather than vague?
ICP-RELEVANCE   Maps to a fear THIS buyer actually has, not a generic win?
EMOTIONAL TRUTH Is there a real before-state a reader recognizes as their own?
DIFFERENTIATION Does it prove something no other case study already owns?
```
The highest-scoring angle wins. If the top two tie, pick the one that adds a buyer fear the set
doesn't yet cover.

## The doctrine
- **Lead with the fear, land on the proof.** Before-state first, durable number second.
- **Tenure is a proof point in its own right.** "Six years, one client" often outperforms a single
  flashy multiple — longevity says the result was real enough to keep paying for.
- **A named, real voice beats a bigger anonymous number.** Trust transfers through a real person
  more than through a bigger figure.
- **A durable average is more persuasive than a peak** — a sophisticated buyer knows a peak is
  cherry-picked, and trusts the source less for leading with one.
- **Range honesty builds trust.** "Held 6X to 16X, averaging 10X" reads as real; a bare peak number
  reads as sales copy.
- **One clean before-and-after beats a stack of metrics.** Pick the single metric that carries the
  arc, don't list everything.

## The redundancy check (across the whole set)
Map every case study to the ONE buyer fear its angle answers (e.g. "this won't work for a business
like mine," "I'll be locked into one channel," "an agency will disappear on me," "I can't afford a
real budget"). If two case studies answer the same fear with a similar number, re-angle the weaker
one or hold it back. The set wins when a reader can find their specific fear answered by a specific,
durable proof point — not when every story sounds the same.

## Output (per client/case study)
```
BUYER FEAR IT ANSWERS: <the one fear>
WINNING ANGLE: <one line>
HEADLINE HIGHLIGHT: <the single durable number/fact that leads, from the certified claims>
STORY ARC: before (recognizable pain) -> root fix -> durable after -> ongoing relationship
WHY THIS BEATS THE ALTERNATIVES: <runner-up angles and why they lose>
SET ROLE: <which fear this covers, so the redundancy check has a record>
```

## Guardrails
- **One angle per case study.** A story that says three things says nothing — kill the rest.
- **Only claims `/curate-claims` has already certified.** Never a number it flagged, never an
  unsourced figure, never a fresh calculation done here.
- **Positive and self-reinforcing.** No competitor attacks; the story flexes, the underlying proof
  stays exactly as honest as it was certified.
- **Every angle funnels somewhere.** No case study that dead-ends without pointing at the site's
  real conversion.
- **If the cleared numbers are genuinely weak, say so.** Recommend a non-numeric angle (real tenure,
  scope, a named on-camera voice) or recommend holding the case study back. Never manufacture
  strength that isn't there.

## Boundaries
`/curate-claims` certifies what's true and safe. This skill decides which certified claim leads and
how the set avoids repeating itself. `/proof-card` and `/wire-proof` execute and place what this
skill selects — neither of them picks the angle.
