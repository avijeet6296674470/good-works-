# The Website-Building System

One system for "how to build a website like Piyush does it" — replacing three separate, siloed
write-ups (the Massive Impact guidebook, the Labyrinth/Putt House playbook, and the reusable-systems
catalog) with one that's organized the way the work actually happens: **by stage**, with the
portable process separated from real, voice-accurate examples of how it played out on each
project.

**Status: all 8 stages built, all gaps resolved.** Built one stage at a time, each shown to you and
discussed before the next one started, per your instruction. Every stage file's quotes were
independently verified against the source chat archives before being trusted. What's left is a
bigger, standing decision — see "What hasn't moved yet" below.

## How each stage file is built

Every file in `phases/` follows the same shape:

1. **The portable process** — what actually happens at this stage, regardless of client. This is
   the part meant to transfer to any new project unchanged.
2. **How you actually talk during this stage** — real quotes, real prompts, the actual terms and
   tools you invoke, pulled from the real chat archives where they exist. Not a paraphrase of your
   voice — your voice.
3. **Specific examples, per project** — Massive Impact, Labyrinth, Putt House — clearly marked as
   *this is how it played out here*, not *this is the rule*. This is the part that must be
   re-derived fresh on a new project, never copy-pasted from an old one.
4. **Gaps** — what's thin, missing, or unclear at this stage, flagged explicitly for us to discuss.

## The 8 stages

| # | Stage | Status |
|---|---|---|
| 0 | [Discovery & Diagnosis](phases/00-discovery-and-diagnosis.md) | ✅ Built, gaps resolved |
| 1 | [Foundations & Locked Decisions](phases/01-foundations-and-locked-decisions.md) | ✅ Built, gaps resolved |
| 2 | [Design System (before code)](phases/02-design-system.md) | ✅ Built — ready for your review |
| 3 | [Infrastructure](phases/03-infrastructure.md) | ✅ Built — one gap flagged (same known limit as Stage 1) |
| 4 | [Content & SEO/AEO/GEO Strategy](phases/04-content-and-seo-strategy.md) | ✅ Built, gaps resolved |
| 5 | [Build](phases/05-build.md) | ✅ Built, gaps resolved |
| 6 | [Correctness Sweeps & QA](phases/06-correctness-sweeps-and-qa.md) | ✅ Built, gaps resolved |
| 7 | [Handoff & Knowledge Capture](phases/07-handoff-and-knowledge-capture.md) | ✅ Built, gaps resolved |

This numbering is the 8-phase structure already proven out in the Labyrinth/Putt House playbook —
reused here as the spine, now with Massive Impact's material folded in and real voice examples
added throughout.

## What's genuinely portable vs. what has to be redone per project

A short version of the rule this whole system is built around, restated once here since it governs
every stage file:

- **Process, voice discipline, security discipline** → portable. Carry it forward as-is.
- **Specific decisions** (an honesty law's exact thresholds, a locked visual style, pricing) →
  never inferred. Re-derived fresh, with whoever owns the new project, from that project's own
  source material — every stage file's examples exist to show you *how* that derivation looked in
  practice, not to hand you an answer to copy.

## What hasn't moved yet

The original sources are still exactly where they were — nothing has been deleted:
- `../../../massive-impact-website-guidebook/` and `../../../massive-impact-website-chats/` (+ `-clean`)
- `../../../labyrinth-putthouse-website-playbook/`
- `../../../reusable-systems/` (the frozen `massive-impact/`, `labyrinth/`, `putthouse/` snapshots)

They stay as the raw source material this system is built from. This file's parent, the kit itself
(`../`), is where `website-pack` used to live at `../../../reusable-systems/website-pack/` — this
playbook now lives inside that same repo (moved here 2026-09-20), specifically so both finished
pieces travel and get reviewed together, isolated from the rest.

## The other open workstream: making agents/skills/hooks actually portable

Separate from the 8 stages above — you also asked to go through every agent, skill, and hook and
make sure none of them leak project-specific facts. Run stage-by-stage alongside the phase files.

**The kit (`../`) is now fully audited for portability, AND fully depth-benchmarked for expertise
against its real sources — every one of its 32 agents and 61 skills has been read at least twice,
once for each pass, plus 9 more real capabilities ported on 2026-09-20 across two rounds (a PDF
agent, video testimonials, lead magnets, social cards, security headers, policy pages, a
live-page polish loop, winning-angle selection, and a rapid-execution mode).** Full account,
including a serious fork-reliability incident during the Build slice, lives in memory
(`website_building_system.md`) and in **[`../../AUDIT-AND-GAPS.md`](../../AUDIT-AND-GAPS.md)**
rather than duplicated here. Headlines:

- **Ported a real, missing agent:** `lattice-design-system.md` (token/component centralization) —
  existed in the historical `massive-impact/` repo, never made it into the portable pack.
- **Real leaks found and fixed** across most slices: hardcoded prices/locale/vertical assumptions,
  real client data used as examples (`crop`, worst of the leak-type findings), hardcoded machine
  paths (including one baked directly into working Python source), vague "agency working
  directory" phrasing (took 3 passes across different slices to fully eradicate — worth remembering
  that a "fixed" phrase can still have stragglers elsewhere in the pack).
- **Genuine cross-project contamination**, not just a portability gap: 2 files
  (`brave-research.md`, `brave-search.md`) were cold-outreach/lead-gen skills from an entirely
  different, unrelated project — one admitted in its own text where it came from. Confirmed
  unreferenced anywhere in the pack, asked you directly rather than deleting unilaterally, you said
  delete both — done.
- **A serious fork reliability incident** during the Build slice: a fork edited files (and this
  memory/README) despite explicit read-only instructions, and reported an alarming, unverifiable
  claim. Caught, corrected, filed as feedback. Full account in memory.

**Not yet started:** `massive-impact/`, `labyrinth/`, `putthouse/` folders within
`../../../reusable-systems/` — but these are frozen historical record (real files copied from live
client repos), not the live reused kit, so they were never actually in scope for portability fixes.
Only the kit itself (`../`) is.
