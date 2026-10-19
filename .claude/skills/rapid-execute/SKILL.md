---
name: rapid-execute
description: >
  Use when the user DICTATES precise changes and wants them applied fast — "change X to Y on page
  Z", a numbered list of corrections, a batch of copy tweaks. Executes a known change list at
  speed without skipping verification. Do NOT use when the change requires deciding WHAT to do
  (that's `/component-build` or the owning agent), or when a brand fact is involved (that stops and
  asks). Auto-fires on a numbered list of dictated fixes, "apply these changes", "make these
  tweaks", "batch of corrections".
---

# /rapid-execute: apply a known change list fast, without losing the gates

The least glamorous and most frequently botched job in this kind of work: applying a list of
changes somebody else has already decided, quickly, without breaking the things nobody mentioned.
**Speed comes from removing waiting, not from removing checking.** A rushed pass that skips
verification doesn't save time — it moves the time to the moment the problem is discovered live.

This skill has no opinion about the change. The owning agent or the user decides *what*; this skill
owns the typing and the landing.

## What this refuses to do
- **Decide what a change should be.** "Make the hero better" isn't a dictated change — hand it to
  `/component-build` instead.
- **Touch any brand fact without checking the source first.** An address, phone, price, hours,
  review count, duration, policy line, or quote traces to `docs/BRAND-TRUTHS.md`, the config, or the
  database. If the dictated value differs from the source, **stop and say so in one line** — usually
  the SOURCE should change, not one string on one page; changing the page alone creates a site that
  contradicts itself elsewhere.
- **Push.** Commit, then stop, if the project is live and carries real traffic.

## The pass
1. **Echo the list, numbered, then move.** One line per item, in execution order. No plan document.
   If one item is genuinely ambiguous, ask a one-line question about *that item only* and keep
   working the other items in the meantime — never block a whole batch on one unclear line.
2. **Batch every edit before any build or verification step.** Group by file, one pass per file, not
   one pass per change. Independent files run as parallel edits where the tooling allows it. No
   builds, no server restarts, no verification calls between individual items.
3. **Prove each change the cheapest way that actually proves it** — not the most thorough way, the
   *cheapest sufficient* way:
   - A visible string → fetch the rendered page, confirm the new string is present.
   - A link target → check the rendered `href`.
   - Conditional logic → check each branch, assert present/absent.
   - A type or prop change → a type-check pass, not a full build.
   - Layout or spacing → measure, screenshot only if the change is genuinely visual.
   - Anything reading from a database or CMS → fetch the live page; a green type-check proves
     nothing about real data.
4. **One full build, at the end, once.** Not after every item — after the whole batch.
5. **Freshness, in the same commit**, if this project tracks a per-page "last modified" date and the
   change affects what a page actually says.
6. **Commit. Do not push, unless the user asked for that too. Report plainly.**

## The speed model — why batching matters
Ten changes verified one at a time, each with its own build, costs the sum of ten builds. Ten
changes batched, then one build, costs one build. The whole discipline follows from that gap: batch
freely, verify cheaply per item, build once.

## Guardrails — the ways a fast pass goes wrong
1. **Byte-unsafe edits over multi-byte characters.** A regex or shell tool that isn't UTF-8-aware
   can silently corrupt an em dash, a curly quote, or any non-ASCII character mid-edit. Use a
   text-editing tool that operates on decoded strings, not raw bytes.
2. **Slicing a file between the wrong markers.** Anchor a replacement on a unique string, confirm it
   matches exactly once, and diff after — never delete "everything between roughly these two
   points."
3. **A green type-check mistaken for a working build.** They are not the same guarantee. A
   type-check passing says the code compiles; it says nothing about runtime behavior or real data.
4. **A fact dressed as a typo.** "Change 2,639 to 2,700" looks like a five-second edit and is
   actually a decision about what the site claims publicly. Stop and check the source.
5. **Cascade or specificity surprises in CSS.** If a style genuinely isn't applying, check for a
   competing rule before rewriting the one you're looking at.

## How this reports
Done / To Do / Questions, one line per change. State a failure as plainly as a success — "skipped
item 4, the phone number differs from the config source" is a better outcome than a silent guess.
