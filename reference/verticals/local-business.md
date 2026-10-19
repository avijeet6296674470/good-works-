# Vertical overlay: local business

Load when `vertical.overlay` is `local-business`.

A business with a physical place people go to. Venues, clinics, studios, salons,
restaurants, gyms, workshops, single-location service businesses. The defining
constraint is that the catchment is geographic, so a visitor from the wrong city
is worthless traffic no matter how well the page ranks.

This overlay carries no geography of its own. Everything place-specific reads
from `market` in `brand.config.json`.

---

## 1. What a conversion is

Ranked. The primary is whichever of these the project sets as
`vertical.primaryConversion`.

| Action | Notes |
|---|---|
| Completed booking or order | The real one. Everything else is a proxy. |
| Enquiry submitted | For anything that cannot be self-served: groups, events, custom work. |
| Direct contact tap | Phone, messaging app, whichever the market actually uses. Frequently the highest-intent action on mobile and frequently untracked. |
| Directions requested | Very high intent, often the last click before a visit, and invisible in most analytics setups unless deliberately captured. |

**The measurement trap.** For most local businesses the majority of conversions
finish offline. A site that only counts form submissions will under-report itself
by a wide margin and the next round of decisions will be made on that wrong
number. Capture contact taps and direction requests as first-class events, and
say plainly in any report which numbers are proxies.

## 2. Funnel shape

Discovery is usually not the homepage. It is a map listing, a social post, or a
recommendation, and it lands deep. Assume every page is a landing page.

```
Discovery (map listing / social / word of mouth / search)
   -> a deep page, not the homepage
   -> the three questions, answered without scrolling far:
        what is this, what does it cost, can I come at the time I want
   -> the practical block: where, hours, parking, access, what to bring
   -> the conversion action
```

The three questions are the whole game. A local visitor arrives with them
already formed and leaves if the page makes them hunt. Price is the one most
often hidden, and hiding it does not increase enquiries, it filters out the
people who would have converted.

## 3. Page architecture

| Archetype | Owns | Notes |
|---|---|---|
| Home | The brand and the strongest broad term | Must route to every offering within one screen of scroll on mobile |
| Offering pages | One per distinct thing sold, one primary keyword each | The real ranking workhorses |
| Segment pages | One per audience with a different job to be done | Same offering, different reason to come. These convert well and are usually missing. |
| Practical page | Everything logistical | Hours, location, access, parking, rules, what to bring. Under-rated and heavily read. |
| Pricing or packages | Money, honestly | If bundles exist, the saving must survive arithmetic |
| Contact | Every contact method, plus the map | |
| Trust pages | About, policies | Policies matter more than they look: they are read before a first purchase |

**Segment pages are the growth lever.** The same venue serves a birthday, a
corporate group, and a casual walk-in, and those three people search with
completely different words and need completely different reassurance. One page
cannot serve all three well. This is usually the largest single opportunity on a
local site.

## 4. Schema

`@id` graph, server-rendered, cross-referenced not redeclared.

| Type | When |
|---|---|
| `LocalBusiness` or a specific subtype | Always. Use the most specific subtype that genuinely fits. |
| `PostalAddress` | Inside the business node. The string must be byte-identical to every off-site listing. |
| `GeoCoordinates` | Always. Cheap and it disambiguates. |
| `OpeningHoursSpecification` | Always, including seasonal and holiday variations if they exist |
| `Service` or `Product` | One per offering, referencing the business by `@id` |
| `Offer` | Where a real price exists. Currency from `market.currencyCode`. |
| `FAQPage` | Where a real FAQ is visible on the page. Same array feeds both. |
| `BreadcrumbList` | Any page below the top level |
| `Event` | Only for genuinely scheduled events with real dates |

**Never emit** rating or review markup that does not correspond to real,
verifiable reviews. Self-reported aggregate ratings are the single most common
piece of dishonest markup on local sites, they are a manual-action risk, and
they are worth listing in `truth.forbiddenClaims` so the guard blocks them.

## 5. Off-site surfaces

The site is not the whole SEO surface for a local business. It may not even be
the majority of it.

| Surface | What matters |
|---|---|
| Business profile on the dominant map platform in this market | Completeness, correct category, real photos, hours accuracy, posts, question answering. Usually the highest-leverage thing available. |
| Directory and citation listings | Name, address and phone byte-identical everywhere. Platforms come from `market.citationPlatforms`, which has no universal answer. |
| Review platforms | From `market.reviewPlatforms`. Volume and recency both matter, and recency is the one businesses forget. |
| Local editorial and roundups | The "best X in Y" articles. These get cited by answer engines far out of proportion to their traffic. |
| Social where discovery actually happens | Varies by market and audience. Ask rather than assume. |

**NAP consistency** sounds like box-ticking and is not. Conflicting addresses
across listings degrade confidence in the entity. Fix the string once, in
`market.addressFormat`, and propagate it byte for byte.

## 6. Conversion furniture

- Contact must be reachable from any scroll depth on mobile. A persistent rail
  or bar is standard for this vertical.
- Whichever contact channel the market prefers gets parity with the phone, not a
  smaller secondary treatment.
- Prices visible without an enquiry. Ranges are acceptable, silence is not.
- Hours visible on every page, not only on Contact.
- The map is a real embedded or linked map with a working directions action.
- Every path into a booking or enquiry flow works at
  `market.primaryDeviceWidth`. The flow is where mobile sites lose people, and
  it is usually the least tested surface.

## 7. Analytics taxonomy

Minimum viable set. Names are stable across projects so reports compare.

```
page_view
view_offering        { offering }
contact_tap          { channel }        <- phone, messaging, email
directions_request
enquiry_start        { segment }
enquiry_submit       { segment }
booking_start
booking_step         { step, name }
booking_complete     { value, currency, items }
```

Capture click identifiers and campaign parameters at entry and persist them
through to the conversion, or paid spend cannot be attributed at all.

## 8. What this overlay must not assume

- Which map platform, directory, or review site dominates. Market-specific.
- That reviews exist. A pre-launch business has none, and inventing social proof
  is a fabrication. Say nothing rather than imply volume.
- That the audience searches in one language, or in the language the site is
  written in.
- That opening hours are stable. Seasonal variation is normal and stale hours are
  a real-world failure, not just an SEO one.
- That the business wants walk-ins. Some deliberately do not.

## 9. Truth traps specific to this vertical

1. **Capacity claims.** "Fits up to N" needs a real N from the operator.
2. **Duration claims.** Session and service lengths get rounded upward in
   marketing and then contradicted on site. One number, from the facts file.
3. **Bundle savings.** If a bundle is presented as a saving, the arithmetic must
   hold against the real individual prices. It frequently does not, and it is the
   easiest dishonest number for a visitor to check.
4. **"The first" and "the only".** Almost never verifiable, and stale the moment
   a competitor opens. Needs a source and a date, or it does not ship.
5. **Accessibility claims.** Wheelchair access, parking, and facilities get
   asserted from assumption. These have real consequences for a real person who
   travelled to the place. Verify or omit.
