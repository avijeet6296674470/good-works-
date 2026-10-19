# Stage 6 — Correctness Sweeps & QA

**Goal:** catch the compounding cost of a fact changing after it's already been copied into a dozen
files, and verify the site actually does what it's supposed to — not by trusting a report that it
does, but by checking the live, rendered result directly.

---

## 1. The portable process

1. **Whenever a fact changes, don't just fix the file you're currently in.** Grep for every other
   place that fact might be quoted, and track the sweep as an explicit task list with a completion
   state — "I'll remember to fix the others" is exactly how stale facts survive.
2. **Distinguish files worth sweeping from files that are legitimately historical record.** A
   corrected fact should propagate everywhere it's currently true; an archived document that
   captured what was believed *at the time* should stay as-is, as an honest record, not be
   retroactively rewritten.
3. **Expect false positives in a mechanical sweep, and check them by hand.** A regex or grep-based
   correction pass will sometimes match numeric data or unrelated prose instead of the actual fact
   being fixed — a sweep needs human judgment at the confirmation step, not just at the search step.
4. **Always verify the live, current site or the client's most recent confirmed answer over any
   planning document, every time they conflict.** A document that was correct when written goes
   stale the moment reality changes; the live site (or the client, asked directly) is always the
   more current source.
5. **Test the actual rendered output a crawler would see, not just what a human sees in a browser**,
   whenever a gating or indexability pattern is involved. A page can look correct in a normal browser
   and still be serving something different — or nothing — to a bot.
6. **Don't trust a screenshot or automation tool's result at face value.** A lazy-loaded image, a CSS
   animation mid-transition, or a tool that silently chokes on a heavy page can all produce a false
   "broken" or false "fine" result. Verify with a direct check (a forced eager-load, a longer wait, a
   second look) before concluding either way.
7. **Verify a sweep actually finished, not just that it ran.** Re-check the specific thing the sweep
   was supposed to fix, with the actual command or query that would catch a leftover instance — a
   background pass that appears to have completed can still leave real stragglers.
8. **Ask, bluntly, whether everything was really checked — not just the parts that were easy to
   check.** An apparently-finished QA or correctness pass often isn't; a direct "did you actually get
   everything" question is a real, recurring tool for forcing a second, honest look.

**When is this stage actually done?** When every fact known to have changed has been swept across
every file that quotes it (with each hit resolved, not just found), and the live site — not a plan,
not a status report — has been checked directly for whatever this stage was meant to verify. A sweep
that stopped at "found the instances" without resolving each one isn't finished, and a QA pass that
trusted a tool's report instead of a direct check isn't finished either.

**The rule that generalizes hardest from this stage:** a fact that's wrong once will get copied many
times before anyone notices, and the sweep to fix it has to be tracked as explicit, resolvable work —
not "keep an eye out for it" — because a fix that only touches the file currently open is not a fix,
it's a delay.

---

## 2. How Piyush actually talks during this stage

**Requesting an explicit, whole-production sweep — not scoped to one page or one recent change:**
> "Okay, now I want to finally do a full, quick, clean sweep on the entire production. Make sure
> everything is getting saved to HighLevel on our server as well. We are sending all the tracking
> and events and everything like that properly to Google Ads and Facebook, etc., so all of these
> things are also properly done."
> — [Massive Impact, chat-023, 2026-08-28]

**Catching a wrong fact directly, terse and pointed — no hedging, straight to "check it again":**
> "No, we have US targeting already set, it's not India. Please double check."
> — [Massive Impact, chat-026, 2026-09-01]

**The clearest real example of demanding a fact be consistent across every place it appears —
naming each surface explicitly rather than trusting "it's fixed" to mean fixed everywhere:**
> "A make sure the difficulty is adjusted everywhere, in the menu, in the game pages, hub pages,
> explorers club page so it's consistent.. please check end to end."
> — [Labyrinth, chat-015, 2026-09-03]

**Verifying a background sweep actually finished, with the literal check specified — this is what
"don't trust that it ran, check that it worked" looks like in practice:**
> "Confirm the earlier background doc-sweep finished: grep website-creative for [...] should be none
> left (face-consistency routing on Gemini is intentional, keep it)."
> — [Massive Impact, chat-023, 2026-08-28] — and again, word for word, in
> [Massive Impact, chat-024, 2026-08-29]

**A short, blunt re-verification demand against something already agreed:**
> "Double check please. I want to stick to the original plan."
> — [Massive Impact, chat-023, 2026-08-28]

**The recurring "did you really get everything" instinct, already found at Stage 0 but worth
restating here since it applies just as much to a correctness sweep as to a discovery audit:**
> "have you done all reports, resources, all screenshots, proofs, landing pages etc. everything?"
> — [Massive Impact, chat-022, 2026-08-27]

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** What
transfers is the discipline; the specific facts that went wrong are particular to each business.

### Massive Impact
- A geo-targeting setting was caught as silently wrong (India instead of the correct US targeting)
  and flagged directly for re-verification rather than assumed correct because it had been set once.
- A background documentation sweep across the whole `website-creative` codebase was explicitly
  re-checked with the actual grep command that would prove it was clean — not just trusted because
  it had been run.

### Labyrinth Escape Games
- **A location attribution error propagated into 30+ strategy and page-spec documents** before it
  was caught: Explorers Club was wrongly attributed to Boise when its real home is Nampa. Fixing it
  required a tracked, batch-by-batch sweep — 17 separate batches — rather than a single find-and-
  replace, because some regex hits were false positives in raw data exports, and historical/archived
  files were deliberately left uncorrected as a record of what was believed at the time.
- **Review counts needed the same treatment.** A stale "4.8+ stars" figure and a misread "2,500+"
  figure had both already spread across multiple documents before the client-confirmed canonical
  numbers (2,700 Boise, 1,850 Nampa, 5,800+ combined) were tracked down and corrected everywhere.
- **A difficulty-setting consistency demand**, checked end to end across every surface it touched —
  menu, game pages, hub pages, the Explorers Club page — in one direct instruction, not assumed fixed
  because it had been changed in one place.

### Putt House
- **A build review caught prices silently carried over from a different, older location** on the
  same shared booking platform — the live site's own displayed numbers, not a planning document, were
  what actually needed to be trusted, and even the live site turned out to be wrong until checked
  directly against the client's confirmed rate card.
- **A review-count claim was flagged as a policy risk, not just a factual error** — the site implied
  reviews existed when zero real reviews did.
- **A savings calculation was found to be arithmetically wrong**, and a units mismatch (15-minute vs.
  20-minute laser sessions) was caught between two different source-of-truth documents that
  disagreed with each other.
- **Three tracking/booking-flow defects** were caught by direct testing of the live flow rather than
  trusting that a "fully wired" report meant fully wired: an overbooking bug (capacity wasn't
  actually checked), a Terms-of-Service link that exited the single-page app and reset booking state,
  and a date picker that only opened on the calendar icon, not the whole field.

---

## 4. Gaps

1. **Confirmed after a deeper raw-archive search: no quote exists for crawler-visible verification
   specifically** (a `curl -A Googlebot`-style check, a view-source comparison). Every "indexable"
   mention in either archive's human turns is Piyush reacting to or requesting the *outcome*
   ("fully indexable on Google?") — the specific proof method (checking server-rendered HTML
   directly) consistently shows up as something Claude proposes and executes, never something Piyush
   names by request. Genuinely delegated, not a gap in the research.
2. **Confirmed after a dedicated search: lazy-load/screenshot false-positive catches are consistently
   Claude's own diagnostic work, not a Piyush quote.** Both archives have many real instances of a
   "broken" image turning out to be a lazy-load timing issue — but every one is Claude noticing and
   explaining it, never Piyush raising it. Same shape as gap 1: genuinely delegated work, not a
   missing search.

No open gaps remain for this stage as written.
