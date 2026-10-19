---
name: bullshit-detector
description: Adversarial verification pass that EVERY audit finding, recommendation, metric, and impact claim must survive BEFORE it goes in a client deliverable. Catches AI-generated generic "best-practice" filler, unverified claims, lab-metrics-as-reality, inflated impact, and advice that doesn't apply to THIS business. Use on every line of an SEO/website audit before it reaches the client. Default to disbelief-with-a-verification-path; recommend only what survives.
---

# Skill: Bullshit Detector (audit edition)

**Calibrated for `vertical.overlay: local-business`** (this pack's default and deepest-covered
vertical — see `reference/verticals/README.md`). The REALITY lens and the five bullshit patterns
below apply to any vertical unchanged; the BUSINESS lens's specific revenue levers (local pack, GBP,
booking-or-call path) are local-business-specific. On another overlay, re-derive the BUSINESS lens's
levers from that vertical's own `reference/verticals/<overlay>.md` section 1 ("what a conversion
is") rather than assuming the local-business list below still applies.

**Voice & stance:** be the skeptic who has watched confident, well-formatted SEO audits embarrass the
agency that sent them. A finding is not true because it's specific, has a number, or came from a tool. It's
true when it **survives a check against the real site AND connects to a real business outcome for THIS client.**
The client is often a **non-technical local-business owner being pitched by several vendors** — adjust for
whoever this project's actual client is. Generic AI-audit advice is
what makes every vendor look the same; surviving, verified, business-tied findings are what win. Default to
*disbelief with a verification path*, not cynicism. Find the load-bearing truth, throw out the scaffolding.

The gravitational pull in an audit is toward **"more findings = more value."** It's the opposite: ten verified,
business-tied findings beat fifty checklist items, and one inflated claim a buyer can disprove poisons the
other forty-nine. Resist "more" on purpose.

## The five things that are usually bullshit in an SEO audit
1. **Lab metric quoted as real-user reality.** A Lighthouse/PageSpeed *lab* score (throttled phone, cold cache) presented as "your customers experience this." **Always check FIELD (CrUX) data** before claiming user impact. (See the worked examples below.)
2. **Generic best-practice with no business path.** "Add alt text / improve domain authority / fix render-blocking JS / start a blog / post 3×/week." True-ish and universal = sounds like every vendor. Ask: *does fixing this plausibly change bookings for THIS business, or is it a checklist item?*
3. **Inflated / manufactured impact.** "This will 2× your traffic," "you're losing $X/month" with no mechanism or denominator. Name the number and ask *measured how, against what baseline, and through what causal path to a booking?*
4. **Unverified "it's broken" claims.** A tool said a page is thin/missing/broken: that's a **hypothesis, not a fact.** Re-fetch it, render it, view the screenshot. (We almost called a page "blank" that actually renders fine for users; the real finding was different and narrower.)
5. **Copy-the-competitor / copy-the-template by default.** "Competitor has X so they need X," or "SEO audits always include a backlink section." A competitor's choice is evidence of *their* strategy; a template section with nothing real to say is filler. Only include it if THIS site has a verified, material gap there.

## Two lenses: every claim passes through BOTH

**BUSINESS lens: does fixing this plausibly drive bookings/revenue for THIS business?**
For a **local, brick-and-mortar, booking-or-call-driven business** (`vertical.overlay: local-business`
in `brand.config.json` — check the overlay before assuming this lens applies), real revenue comes
from a short list: **local pack / GBP presence, reviews, being findable for `{service} {city}` +
intent terms specific to this vertical (the ones that actually drive an enquiry or a booking here —
derive them from this business's real offer, never carried over from a different client's
category), a fast frictionless mobile book-or-call path, and increasingly AI answers.**
- If a finding doesn't connect to one of those levers, it's probably filler; say so.
- Size the impact honestly: *which lever, roughly how much demand (use real volume from `keywords-everywhere`), and what's the causal path to a booking?* No path → cut or downgrade.
- Beware advice borrowed from other business models (SaaS, e-commerce, publishers): "content velocity," "topical authority," "DA building" rarely move a single-location service booking the way local + reviews + speed do.

**REALITY lens: is it verified against THIS site, with the right metric?**
- Did we actually **observe** it (curl / Lighthouse / crawl TSV / screenshot), or assume it? Cite the evidence.
- Is it the **right metric**: FIELD vs lab, this-location vs aggregate, mobile vs desktop?
- Is the **mechanism real**: does the fix actually produce the claimed outcome, or is the link asserted? (Schema enables rich-result *eligibility* and AI citability, it is **not** a direct ranking boost. Say what it actually does.)
- Can the client or a rival **disprove it in 30 seconds**? If yes, it must be airtight or reframed.

## Separate what survives from filler
After both lenses, split every claim:
- **Survives**: verified against the site AND tied to a booking lever with an honest impact path. *Keep only this.*
- **Filler**: generic, unverified, inflated, lab-as-reality, or template-by-default. *Cut it and say why.*

Never forward a finding wholesale because part of it was right. Strip it to what survives. (E.g. "site is slow" → survives only as "the client's site has field-confirmed slow mobile LCP"; the "competitor's site is catastrophic" half was lab-only and gets cut/reframed.)

## Rate every surviving finding
Tag each with:
- **Confidence:** Verified (observed + reproduced) · Likely (observed once) · Unverified (assumed, do not ship until checked).
- **Impact:** High / Med / Low on the booking lever it touches, with the lever named.
- **Refutability:** Airtight · Needs-careful-framing · Risky. Anything "Risky" gets reframed or dropped.

## Class every deferral / "we'd fix this later"
- **needs-client-access**: blocked on the owner granting GBP / Search Console / analytics. Name it.
- **effort**: clear and worth doing, just scoping. Note rough size.
- **low-value**: survives neither lens; "later" = honestly *won't do*. Say so, don't fake a queue.

## Worked examples (illustrative patterns, use as the model)
- **The lab-vs-field LCP catch.** Draft claimed "a competitor's site: 19s LCP, visitors bounce." FIELD (CrUX) showed real users get **FAST** LCP; the 19s was lab-only. *Survives: "page is heavy/fragile under load, a scaling risk." Filler: "visitors bounce" (refutable in 30s on PageSpeed).* Pattern #1.
- **The "blank page" that renders fine.** Crawl said 0 words on a location page → easy to write "broken blank page." Verifying showed it **renders fine for users** but returns **0 bytes to crawlers** (reproduced 3/3). *Survives: "Google can't see this location → can't send you those enquiries" (narrower, airtight). Filler: "blank page."* Pattern #4.
- **"No schema = lower rankings."** Tempting shorthand. Mechanism check: schema drives **rich-result eligibility + AI citability**, not a direct ranking lift. *Survives: "you're ineligible for the map/rich results and uncitable by AI engines." Filler: "it's tanking your rankings."* Pattern #3 mechanism.
- **A generic "start a blog / build backlinks" line.** Business lens: a single-location, booking-driven business earns revenue via local pack + reviews + `{service} {city}` pages, not content velocity. *Survives: nothing, unless tied to a specific local/intent term with real volume. Filler: the generic version.* Pattern #2.

## Procedure (run on every finding before it enters the deck)
1. **State the finding in one line** + flag which of the 5 bullshit patterns it risks.
2. **REALITY lens**: name the evidence (which curl/Lighthouse/crawl/screenshot). If none, mark Unverified and verify or cut.
3. **BUSINESS lens**: name the booking lever and the causal path; size it with real volume. No lever means filler.
4. **Mechanism check**: does the fix actually cause the outcome? Correct any overstated link (schema, "rankings", etc.).
5. **Split survives vs filler**; keep only survives; **say what you cut and why** (cutting visibly is itself credibility).
6. **Rate** confidence / impact / refutability; reframe or drop anything Risky.
7. **Class** any deferral (needs-client-access / effort / low-value).

## Guardrails
- **Never present a lab metric as real-user impact** without checking field/CrUX.
- **Never ship an "it's broken" claim you haven't re-observed**: the tool output is a lead, not a verdict.
- **Never let a generic best-practice in** without naming the booking lever and impact path for THIS business.
- **Never inflate impact**: no number without a denominator and a causal path to a booking.
- **Never include a deck section just because the template/competitor has it**: only if there's a verified material gap.
- This skill **verifies and de-risks; it does not soften real findings.** A verified, high-impact, airtight problem should be stated bluntly. The discipline is making sure it's *real* first.
