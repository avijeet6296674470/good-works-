# Stage 1 — Foundations & Locked Decisions

**Goal:** turn everything Discovery surfaced into a short list of decisions that will not be
relitigated, so every later stage has stable ground to build on. Nothing gets designed or built in
this stage — it's the stage where facts and constraints stop moving.

---

## 1. The portable process

1. **Write down the north star / hard constraints** — the two or three things that must never
   happen on this project, stated as absolutes, not preferences. A frozen subsystem (a live payment
   or booking flow that may be restyled but never rearchitected), a scope boundary (this business is
   X and is explicitly *not* Y, so copy must never imply Y), a non-negotiable technical constraint.
   These get written down even when they feel obvious in the moment — they stop being obvious the
   moment a different person or a different agent picks up the project.
2. **Lock brand facts explicitly, each with a stated source of truth.** Canonical name and spelling,
   pricing, hours, locations, review counts — anything a page or a schema block will state as true.
   When two documents disagree (and they will), name explicitly which one wins, and write that
   decision down rather than re-deriving it every time it comes up again.
3. **Capture brand secrets that must never appear in customer-facing copy, and say so in writing.**
   A real fact the business shared in confidence can be genuinely useful internal context (it can
   inform tone, pacing, even architecture) while being actively harmful if it leaks into anything a
   customer reads. Tag it explicitly as customer-facing-copy-only-excluded, not as a general secret —
   internal docs and agent instructions may still reference it as context.
4. **State the division of labor between tooling and judgment, once, so it doesn't need restating
   per page.** A script or a data pipeline can propose a number or flag a discrepancy; whether a
   framing is honest, whether a claim is a cherry-pick, whether a fact is safe to publish — that
   judgment stays with a human or an agent authoring the actual sentence. This division is portable
   even when the specific thresholds behind it (what counts as a fair average, what counts as an
   acceptable redaction) are not, and need to be derived fresh for each client.
5. **Establish a change-control posture early, especially on a redesign or audit engagement.** The
   default: make only the exact change that was asked for; anything else noticed along the way gets
   proposed and waits for approval, never applied unilaterally. This matters most on a project that
   inherits someone else's live system, where "helpful" scope creep is the easiest way to break
   something that was working.
6. **Say "locked" out loud, as an explicit act, not an implied one.** A decision that only lives in
   someone's memory of a conversation isn't actually locked — it's one restated question away from
   drifting. Locking is a real, deliberate step with its own moment, not a side effect of having
   discussed something. In `website-pack`, this is a literal invoked command, not just a habit —
   `session-close` fires on "lock this in" (and "that's done," "commit," "let's wrap up") and updates
   the session log, confirms the real definition of locked, and saves memory entries for whatever was
   locked. The verbal ritual and the tooling already match.
7. **Write every locked decision into one document every later stage and every agent reads before
   doing anything.** This is the actual output of the stage — not a set of decisions made, but a
   set of decisions made *and recorded somewhere everyone downstream actually consults*.

**When is this stage actually done?** When someone could hand the locked-decisions document to a
person who wasn't in any of the discovery conversations, and that person could correctly answer:
what must never happen, what the real facts are and where they came from, what must never be said
publicly, and who decides when something outside the plan comes up. If any of those four still need
a conversation to resolve, the stage isn't done yet.

**The rule that generalizes hardest from this stage:** a locked fact is only as locked as the single
place it's written down and the discipline to treat every other mention of it as something to
reconcile against that place, not something to trust on its own. The failure mode isn't disagreement
at lock time — it's a correct fact quietly going stale later and nobody having one place to check it
against.

---

## 2. How Piyush actually talks during this stage

**"Lock it in" is his real, recurring verbal signature for finalizing a decision** — the same
phrasing shows up on two unrelated projects, weeks apart, which is worth taking as a real personal
ritual rather than a coincidence of wording:

> "Lock it at $5900 + $590 per month... make it standard for all 3 places."
> — [Massive Impact, chat-019, 2026-08-24] — locking a price as the canonical figure across every
> location, not just the one being discussed.

> "Standardize my prices starting from $5900 for growth site builds and $590/mo on marketing. Keep
> this standard across the board."
> — [Massive Impact, chat-021, 2026-08-26] — the same fact, re-locked and reconfirmed two days
> later. Locking isn't always a one-time event; a fact gets re-locked when it resurfaces.

> "Okay, lock this in, please, thanks."
> — [Massive Impact, chat-021, 2026-08-26]

> "This is perfect, okay, so can we lock these lessons in?"
> — [Massive Impact, chat-023, 2026-08-28] — note it's not just facts that get locked; a *lesson*
> (a process correction) gets the same explicit locking treatment.

> "This needs to be a locked standard for autonomous decision-making."
> — [Massive Impact, chat-020, 2026-08-25] — ties "locked" directly to how much an agent is trusted
> to decide on its own afterward. Locking a rule is what lets trust escalate safely.

> "This is good! Groundwork... let's lock this in.. :)"
> — [Labyrinth, chat-002, 2026-08-13] and, word for word again in a separate session —
> [Labyrinth, chat-005, 2026-08-13]

> "this is locked awesome.. now let's launch the localhost..."
> — [Labyrinth, chat-014, 2026-09-02] — locking is explicitly the gate before moving to the next
> concrete step, not a retrospective label applied after the fact.

**Catching a stale fact that had already spread, and refusing to trust memory over the record:**
> "We never built their website. Please clarify to me which websites we built and which we didn't,
> okay? Most of the sites we built, you have it on record."
> — [Massive Impact, chat-020, 2026-08-25] — a proof claim had mislabeled a site as "built by us."
> The correction isn't just "fix this one instance" — it's "go check the record," treating memory as
> untrustworthy and the record as the actual source of truth.

**A hard quality "never," stated as a standing rule rather than a one-off correction:**
> "there is one image that has a white border, that should never happen unless that is the
> intention.. rest is good to go.. it has set a standard and quality."
> — [Labyrinth, chat-008, 2026-08-15]

**Dictating a redaction rule directly and specifically, not as a vague "be careful":**
> "Don't give brand names, obviously they will rank higher. Exception is when the business name is
> like Labyrinth Escape Games, just blur Labyrinth. Also blur the word photos, gallery, photo,
> reviews, review, New York..."
> — [Massive Impact, chat-015, 2026-08-11] — the rule is specific enough to actually apply, not a
> general instinct to "be discreet."

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** What
transfers is the *method*; the actual facts, prices, and constraints are specific to each business.

### Massive Impact
- The Honesty Law and the Voice & Copy Law (see the guidebook's
  [`01-PHILOSOPHY-AND-PRINCIPLES.md`](../../../../massive-impact-website-guidebook/01-PHILOSOPHY-AND-PRINCIPLES.md))
  are this project's own locked decisions, written out in full as rules — durable-average-over-peak,
  WHO/WHEN/WHERE/SOURCE attribution on every number, named redaction thresholds for anonymized vs.
  named clients. Worth reading as a detailed worked example of what a real, specific honesty law
  looks like once someone actually commits to one, not as a template to copy onto a different brand.
- Pricing was locked explicitly and by name: $5,900 for a growth site build plus $590/month for
  marketing, standardized across every location rather than negotiated per client.

### Labyrinth Escape Games
- **Hard constraint:** escape rooms only — copy must never imply the venue is a party or catering
  facility.
- **A business secret that must never be public:** roughly 90% of teams actually escape their rooms,
  and games are quietly tuned so most groups win. Real and useful internal context; if it ever
  appeared in a lead magnet, quiz result, or marketing line it would remove the drama of the timer
  and cheapen the win. Internal docs and architecture notes may reference it; anything
  customer-facing never may.
- **Review counts locked with a named source:** 2,700 Google reviews at Boise, 1,850 at Nampa, both
  5.0 on Google, 5,800+ combined across Google, Yelp, and TripAdvisor — confirmed directly by the
  client after a stale "4.8+ stars" figure and a misread "2,500+" figure had already spread across
  multiple documents and had to be tracked down and corrected everywhere.
- **In-universe brand vocabulary locked as a required part of every piece of copy:** staff are
  "Travel Agents," players are "Travelers," the fictional device is "M.R.L.N. technology," games are
  "adventures" or "experiences," never plain "escape rooms" in voice copy. Pulled directly from the
  live site, not invented.
- A locked URL structure (`/events/`, `/tools/`, `/guides/`) was finalized before any guide pages
  were built, specifically so internal links would be correct from the start.

### Putt House
- **The brand name itself was a locked correction.** Early materials used the one-word "Putthouse."
  The client later locked the two-word "Putt House" as final, matching the legal entity's real
  branding — small, but it had to be corrected consistently across schema, GBP listings, and every
  document already written.
- **Pricing was the most persistent open fact**, moving across three different documents (a
  Minutes-of-Meeting note, an early client questionnaire, a later formal client-confirmed
  questionnaire) before landing on a final locked set. The live build, when reviewed later, matched
  *none* of these — it was still showing a different, older location's prices, left over as an
  unswapped placeholder. The rule that came out of it: verify a client fact against the most recent,
  most specific, client-confirmed document, and never assume a live build reflects the latest
  agreed numbers just because it's live.
- **A frozen subsystem, named explicitly:** the existing booking system's logic, steps, API, and
  analytics contracts were locked as untouchable; only its visual styling was open to change.
- **Change control was stated as an explicit standing rule for this engagement:** make only the
  exact change requested, and propose — never silently apply — anything else noticed along the way.

---

## 4. Gaps

**Resolved from your last round of answers:**
- *Change-control posture isn't a spoken rule.* You confirmed it's mostly felt, not said out loud —
  so the absence of a verbatim quote in the archives isn't a gap in what was captured, it's accurate.
  The process step above stays as written (it's a real, practiced discipline, evidenced in how both
  Putt House and Labyrinth's engagements actually ran), just without a real quote attached to it.

**Resolved, and corrected:**
- *Whether "lock it in" becomes a real command.* This was answered "leave it as a verbal ritual" at
  the time — but that answer was wrong, discovered during the Foundations-stage portability audit
  (2026-09-20): `website-pack` already has a `session-close` skill whose own trigger-phrase list is
  literally `"Lock this in", "that's done", "commit", "let's wrap up"`. It updates the session log,
  confirms the actual definition of locked (type-check green, gate run, ledger updated), saves
  memory entries for locked components, and outputs a one-line summary. The command Piyush's own
  verbal habit was asking for had already been built, independently, before this stage file existed.
  Nothing to build; the gap was in this file's own knowledge of the pack, not in the pack itself.

No open gaps remain for this stage as written.
