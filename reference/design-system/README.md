# The design-system specs

**Contracts, not code.**

The pack deliberately ships no starter application. Components do not port
between frameworks; contracts do. A React component is worthless to a project
that is not React, but "the head helper returns a canonical, a matching share
URL and a description, and every route calls it" is true everywhere.

These four documents are what Cortex implements, in whatever `stack.framework`
actually is.

| Spec | Covers |
|---|---|
| [`TOKEN-ARCHITECTURE.md`](TOKEN-ARCHITECTURE.md) | How design tokens are named, grouped and enforced |
| [`COMPONENT-CONTRACTS.md`](COMPONENT-CONTRACTS.md) | The component library every site needs, and what each one promises |
| [`SEO-HELPERS.md`](SEO-HELPERS.md) | The head, meta and structured-data helper contract |
| [`DISCOVERY-ROUTES.md`](DISCOVERY-ROUTES.md) | Sitemap, robots and the machine-readable surfaces |

---

## Why contracts rather than a starter

Three reasons, in order of how much they cost when ignored.

**1. A starter app rots.** It pins a framework version, a build tool and a set of
dependencies on the day it is written. Six months later it is a liability that
looks like an asset, and updating it is a project nobody scheduled.

**2. The value was never the components.** It is the discipline: one H1, facts
from one file, the accent used once, server-rendered structured data, no raw
colours outside the tokens. That discipline is what makes a site good, and it is
completely portable.

**3. Copied code stops being read.** A component inherited from a starter is
trusted rather than understood, and the first time it needs to change, nobody
knows which parts were deliberate.

## How to use them

Cortex reads the relevant spec before building the surface, implements it
natively, and **records any deliberate deviation in `docs/CODE-CONVENTIONS.md`**
with its reason.

A deviation is fine. An undocumented one becomes a mystery in three months.

## The one rule that spans all four

**Everything user-facing is verified by requesting the running route and reading
what comes back.** Not by reading the source, not by trusting a green build.

A build compiles happily while the page serves an empty shell, and the gap
between those two states is where the expensive bugs live.
