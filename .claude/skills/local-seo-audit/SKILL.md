---
name: local-seo-audit
description: Audit the local-search layer that makes or breaks a physical business: business-profile completeness on the dominant map platform in this market, map-pack presence for the priority terms, review volume, velocity and rating against competitors, NAP consistency across the site and every citation platform that matters here, local landing-page and schema signals, and local link and citation gaps. Mostly manual plus scraping; no paid local-rank API required.
---

# /local-seo-audit: the map-pack and business-profile layer

For a business people physically go to, **the majority of custom comes from local search and social discovery**: the map pack, the business profile, and reviews outrank content volume. This is the highest-leverage layer of the whole programme and the one generic SEO work skips.

Pairs with `/seo-audit` (on-page), `/schema-audit` (the local entity markup) and `/ai-visibility-audit` (answer engines).

## Read first: this skill has no built-in geography

**Every platform named in this audit comes from `market.citationPlatforms` and `market.reviewPlatforms` in `brand.config.json`.** The pack ships none, deliberately: which directory, map platform and review site carry weight differs completely by country and by vertical, and a list imported from the wrong market produces an audit that looks thorough and points at nothing.

**If those fields are empty, that is the first finding.** Stop and research the market's real platform set before scoring anything, or say plainly in the report that the platform layer was not audited and why. Do not substitute the platforms you happen to know.

Also read `market.country`, `region`, `city`, `addressFormat` and `phoneFormat`, plus `reference/verticals/local-business.md` section 5.

**Pre-launch reality.** A business that has not opened has zero reviews, possibly no claimed profile, and often a provisional map pin. Early runs of this audit are a **setup checklist as much as a scorecard**. Say so in the report rather than inventing comparison numbers. Anything `truth.forbiddenClaims` covers stays absent.

> Output: a pass or fail findings table, plus a head-to-head comparison row per signal against each named competitor.

## 1. The business profile: the single biggest lever

Pull up the profile on the map platform that dominates this market, and each competitor's. Score each:

- [ ] **Claimed and verified**, with the **primary category** set to the closest genuine match. Category choice is a ranking decision, not an administrative one.
- [ ] **Secondary categories** used fully. Each one adds ranking surface, and most profiles leave them empty.
- [ ] **Name exactly per `identity.nameRule`.** Keyword-stuffing the name is a suspension risk; flag it if a competitor does it.
- [ ] **Hours complete**, including the holiday and seasonal variations that apply in this market's calendar. Stale hours are a real-world failure, not just an SEO one.
- [ ] **Phone and website** correct and in the market's formats, with the site link in the project's canonical URL form.
- [ ] **Photos**: count and recency, covering exterior, interior and every distinct offering.
- [ ] **Products and services populated** with real prices from the fact files, nothing invented.
- [ ] **Questions seeded and answered** using the site's own FAQ answers, same facts and same wording discipline. **Posts active** on a regular cadence, which is a freshness signal, with seasonal posts planned against the market's calendar.
- [ ] **Attributes** set honestly, especially accessibility. **Verify accessibility claims on site before asserting them**, because a wheelchair-access claim has consequences for a real person who travelled there.
- [ ] **Conversion link** wired to the right page, tagged so it appears in analytics.
- [ ] **Description** front-loads the category and the location, with no fluff and no superlatives.
- [ ] **The map pin.** Confirm the final pin and lock its coordinates into the fact file. In markets with weak address-matching this matters far more than elsewhere, and a provisional pin stays flagged as provisional.

## 2. Map-pack presence: the ranking proof

For each priority term from the keyword map:
- [ ] Search from, or emulate, the target locality. Record whether the business appears in the pack and at what position against competitors. Use a clean session and set the location explicitly. **State the method in the report, because pack results are personalised and a position with no stated method is not a measurement.**
- [ ] Capture a screenshot per term via `/screenshot`. This is the most persuasive artefact the audit produces.
- [ ] **Note proximity dependence.** If the business only ranks when the searcher is essentially outside it, that is a relevance and prominence gap, not a distance one, and it is fixable.
- [ ] Pre-launch, record "not yet listed" honestly. That row becomes the baseline the programme is graded against.

## 3. Reviews: volume, velocity, rating, response

The dominant local ranking and conversion factor. Build the comparison table: rating, count, approximate reviews per month, and whether the owner responds.

- [ ] Count and rating against each competitor. **Pre-opening this reads zero against their hundreds, and that gap IS the headline finding**, plus the reason the review system must exist from day one rather than from month three.
- [ ] **Velocity.** A steady recent flow beats a stale pile. Flag competitors whose reviews dried up, because that is an opening.
- [ ] **Owner responses**, especially to negative reviews. An engagement and trust signal, and cheap.
- [ ] **A review-generation system exists for opening week**, using whichever channel this market actually responds to (from `market`), plus an in-person prompt. If none exists, that is recommendation one.
- [ ] **HARD RULE**: zero fabricated or incentivised-looking reviews, zero rating markup, zero review-shaped tiles on the site until real reviews exist.

## 4. NAP consistency: the cardinal rule

**Name, address and phone must match byte for byte everywhere.** The canonical version lives in the site-config fact file and is formatted per `market.addressFormat` and `market.phoneFormat`.

```bash
# Pull the site's own contact-page NAP and eyeball it against the profile:
curl -s "$HOST/contact" | sed -E 's/<[^>]+>/ /g' | grep -iE '[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}'
# Check the LocalBusiness schema NAP matches the visible NAP (also covered by /schema-audit):
curl -s "$HOST/" | grep -o '"telephone":"[^"]*"\|"address":{[^}]*}\|"name":"[^"]*"'
```

- [ ] Footer equals contact page equals profile equals schema equals every citation. Same spelling, same abbreviations, same order.
- [ ] **One canonical source** feeds all of them. Never hand-typed per page, because hand-typed copies drift and nobody notices which one is right.
- [ ] Phone consistent in both its machine format and its display format, and the same number on every channel.
- [ ] Location phrasing consistent with what `BRAND-TRUTHS.md` locks, with no alternative landmark creeping into address surfaces.
- [ ] The postal code correct everywhere. In several markets a wrong or missing postal code is a citation-matching killer on its own.

## 5. Citations and local links

From `market.citationPlatforms`, checked for listing and consistency. Typically: the dominant map platform, the market's leading general directory, any vertical-specific platform, and the secondary map platforms.

- [ ] Any sub-brand with its own discoverability (a café inside a venue, a clinic inside a practice) gets its own listings where the platform supports it, with its own name and the identical address.
- [ ] **Social profiles** whose bios carry the site link and the area. Only profiles that genuinely exist; **never cite a platform the business is not on.**
- [ ] Messaging-channel business profiles where the market uses them, with details matching the NAP.
- [ ] **No duplicate or conflicting listings.** Search the name, the building and the phone number separately, because duplicates usually surface under only one of the three.
- [ ] **Local links and mentions**: the city publications, the roundups and the community threads that cover this category. Use research tooling to find which of them cover competitors and where this business is missing.

## 6. On-site local signals
- [ ] The contact page is the canonical location page: unique copy, an embedded map on the correct pin, the full NAP, landmarks, directions and parking.
- [ ] The local entity schema with coordinates, hours, price range and area served. Route to `/schema-audit`.
- [ ] The city and area named **consistently** across titles, headings and content. One spelling, everywhere.
- [ ] A working directions action, which is often the last click before a visit and is almost never tracked.

## How to run
1. List the business and its three to five closest real competitors. Real means competing for the same visit, which is often not the same category.
2. Walk sections 1 to 6, marking pass or fail and filling the comparison rows. **Pre-launch gaps are recorded, not dressed up.**
3. Screenshot the pack for each priority term and the profiles.
4. Pull local search volume for the priority terms, set to the right geography.
5. Output: the findings table, the reviews and pack comparison, and the top five local fixes ranked by impact on the primary conversion. Log shipped fixes via `/seo-log`.

## Notes
- **There is no official rank API for the map pack.** Results are personalised, so state your method and treat positions as directional, captured as dated screenshots.
- The recurring winners for a physical business: reviews (volume and velocity), photos, populated services with real prices, and segment pages covering the different reasons people come.
- Where a sub-brand has its own discovery surface, it is a second wedge into the same footfall. Keep its identity consistent everywhere.

## Done definition
The profile scored for the business and its competitors, or the claim-and-verify setup list produced pre-launch. Pack presence captured with dated screenshots for each priority term and the method stated. The reviews comparison built honestly, with zeros left as zeros. NAP verified consistent across site, profile, schema and citations in the market's formats. The market's citation set checked, or its absence from the config named as the first finding. Duplicate-listing check done. Top local fixes ranked by conversion impact.
