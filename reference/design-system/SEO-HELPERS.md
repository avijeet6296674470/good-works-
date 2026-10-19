# SEO helper contract

Head, meta and structured data. **Every route goes through these helpers, and no
route hand-builds a tag.**

---

## Why helpers rather than per-route tags

Hand-built head tags drift. One route forgets the share URL, another builds a
relative canonical, a third hardcodes the domain and breaks on staging. Each is
invisible until it is expensive.

Centralising means a rule is enforced once. It also means the rules are
greppable, which is what makes the audits possible at all.

---

## `pageHead({ path, title, description, ogImage? })`

The single entry point for a route's head. Returns the meta and link tags.

**Guarantees:**

| Guarantee | Why |
|---|---|
| The canonical is **absolute**, built from `urls.canonicalBase` plus the path | A relative canonical is legal and useless. |
| The canonical matches the project's **trailing-slash policy exactly** | A mismatch between the canonical and the served URL is a slow, quiet, expensive bug. |
| The share URL **equals the canonical** | Not similar. Equal. They disagree the moment either is hand-built. |
| Title and description appear once each | |
| A **default share image** when the route provides none | Otherwise the legal pages share as a blank card, and nobody checks the legal pages. |
| The share image URL is **absolute** | Relative ones simply do not resolve for the crawler. |

**Path in, URL out.** The helper composes the URL. A route that passes a full URL
has bypassed the one guarantee that matters.

## `noindexMeta()`

For routes that must not be indexed: application shells, dynamic instances,
previews.

**And the rule that goes with it: never also disallow those paths in robots.** A
blocked URL is never fetched, so its noindex is never read, and it can stay
indexed indefinitely. The two mechanisms are not interchangeable, and confusing
them is the most common serious mistake in this whole area, precisely because
belt-and-braces feels safer.

## The structured-data helpers

One helper per node type. Each returns a plain object; the route composes them
into one graph.

**The registry.** Each real-world entity has one stable identifier, assigned
once and **never changed after launch**. Changing one is indistinguishable from
deleting the entity and creating a new one.

**Guarantees:**

- The root entity is **defined once** and referenced by identifier everywhere else. Never redeclared per page.
- No two nodes share an identifier with different bodies. This duplicate-with-drift is the commonest graph defect and it is invisible unless checked for deliberately.
- **Values come from the fact files.** A number typed by hand into a schema node is a defect, because it drifts the first time the page changes and nothing catches it.
- URLs are absolute and in the project's URL form.
- **Nothing from `truth.forbiddenClaims` can be emitted.** Where the project forbids rating markup, the helper should not offer it at all: a rule enforced by absence beats a rule enforced by discipline.
- The FAQ helper takes **the same array the visible block renders.** One source, no fork.

## `absUrl(path)`

Composes an absolute URL from the canonical base. **Every absolute URL in the
codebase goes through it**, so the base lives in exactly one place and staging
does not leak the production domain into a canonical.

---

## Rendering

**Everything above must be in the server-rendered HTML.**

Meta injected after hydration is meta a crawler may never see, and structured
data injected client-side should be assumed invisible.

**Verify by requesting the route and reading what comes back.** Not the source,
not the inspector, which shows the hydrated DOM and will happily show you
client-injected tags as though they were served.

## The check that catches most of it

For every touched route: request it, then confirm the H1 is present, a
load-bearing fact is present, the structured data is present with the expected
type, and the canonical is absolute and in the right form.

**Record counts, not adjectives.** "3 routes, 3 H1s, 3 graphs" is a
verification. "SEO looks fine" is not.

**Follow redirects before concluding a tag is missing.** A route that redirects
shows nothing useful at the first URL, and reporting that as an absent canonical
is an easy false finding that costs someone an hour.
