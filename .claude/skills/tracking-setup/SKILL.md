---
name: tracking-setup
description: Use to stand up tracking, attribution, consent and conversion dispatch on a project. Trace wires the tag container and the dataLayer taxonomy, captures click identifiers and campaign parameters at entry and persists them, gates on the consent model the market requires, and briefs the server-side conversion loop. Owned, measurable, and it never blocks or breaks a page. Auto-fires on "tracking", "attribution", "pixel", "conversion API", "consent", "UTM", "wire a conversion", "make consent compliant".
---

# /tracking-setup: stand up tracking, attribution and consent

The one job: **capture every acquisition signal, attribute each conversion to its true source, and fan those conversions out to the platforms server-side**, consent-gated, without ever blocking or breaking a page.

Owned by **Trace**. Production code, not slideware.

## Read first
- `brand.config.json`: `stack.analytics` (what this project actually uses), `market.country` (which decides the consent regime), `market.currencyCode` (which every conversion value carries), `vertical.primaryConversion`, and `stack.frozenSubsystems`.
- `reference/verticals/<vertical.overlay>.md` **section 7: the event taxonomy. Those names are the contract**, and they are deliberately stable across projects so reports compare.
- The project's own analytics specification if one exists, which supersedes the overlay's default taxonomy.
- `docs/CODE-CONVENTIONS.md`.

## Pick the architecture before building

Two shapes, and choosing the wrong one wastes weeks.

**A. Container plus dataLayer plus a server-side conversion send.** The default, and correct for most projects. One tag container with an environment-driven ID, the dataLayer as the event bus, the platforms fed from the container, and the money conversion fired server-side from whatever system confirms it. No owned database.

**B. Owned first-party tracking with its own store.** An ingestion endpoint, a visitor cookie minted in middleware, a persisted event and attribution model, a dispatcher with retries, and platform adapters. Ad-blocker-proof and fully owned, at the cost of a real backend to build and maintain.

**Choose B only when the project genuinely needs owned attribution data**, has a backend to host it, and someone to maintain it. Reaching for B by default produces a half-built pipeline that is worse than A, because a partially wired owned pipeline silently loses conversions while looking sophisticated. Confirm the choice with the user, and record it in the config.

## Core convictions, whichever shape

1. **One event identifier, two paths.** Generate a unique id once per conversion, and send the same id on the client push and the server send. **It is the only thing that stops one conversion being counted twice.**
2. **Attribution is captured at entry, not remembered at the end.** On landing, capture every click identifier and campaign parameter, plus the referrer and landing path, persist them, and carry them onto the order or lead record. A visitor who arrives from an ad and converts twenty minutes later on a different page is the normal case.
3. **Server-side dispatch is the real conversion path.** Client pixels lose a meaningful share to blockers and in-app browsers. The server send survives.
4. **Consent matched to the market.** `market.country` decides the regime. **Do not import a consent model from the wrong jurisdiction**: an unnecessary banner costs real conversions, and a missing required one is a legal problem. Flag anything needing a legal read rather than asserting compliance.
5. **Hash all personal data** before it reaches any platform, with a canonical normalisation applied first. Never send raw values, and do not store what you do not need.
6. **Never block, never throw.** Every call is fire and forget and swallowed on error. A failed push must never break a conversion flow, and the guard against a missing dataLayer is one line.
7. **Names are the contract.** Grep before you add. Extend, never fork, never rename. **A renamed event silently orphans every trigger downstream** and the dashboard just quietly flattens.

## How to work
1. **Survey first.** Grep for an existing container snippet, dataLayer pushes, a capture utility, or event names already in use, especially inside a frozen subsystem. Reuse and extend.
2. **Wire additively.** The container in the root document with an environment-driven ID, pushes at the existing step boundaries, and the capture utility in the shared library. **Every touch inside a frozen path is isolated as its own commit**, and it adds a push rather than altering the flow it observes.
3. **Map the events to platform events** from the taxonomy. One configuration tag, one event tag and trigger per event, one variable per parameter.
4. **Verify end to end.** Walk the whole funnel in debug mode. Confirm the conversion event carries its items, its value, its currency and the stored identifiers, and confirm no push can throw. **Every destination ships dormant and validates through the platform's own test console before it goes live.**
5. **Deliver the server-side brief** as a file the user can hand over.

## The server-side brief
The revenue loop usually runs on a webhook you do not own. Produce a self-contained brief: which conversions fire on success, the stored identifiers and where they live on the record, the exact hash normalisation, the shared event identifier from the client push, retry expectations, and how to verify in each platform's test console.

**Re-verify platform API specifications at delivery time and state the verification date.** Endpoints, authentication and field names change, and more than one platform has moved its offline-conversion path entirely. Never ship API details from memory.

## Guardrails, refuse or fix on sight
- Changing frozen logic, step order, or an existing event name. **Flag it instead.**
- Any container or platform ID hardcoded in a component.
- Raw personal data in any payload.
- Two different event identifiers for one conversion.
- A consent model imported from the wrong market.
- A tracking call that can throw into the UI.
- A fabricated value in any test or document.
- Em or en dashes in anything you write.
- Credentials in a tracked file. Per-destination secrets are encrypted at rest or held in the platform's own secret store, never committed.

## Done definition
- [ ] The architecture chosen deliberately and recorded, not defaulted into.
- [ ] The container wired with an environment-driven ID; every taxonomy event firing with its parameters.
- [ ] Click identifiers and campaign parameters captured at entry, persisted, and reaching the conversion record.
- [ ] Consent matched to `market.country`, with anything needing legal review flagged rather than asserted.
- [ ] The full funnel verified in debug mode, and no push able to throw.
- [ ] The server-side brief delivered, with its verification date.
