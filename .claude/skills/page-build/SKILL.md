---
name: page-build
description: >
  Use when building a new page end to end, or rebuilding one from scratch (home, category,
  offering, segment, hub, info). Coordinates the full cast in sequence so nothing is skipped:
  Onyx (page flow), Beacon (SEO slots), Marlowe (copy), Atlas (assembly map: placement, image
  slots, chrome and the mobile rail), Vesper (design), Cortex (code), Vigil (brand-asset check),
  Fold (responsive), Gate (pre-ship). Every page ships with a plan-true flow, keyword-aware
  slots, brand-voice copy, token-only design, runtime-proven code, the right assets, responsive
  correctness, a passed gate and its ledger row. Trigger words: build a new page, create the
  landing page, rebuild this page, scaffold a route, stand up a page end to end.
---

# /page-build: build a page end to end

Start a page from scratch or rebuild one. This coordinates the full pipeline so no step is skipped.

Facts: `docs/BRAND-TRUTHS.md`. Voice and visuals: `docs/BRAND-DIRECTION.md`. Lint: `docs/BANNED-WORDS.md`. Engineering: `docs/CODE-CONVENTIONS.md`. Everything project-specific: `brand.config.json`.

## The stack

Read `stack` in `brand.config.json` before anything. **Do not import assumptions from a framework this project does not use.** Caching, routing, head management and image handling differ enough between frameworks that borrowed advice is worse than none. `reference/design-system/` carries the contracts that hold everywhere.

Facts render from the in-code fact files only. URLs follow `urls`, and slugs never change.

## Autonomous run mode
When executing under an autonomy charter, the ask-before-generating and no-unsolicited-changes rules are suspended for the run: agents decide, generate and place within the charter's budget, Gate replaces the user as final sign-off, and the charter's escalation triggers are the only reasons to stop. All other locks stand.

## This is a LAYERED LOOP, not a one-pass list

A page moves through stages, and each stage checks, improves and rechecks before handing on. A failure at any stage routes the page **back** to the stage that owns the problem, which fixes it and resubmits, and the downstream stages re-run.

**The page is done when Gate is green with every stage passing**, not when it has been through the steps once. Expect to cross the middle stages more than once. A pipeline treated as a checklist produces pages that passed every step and are still wrong.

## The five invariants: a page does NOT ship until all five are verified

1. **UX**: no dead ends, no layout shift, touch targets at least 44px, real empty, error and loading states, a frictionless path into the primary conversion at `market.primaryDeviceWidth`. *Onyx (flow) + Atlas (placement) + Vesper (rhythm) + Fold (responsive).*
2. **Speed**: lean bundle, sane server response, sized and lazy images inside `assets.maxImageBytes`, largest paint within a budget derived from `market.networkBudget`. *Cortex + Pulse.*
3. **SEO**: one H1 with the primary keyword, clean heading order, absolute canonical in the project's URL form, unique title and description, real alt text, internal links per the link map, nothing important trapped behind client-only rendering. *Beacon + Marlowe.*
4. **Structured data**: server-rendered JSON-LD, entity facts referenced by `@id` and never redeclared, nothing from `truth.forbiddenClaims`, and the FAQ rendering visible text and markup from one array. *Weave.*
5. **Truth**: no fabricated or approximated fact anywhere. Every value traces to a fact file or `BRAND-TRUTHS.md`, or you ASK. Copy is human and simple, with no machine tells. *Marlowe + Beacon; every stage owns it.*

Then **Gate** signs off with runtime proof: content and JSON-LD present in the served HTML, zero-item states self-hiding. Skipping an invariant's owner is skipping the invariant.

## ASSEMBLE, do not invent (read FIRST)

**Map each slot in the page to an existing component** from the project's own library. Write new components only when nothing covers the surface, and new code consumes the same tokens so it looks native. **Reinventing a card, hero or accordion that already exists is a defect**, and it is the most common one on a fast build. Anything in `stack.frozenSubsystems` is restyle-only; if the request needs its logic changed, stop and escalate.

## Inputs you should have ready

1. **The route**, in the project's URL form, with a slug from the keyword map, never invented.
2. **The page type**, matched to an archetype in `reference/verticals/<vertical.overlay>.md` section 3.
3. **The primary keyword** from the ownership map at `urls.keywordMapFile`. One per URL.
4. **The wireframe or reference**, if the project has one. Read it before Onyx lays out the flow.
5. **The schema plan**: which types this archetype carries, from the overlay and the schema spec.
6. **The page's entry in `docs/CONTENT-PLAN.md` and its deck in `docs/copy/`.** The pipeline starts FROM these, never from scratch. No stage invents copy that bypasses the deck, and edits to shipped copy flow back into it.

## Steps

### 1. Onyx: architecture gate
Confirm the page belongs in the information architecture and matches its archetype. Lay out the flow: Hook, Promise, Proof, Path, ending at the primary conversion. Kill any section that does not earn its place. Name the brand-filter risks: banned phrasing, accent overuse, fabricated claims, off-family imagery, two sub-brand systems on one surface. **Run the hero doctrine gate**: the hero must say what this is, show it, and offer one action in the accent colour. A hero that could belong to any business in this category fails automatically, no debate. **Run a rough visual/image-slot pass before copy starts** — a section that depends on an image (what it shows, roughly what's in it) needs that settled in outline even before Atlas's detailed assembly spec in step 4, because copy written against an unplanned image gets rewritten the moment the real image forces a different word count or focus. Approve the section list before any code starts.

### 2. Beacon: SEO slots
Define the H1 carrying the primary keyword; the title, 60 characters or fewer with the keyword front-loaded; the description, 155 or fewer; which schema types the page carries (Beacon selects, Weave builds); the anchor targets and internal-link destination map; the alt-text angles. **Spec the direct answer block**: on hub, category and offering pages, a 40 to 60 word plain-language answer sits immediately after the H1 and contains a real fact. **Spec the FAQ block**: which questions, answering which long-tail variants, with visible text and markup from one array.

### 2.5 Certify every claim before writing starts
Before Marlowe writes a word, every claim the page is about to make gets certified: real, sourced to `BRAND-TRUTHS.md` or a named fact file, its basis stated (a peak versus a sustained average, a single month versus year-over-year), and safe to publish (nothing from `truth.forbiddenClaims`, nothing that reveals more than an anonymized source should). An uncertified claim does not get written provisionally and cleaned up later — it gets ASKed about now, before it has a chance to sound finished and ship by inertia.

### 3. Marlowe: copy
Run `/copy-pass` discipline. Voice per `voice` in the config and `docs/BRAND-DIRECTION.md`, at the register `market.languageRegister` specifies. Lint every string against `docs/BANNED-WORDS.md`, including the search-spam patterns: no headings about search, no query-echo openers, no keyword chips, no fabricated proof. Every fact from `BRAND-TRUTHS.md` or ASK. Primary keyword in the H1, title and meta; variants spread naturally through body text, never stacked in one sentence. **Never defensive.** A page never explains what the business does not do, argues with an objection nobody raised, or justifies itself. State the strength, show the proof, move on — a page that spends words pre-emptively defending itself reads as insecure even when every individual sentence is true. Write the direct answer and the FAQ answers Beacon specced. Run `/humanize` and `/ai-check` before handing on.

### 4. Atlas: assembly map
Turn the approved flow plus the copy deck into the physical ASSEMBLY-SPEC: band-by-band placement grid, where each image sits and at what size (each slot states aspect, dimensions, and either an existing asset from `docs/ASSET-LIBRARY.md` or a generation brief in the locked style), decorative placements, mobile stack order, and how the page meets the sitewide chrome per `docs/CHROME-SPEC.md`.

### 5. Vesper: visual spec
Compose from the existing library first: map each slot to a real component. Spec spacing, colour and section rhythm with tokens. The palette and contrast law come from `docs/BRAND-DIRECTION.md` and `palette.contrastLaws`: **the accent is the payoff**, marking the one thing that matters, once per surface. Pick the right sub-brand system and never mix two. Spec the image grammar per section. Confirm behaviour at the primary device width, then tablet and desktop, before code.

### 6. Cortex: code
Create the route and wire the components Vesper named. Enforced in code:
- Tokens only. A repeated arbitrary value becomes a token or a utility (route to `/css-portable-extract`).
- Facts render from the fact files, never as literals in the route.
- **Meta and schema**: head through the SEO helpers, canonical absolute and matching `urls`, matching share-tag URL, JSON-LD server-rendered with `@id` references, the FAQ array feeding both the visible block and the markup.
- **Images**: real elements with alt and dimensions, lazy except the largest-paint element (eager, high priority), a source set where variants exist, inside `assets.maxImageBytes`.
- Internal links in the project's URL form. Frozen subsystems entered through their existing parameters, never modified.
- Type-check green before handing on.

### 7. Vigil: brand-asset check
Correct assets on every surface: the right logo variant for its background, decorative assets from the locked set, palette per token, the mark unaltered, one image family per surface, people per `imagery.peopleTreatment`, existing assets reused before new generations, all in-image text verbatim and drawn only from `imagery.approvedInSceneText`. Any genuinely new image is a `/brand-image` job, not an inline generation.

### 8. Fold: responsive pass
Run `/responsive-pass`. `market.primaryDeviceWidth` first, then up. Kill horizontal overflow at the source. Touch targets at 44px. The path from this page into the conversion works at the primary width.

### 9. North Star Critic: the adversarial pass (optional, recommended for a page's first build or a genuine relaunch)
Score the built page cold against its own job and the quality bar. On any bar below 4, route the ranked fixes back to the stage that owns them (1-8 above), rebuild, and re-score. Loop until every bar is 4 or above. This is what turns a pipeline that was followed once into a page that's actually good — skip it for a routine, low-stakes edit, but run it for anything that matters.

### 10. Gate: pre-ship
Run `/ship-ready`: the deterministic checks, the four-lens review, a green build, and **runtime proof**, meaning request the route and grep the served HTML for the H1, a load-bearing fact and the JSON-LD. Freeze untouched. Image budget held. The hero doctrine confirmed. **Then write the ledger row**: the page's meta, canonical, schema and internal links. If it is not in the ledger, it did not happen.

## Done definition

- **All five invariants verified, not merely present.** Any one failing blocks the ship.
- The page renders at the target route with no console errors, and the runtime proof is recorded as counts.
- All copy linted, humanize and ai-check gates passed.
- The right brand family on every surface, Vigil signed off.
- `/ship-ready` passed and the ledger row written.
