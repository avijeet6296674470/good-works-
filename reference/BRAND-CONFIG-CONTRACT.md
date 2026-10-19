# brand.config.json: the contract

One file at the project root answers every question the pack would otherwise
hard-code. Agents read it to know what brand they are working on. Hooks read it
to know what to block. `/init-brand` writes it by interviewing you.

If a field is wrong, the pack is confidently wrong everywhere at once. Treat
this file as the highest-value thing in the project.

**Conventions**

- `""` means the question has not been answered yet. `/init-brand` will ask.
- `null` means deliberately not applicable. Nothing will ask again.
- `[]` means an empty list, which is a real answer. An agent that needs at
  least one entry will say so rather than invent one.

```bash
# What is still unanswered:
python "$WEBSITE_PACK/tools/config_check.py" brand.config.json
```

---

## meta

| Field | Means |
|---|---|
| `packVersion` | Which generation of the pack this config was written for. Mismatch is a warning, not an error. |
| `project` | Short slug. Used in file names and log lines, never in copy. |
| `initialisedOn` | Date `/init-brand` last ran. Stale configs are the usual cause of a confidently wrong agent. |

## identity

| Field | Means | Who reads it |
|---|---|---|
| `name` | The brand as it appears in prose. | Every copy agent |
| `nameRule` | Spelling and casing law, if the name has a trap. Example: a two-word name that people habitually write as one word. Copy agents enforce it literally. | Copy, ship gate |
| `legalName` | For legal pages, schema `legalName`, invoices. Often differs from `name`. | Schema, legal pages |
| `domain` | Production domain, no protocol. | SEO, schema, OG |
| `legacyDomain` | Only if this build replaces a live site. Drives the migration and redirect audit. `null` for a new build. | Migration audit |
| `promise` | The one-line promise. Not a tagline, not a slogan. What the visitor gets. | Strategy, hero copy, OG cards |
| `tagline` | The actual marketing line, if one exists and is approved. | Copy |
| `subBrands` | Named systems that live under the master brand and must never be visually mixed on one surface. Each needs `name` and `appliesTo`. | Design, brand asset integrity |

**On `subBrands`.** This is the field most projects skip and then regret. If a
brand has a café inside a venue, or a pro tier with its own colourway, those are
sub-brands. Declaring them is what lets the design agents refuse to put two
systems on one surface.

## vertical

`overlay` selects a file from `reference/verticals/`. The overlay changes what
the SEO and conversion agents assume: what a conversion is, which schema types
matter, what the funnel looks like, which off-site surfaces count.

| Overlay | Assumes |
|---|---|
| `local-business` | A physical place. Map pack, business profile, citations, reviews, opening hours, walk-in and booking intent. |
| `saas` | A product. Trial and demo funnel, comparison and alternatives pages, pricing page as a conversion surface, documentation as an SEO asset. |
| `ecommerce` | A catalogue. Product and offer schema, feeds, category architecture, review markup, cart and checkout funnel. |
| `agency` | A service business selling proof. Case-study architecture, claim curation, enquiry funnel, no self-reported ratings. |
| `none` | Strip vertical assumptions entirely. Agents will ask instead of assuming. |

`primaryConversion` is the single action the site exists to cause. Write it as a
verb phrase, one per site. Everything downstream sculpts toward it: internal
links, CTA hierarchy, the analytics taxonomy. If you cannot name one, the
strategy is not settled and no page should be built yet.

## market

Locale is a project input, not a pack assumption. The pack ships with no
geography baked in.

| Field | Means |
|---|---|
| `country`, `region`, `city` | Where the audience is. Drives schema `areaServed`, local intent, and which search surfaces matter. |
| `languageRegister` | How to write. Not the language: the register. Example: "plain English, short sentences, no idiom that assumes a native speaker". |
| `currencyCode`, `currencySymbol`, `priceFormat` | Money. `priceFormat` is a literal pattern so prices render identically everywhere. |
| `dateFormat`, `phoneFormat`, `addressFormat` | Rendering laws. The address format also becomes the byte-identical string used in schema and every citation. |
| `primaryDeviceWidth` | The width the responsive pass optimises first. Not the average width: the width of the audience that matters most. |
| `networkBudget` | The connection the performance budget assumes. Example: "mid-tier 4G, 1.6 Mbps effective". This is what turns a vague "make it fast" into a number. |
| `citationPlatforms` | The directories and listing sites that carry weight in this market. There is no universal list. Name them or local SEO work is guesswork. |
| `reviewPlatforms` | Where reviews actually accumulate for this market and vertical. |

**Why there is no default.** The previous generation of this pack assumed one
market and it leaked into agent prose, device widths, and citation lists.
Everything read as advice for somewhere else. An empty `market` block that
forces one interview is better than a wrong one that never gets questioned.

## voice

| Field | Means |
|---|---|
| `framework` | The copy framework, if the project commits to one. |
| `person` | Grammatical person. Consistency here is most of what makes copy feel like one writer. |
| `modes` | Named registers the brand switches between, each with `name`, `usedFor`, and an `example`. Two to four. More than four is not a voice, it is a lack of one. |
| `readingLevel` | Target reading level, stated plainly. |
| `humourPolicy` | How much, what kind, and the rate limit. A brand with wordplay needs a cap, or every heading becomes a pun. |
| `bannedWordsFile` | Where the full ban list lives. |
| `globalBans` | Bans the pack enforces regardless of project. Em and en dashes are here because they are the single most reliable machine-writing tell. |

## palette

`roles` maps six semantic roles to hexes. The hexes in the example file are
obvious placeholders and are meant to look wrong until replaced.

`accentRule` is the load-bearing line. Across every build this pack came from,
the accent is the payoff: it marks the one thing that matters on a surface. A
palette without that discipline produces pages where nothing is emphasised
because everything is.

`contrastLaws` is where you record colour pairings that are forbidden even
though they are on-brand. Example: a bright mid-tone that fails contrast as text
on a light background and may only be used as a fill. These are the rules
designers break by accident, so they must be written down rather than assumed.

Hexes live here and in the token file. Nowhere else. The code guard enforces it.

## type

Three roles. `licence` is not optional: record whether the project may self-host,
because "we assumed it was fine" is how a font bill arrives. `hostedFontsAllowed`
false makes the code guard block hosted-font links outright.

## stack

Describes the target implementation so the code and performance agents give
advice that applies. The pack ships framework-agnostic specs, so this field is
what grounds them.

`frozenSubsystems` is the important one. List any part of the codebase that may
be restyled but whose logic must not be touched, with the reason. Payment and
booking flows usually belong here. Every code agent reads this before editing
and will refuse a logic change to a frozen path. Approved exceptions get listed
explicitly, so an approval is a written thing rather than a memory.

## urls

`trailingSlash` must match what the router actually does. A mismatch between
this field and reality produces canonical tags that disagree with the served
URL, which is a slow, quiet, expensive bug.

`slugPolicy` exists to be quoted back at whoever wants to rename a page.

`keywordMapFile` points at the keyword ownership map: one primary keyword per
URL. Without it the SEO agents cannot check for cannibalisation.

## assets

`maxImageBytes` is a hard budget the pre-ship gate enforces. Set it from
`market.networkBudget`, not from taste.

## imagery

`provider` is fixed. Every image goes through one router with one key, so cost
is measurable in one place and a provider outage is a single known failure
rather than four silent fallbacks.

`peopleTreatment` is the field that keeps a series consistent. Write the rule for
how people are rendered, positively and negatively. A brand that has decided
against a certain look must say so here, because the models default to it.

`approvedInSceneText` is the whitelist of words allowed to appear inside a
generated image. Anything not on the list is a defect, because models invent
text and invented text on a brand surface is a fabricated claim.

`sharedExclusions` is appended to every prompt.

## truth

The most important block in the file. `factsFile` is the single source for every
published number, claim, hour, capacity and price. `rule` is quoted verbatim by
the copy and ship agents.

`forbiddenClaims` is the list of things that must never be published even if
someone asks. Self-reported ratings for a business with no real reviews belong
here. So does any savings or performance figure that does not survive its own
arithmetic.

## enforcement

Drives the hooks directly. This is what makes the code guard portable instead of
rewritten per project.

| Field | Means |
|---|---|
| `sourceGlobs` | Which paths the guard polices. Everything else is exempt, including docs and research. |
| `tokenFiles` | The only files where raw colour values may appear. |
| `ledgerFile` | The SEO change log. The ledger nudge hook fires when an SEO surface changes and this file has not. |
| `seoDataDir` | Where dated search-console/analytics snapshots live, read by Prospector, Almanac and `/seo-opportunities`. Never referred to in prose as "the agency data directory" or "the SEO working directory" — always this field. |
| `rules.*` | Individual checks, each switchable. |
| `rules.bannedSchemaTypes` | Schema markup this project must never emit, usually because the underlying thing is not real. |
| `rules.faqBankFile` | If set, every FAQ question and answer in code must trace to this file word for word. Prevents the same question having three different answers across a site. |
| `rules.fontDigitTraps` | For demo or partial font cuts that render certain glyphs as a watermark. Each entry names the CSS class and the character range to refuse. Obscure, and it has shipped to production more than once. |
| `grandfathered` | Files exempted deliberately, with a reason, until a planned pass. An empty list is the goal. |

---

## Changing the config mid-project

Re-run `/init-brand --update` rather than hand-editing, so the interview can tell
you what else the change invalidates. Changing `trailingSlash` after launch means
redirects. Changing `palette.accent` means regenerating imagery. Changing
`market.country` means the citation list and every local assumption are stale.

Hand-editing is fine for a typo. It is not fine for anything structural.
