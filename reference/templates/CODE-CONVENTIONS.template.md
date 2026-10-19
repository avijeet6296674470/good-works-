# <FILL: BRAND NAME> — CODE CONVENTIONS

What the code guard enforces and what reviewers check.

The machine-readable half lives in `brand.config.json` under `enforcement`. This
file is the reasoning; that block is the switches. **Keep them in sync**: a rule
here that is switched off there is a rule nobody enforces.

---

## 1. Tokens and styling

- Every colour, radius, shadow and font comes from <FILL: the token file>. **No raw colour values anywhere else**, in markup or in other stylesheets.
- <FILL: the styling mechanism, from `stack.css`.> **Arbitrary values are banned for colours** and discouraged everywhere else: if an arbitrary size, radius or tracking repeats twice, it becomes a token or a utility.
- No importance overrides. Fix the specificity problem instead.
- Inline styles only to set a custom property or a genuinely dynamic value.
- **Repeated section patterns become components or utilities, not copies.** Route to `/css-portable-extract` at the second occurrence, not the fifth.

**Grandfathered exceptions**, each with a reason and an end:

| File | Exception | Reason | Ends when |
|---|---|---|---|
| <FILL> | <FILL> | <FILL> | <FILL> |

> An exception with no end date is not an exception, it is the new rule. Give
> each one a condition that retires it.

## 2. Images

- Content imagery is a real image element with alt text, dimensions, lazy loading except the largest-paint element, and a source set where multiple sizes exist. **No CSS background images for content**; backgrounds are for decoration only.
- Formats: <FILL: modern format for renders, vector or optimised raster for marks>.
- **Nothing over <FILL: `assets.maxImageBytes`> ships without a written reason.**
- Keep raw files and masters out of the shipping folder. Only optimised deliverables ship.

## 2b. Icons

- <FILL: the single icon system.> **One system, sitewide.** A second one is a defect even when both look fine, because they will never quite match.
- Icons inherit the current colour or set their properties from tokens. Decorative icons are hidden from assistive technology. No animation except documented exceptions.

## 3. Fonts

- Self-hosted, with the declarations in the token file, a sensible display strategy, and a preload for the face that carries the headlines.
- **No third-party font host.** <FILL: note the licence position, so nobody has to guess whether self-hosting was allowed.>

## 4. Copy in code

- No em or en dashes in any shipped string. Comments are exempt.
- Facts in code come ONLY from <FILL: the fact files>. Those files change only with a `BRAND-TRUTHS.md` update, in the same commit.
- **Visible FAQ text and its markup are the same source array. Never fork.** A forked FAQ drifts within weeks and then the page and the schema disagree, which is worse than having neither.

## 5. SEO invariants, every page

- <FILL: the heading doctrine. If the project separates semantic headings from display headlines, describe both and say which carries the SEO burden. This is worth spelling out, because "make the big text an H1" is the default instinct and it is usually wrong.>
- Exactly one H1 per page, unique sitewide. Heading levels never skip.
- Absolute canonical at <FILL: `urls.canonicalBase` plus the trailing-slash policy>, with a matching share-tag URL.
- Unique title within 60 characters, description within 155.
- **Server-rendered JSON-LD** through the SEO helpers. Entity facts referenced by `@id`, never redeclared. Nothing from `truth.forbiddenClaims`.
- Internal links in the project's URL form.
- **Any change to meta, canonical, schema, an H1, internal links, robots or the sitemap gets a ledger row.** If it is not in the ledger, it did not happen.
- **Never both noindex and disallow the same URL.** A blocked URL is never fetched, so its noindex is never read, and it can stay indexed indefinitely.

## 6. The freeze

<FILL: for each entry in `stack.frozenSubsystems`, name the exact files, contracts, orderings and identifiers that must not move, and why.>

**Frozen means logic, contracts and order.** Allowed inside a frozen path:
styling changes, token values, copy approved through `BRAND-TRUTHS.md`, and any
explicitly approved fix, **each as its own commit**.

Approved exceptions:

| Fix | Approved by | Date |
|---|---|---|
| <FILL> | <FILL> | <FILL> |

> An approval that lives in someone's memory is not an approval. It goes in this
> table, or the guard treats the change as drift.

## 7. Hygiene

- Type-checking passes before any commit that touches typed code.
- **Dead code is removed, not commented out.** <FILL: note any known block of dead code and when it is scheduled for removal, so a reviewer can tell inherited debt from new damage.>
- Every commit message says what changed and why. SEO-affecting commits reference their ledger row.
- **A green build is not proof.** Anything user-facing is verified by requesting the running route and reading what comes back.
