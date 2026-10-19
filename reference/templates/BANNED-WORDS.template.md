# <FILL: BRAND NAME> — BANNED WORDS AND PATTERNS

Applies to **every string that ships**: page copy, titles, descriptions, alt
text, FAQ answers, schema text, text inside images, message and email templates.

Enforced by the code guard and the copy gates. When a banned pattern is genuinely
needed for a quoted source, flag it rather than publishing it.

> **Why this file exists.** Two different problems wear the same coat. Some
> words make writing sound machine-generated, and some patterns make a site
> look like it was built for a crawler rather than a person. Both are invisible
> to the person who just wrote them and obvious to everyone else. A list, in a
> file, checked by a script, is the only reliable defence.

---

## 1. Hard bans

### Punctuation

**Em dash and en dash. Never, in any shipped string.** Use "to" for ranges, a
comma, or a new sentence. Hyphens in compound words are fine.

> This is the single most reliable machine-writing tell in English, it survives
> every rewrite because people do not notice it, and it is trivially greppable.
> That combination is why it is rule one rather than a preference.

### Names

- <FILL: the misspelling of the brand that will happen> to always <FILL: correct form>. Exceptions: <FILL: code identifiers, the domain, a social handle>.
- <FILL: each sub-brand's exact form, and the wrong form it attracts>

### Client-instructed bans

- <FILL: any word the client has explicitly asked never to appear, with the instruction attached. Record the instruction, because in a year nobody will remember whether it was a rule or a preference.>

### Machine-writing vocabulary

Reads as generated, whoever wrote it:

delve, leverage (as a verb), unleash, unlock (metaphorical), elevate
(metaphorical), seamless, streamline, game-changer, revolutionise, transform
(metaphorical), cutting-edge, state-of-the-art, world-class, next-level,
top-notch, robust, holistic, synergy, curated (for anything but an actual
curation), vibrant tapestry, bustling, nestled, "whether you are X or Y",
"it is worth noting", "in today's fast-paced world", "look no further",
"at the end of the day", "the perfect blend of", "something for everyone",
"memories that last a lifetime".

<FILL: add the ones this brand's category attracts. Every industry has its own.>

### Positioning errors

- <FILL: the words that describe a competitor's version of this product rather than this one, or that contradict the positioning. Note where they ARE allowed, for example inside an FAQ answer that draws the contrast deliberately.>

---

## 2. Search-spam patterns

The failure mode where copy is written for a crawler. All of these are things a
human writer would never do, which is what makes them a tell.

- **A heading that talks about search itself.** Headings state a benefit to a human. Keywords live in body text.
- **Opening by echoing the query.** "Looking for X near me?" is the canonical version.
- **A location or qualifier tail more than once per paragraph**, or several keyword variants stacked into one sentence.
- **Raw keywords as visible UI labels**, chips or eyebrows.
- **Keyword lists dressed as content**: a row of boxes whose headings are near-identical search phrases.
- **Fabricated social proof**: star glyphs, review-shaped tiles, or testimonial cards for reviews that do not exist.

---

## 3. Unverifiable superlatives

<FILL: the list. Typically premier, best, top-rated, number one, award-winning, famous, renowned.> Banned in body copy.

Exceptions, and they must be written down or they will expand:
1. **Titles and descriptions may carry a mapped keyword phrase containing an evaluative word**, because a title is a search label rather than a claim. On-page prose may not.
2. <FILL: any campaign register the client has approved, pointing at the bank in BRAND-TRUTHS section 7.>

---

## 4. Register

<FILL: how this brand writes, in three or four lines. Sentence length. The variety of English or the language and its regional register, from `market.languageRegister`. Whether the brand does humour, of what kind, and its rate limit.>

> Be specific enough to act on. "Professional and friendly" is not a register;
> it is two adjectives that everyone reads differently.

---

## 5. What to do when a ban gets in the way

Flag it. Do not quietly work around it, and do not publish it.

Three legitimate outcomes: the copy gets rewritten to avoid needing the word;
the ban gets an explicit, recorded exception; or the fact behind it turns out to
be unsupported, which is the most valuable outcome and the one people skip.
