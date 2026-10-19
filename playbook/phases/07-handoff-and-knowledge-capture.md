# Stage 7 — Handoff & Knowledge Capture

**Goal:** make sure what was learned on this project survives past the current session — and,
ideally, generalizes so the *next* project starts from a stronger baseline instead of zero.

---

## 1. The portable process

1. **Keep a running, dated memory of decisions and their WHY, not just their WHAT.** A locked price
   with no record of why it was set that way is a fact someone will eventually second-guess without
   the context to know it was already settled. The reasoning is what actually survives a context
   reset or a new person picking up the work.
2. **Write handoff material as something a fresh session (or a different person) can actually pick up
   from cold** — a dated doc naming exactly what to read first and in what order, not a scattered set
   of notes that assume continuity of memory that won't be there.
3. **At a natural project boundary, deliberately extract what was built into a reusable,
   brand-neutral form — don't leave it locked inside one client's repo by default.** This is a real,
   separate act of work, not something that happens automatically just because a project ended.
4. **The generalization principle: build the capability, not a rehash of the last client.** The goal
   of extraction isn't "the same system with the serial numbers filed off" — it's a system that
   genuinely reasons about *any* business's real specifics, with the previous client's facts as one
   worked example among others, not the hidden template everything else is secretly shaped around.
5. **A single config file (or its equivalent) should hold every project-specific fact**, with every
   agent, skill, or process reading from it rather than hardcoding what one particular client needed.
   A missing fact should surface as a visible, explicit question on the next project — never a silent
   guess, and never a fact quietly copy-pasted forward from whoever the last client happened to be.
6. **Decide deliberately what does and doesn't get ported.** Something genuinely one-off for a single
   client (a bespoke integration, a client-specific pipeline) should be left out of the general-purpose
   version rather than forced to generalize badly. Not everything that was built is worth carrying
   forward as-is.
7. **Treat every engagement as a chance to sharpen the reusable system further, not just to deliver
   that one client's site.** A capability that gets battle-tested and corrected during a real build,
   then merged back with editorial judgment, ends up sharper than one written speculatively without
   ever facing a real client's actual constraints.
8. **Hand off deliberately to whoever's next — buyer-facing docs, a dev, a different session — not
   just archived and assumed discoverable.** Package documentation is a real, named deliverable in
   its own right, not an afterthought once the "real" work is done.

**When is this stage actually done?** When someone with zero memory of this project's conversations
— a fresh session, a different developer, a future version of the same system — could pick up the
handoff material and correctly reconstruct both what was decided and why, without having to guess or
re-derive it. If the reasoning behind a locked decision only exists in a chat transcript nobody will
reread, this stage isn't done, no matter how complete the delivered site itself is.

**The rule that generalizes hardest from this stage:** a fact survives being extracted from one
project into a reusable system only if it's actually driven by a config, not hardcoded — the
difference between a system you configure and a system you fork is the entire difference between
genuine reuse and copy-paste debt that resurfaces on every future project.

---

## 2. How Piyush actually talks during this stage

**The founding statement of the whole "extract into a reusable system" idea, in his own words — this
is, concretely, the moment `website-pack` starts existing as a concept:**
> "You know when you build a system that does one thing perfectly like how we built this website
> from scratch. You can then productize it into a scalable system that can be used for developing
> many other websites etc.. do you know what I am talking about?"
> — [Labyrinth, chat-001, 2026-08-12]

**Stating the generalization principle directly — not a rehash of one client, a system that reasons
about any business:**
> "Well that is what the system needs to engineer for every business so that the library is not just
> rehashed from Labyrinth but it builds unique systems for every business that can apply to any
> business."
> — [Labyrinth, chat-010, 2026-08-16]

**Knowledge capture framed explicitly as the WHY, not just the WHAT — the actual working principle
behind Stage 5's "index before copy" rule, stated here as a lesson worth carrying forward:**
> "Yeah, but understand the lessons from Home, ER Marketing, and DPCs — we never followed a
> template, we followed a thought process."
> — [Massive Impact, chat-019, 2026-08-24]

**Handing the finished system to someone else — a real handoff, not just archiving it:**
> "That's okay, complete the package. I will give it to one of our devs and ask them to build the
> website using this framework. Understood?"
> — [Labyrinth, chat-011, 2026-08-17]

**Buyer-facing documentation named explicitly as its own real deliverable — not assumed to happen
automatically once the system itself works:**
> "Okay do the provisioning cli, ingestion, sample packs and buyer facing docs please."
> — [Labyrinth, chat-002, 2026-08-13] and again, near-verbatim, in
> [Labyrinth, chat-005, 2026-08-13]

**A real, concrete handoff artifact, quoted directly — a dated doc plus a reusable "pick up here"
prompt for a fresh session:**
> "Here's your copy-paste handover prompt for the new session: Pick up the ad-creative work. Do
> these in order: 1. First, read docs/workshop/SESSION-HANDOFF-AD-CREATIVES.md and
> docs/CREATIVE-DIRECTION-DOCTRINE.md (The Creative Engine) for full context..."
> — [Massive Impact, chat-024, 2026-08-29]

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** What
transfers is the discipline; the actual extracted artifacts are specific to what each engagement
produced.

### Massive Impact
- Cross-session memory files (`~/.claude/projects/.../memory/*.md`) are the standing mechanism for
  making sure a hard-won fact — a locked price, a deploy gotcha, a standing decision — survives a
  context reset rather than needing to be rediscovered.
- Real, dated session-handoff documents were written for specific in-flight work (ad-creative
  production), each naming exactly which files to read first and in what order, so a fresh session
  could pick up mid-project without needing the prior conversation.
- The Step 10 discipline ("centralize what was learned") from the build process
  ([`02-THE-BUILD-PROCESS.md`](../../../../massive-impact-website-guidebook/02-THE-BUILD-PROCESS.md)) is
  this stage's logic applied continuously during a project, not just at its very end — a lesson gets
  promoted into the standing rule docs the moment it's proven, rather than saved for a final handoff
  that may never come.

### Labyrinth Escape Games
- **This is the direct, documented origin story of `website-pack` itself.** The productization idea
  was raised explicitly, early, as its own conversation — not an incidental byproduct of finishing
  the build — and the underlying facts that had been diffused through agent prompts, skill files,
  and `CLAUDE.md` were deliberately extracted into a `brand.config` plus a small set of
  client-owned markdown files, so every agent could read from those instead of having "Boise, 2,700
  reviews" baked directly into its own prompt text.
- **The explicit non-goal, stated directly:** the system should not be "rehashed from Labyrinth," but
  should genuinely reason about any business — a strategic-reasoning-and-expansion layer that
  figures out the right information architecture, schema, keyword shape, and conversion path for
  *any* industry, steerable by the user, rather than a fixed set of hardcoded vertical templates.
- **The finished system was explicitly packaged for handoff to a third party** — asked for by name
  ("complete the package... give it to one of our devs") — not left as an internal working repo
  assumed to be self-explanatory to someone new.
- **Buyer-facing documentation was a named, separate deliverable**, tracked alongside the
  provisioning CLI and sample packs, not an afterthought bolted onto the technical work.

### Putt House
- **The concrete, completed instance of Stage 7 across all three projects.** At the end of the Putt
  House build, the full agent/skill/tooling system — by that point battle-tested across both
  Massive Impact and Labyrinth as well — was deliberately extracted into `website-pack`: a
  standalone, brand-neutral repository, not nested inside any one client's project. It shipped 29
  agents, 50 skills, 3 config-driven hooks, 14 governance-document templates, 5 framework-agnostic
  design-system specs, 4 vertical overlays, and a full image-generation toolkit — plus one filled-in
  worked example, kept explicitly read-only, so the shape of a completed setup is visible without
  being copyable by accident.
- **The keystone mechanism:** a single `brand.config.json` at a new project's root holds every
  project-specific fact, and every agent or hook reads from it rather than hardcoding whichever
  client it was originally written against — which is what makes "porting" an agent from one project
  to the next actually safe, since none of the previous client's real facts are baked into its logic.
- **Deliberate exclusions, stated as design decisions, not oversights:** pieces that were genuinely
  one-off for a single client (a specific social/video pipeline, for instance) were left out of the
  general-purpose pack rather than forced to generalize badly.
- **New projects onboard through an interview, not a blank page** — a setup command (`/init-brand`)
  walks through structured rounds of questions and generates the governance docs from the answers,
  in stages, with a review gate at each stage rather than all at once.

---

## 4. Gaps

1. **Accepted, not chased further.** No quote names "memory" as a project decision log in the exact
   sense this stage means it — the concept is real and well-evidenced structurally (the memory-file
   mechanism itself, the dated handoff documents), just not narrated out loud that way. Consistent
   with every other "specific phrasing, not the underlying practice" gap found across this whole
   project — a real limit of what gets said versus what the tooling does silently, not a search worth
   repeating again.

2. **Acknowledged, no action needed.** This entire website-building-system project is itself a live
   instance of this stage: unifying three separate write-ups into one staged system, with real voice
   examples and portable process separated from per-project specifics, is exactly the "deliberately
   extract what was learned into a reusable, brand-neutral form" act this stage describes — applied
   to Piyush's own working process, not to a piece of code. Kept in mind for when the question of
   what (if anything) to retire from the three original sources comes up.

No open gaps remain for this stage as written.
