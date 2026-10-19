# Website Pack: operating manual

A self-contained kit for building and improving websites: strategy, SEO,
copywriting, design, build, performance, imagery, and a real pre-ship gate.

Everything here is generalised from shipped client builds, so it encodes working
practice rather than generic advice. It carries **no brand and no geography**.
Both arrive from one file per project.

---

## 0. The first thing, always

```
/init-brand
```

Nothing in this pack works properly until that has run. It interviews you, writes
`brand.config.json`, generates the project's governance docs, and wires the
hooks. Every agent and every hook reads the config it produces.

An agent running without a config will guess. Guessing is the failure mode the
whole pack is built to prevent.

`/init-brand --check` at any time reports what is still unanswered.

---

## 1. How the pack knows anything

```
brand.config.json          the project's answers
   |
   +-- reference/verticals/<overlay>.md      what a conversion is here
   +-- docs/BRAND-TRUTHS.md                  every publishable fact
   +-- docs/BANNED-WORDS.md                  vocabulary law
   +-- docs/BRAND-DIRECTION.md               palette, type, voice, image grammar
   +-- docs/CODE-CONVENTIONS.md              what the guard enforces
   +-- _agency-internal/seo/CHANGE-LOG.md    the ledger
```

Field-by-field meaning: `reference/BRAND-CONFIG-CONTRACT.md`.

Three properties follow from this and they are the point of the design:

- **No locale is baked in.** Currency, device widths, citation platforms,
  language register and address format are project inputs. The pack ships none.
- **No vertical is baked in.** The overlay supplies the conversion model, schema
  set, funnel and page architecture.
- **The hooks are configured, not rewritten.** `enforcement` in the config drives
  what the code guard blocks, so a new project changes a JSON file instead of
  editing Python.

---

## 2. Non-negotiable rules

### Truth
Never fabricate a number, a claim, a testimonial, or a result. Every published
figure traces to `docs/BRAND-TRUTHS.md`, the database, or the client's own
document. If it cannot be traced, **ask**. `/bullshit-detector` enforces this and
is not optional on anything client-facing.

The corollary that gets skipped: **an unknown fact is recorded as an open
question with an owner**, not rounded to something plausible.

### Copy
Human register, always. No em dashes, no en dashes. Run `/humanize` and
`/ai-check` before any copy ships. The goal is writing that reads as genuinely
human, not writing that defeats a detector.

### Images: one provider, two models
Every image goes through **ImageRouter** with `IMAGEROUTER_API_KEY`. Never call a
model provider directly. If ImageRouter is unavailable, **stop and report**. Do
not fall back to another provider: one router means cost is measurable in one
place and an outage is a single known failure rather than four silent ones.

Standing policy: **GPT Image 2 and Gemini 3 Pro only.** FLUX was removed from
routing pack-wide on 2026-09-20 — it is not a live route on any project.

| Use case | Model |
|---|---|
| Objects, icons, products, rendered text, cutouts, textures and precise material surfaces | `openai/gpt-image-2` |
| Free pipeline testing | `openai/gpt-image-2:free` |
| Atmospheric/mood backgrounds, consistent people and characters | `google/nano-banana-pro` |

### Never regenerate to fix a crop
Post-processing is free; generation is not. Crop, resize, recolour and convert
locally with the tools in `tools/`. Keep the raw and the master, permanently.

### Every SEO-affecting change gets a ledger row
`_agency-internal/seo/CHANGE-LOG.md`, with the hypothesis and the date to measure
on. A change with no row did not happen, because in three months nobody will know
why the title changed.

---

## 3. The five invariants

A surface ships only if all five survive, or are explicitly handed to a named
owner.

1. **UX.** No layout shift, real empty, error and loading states, touch targets
   large enough to hit, and a working path to the primary conversion at
   `market.primaryDeviceWidth`.
2. **Speed.** Cacheable, sized and lazy images inside `assets.maxImageBytes`,
   self-hosted fonts, and a budget derived from `market.networkBudget` rather
   than from taste.
3. **SEO.** One H1 carrying the page's primary keyword, clean heading order, an
   absolute canonical matching `urls`, unique title and description, real alt
   text, internal links per the link map.
4. **Structured data.** Server-rendered JSON-LD, entity facts referenced by `@id`
   and never redeclared, no markup for anything that is not real.
5. **Truth.** Every fact traceable. Human copy, no machine tells.

Skipping an invariant's owner is skipping the invariant. `/ship-ready` certifies
all five and is the last thing that runs.

---

## 4. How the work routes

The `UserPromptSubmit` hook suggests skills automatically. Prefer **skills** over
single agents: a skill orchestrates several agents in the right order, which is
usually the part that gets skipped when working freehand.

**Setup**
- `/init-brand` first, always

**Building**
- `/page-build` a whole page end to end, the full cast in sequence
- `/component-build` the 70 percent default: one section, component or surface
- `/css-portable-extract` promote a repeated pattern into a token, utility or
  component before it forks a fifth time

**Copy and content**
- `/copy-pass` rewrite visible text in the brand voice, then slot-check it
- `/humanize`, `/ai-check` human register, and forensic scoring of what gives
  machine writing away
- `/blog-write`, `/content-briefs`, `/content-refresh` the content programme
- `/bullshit-detector` every claim survives this before a client sees it

**SEO**
- `/seo-audit` on-page, technical and answer-engine checklist, pass or fail with
  the fix
- `/schema-audit` JSON-LD completeness, entity graph, rich results
- `/seo-plan`, `/seo-cluster`, `/seo-content-brief`, `/seo-programmatic`
- `/seo-opportunities`, `/seo-monthly`, `/seo-log` the ongoing programme
- `/internal-link-pass` orphan detection, cluster wiring, anchor plan
- `/local-seo-audit`, `/ai-visibility-audit`, `/seo-competitor-pages`
- `/crawl-integrity` soft 404s, content invisible without JavaScript, thin pages

**Quality and ship**
- `/responsive-pass`, `/performance-pass`, `/lighthouse-audit`
- `/conventions-audit` the mechanical floor plus the craft read
- `/polish-page` diagnose and fix an already-built page: structure, scannability, AI-slop
- `/security-headers` CSP and security headers, rolled out Report-Only then enforced
- `/policy-pages` the privacy policy, terms, and cookie policy stay honest as the site changes
- `/rapid-execute` apply a dictated list of changes fast, without skipping verification
- `/ship-ready` the final gate, nothing merges without it
- `/session-close` log the session, update the ledger, save what was locked

**Imagery**
- `/generate-image` the portable path
- `/brand-image` one directed asset through the creative panel
- `/visual-language-explore`, `/build-brand-guidelines`
- `/crop`, `/annotate` turn real screenshots into proof assets
- `/brand-asset-integrity` the right locked asset on every surface
- `/social-card` the branded OG/share card every page shows when linked
- `/video-testimonial` a raw client clip into a captioned, compressed, poster-framed asset

**Proof**
- `/curate-claims` a raw client report into approved, intel-safe claims, now with the durability
  test (which month, over what, how much, then what, says who) and the named BS taxonomy run before
  any number reaches wording
- `/proof-card` a real screenshot into a finished, on-brand proof card
- `/wire-proof` real proof actually placed on the pages that need it, not left in a folder, now
  with the proof-format decision ladder (chart vs context frame vs timeline vs decorative accent vs
  screenshot) run before assembly
- `/pick-winning-angle` which certified claim to lead with, and a redundancy check across the set
- `/lead-magnet` a gated lead-magnet PDF, end to end: offer, PDF, capture route, tracked event

---

## 5. The agent cast

Web core. Launch via the Agent tool when no skill fits.

| Agent | Owns |
|---|---|
| **Sage** | Positioning and message strategy: what the site must say and why |
| **Onyx** | Page and section flow, the brand filter, section-kill authority, and the page *portfolio*: sequencing by revenue, no page without a written brief |
| **Atlas** | Physical assembly: what goes where, image placement, the sitewide chrome |
| **Beacon** | On-page SEO slots, the keyword ownership map, which schema a page carries |
| **Weave** | The JSON-LD layer, the entity `@id` graph, answer-engine markup |
| **Weaver** | The site-wide internal link graph, orphans, clusters, anchor plan |
| **Marlowe** | Every visible string, voice, CTAs, alt text, microcopy |
| **Vesper** | Layout, spacing, colour assignment, type treatment, section rhythm |
| **Lattice** | Design-token and shared-component centralization — finds and migrates one-off styling onto the real system |
| **Cortex** | Code: routes, components, head and meta wiring, image and font loading, and the data layer when a page reads from a database or CMS |
| **Canon** | Code standards, the mechanical floor and the craft bar |
| **Fold** | Responsive correctness, overflow, touch targets |
| **Pulse** | Core Web Vitals, bundle weight, cacheability |
| **Vigil** | Brand-asset integrity across every surface |
| **Sheen** | The last editorial pass: bloat, missed cross-links, polish |
| **North Star Critic** | Adversarial scoring of a built page against its own job — loops the build until every bar clears, runs before Gate |
| **Gate** | The pre-ship checklist and sign-off |
| **Hook** | Conversion architecture, offers, enquiry paths |
| **Trace** | Tracking, attribution, consent, the event taxonomy |
| **Prospector** | Opportunity mining from search data |
| **Almanac** | The monthly programme, measurement, governance |
| **Vega** | Creative direction: writes the image brief, judges the result |
| **Quill / Lux / Volt** | The image panel: concept, capture, finish |
| **Iris** | Fuses the panel's layers into one prompt and executes it |
| **Humanizer** | Batch sameness checks across a set of copy |
| **Press** | Lead-magnet and branded-document PDFs via the Gamma API — the secondary path behind `/html-to-pdf` |

Boundaries that matter, because these are the overlaps people get wrong:

- **Beacon decides which schema a page carries. Weave owns the JSON-LD itself.**
- **Beacon owns the SEO slot. Marlowe owns the text that fills it.**
- **Onyx owns why a section exists and in what order. Atlas owns where it sits on
  the canvas. Vesper owns how it looks. Cortex builds it.**
- **Vega directs imagery. Onyx hands image needs to Vega as a brief, never
  generates.**
- **Vesper decides how something should look. Lattice makes sure how it's actually
  built matches what's already locked, and migrates anything that's drifted.**

---

## 6. Tools

| Path | Does |
|---|---|
| `tools/image-router/` | The ImageRouter toolkit: client, post-processing, manuals |
| `tools/imgtool.py` | Crop, redact, annotate, frame, resize |
| `tools/audit-check.py` | Mechanical machine-tell and banned-word audit |
| `tools/preflight.py`, `tools/upscale.py` | Pre-ship checks, upscaling |
| `scripts/shot.mjs` | Headless screenshots at multiple viewports |
| `scripts/pdf.mjs` | HTML to PDF |

Tools resolve through the `WEBSITE_PACK` environment variable, so they work from
any project. Set it once.

---

## 7. Keys

All in `.env` at the pack root, gitignored, tagged `[VERIFIED]`, `[UNVERIFIED]`
or `[DEAD]`. `.env.example` documents every key without carrying a value.
`docs/API-KEYS.md` explains what each one is for and how to test it.

**Never print a key value**, into a log, a report, a commit or a handover.

---

## 8. What this pack deliberately does not do

- **It does not deploy.** Add a platform plugin if you need that.
- **It does not ship framework code.** The design system is specified, not
  implemented, in `reference/design-system/`. Contracts and architecture port
  across frameworks; components do not.
- **It does not assume a market.** If something reads as advice for a specific
  country, that is a bug. Report it.
- **It does not carry the client work it came from.** `examples/` holds one
  worked example, read-only, for reference. Never copy from it into a live
  project without passing every value through `/init-brand`.
