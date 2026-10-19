# Avijeet Thakur: CODE CONVENTIONS

What the code guard enforces and what reviewers check. Machine-readable switches: `brand.config.json` `enforcement`. Keep them in sync.

## 1. Tokens and styling
- Every colour, radius, shadow and font comes from `src/css/site.css` `:root`. No raw colour values anywhere else.
- Plain CSS with custom properties. No importance overrides. Inline styles only for a genuinely dynamic value.
- A section pattern used twice becomes a component class, not a copy (`/css-portable-extract`).

Grandfathered exceptions:
| File | Exception | Reason | Ends when |
|---|---|---|---|
| `src/template.html` | Google Fonts link only (inline styles removed 2026-10-19) | Built before the guard existed | Fonts self-hosted in `src/fonts/` |

## 2. Images
- Real `<img>` with alt, width and height, `loading="lazy"` except the largest-paint element. No CSS background images for content.
- WebP for screenshots. Nothing over 200,000 bytes without a written reason.
- Only optimised deliverables ship; masters stay out of `dist/`.

## 2b. Icons
No icon system yet. When one is added, choose one and record it in `docs/ICON-SYSTEM.md`.

## 3. Fonts
- Self-hosted woff2 under `src/fonts/` with `font-display: swap` and a preload for the headline face.
- No third-party font host (see grandfathered exception above).

## 4. Copy in code
- No em or en dashes in shipped strings.
- Facts come only from `docs/BRAND-TRUTHS.md`, mirrored in `src/data/site.json`. Both change in the same commit.
- Visible FAQ text and FAQPage JSON-LD are built from the same array in `services.json`. Never fork.

## 5. SEO invariants, every page
- One H1 per page, unique sitewide. No skipped heading levels.
- Absolute canonical from `urls.canonicalBase` plus the trailing slash.
- Title 60 characters or fewer, description 155 or fewer.
- JSON-LD rendered in the served HTML, entities referenced by `@id`. No `AggregateRating` or `Review`.
- Internal links use the trailing-slash form.
- Any change to meta, canonical, schema, H1, internal links, robots or sitemap gets a row in `docs/CHANGE-LOG.md`.
- Never both noindex and disallow the same URL.

## 6. The freeze
No frozen subsystems. The mailto and external contact links are unproven until a real contact route exists.

## 7. Hygiene
- `node build.mjs` must run clean. A green build is not proof: request the running route and read the HTML.
- Dead code is removed, not commented out.
- Commit messages say what and why; SEO-affecting commits cite their ledger row.
- Never commit `.env`, the CV, or the LinkedIn export.
