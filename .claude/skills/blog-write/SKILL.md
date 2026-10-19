---
name: blog-write
description: Produce a complete, publish-ready post from a brief. Runs the full pipeline: draft (Marlowe), humanise (the truths and banned-words files plus the /humanize and /ai-check gates), SEO optimise (Beacon and Weave), images (the creative panel through the single provider), and assemble a publish-ready package. Output is FILES, never auto-published. Auto-fires on "write the blog", "produce the post", "write from brief", "draft the article", "blog production".
---

# /blog-write: the content-production pipeline

Turns one brief into a complete, publish-ready package. The publish target is a route in the project's own app, in the project's URL form, rendered like every other page. Until that route exists, packages queue as ready files. Repeatable, and run per piece.

## Inputs
- The target brief, which carries the pillar, title options, keywords with evidence, the outline, internal links in and out, the meta, the schema questions, the verified-facts block and the voice rules.
- `docs/BRAND-TRUTHS.md` (the only facts), `docs/BANNED-WORDS.md`, `docs/BRAND-DIRECTION.md`, and `voice` in the config.
- The fact files. **Anything unverifiable is written as "confirm with client", never guessed.**
- The brand source, as creative-panel reference material.

## The pipeline, each stage gating the next

**1. Draft (Marlowe).** Write to the brief's outline and word count. One keyword-bearing, human H1. Logical heading structure with question-format headings where a real search asks one. **Open with the 40 to 60 word direct answer**, which is what captures a featured snippet or an answer-engine citation. Include the FAQ block from the brief.

Integrate keywords naturally: primary in the H1, the intro and one heading, plus a couple of body uses; secondaries where they fit. A location or qualifier tail once per paragraph at most. **No query-echo openers.**

**2. Humanise (Marlowe).** Lint every line, then run the `/humanize` and `/ai-check` gates. Hit all of these:
- **Burstiness.** Vary sentence length aggressively. A short punch after a long sentence lands. **Never three sentences in a row of the same length**, which is the tell most people miss because each one reads fine alone.
- **Paragraph variation.** Some paragraphs are one line. Some run four sentences. White space is part of the writing.
- **Voice** per `voice.modes` and `market.languageRegister`. Talking to the reader, not about the business. Humour within its rate limit, never forced.
- **No template titles, but keep the keyword.** Kill the colon-listicle heading. The H1 must be human AND carry the primary keyword. Provide three alternates, all keyword-bearing.
- Standard bans: no dashes, no machine-writing vocabulary, no unverifiable superlatives, no fabricated proof.
- Read it aloud in your head. If it sounds like a template, rewrite until it does not.

**3. SEO optimise (Beacon and Weave), a hard gate that ALWAYS runs after humanise.**

**A voice rewrite must never silently drop a keyword slot**, which is exactly what a good humanise pass tends to do. So Beacon re-verifies coverage first: the primary keyword present in the **H1 and at least one heading and the intro**; every secondary present at least once. If the humanise pass removed one, restore it in voice before continuing.

Then confirm: one H1 with correct heading order; title and description within their ceilings; an absolute canonical in the project's form; the internal links from the brief with exact anchors to real URLs, **each one verified to exist**; every figure exactly per the truths file with arithmetic recomputed.

Weave emits the article and FAQ markup, server-rendered, with the exact questions from the piece and nothing from `truth.forbiddenClaims`. Provide the **inbound-link list**: which existing pages will add a link to this piece.

**4. Images, through the creative panel.** Plan the set, typically one hero and two to four supporting.
- All generation goes through `/brand-image` or `/generate-image`, rendered by the single configured provider. **Never call a vendor directly**; if the provider is down, stop and report.
- People render per `imagery.peopleTreatment`. **Check `docs/ASSET-LIBRARY.md` and reuse before generating.**
- All in-image text specified verbatim from `imagery.approvedInSceneText`. No invented signage, prices or proof inside an image.
- Post-process locally, **never regenerating to fix a crop**. Sized modern-format variants inside `assets.maxImageBytes`. Marlowe writes alt text for every image.

**5. Assemble the package** into a dated draft folder: the final body with heading structure intact and image paths and alt text inline; the meta file with title, description, slug, keywords, canonical, the markup and the share image; an images manifest recording each prompt and model; the internal-links file with outbound anchors and the inbound tasks; and a short how-to-publish note.

**6. Log and track.** Advance the calendar status and log the production with its target keyword and measure-on date.

## Delivery
**Files only, and never auto-published.** The route ships through the normal build pipeline and the ship gates, and pushing anything to a client repository is a manual, user-approved decision.

## Done definition
- [ ] Full draft to brief spec, humanised, both gates passed.
- [ ] The keyword gate passed **after** humanise; meta, internal links verified real, and the markup emitted with nothing forbidden.
- [ ] Images generated through the panel and the single provider, in-image text verbatim, sized with alt text.
- [ ] The package written, the calendar updated, the production logged.
- [ ] Every fact traced or marked for confirmation, and all arithmetic recomputed.
