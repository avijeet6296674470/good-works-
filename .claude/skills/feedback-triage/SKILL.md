---
name: feedback-triage
description: Use when a client or stakeholder feedback document arrives, or when the user asks "what's next from the feedback" or "let's go through the feedback". Reads the feedback file, cross-references the task list, classifies every item P0, P1, P2 or Deferred (P0 means launch blockers), flags any item whose obvious fix would regress a locked rule and tags the owning agents, creates task entries for net-new items, and prints a prioritised work table plus a "start here" recommendation. Replaces manual line-by-line review.
---

# /feedback-triage: convert feedback into prioritised tasks

Eliminates the manual "let me read through the feedback" step. Run it whenever a feedback document needs processing.

## Canonical grounding
Classify every item against the project law: the project's `CLAUDE.md` and its locked decisions, `docs/BRAND-TRUTHS.md`, `docs/BANNED-WORDS.md`, `docs/CODE-CONVENTIONS.md`, and `brand.config.json` (`truth.forbiddenClaims`, `stack.frozenSubsystems`, `enforcement`).

Route image feedback to `/brand-asset-integrity`, performance feedback to `/performance-pass`, and crawl or SEO-risk feedback to `/crawl-integrity` or `/seo-audit`.

## Step 1: load context
The feedback file, the current task list, and the locked decisions. **Some feedback contradicts the locked rules; flag the conflict rather than silently actioning it.**

## Step 2: classify each item

**P0, launch blockers, fixed the same session**
- Breaks the conversion path: the flow blocked or broken, a payment surface wrong, a CTA missing, the enquiry path dead.
- Wrong business data: an incorrect price, wrong hours, wrong contact details, an overstated saving.
- A rule violation: a dash or banned word in copy, fabricated proof, a name against `identity.nameRule`, an image generated outside the approved provider, a raw colour outside the token file.
- Anything the go-live checklist covers that this feedback exposes as broken.
- **Anything contradicting a locked decision. These override feedback: flag, do not action.**

**P1, this sprint**
- Significant UX degradation: wrong section order, broken mobile layout, a missing state.
- SEO or launch risk: a wrong H1, missing schema, a broken internal link, a canonical or indexing concern.
- Copy off-voice or off-brief, not rule-level but clearly needing a fix.
- Feedback matching an existing pending task, which updates that task's priority.

**P2, batch later**: visual polish, nice-to-haves off the critical path, anything blocked on an undelivered asset.

**Deferred**: anything needing a third-party decision or an explicitly deferred phase.

### Also flag: locked-rule regression risk

A feedback item is often "make this look or feel different", and **the obvious fix quietly regresses a rule.** Tag any item whose fix could dent one, so the task carries the guard:

- **The freeze**: any request touching a frozen subsystem's behaviour. Restyle only, plus explicitly approved fixes. Tag **Cortex** and flag anything beyond that.
- **UX**: a layout change that could add layout shift, break the mobile conversion path, or drop a loading, empty or error state. Tag **Fold**, and **Sheen** for polish.
- **Speed**: anything that could bloat the largest paint. Tag **Pulse** and **Cortex**.
- **SEO**: a copy, heading, anchor or URL change that could alter a slot. **Slugs never change without approval.** Tag **Beacon**; the change gets a ledger row.
- **Structured data**: anything touching values a schema node reads. Tag **Weave**; visible text and markup stay identical.
- **Truth and voice**: a fix that would state a fact not in a source. Tag **Marlowe** and require the value to trace, or ask.
- **Brand asset**: a swap that could put the wrong or a regenerated asset on a surface. Tag **Vigil**.
- **Tracking**: a change to a form, CTA or funnel that could drop or rename an event. Event names inside a frozen subsystem are frozen too. Tag **Trace**.

Add a short `invariant: <which> - <owner>` note to the task, **so the fix passes the gate rather than merely looking fixed.**

## Step 3: cross-reference and deduplicate
Before creating any task, pull the current list. Update an existing task's priority if the feedback changes it and note the reference number. Create only genuinely new ones. **If the work is already shipped, mark it as such and create nothing.**

## Step 4: create task entries for net-new P0 and P1 items
Format: priority, short description, feedback item number. Assign the owner from the cast: copy to Marlowe, layout and tokens to Vesper, code and routes to Cortex, slots and schema selection to Beacon, JSON-LD to Weave, responsive to Fold, vitals to Pulse, assets to Vigil, tracking to Trace, conversion architecture to Hook, sitewide links to Weaver, programme questions to Almanac. A full section rebuild goes to `/component-build`, a full page to `/page-build`, the final gate to `/ship-ready`.

## Step 5: output the triage table
Four tables (P0, P1, P2, Deferred) with item, status, owner, invariant and task number, **plus a fifth for conflicts with the locked rules**, which is the one the user most needs to see.

## Step 6: recommend "start here"
At most three, prioritised by blocker, then quick win, then longest lever.

## Done definition
- [ ] Every item classified.
- [ ] Existing tasks updated with reference numbers.
- [ ] Net-new items have entries with an owner and any invariant tag.
- [ ] Every locked-rule conflict flagged for the user.
- [ ] The table and the recommendation printed.

## Guardrails
- **Feedback never overrides a locked decision or the freeze.** A conflicting item is flagged, not silently actioned.
- Never invent a task owner or a fact.
- Never write an em dash in the table, a task or a note.
