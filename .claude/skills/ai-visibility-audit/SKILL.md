---
name: ai-visibility-audit
description: Audit how the business shows up in answer engines for its category's intents, against competitors. Measures share of answer-engine voice (who gets named or cited when someone asks an AI the questions this business should own), and audits the technical prerequisites that make the site citable: crawler policy, server-rendered schema, direct-answer and FAQ content, and presence on the third-party sources the engines actually quote. Scraping, research tooling and manual prompts.
---

# /ai-visibility-audit: share of answer-engine voice, and citability

Visitors increasingly ask an answer engine rather than scrolling results. This audits **(A) presence**, meaning does an engine name or cite this business when asked, and **(B) the technical reasons** the site is or is not citable.

Where a business is genuinely first in its category locally, the category questions have no incumbent answer yet, and **the point of this audit is to catch that seat before someone else's listicle does.**

Pairs with `/schema-audit` (the markup that earns citations) and `/local-seo-audit` (the platforms).

**Pre-launch note:** before launch the honest expectation is zero presence. Run it anyway, to baseline it and to map which sources the engines lean on for this market and category, so the outreach list is ready on day one.

---

## Part A: share of answer-engine voice

### 1. Build the visitor-question set
The prompts a real buyer would actually type, 8 to 15 of them, mixing intents. Derive them from the keyword ownership map and the vertical overlay rather than inventing them:
- **Discovery**: the broad "what should I do or use for X" questions.
- **Category**: the direct "is there an X in Y" and "best X" questions the business should own.
- **Segment**: one per audience the site has a page for.
- **Sub-brand**: where a sub-brand has its own discovery surface.
- **Brand and comparison**, post-launch: the business by name, and "is it any good".

### 2. Run each prompt across the engines and record who gets named
Cover the engines that matter in this market. For each prompt and engine, record: is the business **named**, at what **rank**, is it **cited with a link**, which **competitors** appear, and **which source URLs** the engine cites.

```
prompt                     | engine     | named? | rank | cited+link | competitors named | source domains cited
```

> Most answer engines are interactive applications, so **the reliable capture is manual**: run the prompt, screenshot the answer, log the row. Store the evidence per engine in a dated folder.

### 3. Score it
- **Share of voice = prompts where the business is named or cited, over total prompts**, per engine and overall.
- The same metric for each competitor, which produces the comparison that actually lands with a client.
- **Note which sources the engines lean on** for this market and category. That list is *where to earn presence next*, and it is the most actionable output of Part A. It feeds the outreach plan directly.

### 4. Cross-check with data
Use research tooling to find the actual listicles, threads and directories the engines cite, with real URLs rather than remembered ones. Confirm the underlying terms have real volume and whether they trigger an AI answer at all.

---

## Part B: the citability audit, the technical why

Each item is a fixable recommendation.

- [ ] **AI crawlers allowed in robots.** The policy may be correct in the repository and wrong in the deployed file. **Check the deployed file**, not the source.
  ```bash
  curl -s "$HOST/robots.txt" | grep -iE 'GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|PerplexityBot|Google-Extended|Applebot'
  ```
  These are the crawlers that actually matter today — the same names block every site everywhere, not something to re-derive per project.
- [ ] **Schema is server-rendered.** The decisive check: request the page plainly and look for the type strings.
  ```bash
  curl -s "$HOST/" | grep -o '"@type":"[^"]*"' | sort -u
  ```
  **Empty here but full in the browser's inspector means invisible to the crawlers that matter.** Route detail to `/schema-audit`. Nothing from `truth.forbiddenClaims`: a fabricated rating poisons trust with engines exactly as it does with search.
- [ ] **Direct-answer content**: the 40 to 60 word block after every H1, plus question-format headings from the keyword map's question bank. Facts in those answers only from `BRAND-TRUTHS.md`, because an answer engine quoting a wrong number quotes it verbatim and at scale.
- [ ] **FAQ blocks** with markup on the mapped pages, word-identical to the visible text.
- [ ] **Entity consistency.** The name exactly per `identity.nameRule`, plus the location, identical across the site, the business profile, the schema and every citation platform. **Engines disambiguate by exact entity match**, so a stray alternative spelling is a real disambiguation risk. Grep for it.
- [ ] **The answer-engine text file** (`llms.txt`), if the project ships one (`urls.llmsTxt` in `brand.config.json`). Treat it as low-cost insurance rather than a blocker — the real work is schema, crawlability and earned citations.
  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" "$HOST/llms.txt"
  ```
- [ ] **Cited-source presence.** Is the business *on* the third-party sources the engines actually quote for this market? **Often the fastest path to answer-engine presence is getting into those roundups, not an on-site tweak.** Feed the gap list to the outreach and link work.

## How to run
1. Build the question set.
2. Run Part A across the engines, screenshot and log, and compute share of voice for the business and its competitors.
3. Run Part B, marking pass or fail with the fix and its owner: Weave for schema, Beacon for the answer and FAQ slots, Cortex for robots, `/local-seo-audit` for platform presence.
4. Output: the share-of-voice comparison, the citability gap list, and a ranked plan to become the cited answer. Log shipped fixes via `/seo-log`.

## Notes
- **Answer-engine outputs are non-deterministic and personalised.** Run each prompt two or three times, note the variability, and **date-stamp every screenshot**, because the engines change week to week. Present the result as a snapshot, never as a guarantee. A share-of-voice number quoted without its date is not a measurement.
- Where the business is genuinely first in its category, that is the story: the engines currently have nobody to name, and every month it is not the cited answer is a month the seat stays open.
- No em or en dashes in the report. Facts only from `BRAND-TRUTHS.md`.

## Done definition
Share of voice computed per engine for the business and its competitors, with dated screenshot evidence. The citability checklist scored with fixes and owners. The source map captured, meaning which publications and platforms the engines quote for this market. A ranked plan produced and its outreach targets handed to the local and link work. Cross-referenced with `/schema-audit`.
