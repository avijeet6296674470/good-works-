# Standing up a design and image system for a new client

The pack has the pieces. This is the order to use them in.

Budget roughly a day for a new brand. **Do not generate production imagery
before phase 2 is done.** Undirected generation is how a budget disappears into
assets that get thrown away, and it is the most common way it happens.

---

## Phase 0: the config

```
/init-brand
```

Seven rounds. It writes `brand.config.json` and generates the project's
governance docs from `reference/templates/`.

**Everything below assumes this has run.** A design system stood up without it
has no facts file, no banned words and no enforcement, so the rules exist only
in whoever happens to be present.

---

## Phase 1: direction, before any pixels

### 1. Intake

Get from the client, or decide and get signed off:

- **What the brand promises**, in one line. Not a slogan.
- **Who the buyer is, and their starting state**: already sold on the category and choosing a provider, or unaware the category solves their problem? **This changes the entire site**, and it is the question people skip.
- **Non-negotiables**: an existing mark, an existing palette, competitors to avoid resembling.
- **Where assets will live.**

Route the positioning to Sage. A design system built on unsettled positioning
gets rebuilt.

### 2. Design direction

Run the method in `.claude/skills/frontend-design.md`: brainstorm, explore, plan,
critique, build, critique again.

It forces the decisions that make a system rather than a pile of pages:

- **Four to six named colours with an explicit accent rule.** The accent is the payoff: it marks the one thing that matters on a surface, never decoration.
- **The contrast law.** Which on-brand pairings are forbidden. Every palette has at least one, and if it is not written down a designer finds it at review.
- **Two or more typefaces with defined roles**, including what each is *not* for.
- **One signature element.** The thing that makes a surface recognisably this brand and nobody else.

Record the result in `docs/BRAND-DIRECTION.md`, sections 1 and 2.

### 3. Visual language exploration

```
/visual-language-explore
```

Generate a **batch of distinct directions**, not a single final. You are
producing a moodboard to react to. Cheap tier only; this is exploration.

Pick a direction with the client before moving on.

---

## Phase 2: lock the system

### 4. Write the image grammar

`docs/BRAND-DIRECTION.md` section 5, using the template's structure. It answers
eight questions: the ground, framed or naked, how subjects sit, overlays, type
over image, motifs, **the people rule**, and the sub-brand variants.

**The two highest-value parts:**

**The people rule**, stated in both directions. What people must look like, and
what they must never look like. Models have a strong default, that default is
instantly recognisable, and a brand that ships it looks like every other brand
that shipped it.

**The "absolutely never" list.** Write it from this client's actual competitors
and from the generic look you are trying not to produce. It is the section that
gets skipped and the one that gets quoted most.

### 5. Configure generation

`docs/IMAGE-CONFIG.md`, from the template. The visual language as **prompt
language**, which is a different vocabulary from the design language; the palette
as prompt language; the cast with a canonical reference per subject; the shared
exclusions block; and the model routing.

### 6. The brand book, if the client needs one

```
/build-brand-guidelines
```

Section by section, reviewable, never one-shot. **When a decision lands in the
book, update `docs/BRAND-DIRECTION.md` in the same pass**, or the law and the
book drift and people follow the prettier one.

---

## Phase 3: produce and enforce

### 7. Generate

`/brand-image` for a single directed asset. `/generate-image` for the portable
path. Always the seven-part prompt plus the shared exclusions.

**Validate on the free tier first. Log every cost. Save every winning prompt**,
because a prompt that produced a keeper is a reusable recipe and the biggest
cost saver available.

### 8. Enforce

- `/brand-asset-integrity`: the right locked asset on every surface, verified by reading pixels and tracing the resolver chain, never by trusting a filename.
- `/conventions-audit` and the code guard: no raw colours, no arbitrary colour utilities, no non-token values.
- `/ship-ready`: the gate.

---

## Multi-client hygiene

- **One folder per client**, each with its own config and docs. Never let one client's palette reach another's prompts.
- **Keep the canonical cast references permanently.** Regenerating a cast member from scratch will not match, and the mismatch is more visible than either image alone.
- **Keep the raw and the master for every asset.** Re-crop and re-export locally; never regenerate to change a size.
- **Log the winning prompts** next to the asset.
- Assume several times the list price per genuinely finished asset if you are iterating. **Precise prompts are the cost control**, not cheaper models.

---

## Where each piece lives

| Need | File |
|---|---|
| The config contract | `reference/BRAND-CONFIG-CONTRACT.md` |
| The doc templates | `reference/templates/` |
| A filled-in example | `examples/` |
| How to write an agent, skill or hook | `reference/AUTHORING.md` |
| Design taste and the method | `.claude/skills/frontend-design.md` |
| Token architecture | `reference/design-system/TOKEN-ARCHITECTURE.md` |
| Vertical assumptions | `reference/verticals/` |
| Per-project image setup | `tools/image-router/docs/08-ADAPTING-TO-A-PROJECT.md` |
| Prompt recipes | `tools/image-router/docs/04-PROMPT-ENGINEERING.md` |
| Consistency across a series | `tools/image-router/docs/07-REFERENCE-IMAGES.md` |
| Cutouts and keying | `tools/image-router/docs/05-GREENSCREEN-CHROMAKEY.md` |
| When generation misbehaves | `tools/image-router/docs/09-TROUBLESHOOTING.md` |
