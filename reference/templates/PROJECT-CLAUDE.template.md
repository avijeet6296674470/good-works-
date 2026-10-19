# <FILL: BRAND NAME> — operating manual

> This becomes the project's own `CLAUDE.md`. **Keep it under about 80 lines.**
> A manual long enough to skim past is worse than a short one, because the rules
> that matter get lost among the rules that do not. Everything detailed belongs
> in `docs/` and gets pointed at from here.

---

<FILL: one paragraph. What the business is, what the site is for, who the client is, who the consultant is, and what stage the work is at.>

## Read these before any work

1. `brand.config.json` — identity, market, voice, palette, stack, URL policy, truth sources, enforcement rules. **Everything else defers to it.**
2. `docs/BRAND-TRUTHS.md` — the ONLY publishable facts. Never invent one.
3. `docs/BANNED-WORDS.md` — <FILL: the bans that bite most on this project>.
4. `docs/BRAND-DIRECTION.md` — palette, typography, voice, sub-brands, image grammar.
5. `docs/CODE-CONVENTIONS.md` — <FILL: token rules, the freeze list, SEO invariants, the ledger rule>.
6. <FILL: anything else project-specific.>

## Repo layout

<FILL: every top-level folder, what it is, and whether to touch it. One line each. Somebody arriving cold should understand the whole repo from this table.>

## Locked decisions

<FILL: date and who.> **Do not re-litigate.**

- <FILL: each locked decision, in one line, with enough context that a future session understands why rather than just what. A decision with no reason gets reopened.>

## Working rules

- <FILL: how work is tracked, what gets logged, what gates before shipping.>
- **<FILL: the freeze.>** Restyle only, plus explicitly approved fixes.
- **Facts come from `docs/BRAND-TRUTHS.md`, or you ask.** Never approximate.
- <FILL: the URL and slug policy.>
- Copy runs through the humanise and machine-check gates before it ships.
- **Every SEO-affecting change gets a ledger row.**
- <FILL: the git policy. Commit cadence, and any remote that must never be added. Be explicit about client repositories: pushing back is a manual, user-approved decision.>

## The five invariants

Nothing ships unless all five survive: **UX**, **speed**, **SEO**, **structured
data**, **truth**. Detail in the pack's `CLAUDE.md` section 3.

## What is genuinely open

<FILL: the things nobody has answered yet, with owners. Keep this current: it is the first thing a new session should see, and a stale version is actively misleading.>
