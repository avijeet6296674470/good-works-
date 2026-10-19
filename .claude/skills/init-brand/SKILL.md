---
name: init-brand
description: >
  Stand up the website pack on a new project, or update an existing project's brand config.
  Interviews the user in ordered rounds, writes brand.config.json, generates the project's
  governance docs from the pack templates, wires the hooks, and creates the SEO ledger.
  Run this ONCE before any page, component, copy or image work begins. Nothing else in the
  pack works properly until it has run, because every agent and hook reads the config it
  writes. Also handles re-configuring mid-project (--update) and reporting what is still
  unanswered (--check). Trigger words: init brand, set up the pack, new project setup,
  configure the brand, onboard this client, start a new site, update the brand config,
  what is unanswered.
---

# /init-brand: stand the pack up on a project

The pack ships with no brand and no locale in it. This skill is how a project
acquires both. Everything downstream reads what it writes.

**Run it before anything else.** An agent working without a config will either
ask the same questions again in a worse order, or guess. Guessing is the failure
mode this whole file exists to prevent.

## Modes

| Invocation | Does |
|---|---|
| `/init-brand` | Full interview on a project with no config. Writes everything. |
| `/init-brand --update` | Re-opens the interview on an existing config, shows current answers, and reports what each change invalidates. |
| `/init-brand --check` | Read-only. Lists unanswered fields and stale assumptions. Writes nothing. |
| `/init-brand --from <path>` | Seeds answers from an existing brand document, deck or PDF, then interviews only for what is missing. Every seeded value is marked for confirmation, never accepted silently. |

---

## The law this skill runs under

**Never fill a field with a plausible guess.** An unanswered field stays `""`
and the interview says so at the end. A wrong config is worse than an incomplete
one, because incomplete gets asked about and wrong gets propagated.

**Never invent a fact.** If the user does not know the price, the capacity, the
opening hours, or the legal name, that goes in the facts file as an open
question with an owner, not as a number.

**Read before you ask.** If the project already has a repository, a brand deck,
or a live site, look first. Asking a user for something already written down
wastes their time and signals you did not read their material.

**One round at a time.** Do not dump forty questions. Each round below is a
single exchange, and the answers to a round shape the next one.

---

## Round 0: orientation

Do this without asking anything.

1. Is there an existing `brand.config.json`? If yes, switch to `--update`
   behaviour: show current values and ask only what is changing.
2. Is there a repository? Read the package manifest, the routes or pages
   directory, the stylesheet, and any existing docs. Infer `stack` and `urls`
   rather than asking.
3. Is there a live site at a plausible domain? If the user names one, look at it.
4. Is there brand material in the project (a deck, a PDF, a guidelines document)?
   Read it before Round 3.

Report what you found in two or three lines, then start Round 1. Something like:
"Found a Vite and React app with a routes directory and a stylesheet with
existing custom properties, no config yet. I will infer the stack and ask you
about the brand."

---

## Round 1: identity and what the site is for

Ask together. These four shape every later round.

1. **Brand name**, exactly as it should appear in prose. Ask directly whether
   there is a spelling trap: a name people habitually write as one word when it
   is two, a casing rule, an accent. If there is, it becomes `identity.nameRule`
   and the copy agents enforce it literally.
2. **The promise**, one line. Not a tagline. What the visitor actually gets. If
   the user gives you a slogan, take it as `tagline` and ask again for the
   promise.
3. **Vertical**, from `reference/verticals/README.md`. Offer the four plus
   `none`, with one line each. Do not guess from the brand name.
4. **The primary conversion**: the single action the site exists to cause, as a
   verb phrase.

If the user cannot name a single primary conversion, stop the interview and say
so. Two co-equal primaries means the strategy is unsettled, and every downstream
decision about hierarchy, internal links and CTA placement will be arbitrary.
That is a real finding, not an obstacle.

Also capture `legalName`, `domain`, `legacyDomain`, and any `subBrands`. Ask
about sub-brands explicitly with an example, because users do not volunteer
them and they are the field that prevents two visual systems colliding on one
surface.

Load the chosen overlay now and keep it in context for the rest of the
interview.

---

## Round 2: market

The pack has no geography in it. This round supplies all of it.

1. **Where the audience is**: country, region, city if the catchment is local.
2. **Language register.** Not the language, the register. Push for something
   specific enough to act on. "Professional" is not usable; "plain English, short
   sentences, no idiom that assumes a native speaker" is.
3. **Currency**, and how a price should render, as a literal pattern.
4. **Date, phone and address formats.** The address becomes the byte-identical
   string used in schema and every off-site listing, so get the exact one.
5. **Primary device width**, and the **network budget**. Ask what connection the
   audience is realistically on. This is what turns "make it fast" into a number
   the performance budget can hold.
6. **Which listing, directory and review platforms matter in this market.** There
   is no universal answer and the pack deliberately ships none. If the user does
   not know, that is a research task, not a blank: record it as an open item and
   run `/local-seo-audit` research before the SEO work starts.

For a non-local vertical, `city` and the citation list may be genuinely `null`.
Set them to `null`, not `""`, so nothing asks again.

---

## Round 3: voice

Read any brand material first.

1. **Two to four named modes**, each with what it is used for and a one-line
   example in the brand's own words. More than four is not a voice.
2. **Person and reading level.**
3. **Humour policy**, including the rate limit if the brand uses wordplay.
   Without a cap, every heading becomes a pun by the third page.
4. **Banned vocabulary.** Seed from `reference/templates/BANNED-WORDS.template.md`,
   then ask for brand-specific additions: competitor language, words the client
   hates, category clichés. Em and en dashes are banned globally and are not up
   for discussion.

Write `docs/BANNED-WORDS.md` at the end of this round rather than at the end of
the interview, because the rest of the session should already be obeying it.

---

## Round 4: palette and type

1. **Four to six hexes with named roles.** If the brand has a guidelines
   document, take the hexes from it and confirm which is the accent. If several
   documents disagree, ask which is canonical and record the answer, because this
   is a recurring source of drift.
2. **The accent rule.** Confirm the accent is treated as the payoff. If the
   client wants it used decoratively, record that as a deliberate deviation with
   their name on it.
3. **Contrast laws.** Ask directly: is there a brand colour that fails as text on
   a light background? There almost always is, and writing it down here prevents
   a designer discovering it at review.
4. **Three typefaces with roles**, and for each one whether the project is
   licensed to self-host. Record the licence answer. "We assumed it was fine" is
   how a font bill arrives.

---

## Round 5: stack and enforcement

Mostly inferred in Round 0. Confirm rather than ask.

1. Confirm framework, rendering model, CSS approach, token system, hosting,
   analytics.
2. **Frozen subsystems.** Ask explicitly: is there any part of this codebase that
   may be restyled but whose logic must not change? Payment, booking, auth and
   anything talking to a third party usually qualify. Get the reason too, because
   a freeze without a reason gets broken by the next person.
3. **Token file location**, which becomes `enforcement.tokenFiles`: the only
   place raw colour values may live.
4. **Source globs** the guard should police.
5. **URL policy**: trailing slash or not, and confirm it against what the router
   actually does today rather than what anyone intends. A mismatch here produces
   canonicals that disagree with served URLs.

---

## Round 6: truth and imagery

1. **The facts file.** Explain the rule in one sentence: no published number,
   claim, hour, capacity or price may originate anywhere else. Then start it,
   with whatever the user can state now. Everything they cannot state becomes an
   open question with an owner and a date, inside the same file.
2. **Forbidden claims.** Ask what must never be published. For a business with no
   real reviews, self-reported ratings go here and the guard will block the
   markup. For a service business, unsourced result figures.
3. **Imagery.** Whether images are generated, licensed, or photographed. If
   generated: the people treatment rule stated both positively and negatively,
   the whitelist of text allowed to appear inside an image, the shared exclusions
   block, and the budget.

If imagery is photographed and a shoot is planned, most of `imagery` is `null`
and that is a complete answer.

---

## Generate

Only after the rounds. Write, in this order, reporting each file as it lands:

Templates live in `$WEBSITE_PACK/reference/templates/`. Every one carries marked
fill slots and a note per section explaining the failure it prevents. **Keep the
reasoning in the generated file**: stripping it back to headings turns a working
document into a form nobody reads.

| Output | From |
|---|---|
| `brand.config.json` | The interview |
| `docs/BRAND-TRUTHS.md` | `BRAND-TRUTHS.template.md`, filled from rounds 1, 2, 5 and 6 |
| `docs/BANNED-WORDS.md` | `BANNED-WORDS.template.md`, written in round 3 |
| `docs/BRAND-DIRECTION.md` | `BRAND-DIRECTION.template.md`, filled from rounds 3, 4 and 6 |
| `docs/CODE-CONVENTIONS.md` | `CODE-CONVENTIONS.template.md`, reconciled with the real stack from round 5 |
| `docs/CONTENT-PLAN.md` | `CONTENT-PLAN.template.md`, seeded with the overlay's page archetypes |
| `docs/ASSET-LIBRARY.md` | `ASSET-LIBRARY.template.md`, empty inventory |
| `docs/IMAGE-CONFIG.md` | `IMAGE-CONFIG.template.md`, or skipped entirely if imagery is not generated |
| `docs/CHROME-SPEC.md` | `CHROME-SPEC.template.md`, seeded with the overlay's conversion furniture |
| `docs/ICON-SYSTEM.md` | `ICON-SYSTEM.template.md` |
| The ledger, at `enforcement.ledgerFile` | `CHANGE-LOG.template.md`, plus one row recording the initialisation |
| `CLAUDE.md` | `PROJECT-CLAUDE.template.md`, assembled from the config |
| `.claude/settings.json` | Hooks wired to the pack, using `$CLAUDE_PROJECT_DIR` |

**Do NOT generate `docs/PAGE-TEMPLATE-LAWS.md` now.** It is written after the
first page locks, from what that page actually taught. Generated at init it
would be a guess, and a guess in a file labelled "law" is worse than an absence.
Tell the user it is deliberately deferred.

`REVIEW-BOARD.template.md` and `AUTONOMY-CHARTER.template.md` are also not
generated here. The first belongs at the end of a build; the second must not
exist unless the user has explicitly authorised an unattended run.

**The project `CLAUDE.md` is the highest-value output.** It is what a future
session reads first. It must contain: what the project is, where the facts live,
the locked decisions with their dates, the frozen subsystems, the working rules,
and a pointer to this config. Keep it under roughly 80 lines. A `CLAUDE.md` long
enough to skim past is worse than a short one.

---

## Report

End with four things and nothing else:

1. **Written**: the file list.
2. **Unanswered**: every field still `""`, with who needs to answer it. This is
   the most useful part of the output. Do not soften it.
3. **Open facts**: the questions now sitting in the facts file, with owners.
4. **Next**: the one command to run, chosen from the vertical overlay and the
   project state. For a new build that is usually `/seo-plan`. For an existing
   site it is usually `/site-crawl`.

---

## On `--update`

Changing a config mid-project invalidates work. Say what, before writing:

| Changing | Invalidates |
|---|---|
| `urls.trailingSlash` | Every canonical, the sitemap, and it needs redirects if the site is live |
| `palette.accent` | Every generated image, the OG cards, the design review |
| `market.country` | The citation list, local schema, every local assumption in existing copy |
| `identity.name` | Every page's copy, the schema, the OG cards |
| `vertical.overlay` | The conversion model, the analytics taxonomy, the page architecture |
| `enforcement.tokenFiles` | Re-run `/conventions-audit`, since files were policed under the old rule |

Then make the change and log a ledger row for anything SEO-affecting.
