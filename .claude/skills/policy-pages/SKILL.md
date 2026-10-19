---
name: policy-pages
description: >
  Owns the legal and privacy surfaces and any change that touches personal data: the privacy
  policy, terms of use, cookie policy, the consent-gate copy, and the legal facts (entity,
  governing law, address, last-updated). Keeps these pages describing what the site ACTUALLY does,
  keeps them in sync as forms/analytics/CRM wiring land, and blocks any policy claim the site can't
  back. Auto-fires when a tracker, pixel, analytics tool, form, or third-party embed is added or
  removed (the policy has to move in the same change), when a data-collecting feature ships, or
  when a legal fact is confirmed.
---

# /policy-pages: the privacy policy, terms, and cookie policy describe reality, always

These are the pages nobody reads until they matter, and then they matter a lot. A policy that
describes tracking the site doesn't run is simply false — and a short, accurate policy reads as
more trustworthy than three screens of copied legalese. This skill's whole job is keeping that
promise true as the site grows forms, analytics, and any CRM that touches personal data.

## Canonical grounding (read first)
- `docs/BRAND-TRUTHS.md` — legal facts (the entity's legal name, address, governing law) live here
  as confirmed facts or explicit open questions with an owner. **Never invent one to fill a gap** —
  an unconfirmed jurisdiction or address is worse than an honest "to be confirmed."
- `identity.legalName` in `brand.config.json` for the entity name, if set.
- Wherever this project's tracking/consent wiring actually lives (see Trace, or this project's own
  analytics setup) — what actually gets set, when, and behind which consent group.
- Wherever the policy pages themselves render, and the one place a legal fact is stated (never
  restate a legal fact inline on multiple pages — one source, read everywhere, so they can't drift).

## What this owns
- **The three policies**: privacy, terms, cookies. Every claim maps to a real, current behavior of
  the site. The cookie groups (typically Essential, Functional, Analytics, Advertising) match what's
  actually set, and stay behind whatever consent gate the copy promises.
- **The legal facts**: entity, address, governing law, last-updated. A fact advances from
  unconfirmed to stated only once the project owner confirms it — bump the "last updated" date on
  any substantive change.
- **The consent contract**: the copy's promise that analytics/advertising cookies aren't set until
  the visitor agrees, that consent is withdrawable, and that a Global Privacy Control signal (if
  supported) is honored. This skill owns the words; whoever wires tracking owns that the gate
  actually enforces them — if the copy promises consent the gate doesn't enforce, that's a ship
  blocker.
- **Third-party accuracy**: every named processor (a CRM, an ads platform, an analytics tool, the
  email host). When one is added, removed, or swapped, the policy changes in the same change.

## How it works
1. **Diff the site against the policy.** List every tracker, pixel, embed, form, and third-party the
   site actually loads, then confirm each is described — and nothing is described that isn't
   loaded. The gap in either direction is the finding.
2. **Trace the data.** For each piece of personal data collected (name, email, phone, message, IP,
   analytics), confirm the policy states what's collected, why, who else sees it, and how long it's
   kept.
3. **Check the consent claims are enforceable.** The copy says nothing runs before consent — confirm
   the gate actually blocks analytics/ad cookies until agreement, and that a withdrawal path exists.
   Words without an enforcing gate are a lie in waiting.
4. **Keep one source of truth.** A legal fact lives in exactly one place and is read everywhere else
   — never restate it inline on a second page where it can silently drift.
5. **Flag the lawyer line.** These are honest descriptions of practice, not legal advice. Say
   plainly when the site's data practices (real personal data at volume, especially across
   jurisdictions) have crossed into territory that needs real counsel review before launch.

## Guardrails
- **Never describe collection the site doesn't do, and never stay silent on collection it does.**
  The policy tracks reality in both directions, always.
- **Never state an unconfirmed legal fact as settled.** Governing law and address stay marked
  unconfirmed until the project owner confirms them.
- **A policy claim the site can't back is a ship blocker.** If the copy promises consent-before-
  cookies and the gate isn't wired, the gate is the blocker — the copy never gets quietly weakened
  to match a non-compliant site.
- **This is not legal advice.** Write honest descriptions of practice and route to real counsel
  before launch, especially for regulated personal data at volume. Never claim the pages are legally
  sufficient on their own.
- **Plain language only.** No borrowed legalese, no banned words, no em dashes. A policy a visitor
  can actually read is the whole point.
- Any change to a tracker, form, or processor updates the relevant policy and its last-updated date
  in the same change, or it isn't done.
