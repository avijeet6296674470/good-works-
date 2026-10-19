# Vertical overlay: SaaS

Load when `vertical.overlay` is `saas`.

A product sold as a subscription, bought after evaluation rather than on impulse.
The defining constraint is that the buyer researches: they will read
documentation, comparison pages, and third-party opinion before they ever fill in
a form, and most of that research happens off your site.

Same section order as every overlay, so swapping one for another swaps
assumptions cleanly.

---

## 1. What a conversion is

| Action | Notes |
|---|---|
| Paid subscription | The real one, usually far downstream of the site |
| Trial or free-tier signup | The standard primary for self-serve |
| Demo or sales contact | The standard primary for anything with a sales motion |
| Documentation engagement | Not a conversion, but the strongest leading indicator that a trial will convert |

**The measurement trap.** Signup is not the outcome; activation is. A site
optimised purely for signup volume reliably increases the number of accounts that
never do anything. Ask for the activation definition and report against it, or
say explicitly that you are reporting a proxy.

## 2. Funnel shape

```
Problem-aware search, comparison search, or a recommendation
   -> a solution, comparison, or documentation page
   -> evaluation: does it do the thing, does it fit my stack, what does it cost
   -> trial or demo
   -> activation
   -> paid
```

Evaluation is the long middle and the site's real job. The three questions are
capability, fit, and price. Pricing hidden behind "contact us" removes the site
from self-serve consideration entirely, which is sometimes a deliberate and
correct choice, and should be a stated one rather than a default.

## 3. Page architecture

| Archetype | Owns |
|---|---|
| Home | Category term and the positioning |
| Solution pages | One per job to be done, in the buyer's language, not the product's |
| Feature pages | One per meaningful capability. Thin feature pages are a common index-bloat source. |
| Use-case or persona pages | Same product, different buyer, different proof |
| Integrations | Often the highest-volume, lowest-competition cluster available, and usually neglected |
| Comparison and alternatives | High intent, close to purchase. See `/seo-competitor-pages`. |
| Pricing | A conversion surface, not an information page |
| Documentation | An SEO asset. Frequently outranks marketing pages and should be treated as first-class. |
| Changelog | Freshness and trust, cheap to maintain |

## 4. Schema

| Type | When |
|---|---|
| `SoftwareApplication` or `Product` | The product node, once, referenced by `@id` |
| `Organization` | Always |
| `Offer` / `AggregateOffer` | Where real prices exist |
| `FAQPage` | Where a real visible FAQ exists |
| `BreadcrumbList` | Below the top level |
| `TechArticle` / `HowTo` | Documentation and guides |

**Never emit** review or rating markup sourced from anything but real, verifiable
reviews. Pulling a rating from a third-party marketplace into your own markup as
though it were first-party is misrepresentation.

## 5. Off-site surfaces

| Surface | What matters |
|---|---|
| Software review marketplaces | Category presence and review recency. Often outranks the vendor for the vendor's own category term. |
| Developer and practitioner communities | Where honest evaluation happens. Cited heavily by answer engines. |
| Integration partner directories | Reciprocal listings, genuinely valuable links |
| Comparison and roundup publishers | The "best X tools" articles that own the top of the category |
| Documentation as a link magnet | Good docs attract links no marketing page will |

## 6. Conversion furniture

- One primary action, repeated. Trial and demo competing equally in the header
  splits intent and lowers both.
- Pricing reachable in one click from anywhere.
- Signup friction proportional to the motion: self-serve means no phone field.
- Social proof that is specific and attributable. Logos without permission and
  quotes without a name are worth less than nothing.
- A real answer for security and data questions, linked from pricing, because
  that is where evaluation stalls.

## 7. Analytics taxonomy

```
page_view
view_pricing         { plan_shown }
view_comparison      { competitor }
docs_view            { section }
signup_start         { plan, source }
signup_complete      { plan }
activation           { milestone }
demo_request         { segment }
```

## 8. What this overlay must not assume

- That the buyer is the user. Frequently they are not, and the page must serve
  both.
- That the motion is self-serve. Ask.
- That features sell. Jobs and outcomes sell; features confirm.
- That the pricing page is fixed. It is often the highest-leverage single page
  and the least tested.
- That the audience is in one market. Currency, tax display and data residency
  all follow from `market`.

## 9. Truth traps specific to this vertical

1. **Roadmap as capability.** Anything not shipped and generally available is
   not a feature. "Coming soon" on a feature page is a promise you will be held
   to.
2. **Customer logos.** Permission, currency of the relationship, and whether they
   are actually a customer rather than a trial that lapsed.
3. **Performance and uptime numbers.** Need a source, a measurement window, and a
   date. An uptime figure with no window is meaningless.
4. **Comparison claims.** Every competitor claim must be sourced to their current
   public documentation with the date checked. Competitor pages age badly and an
   out-of-date claim is both a legal and a credibility problem.
5. **Certification and compliance badges.** Only if currently held. In progress is
   not held.
6. **User and customer counts.** Define the term. "Users" counting free signups
   while implying paying customers is the standard version of this lie.
