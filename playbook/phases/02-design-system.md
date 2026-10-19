# Stage 2 — Design System (before real code)

**Goal:** settle typography, color, layout language, and the visual art style as static, cheap-to-
iterate prototypes before writing application code that's expensive to redo. Nothing gets built
against a locked design system in this stage — the system itself is the deliverable.

---

## 1. The portable process

1. **Give typography and color a name and a lock date.** A design system that's just "the current
   set of choices" invites drift — different agents or people producing design opinions in parallel
   will each make their own call and diverge without anyone noticing until an audit catches it.
   Naming the system and stating when it locked turns it into something to consult, not something to
   reinvent.
2. **Decide the art style as a first-class design decision, not an afterthought — and expect to
   iterate.** The first attempt at an art style is often wrong in a specific, diagnosable way (too
   generic, too "cinematic" instead of grounded in what the real subject actually looks like, reads
   as stock next to the rest of the brand). Treat the first miss as information, not failure, and
   let it point at what the second attempt needs to fix.
3. **Run an explicit style bake-off before locking anything.** Generate two or more real options
   side by side and let the actual decision-maker pick, rather than guessing serially and rebuilding
   after each guess. This applies to a single chart as much as to a whole illustration system — the
   size of the decision doesn't change the shape of the process.
4. **Build a component library as static HTML/CSS prototypes first**, reviewed visually, before
   scaffolding real application code. This matters most when the decision-maker isn't a developer
   and needs something to react to, not a spec document.
5. **Write the visual direction down as a locked reference doc** that every design and copy agent
   is required to consult before every page build. Treat a mood image or mockup as *inspiration* —
   the written rules are the actual spec. Don't let a build silently drift toward matching a picture
   pixel-for-pixel when the picture was only ever meant to set a mood.
6. **Centralize the design system into one token source, and keep checking that it's actually being
   used.** A token system that exists but isn't consistently referenced is functionally the same as
   not having one — this needs an active, recurring check, not a one-time setup.
7. **Pick a generation model deliberately per job, and say so explicitly rather than defaulting.**
   Different image models are good at different things (exact multi-line text, faithful portraits,
   stylized illustration); naming the model for a given job is itself part of the locked system, not
   an implementation detail beneath it. **A hard, standing rule, not a per-project preference: never
   use Flux-family models.** Every image need is served by a GPT-image-family or Gemini-image-family
   model — this is an absolute across every project, not something to re-derive per client.
8. **Design every asset for both light and dark surfaces before it ships as part of the set.** A
   line-art or text mark that's invisible on one theme is a real, recurring bug class if this isn't
   checked as a standing step rather than an afterthought.

**When is this stage actually done?** When there's a named, dated design system a new page can be
built against without a fresh judgment call on color, type, or art style — and when at least one
real style decision has survived an actual side-by-side comparison, not just a single proposal that
was accepted by default. If the "art style" is still whatever the first generation happened to look
like, this stage isn't done, even if pages are already being built.

**The rule that generalizes hardest from this stage:** a design system that isn't centralized in one
place will drift the moment more than one person or agent is producing design opinions in parallel —
not through carelessness, but because independent good judgment calls don't automatically converge.
The fix isn't better individual judgment; it's a single source of truth and a recurring check that
it's actually being read.

---

## 2. How Piyush actually talks during this stage

**Requesting an explicit bake-off, in the same breath as other locked-system demands:**
> "Do Section Style A and also B. -- I will choose between them..."
> — [Massive Impact, chat-018, 2026-08-23]

**A terse pick between two real, already-generated options — locking doesn't need a long
explanation once the options actually exist:**
> "Option B."
> — [Massive Impact, chat-008, 2026-07-28] — choosing a fresh, truer-to-style AI generation over a
> faster coded re-export of the same chart.

**Approving a bake-off winner and asking for variation, not a fresh reinvention:**
> "This is good, we can make a few more like these. v1 is good. Let's make a few like these with
> some variations for effect, okay?"
> — [Massive Impact, chat-009, 2026-08-07]

**Rejecting drift from a style that was already locked — note the specific complaint is drift, not
just "I don't like it":**
> "No, this is crap, I don't like the section... we had finalized an art style for the website, make
> the images in that art style please... these are clearly looking AI-generated and very bad..."
> — [Massive Impact, chat-018, 2026-08-23]

> "Nah, this is bad and not our style at all."
> — [Massive Impact, chat-019, 2026-08-24]

**Giving specific, usable art direction rather than a vague "make it better":**
> "I like the AI portraits, and they are the real people, but use a better canvas, and give them
> more personality and style, so that they are not looking like a criminal mugshot with a smile,
> lol."
> — [Massive Impact, chat-010, 2026-08-08]

**Catching visual sameness across repeated elements — a recurring quality check, not a one-off:**
> "All the dominoes are the same style. Do one with different, thanks."
> — [Massive Impact, chat-014, 2026-08-10]

**Catching a light/dark theme bug directly, which is what turned it into a standing design rule:**
> "This is better, but the new momentum doesn't work on dark background."
> — [Massive Impact, chat-013, 2026-08-09] — flagging a mark that disappeared on the site's dark
> sections. The fix that followed generalized into a real rule: line marks lead with the accent
> color so they read on both grounds; solid objects get a light body with dark linework and an
> accent detail — not a one-off patch to the single broken asset.

**Demanding a centralized token system, then catching when it wasn't actually used — five days
later, confirming this is a standing rule he checks for, not a one-time request:**
> "...centralize the design system and do a complete head-to-footer audit... make sure the 2
> finalized pages are using a centralized token system that is scalable on the website."
> — [Massive Impact, chat-018, 2026-08-23]

> "This is not using the centralized design token system, please use that."
> — [Massive Impact, chat-023, 2026-08-28]

**Naming the exact model for the job, flatly, and repeated verbatim in a separate session — this
is a locked preference, not a passing comment:**
> "gpt-image-2 or gemini 3.0 image pro.. not flux"
> — [Labyrinth, chat-002, 2026-08-13] and again, word for word, in
> [Labyrinth, chat-005, 2026-08-13]
>
> Confirmed directly (2026-09-20) as an absolute, not a project-specific call: "we never use flux
> models, we only use gpt and gemini quality image models for all our image requirements."

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** The
actual typography, color, and art style are specific to each brand; what transfers is the method
that got them locked.

### Massive Impact
- The illustration style is locked as 2-color riso (navy + coral), explicitly no photorealism and
  no vector-flat clip-art, judged against an approved reference image rather than a text
  description.
- **A real, costly early mistake, corrected into a portable lesson:** the team defaulted to
  "generate a textless shape, add the words in code" out of a mistaken belief that image models
  garble text. GPT Image 2 and Gemini 3 Pro both render exact supplied text correctly, including
  dense multi-line compositions — garbling only happens when the model has to *invent* the text
  itself. GPT Image 2 became the default for on-brand riso assets and charts; Gemini 3 Pro for
  faithful portraits and dense multi-string text compositions.
- Real client numbers in charts stay as coded charts, never AI-rendered images, so an exact figure
  can never be silently mis-rendered even by an otherwise-reliable model.

### Labyrinth Escape Games
- **Typography and color went through a visible correction cycle.** An early pairing (Cinzel /
  Cormorant Garamond) was replaced after an audit turned up 13 contradictions across different
  design outputs — different agents had each made their own font and color call independently and
  drifted apart. The unified system that followed, "System G" (Young Serif display, Inter body,
  Playfair Display italic accents, on a dark obsidian base with parchment text), was summarized in
  one line as **"A24 Films meets Soho House"** — a real, reusable way to communicate a whole visual
  direction in one memorable phrase.
- **The character art style took two attempts.** The first ("semi-realistic illustration") was
  rejected as reading childish, with lighting that was invented rather than grounded in the real
  rooms. The replacement, nicknamed ATLAS v2, composites a poster-style background plate (built from
  real room photos) with a separately shot green-screen group of real people, blended with CSS
  parallax and effects. The lesson: the real rooms use vivid, saturated theatrical lighting, not
  muted "cinematic" tones — the fix came from grounding the style in the real subject, not from a
  better prompt for the same wrong idea.
- **Layout philosophy was locked as deliberately app-like, not document-like** — progressive
  disclosure, bento grids, tabs, and drawers, modeled on product UIs (Linear, Vercel, Stripe) rather
  than a typical scrolling brochure site.

### Putt House
- **The visual style went through an explicit, documented bake-off**, not a single default choice.
  Several rendering styles were generated side by side: straight cinematic photorealism, a
  riso-screenprint poster look, and warm printed-photo grain. Verdict: riso screenprint won for
  scenes with real people; photo-grain was kept for food and object detail; straight photorealism
  was rejected outright because, next to the graphic-styled work, it "read like stock."
- The laser-tag sub-brand got its own darker, neon-accented variant of the riso style, deliberately
  separating it from the brighter daytime mini-golf and café imagery.
- A specific cutout production recipe was proven and locked as a reusable pipeline: generate figures
  against a solid magenta background (not green, to avoid clipping real clothing colors), key it out
  with a script, auto-crop, export as transparent WebP.
- A structural rule was locked and named — the "full-bleed law": no boxed design frames; page
  sections are edge-to-edge bands whose backgrounds carry the mood, kept only where content
  genuinely needs a contained box (pricing tables, forms).

---

## 4. Gaps

1. **Confirmed after a deeper raw-archive search: no visual-style bake-off quote survives in the
   Labyrinth chat archive.** Checked both the clean and raw editions directly. One real bake-off-
   shaped quote did turn up — "Option B" in [chat-001, 2026-08-12] — but it's a process-sequencing
   decision (which order to rewrite a set of agents in), not a visual/art-style comparison, so it
   doesn't fill this gap. The ATLAS v2 style bake-off described in the case study likely happened,
   but predates or falls outside what survives in the chat archive. Real limit of the source, not a
   contradiction.
2. **Resolved.** Found the real quote — see section 2 above ("the new momentum doesn't work on dark
   background," chat-013, 2026-08-09). No open gaps remain for this stage as written.
