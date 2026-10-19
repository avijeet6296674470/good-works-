# Stage 5 — Build

**Goal:** build pages and features against the specs locked in earlier stages, in a deliberate order,
with real checkpoints — not a whole page or feature produced in one unsupervised pass and presented
as finished.

---

## 1. The portable process

1. **Read the standing rule docs before touching anything**, and cross-check them against what's
   actually on disk — documentation drifts, and catching that drift early avoids building on a false
   premise.
2. **Plan before building.** A short brief per page or feature: who it's for, its one real angle,
   what's actually holding this back from working, what proof it needs. Sequence work by likely
   impact, not just what's next on a list, and check for blockers (a claim that conflicts with
   another page, an offer that doesn't match a locked price) on paper before writing any code.
3. **Gate-check any visual plan before generating images against it.** No image gets generated until
   there's a short plan stating what each visual is and what real brief it's generated against.
   Generating first and hoping it fits means generating against a guess.
4. **Build in a safe, no-indexed preview route — never live-in-place.** The live page stays
   completely untouched until every section of the new version is signed off. Remove the no-index
   only once the feature is actually ready to go public.
5. **Build one section at a time, show it, get an explicit approve-or-adjust answer, then move to
   the next.** This is the core discipline of this whole stage. Never build a whole page or feature
   unsupervised and present it finished — every time that's been skipped, the result was something
   that had to be substantially rebuilt.
6. **Keep a running learnings log as feedback happens**, not summarized after the fact. This is what
   makes the section-by-section process actually compound — the next section, and the next page,
   inherits every correction already made instead of repeating it.
7. **Index the real, durable facts before writing narrative copy — never the reverse.** Build (or
   update) one canonical index of what's actually true for whatever's being described, audit it
   against the primary source at least once, and only then write copy that uses what the index
   actually supports.
8. **Reach for the known reusable pattern before inventing a new one.** An interactive tool or quiz
   has a proven shape (a gated cover screen, a one-question-at-a-time flow, a result screen with a
   primary CTA and one or two cross-sells) — once the shared infrastructure exists, each new one is
   cheap. A PDF or downloadable guide follows its own repeatable pipeline: research real, verifiable
   sources (never invented facts) → write the content → generate supporting images → build the file
   via a script that can be rerun, not a manual one-off → host it at a permanent, non-expiring URL →
   wire it behind whatever gate applies → track its internal links so its traffic is attributable. A
   client-facing deliverable (a proposal, an audit report) gets the same treatment: markdown as the
   real source of truth, a generator script that regenerates the styled document from it, hand-editing
   the output only after it's already been sent to someone (regenerating afterward would silently
   clobber a real edit).
9. **QA before calling anything done.** A real, reliable screenshot (not a casual glance), both light
   and dark themes, mobile and desktop, structured data checked in the actual server-rendered HTML,
   and the standing style gates (no em/en dashes, no banned words, no AI-tell copy patterns).
10. **Promote and clean up once every section is signed off.** Run a full pass across the whole
    assembled page, swap the live route to the new version, delete the old component so there's no
    dead code sitting next to it, and update whatever tracks build status.
11. **Centralize every real lesson into the standing rule docs immediately, not "later."** A
    correction that only lives in this session's memory doesn't survive to the next page or the next
    project; promoting it into the actual rule file is what makes it inherited automatically.
12. **Verify live, not "it built."** "Done" means the actual production result has been checked —
    the live page loaded and reviewed, the real number recomputed — not that a command exited with
    status 0 or an agent reported success.

**When is this stage actually done?** When a feature has actually shipped to its real, live URL —
not staged, not "ready to deploy" — and been verified there directly. A page that passed every
section-by-section check in a preview route but was never actually promoted and checked live isn't
done; the promotion and the live verification are part of the stage, not an afterthought tacked onto
the end of it.

**The rule that generalizes hardest from this stage:** the size of a build doesn't change the shape
of the checkpoint. A single chart and a whole new interactive tool both go through the same
propose-show-approve cycle — what changes is how many times you go around it, not whether you skip
it for something that "feels obviously right." Every real account of skipping this rule ends the same
way: something that has to be substantially rebuilt.

---

## 2. How Piyush actually talks during this stage

**The origin of the whole discipline, stated almost as a teaching moment — not just an instruction,
a stated method:**
> "We will build one section at a time, and you will learn, okay?"
> — [Massive Impact, chat-018, 2026-08-23]

**Rejecting a whole batch of unsupervised work outright, and restating the actual rule in the same
breath:**
> "Please delete the current vertical pages as they are a joke. We need to build them one at a time
> properly and not in a hurry, keep the content in a markdown file for future reference."
> — [Massive Impact, chat-001, 2026-07-22]

**The single clearest statement of the whole discipline in one real correction — screenshot proof,
approval before building, one at a time, all at once:**
> "I gave you a screenshot of Lost Reality and you didn't use that. You are reckless and a pure
> time-waster... Please do it one at a time. Show me the graphics and quotes and things, get
> approval first, and then make it. Also, the current design is too ugly, cluttered, and useless."
> — [Massive Impact, chat-003, 2026-07-23]

**Requesting a section-by-section rebuild of a page that had already shipped but wasn't working —
the discipline applies to fixing, not just first builds:**
> "I am not happy with the Escape Room Marketing Page. Make a V2, and let's make this page section
> by section — is that fine?"
> — [Massive Impact, chat-018, 2026-08-23]

**The same instruction recurring later in the same session — confirming it's a standing rule he
restates, not a one-time ask:**
> "Please do the sections, section by section, and then plan the pages, please."
> "do it section by section, and delete the original... work down the page, okay?"
> — [Massive Impact, chat-018, 2026-08-23]

**Screenshot-as-proof, a constantly recurring demand rather than an occasional check:**
> "Can you please improve the formatting section by section, take a screenshot and improve it...
> currently it sucks."
> "Show me the PDF for 2025." / "Show me the PDF for 2024."
> "Yes, please show me the stuff when it's ready, okay?"
> — [Massive Impact, various]

**The lab/no-index preview route, named explicitly with real specifics — not a vague "keep it
private":**
> "Okay, host this slide deck on the Massive Impact website in a no-index section, okay?... It
> cannot be under the root, put it under decks or something, and no-index the complete route."
> — [Massive Impact, chat-023, 2026-08-28]

**Removing the gate once a feature is actually ready — the other half of the same discipline:**
> "remove no-index from the invitation maker please."
> — [Labyrinth, chat-013, 2026-09-01]

**Insisting a PDF actually carry real visuals, not read as a wall of text:**
> "When you do that, make sure to also add visuals and generate, and not just make the PDFs text
> text text. We need strategic and tactical images in all the PDFs, as that is important, okay?"
> — [Massive Impact, chat-023, 2026-08-28]

**Specifying the exact design spec for a reusable interactive tool — which fields are dynamic, which
are fixed, in one breath:**
> "We want to reuse all their assets from their existing businesses and create the design cards.
> Ideally, you understand the theme of a birthday party invitation maker: what can be dynamic and
> what can be fixed. They have two locations that can be dynamic, and the kids' age, kids' names,
> and all of that can be dynamic..."
> — [Labyrinth, chat-013, 2026-09-01]

**Gating an in-progress tool from public view while it's genuinely unfinished — the same
lab/preview discipline applied to a whole section of the site, not just one page:**
> "make sure the /tools/ page does not open for people as there's a lot of paused tools in there..
> and then we will also do the seo changes and optimizations as well.."
> — [Labyrinth, chat-013, 2026-09-01]

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** What
transfers is the method; the actual build order, tools, and pipelines are specific to each project.

### Massive Impact
- The entire 11-step build process this stage's portable process is distilled from is documented in
  full in the guidebook's own
  [`02-THE-BUILD-PROCESS.md`](../../../../massive-impact-website-guidebook/02-THE-BUILD-PROCESS.md) —
  worth reading directly rather than reproduced here, since it's a real worked artifact, not a
  summary of one.
- A concrete failure-then-fix: an early attempt at building a set of vertical pages all at once,
  unsupervised, was rejected outright ("a joke") and rebuilt one page at a time, with the working
  content kept in a markdown file for future reference rather than lost.
- PDF/report deliverables were explicitly required to carry real generated visuals, not ship as
  text-only documents — checked directly by asking to see the PDF, not by trusting a "done" report.

### Labyrinth Escape Games
- **Eight interactive tools plus an invitation maker**, all built on shared infrastructure once the
  pattern was proven: a room-matching quiz, an escape-rate predictor, a personality quiz, a gift
  finder, a "would you survive" quiz, a two-respondent couples quiz with email delivery, a
  team-building planner that balances and assigns sub-groups and emails a PDF plan, and a
  birthday-invitation maker (a three-screen flow, 20 templates, both a canvas preview and a
  server-side composited image/PDF). A shared "Traveler's Journal" tracked progress across all nine
  in local storage. Roughly 70% of the work was already reusable once the shared infrastructure
  existed — new tools were costed at a handful of new files each.
- **The birthday invitation maker's design spec named exactly which fields were dynamic** (the two
  venue locations, the child's name and age) **versus fixed** (the underlying template art),
  specified directly rather than left for the build to infer.
- **Three downloadable guides** as lead magnets, researched from real, verifiable sources, illustrated
  with AI-generated images, and built as rerunnable scripts specifically so a corrected v2 was cheap
  — which mattered in practice, since the first version of one guide did need a v2 after misattributing
  a location, a real example of how far a single wrong fact can travel before it's caught.
- Two PDF-generation approaches were used deliberately for different jobs: Gamma (fast, less control
  — a specific built-in theme was locked after testing alternatives that clashed with brand colors)
  for early lead magnets, and `pdf-lib` (programmatic, full control) for later, more content-heavy
  guides where layout and file size mattered more than generation speed.
- An entire in-progress section (`/tools/`) was kept gated from public view while several tools inside
  it were still paused/incomplete — the same no-index discipline applied at the section level, not
  just per page.

### Putt House
- Because this engagement's actual page-building happened on a platform (Lovable) the team didn't
  fully control, this stage's clearest example here isn't page construction — it's the **client-facing
  deliverable pipeline**: a script-driven system (`scripts/md_to_docx.py`, `scripts/build_excel.py`)
  that converts a markdown source into a styled, on-brand Word document or Excel workbook
  automatically, including stripping AI writing tells and applying a consistent visual style.
- **Markdown stayed the real source of truth**, with the generator regenerating the styled document
  after every edit — hand-editing the Word file directly was the one explicit exception, and only
  after a document had already been sent to the client, specifically because regenerating afterward
  would have silently clobbered a real client-facing edit.

---

## 4. Gaps

1. **Accepted as a real, honest distinction, not chased further.** What's evidenced is the
   preventive instruction ("one section at a time," stated up front) and the after-the-fact rejection
   of already-batch-built work ("a joke," "reckless") — not a quote that specifically catches a build
   mid-stream, partway through, and corrects course in the moment. Both serve the same purpose in
   practice; this is a note about what the archive actually shows, not a search left unfinished.

No open gaps remain for this stage as written.
