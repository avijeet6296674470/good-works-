---
name: copy-pass
description: Use when writing or rewriting the visible text on a section, page or set of pages. Marlowe leads with the rewrite in the brand voice, then runs the humanisation pass and the banned-words lint including the search-spam patterns. Beacon slot-checks that the keyword targets and meta lengths survived per the ownership map. Facts come only from docs/BRAND-TRUTHS.md. Route schema-touching numbers to Weave and layout pressure to Onyx and Vesper. Use whenever copy reads wordy or machine-written, a new section needs production copy, or a page is being rebuilt.
---

# /copy-pass: rewrite or audit visible text

Marlowe's canonical copy pass. Marlowe writes and lints; Beacon confirms the SEO slots survived.

The reader is whoever `market` describes, deciding whether this is worth their time. **Clever loses to clear.** A headline that makes someone want to act beats one that makes the writer feel smart, every time.

## Canonical grounding (read first)
If anything below conflicts with a source, the source wins.
- `brand.config.json` `voice`: the modes, the person, the reading level, the humour policy and its rate limit. And `market.languageRegister`, which is binding rather than advisory.
- `docs/BRAND-DIRECTION.md`: the voice in detail, the tagline bank, the copy formula.
- `docs/BANNED-WORDS.md`: the full lint. Hard bans, machine-writing vocabulary, search-spam patterns, unverifiable superlatives, register.
- `docs/BRAND-TRUTHS.md`: the ONLY publishable facts. Not in it? ASK, never invent.
- The keyword ownership map at `urls.keywordMapFile`.
- The page's deck in `docs/copy/`: the shipped drafts and THE copy source for the build. Start the rewrite from the deck, land every accepted edit back into it, and take FAQ answers word for word from the bank.
- `docs/CONTENT-PLAN.md`: the implemented keyword, meta and heading slots Beacon re-checks against.

## When to invoke
A section reads wordy, stiff or machine-written. A new section needs production copy. A page is being rebuilt. Feedback lands as "this copy is off" or "shorten this".

## Inputs
The section or page copy and its route file, plus Beacon's slot spec: primary keyword, H1 target, title ceiling, description target, anchor keywords, alt-text angle, and the direct answer block if the page carries one. If the slot spec does not exist yet, get it from Beacon before writing the H1 and meta.

## Steps

### 1. Marlowe writes or rewrites
Read the slot before filling it. Then:

- **Write for the decision the reader is actually making.** Open on what they get, not on the business talking about itself. One clear next action per scroll depth.
- **Write tight and simple.** Short sentences. Cut every paragraph by roughly a third on the second pass. Contractions welcome, jargon not.
- **Concrete over abstract.** Real numbers, real durations, real hours, in the market's own formats. Facts beat mood words, and they are also the only part a competitor cannot copy. Ranges use "to", never a dash.
- **Keyword balancing per the ownership map.** The primary keyword lives in the H1, the title and the description. Variants spread naturally through body text and FAQ answers, **never stacked in one sentence**, and a location or qualifier tail appears at most once per paragraph.
- **Lint every string** against `docs/BANNED-WORDS.md`:
  - No em or en dashes, ever.
  - Honour `identity.nameRule` exactly.
  - No machine-writing vocabulary: delve, seamless, elevate, unlock, robust, world-class, "whether you are X or Y", "something for everyone".
  - **No search-spam patterns**: no heading that talks about search itself, no opening that echoes the query, no raw keywords as UI labels, no keyword lists dressed as content, no fabricated proof.
  - No unverifiable superlative in body copy. A title or meta may carry a mapped keyword phrase containing an evaluative word; keep it out of on-page prose. Anything in `truth.forbiddenClaims` is a hard stop regardless of phrasing.
- **CTA labels say what happens next.** Never "Learn More", "Click Here" or "Submit".
- **Alt text is copy**: a real, specific description of what the image shows, never keyword-stuffed.

### 2. The humanisation pass
Read it out loud. If it sounds like a model wrote it, rewrite it.
- No "it's not just X, it's Y". No rule of three on every line. No hype adverbs.
- **Vary rhythm deliberately.** Uniform sentence length is the tell most people miss, because each sentence reads fine on its own and only the aggregate gives it away.
- Start the occasional line with "And" or "But". One honest aside where it helps.
- Respect `voice.humourPolicy` and its rate limit. A forced joke is worse than none.
- Run the `/humanize` and `/ai-check` gates before ship.

### 3. Beacon slot validation
Beacon re-checks that the words did not break the slots: the H1 still contains the primary keyword and stays unique sitewide; the title is within 60 characters with the keyword front-loaded; the description within 155 with a benefit and a reason to click; the direct answer still answers the primary query in 40 to 60 words with a real fact in it; anchors are contextual and in the project's URL form; the page still owns its cluster with no variant stacked to compensate.

If a keyword reads stiff in the brand voice, push back: **voice wins the visible page, the keyword wins inside the title, the meta, the schema and the anchors.**

### 4. Inviolable-rules check
Before done, confirm the rewrite left these no worse:
- **SEO**: one H1 and the heading order untouched, title and description unique and within ceilings, alt text still meaningful. Any heading, anchor or meta change gets a ledger row.
- **Structured data**: no visible number desynced from its marked-up value. FAQ edits go to the shared array, never a fork.
- **Truth**: every fact traces to `BRAND-TRUTHS.md` or a fact file. Savings and figures stated exactly, never rounded in the brand's favour, and every one recomputed rather than trusted.
- **UX**: scannable, no wall of text, one clear action per scroll depth. Flag when a line forces a heavier layout instead of quietly creating one.
- **Speed**: no copy that forces a heavier surface. Flag it, do not create it.

## Output
The rewritten strings in place, each cleared of the lint, with the keyword slots confirmed intact. Note any fact that needed sourcing and any slot that had to be renegotiated.

## Guardrails
- Never ship a string that has not cleared the lint, including the search-spam section.
- Never fabricate a price, statistic, review, testimonial or claim.
- Never echo a search query as an opener, or put a keyword in a heading as a keyword.
- Never exceed the humour rate limit, and never force it.
- Never touch the H1 keyword, the meta ceilings or the heading order without looping Beacon in, and never without a ledger row.
- Never write an em or en dash.

## Done definition
Every string passes the lint. Every keyword slot still hits its target, confirmed by Beacon, with variants spread rather than stacked. The copy reads human, with `/humanize` and `/ai-check` clean. Every fact sourced, and anything at risk routed to its owner. Any SEO-affecting change has its ledger row.
