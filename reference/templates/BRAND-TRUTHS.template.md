# <FILL: BRAND NAME> — BRAND TRUTHS

The single source of publishable facts. **Never publish a fact, number, claim or
testimonial that is not in this file.** If it is not here, ask.

When this file and any other document disagree, **THIS FILE WINS.**

> **Why this file exists.** Facts leak into a website from a dozen places: a
> deck, a chat message, an old page, a research document, somebody's memory. Six
> weeks later the site says three different prices and nobody can say which is
> right. One file, one answer, and a rule that everything else defers to it.
>
> The second reason is subtler and matters more. An agent that cannot find a
> fact will produce a plausible one. This file is what turns "make something up"
> into "ask the client", and that single substitution is most of the value of
> the whole pack.

---

## 1. Identity

| Fact | Value |
|---|---|
| Brand name | <FILL: exactly as written in prose> |
| **Spelling rule** | <FILL: the trap, if there is one. A two-word name people write as one, a casing rule, an accent. State it as a rule, because it will be broken otherwise.> |
| Lockup | <FILL: the full lockup, if one exists> |
| Domain | <FILL> |
| Legal entity | <FILL: the registered name and any tax identifier. Differs from the trading name more often than not, and legal pages need it.> |
| Sub-brands | <FILL: each one, with its exact spelling. Or: none.> |
| Social profiles | <FILL: only profiles that genuinely exist. **Explicitly note the platforms the business is NOT on**, because otherwise someone will helpfully invent a link.> |
| Phone | <FILL: machine format and display format, which usually differ> |
| Email | <FILL> |

## 2. Contact details, byte-identical everywhere

<FILL: the full address, in the format `market.addressFormat` specifies.>

- **Coordinates**: <FILL: latitude and longitude, and **whether they are verified or provisional**. If provisional, say so here and everywhere they appear. Take them from the business listing's own pin, not from the map's centre point: those are different values and the difference can be kilometres.>
- **Location phrasing in copy**: <FILL: the approved wording. Also the wording to avoid, and why.>

> **Why byte-identical.** This exact string appears in the footer, the contact
> page, the schema, and every off-site listing. Directories match businesses by
> string similarity, so "Suite 4" against "Ste. 4" can read as two businesses.
> Decide the canonical form once, here.

## 3. Hours

<FILL: the real hours, including any last-order or last-booking cutoff, and any seasonal or holiday variation.>

Write ranges with "to", never a dash.

## 4. What the business actually offers

| Offering | Facts |
|---|---|
| <FILL: name> | <FILL: what it is, duration, capacity, constraints, and anything a customer would ask before buying> |

**Texture details usable in copy**: <FILL: the specific, concrete, verifiable details that make copy real rather than generic. These are gold, and they are the first thing lost when copy gets written from a brief instead of from the business.>

**Renames and their consequences.** When something is renamed after launch,
record it here with **every consequence**, because a rename is never just a
rename:
1. Did the underlying thing change, or only its name?
2. Did the URL change? Then a redirect ships with it and must survive deploy.
3. **Does any system still use the old name internally?** An API, an admin
   panel, a search parameter. This one is invisible and it breaks silently.

## 5. Pricing

<FILL: every price, exactly, in the market's currency and format.>

**Where prices live in code**: <FILL: the fact file>. This file and that file
change together, never separately.

**Savings arithmetic.** Where a bundle is presented as a saving, show the work:

| Bundle | Bought separately | Bundle price | TRUE saving |
|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> |

**Rule: state savings exactly, or state the maximum. Never round up.**

> **Why the arithmetic is in the file.** A rounded-up saving is the easiest lie
> for a customer to catch, because they have a calculator in their hand and they
> are already comparing. Doing the sum here means nobody has to redo it, and
> nobody gets it wrong in a hurry.

**Deposit, payment and refund terms**: <FILL: what is taken up front, what is refundable, and the notice periods. Contradictions between a refund policy and a checkout are common and expensive; resolve them here.>

## 6. Audience and market

<FILL: who buys, their context, roughly what they spend, how they discover the business, and what they dislike.>

**Not publishable as statistics.** This section is background for tone. The
moment a number from here appears on the site as a claim, it becomes a
fabrication.

## 7. Claims policy

**ALLOWED**, and who attested each one:
- <FILL: claim, plus who confirmed it and when. A claim with no attester is not allowed.>

**ALLOWED campaign or marketing lines**, where the project has approved a
register that would otherwise breach the superlative ban:
- <FILL: the approved bank. **The sentiment is locked; the wording is craftable.** New variants join this bank before they ship anywhere, including inside an image.>
- Hard limit: a new variant may not open a **new class of factual claim**. A louder way of saying an approved thing is fine. A claim about scale, ratings, awards or numbers is not.

**FORBIDDEN**, and these go into `truth.forbiddenClaims` in the config so the
guard blocks the markup too:
- <FILL: anything the business must never claim. Ratings and reviews where none exist. Visitor or revenue numbers. Awards not won. Any figure that fails its own arithmetic.>

## 8. Source hierarchy, when documents disagree

1. **This file.** It encodes the decisions.
2. <FILL: the in-code fact files>
3. <FILL: the client's own signed documents>
4. <FILL: research deliverables>
5. **Everything else is stale.** <FILL: name the documents known to carry outdated values, so nobody cites them by accident.>

> **Why the hierarchy is explicit.** Every project accumulates documents that
> were true once. Without a stated order, whoever reads the wrong one last wins,
> and the error looks sourced.

---

## Open questions

| Question | Owner | Asked on | Needed by |
|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> |

**A fact nobody can confirm lives here, not in the site.** This table is the
mechanism that keeps an unknown from quietly becoming an invention. Empty is the
goal; long is honest; absent is a lie.
