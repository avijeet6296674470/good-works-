# Stage 4 — Content & SEO/AEO/GEO Strategy (as specs, not prose)

**Goal:** produce structured specifications — keyword ownership maps, schema strategy, page-by-page
briefs — that pages can be built against consistently, instead of writing final copy by hand for
every page and hoping it adds up to a coherent site. Nothing gets written as finished copy in this
stage; the spec is the deliverable.

---

## 1. The portable process

1. **Assign keyword ownership per page, explicitly, and never let two pages compete for the same
   term.** A homepage owns brand keywords; a location or category page owns its own specific term.
   Write the assignment down as a real document, not something inferred page by page as it's built —
   cannibalization is a compounding cost, and it's far cheaper to prevent at the mapping stage than
   to untangle later.
2. **Plan AEO (answer-engine) and GEO (generative-engine) optimization alongside classic SEO, not as
   an afterthought bolted on later.** Direct-answer blocks, FAQ schema, quotable snippets written to
   be citable verbatim, and a real `llms.txt` are first-class deliverables of this stage, not a
   nice-to-have pass at the end.
3. **Plan the schema strategy as its own document before any page is built.** Which schema type per
   page, one `@id` per entity, byte-identical NAP (name/address/phone) across every schema block —
   retrofitting schema consistency across dozens of already-built pages is exactly the kind of
   expensive correction sweep a locked-first approach avoids.
4. **Capture in-universe or brand-specific vocabulary explicitly, and treat it as a real strategic
   asset, not decoration.** A genuine differentiator competitors don't have (a brand's own house
   terminology) is worth mandating across every piece of AI-generated copy, pulled directly from
   the brand's own live material, not invented fresh.
5. **Decide, explicitly, whether and how gated content stays indexable.** The locked pattern: the
   full content is always server-rendered into the HTML for every visitor, including search
   crawlers; a CSS/JS overlay visually hides the back portion from humans who haven't opted in yet;
   unlocking is a pure client-side reveal, no reload. This is not cloaking — bots and humans get
   identical HTML, only the display differs — and it lets the same piece of content earn both search
   rankings and email signups.
6. **Sequence content strategy as a system planned end to end, not a page assembled section by
   section.** Understand the brand and the offer, map the funnel stages, do the keyword research,
   build the audience profile — only *then* decide page architecture and lead-gen mechanisms per
   funnel stage. Tracking and CRM wiring come last; real, but the afterthought, not the headline.
7. **Verify a gate is actually applied, and actually still indexable, after it ships.** A gate that
   silently blocks crawlers defeats its own purpose just as surely as one that never gates anyone —
   check both properties directly on the live page, not just that the feature "was built."

**When is this stage actually done?** When a keyword-ownership map exists with no two pages assigned
the same primary term, a schema strategy document exists before the first page using it is built,
and every page-by-page brief specifies what to say without yet containing final copy. If a
copywriter would still need to make a strategic call (which keyword this page owns, what schema it
carries) while writing, the spec isn't finished yet — that decision belongs in this stage, not the
build stage.

**The rule that generalizes hardest from this stage:** a spec that exists as a document survives
being revisited, audited, and handed to someone else; a decision that exists only as "how the last
few pages happened to turn out" does not. The keyword map, the schema plan, and the brand-vocabulary
list are worth writing down as real artifacts precisely because they're the parts most likely to
drift silently if left implicit.

---

## 2. How Piyush actually talks during this stage

**Naming AEO/GEO directly and precisely, drawing a real distinction other people would blur:**
> "this is a website kit for seo / aeo / geo optimized site.. and not a SEO service kit? there is a
> difference.."
> — [Labyrinth, chat-001, 2026-08-12]

**A terse, direct schema question — checking the actual state, not assuming it:**
> "Okay, so we have what sorts of schema on the page?"
> — [Massive Impact, chat-002, 2026-07-23]

**Laying out the full structured-spec sequence in one breath — this is what "spec before copy"
actually sounds like when he says it:**
> "Okay, now let's make the list of pages, and then use our new systems to look at a page, plan the
> changes, SEO optimizations for every page, keywords, LSI, secondary, tertiary, AI optimization,
> schema, EEAT optimization for the site, and how it relates to the page."
> — [Massive Impact, chat-016, 2026-08-12]

**Naming the gated-but-indexable pattern directly, in exactly the shape it ends up locked as:**
> "Make sure to do the gate thing in all the reports and blogs, etc., and other things — but have
> them fully indexable on Google?"
> — [Massive Impact, chat-020, 2026-08-25]

**Stating the actual reasoning behind the pattern, not just the mechanic:**
> "We also need all the Lead Magnets of the DPC versions to be SEO-indexable as well, and people
> need to opt in to view them so we are still collecting leads from them as well."
> — [Massive Impact, chat-019, 2026-08-24]

**Checking the gate was actually applied everywhere it was supposed to be, after the fact:**
> "All 6 pages have gated PDF download and sidebar, etc., right?"
> — [Massive Impact, chat-023, 2026-08-28]

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** What
transfers is the method; the actual keywords, schema choices, and vocabulary are specific to each
business.

### Massive Impact
- Per-page structured specs ("page brains") captured each page's one job, buyer, keyword cluster,
  funnel role, required proof, and a scoring bar used to audit it — a real document, not something
  reconstructed from memory each time a page was revisited.
- AEO answer blocks were engineered specifically for AI Overviews and answer-engine citation:
  definition-first, "speakable"-marked passages answering the page's real question in the first
  sentence, paired with full JSON-LD (WebPage, ItemList, FAQPage, Breadcrumb).
- A real, caught bug tied directly to this stage's material: an AEO answer section — the page's
  strongest AI-citation surface — was rendering white-on-white and invisible in dark mode. Fixed and
  verified live, not just patched and assumed fixed.
- Lead magnets and downloadable guides were built SEO-indexable and gated by email opt-in
  simultaneously — the same content earning both search value and lead capture.

### Labyrinth Escape Games
- **Keyword ownership assigned per page, explicitly, with no overlap:** the homepage owns brand
  keywords only; `/boise/` owns "escape room boise"; `/nampa/` owns "escape room nampa."
- **In-universe brand vocabulary locked as a required part of every piece of copy:** staff are
  "Travel Agents," players are "Travelers," the game's fictional device is "M.R.L.N. technology,"
  games are "adventures" or "experiences," never plain "escape rooms." Pulled directly from the live
  site, not invented — a genuine differentiator, treated as a strategic asset.
- **The gated-but-indexable pattern, built and shipped:** every guide and lead-magnet page renders
  its full article server-side for every visitor including crawlers; a CSS/JS overlay masks the back
  portion from humans who haven't opted in yet with an email address; unlocking is a pure
  client-side reveal with no page reload.
- **Schema work was directly tied to a real ranking recovery**, not treated as boilerplate: the
  original SEO investigation found Boise-specific pages 301-redirected to the homepage, plus new
  LocalBusiness schema added around the same time that created a "trust signal cold start." The fix
  validated `@id` fields and NAP consistency once the redirects were cleaned up — schema correctness
  was part of the actual recovery, not a separate checklist item.
- A locked URL structure (`/events/`, `/tools/`, `/guides/`) was finalized before any guide pages
  were built, specifically so the keyword map and internal links would be correct from day one.

### Putt House
- No content/SEO-strategy-specific material distinct from what's already covered in Stages 0 and 3
  (the discovery-phase citation-gap finding, the infrastructure-audit defects) — this project's
  surviving record is thinner at this specific stage than the other two.

---

## 4. Gaps

1. **Confirmed after a deeper raw-archive search: no clean verbatim quote survives for the actual
   moment of assigning keyword ownership per page** (e.g. "this page owns X, that page owns Y") in
   either the clean or raw Labyrinth archive. The keyword map itself is well-documented in the case
   study, but the specific chat moment where it got decided doesn't show up in what survives. The
   AEO/GEO, schema, and gating quotes above are strong; this one specific pattern is thin. Leaving it
   as a real limit of the source rather than a gap to keep chasing.
2. **Accepted, not chased further.** Putt House has little distinct material for this stage — its
   content/SEO work is genuinely folded into what Discovery and Infrastructure already cover, not a
   gap in how this file was researched.

No open gaps remain for this stage as written.
