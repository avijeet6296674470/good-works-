# Stage 0 — Discovery & Diagnosis

**Goal:** find out what's actually true about the business and its current web presence, before
assuming anything. Nothing gets built or decided in this stage — it's pure information-gathering.

---

## 1. The portable process

1. **If a site already exists, scrape and read it in full** — every section, every price, every
   nav item — before writing a word about it from memory. A memory of a site goes stale the moment
   the site changes; the live site is always the more current source.
2. **If there's a known problem, diagnose it structurally before touching anything.** Pull the
   actual data (a redirect log, Search Console, an ads dashboard) and trace cause to effect. Don't
   start fixing before you know what's actually broken and why.
3. **Collect every client/business document as raw material — don't summarize prematurely.**
   Minutes of meetings, brand questionnaires, old proposals, whatever exists. Treat them as a
   hierarchy of authority, not one flat pile: when two documents disagree, the more recent and more
   specific one — ideally one the client has personally confirmed — wins. Say so in writing so it
   isn't re-litigated later.
4. **Run a visual/brand discovery pass — every project needs one, even if it's short.** What does
   this brand actually look like, and what does it need to look like? This is not optional and not
   assumed from a previous project: it can happen early (a formal questionnaire plus a style
   bake-off, shown to the client, before any page work starts) or later, once there's something real
   to react to — but it has to happen somewhere, deliberately, as its own step. If a project reaches
   the design-system stage with no real answer to "what should this look like," that's a discovery
   gap to close before going further, not something to default past.
5. **Capture the competitor and citation landscape** — who else is visible for this business's real
   terms, where the gaps are, whether this category even has an established authority yet.
6. **Inventory what already exists** — photos, brand assets, an existing booking/CRM system,
   previous ad creative — and map it to what it could be used for, before assuming anything needs
   to be built or bought from scratch.
7. **Get real search/traffic data before optimizing for an assumption.** A keyword tool's estimated
   volume and a business's real search-console numbers can tell two very different stories — check
   both, and let the real data override the plausible-sounding one.
8. **Write down a business-facts baseline as you confirm each fact** — locations, pricing, hours,
   what the business is and is *not*. This becomes the single source of truth every later stage
   reconciles against, not something to re-derive per document.

**When is this stage actually done?** A judgment call, not a fixed checklist — there's no universal
number of documents or data points that makes discovery "complete." The practical signal: you can
state the business's core facts, its real problem (if any), and its visual direction without
hedging or guessing. If you're still inferring or assuming any of those three, discovery isn't done
yet, regardless of how much has been collected.

**The rule that generalizes hardest from this stage:** never treat an old planning document, or
your own memory of an earlier conversation, as more current than the live site or the client's most
recent explicit confirmation. A number that was correct when written becomes wrong later, and stale
copies of it keep resurfacing in different files if nobody designates one place as the actual
source of truth.

---

## 2. How Piyush actually talks during this stage

Real prompts and real terms, not paraphrases — pulled from the raw chat archive where one exists.

**Grounding a fresh AI collaborator in the business, before any project-specific work starts.**
This is worth reading in full once, because it's the clearest example in the whole archive of how
Piyush hands over context — dictated, conversational, not a bulleted brief:

> "So, we are a performance marketing agency. Most of our clients, when they come to us, they have
> very little idea about the marketing... What we do is we understand that marketing is always done
> from the basics... We make sure the time between first click to the website and then checkout is
> less... The belief is that you should not spend a single penny on marketing if you can't track
> it... SEO is a lot of fundamental stuff — essentially, people make it really complicated and they
> hide behind jargon, while we try to make sure that we explain to our clients what's working...
> We believe in making things simple, because simple is always the best route."
> — [chat-009, 2026-08-07]

**Testing a claim rather than accepting it as fact:**
> "we found that escape room bookings were the leader?"
> — [chat-001, 2026-07-22] — note the question mark. This is a recurring pattern: Piyush surfaces a
> half-remembered finding as a question, not a directive, and expects it to be checked against real
> data before anyone acts on it — not silently assumed true, not silently ignored either.

**Directly invoking a specific research method by name, before any build work:**
> "before you build any page, will you actualy scrape google top 10 pages to get a consensus so we
> not only build but also beat them?"
> — [chat-001, 2026-07-22]

> "dude use keywords everywere api to check keyword research for optimization?"
> — [chat-001, 2026-07-22]

**Terms/tools he invokes by name at this stage** (worth recognizing when they come up, since each
names a specific real check, not a vague ask): *Keywords Everywhere API*, *Search Console* / *GSC*,
*scrape the top 10*, *competitor scan*, *real data* (as distinct from a plausible-sounding guess).

**The demand for real, checked numbers recurs later too, not just at kickoff** — e.g. auditing
whether *everything* was actually covered:
> "have you done all reports, resources, all screenshots, proofs, landing pages etc. everything?"
> — [chat-022, 2026-08-27] — this caught a real gap an earlier "complete" sweep had missed. The
> pattern: an apparently-finished discovery/audit pass often isn't, and a direct "did you really get
> everything" question is a real, recurring tool he uses to force a second, honest pass.

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** What
transfers is the *method*; the actual findings are specific to each business.

### Massive Impact
- Re-read `CONTENT-DIRECTION.md`, `PAGE-MAP.md`, `URL-ARCHITECTURE.md`, `WEBSITE-IMAGE-SYSTEM.md`
  before resuming work each session — cross-checked against the actual file inventory on disk to
  catch drift between what the docs claimed and what was really built.
- Scraped the live legacy `/escape-rooms/` page, pulled real industry survey data (364 owners
  surveyed), ran a live SERP scrape of the 14 pages actually ranking for the target term, and found
  13 of 14 competitors sell "more bookings" as their angle — leaving one clearly unclaimed angle
  (midweek/off-peak capacity) as the spine for the new page.
- Discovered via real Search Console data that the whole site was earning only ~38 organic
  clicks/month — a finding that reframed the entire subsequent build's actual goal (convert
  outreach traffic, not rank for volume).
- **No separate visual/brand discovery pass on record.** The riso illustration style shows up
  already locked in the very first chat — meaning it was decided before this archive starts, not
  skipped. Worth remembering as a real gap for a *new* project though: don't let "Massive Impact
  never had a visible brand-discovery step" become a precedent. It had one; it just isn't in this
  archive. Run it explicitly on the next project, per the process step above.

### Labyrinth Escape Games
- The engagement effectively *started* from a standalone SEO diagnostic: pulled the site's redirect
  log, mapped every redirect source to its destination, and found Boise-specific pages had been
  301-redirected straight to the homepage instead of the Boise location page — killing the
  topical authority that page had built. That diagnosis (not a redesign conversation) is what
  justified the full rebuild that followed.
- Ran a competitor + citation scan (82 listings checked, 48 gaps found) as part of the SEO master
  plan, before any content strategy was written.

### Putt House
- Discovery deliberately started with a client-filled onboarding questionnaire *before* any other
  work, specifically because — quoting the case study's own finding — "too much of what the team
  thought it knew turned out to be wrong or outdated once the client answered directly."
- The site's own displayed pricing was later found, during discovery, to actually belong to a
  *different, older location* on the same shared booking platform — caught only by treating the
  live site itself as a thing to verify, not a thing to trust.

---

## 4. Gaps

**Resolved from your last round of answers:**
- *When discovery ends* is a deliberate judgment call, not a checklist — written into the process
  above.
- *Visual/brand discovery is now a required step*, not something that only happens if it happens to
  come up — written into the process above, with the instruction to build one even where none
  existed before.
- *The Labyrinth chat archive is now built* — you chose "extract it now" (option A). Raw archive at
  `labyrinth-website-chats/` (15 chats), grammar-cleaned at `labyrinth-website-chats-clean/`. No
  secrets or personal emails needed redacting. What it confirmed: the original discovery-phase work
  (the April redirect-log investigation) still predates every surviving session, so it's still
  notes-only for *this* stage specifically — this archive's real value is for the later stages
  (Foundations through Handoff), where it's now the second full source of real voice examples
  alongside Massive Impact. One real surprise worth flagging for Stage 4+ when we get there: two of
  the five source sessions turned out to be where the Labyrinth engagement's own tooling got
  generalized into the portable `website-pack` starter kit — not a separate, unrelated project, the
  actual origin story of the reusable-systems catalog. See `labyrinth-website-chats/README.md` for
  the full account.
  - **Putt House really has no raw chats anywhere on this machine** — confirmed by checking, not
    assumed. The case study is the real ceiling there.

No open gaps remain for this stage as written. Stage 0 is ready to be considered signed off, or to
have new gaps raised as they surface from later stages.
