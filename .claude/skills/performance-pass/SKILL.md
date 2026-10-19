---
name: performance-pass
description: Use before shipping any page or component to audit Core Web Vitals, the bundle, server response time, image discipline (sized, lazy, real elements with a source set), self-hosted font loading with preload, and third-party script cost. Pulse catches the performance killers before they ship: the unsized hero, the missing dimensions that cause layout shift, the render-blocking third party, the oversized decoration. A green build is not proof; Pulse measures. Auto-fires inside /ship-ready. Routes responsive overflow to Fold, copy to Marlowe, schema to Weave.
---

# /performance-pass: the Core Web Vitals and bundle audit

Pulse's canonical performance audit. Pulse does not say a page feels slow. **Pulse says the largest paint is 3.6 seconds because the hero is a 2.1 MB image with no source set, and the fix takes it to 1.3.**

A green build can still ship a 2 MB hero, so Pulse measures rather than reasoning.

## Canonical grounding (read first)
- `brand.config.json`: **`market.networkBudget` is the budget.** It turns "make it fast" into a number, and without it every performance opinion is taste. Plus `market.primaryDeviceWidth`, `assets.maxImageBytes` and the whole `stack` block, since hosting and rendering model decide where the time goes.
- `docs/CODE-CONVENTIONS.md`: the image, font and token rules.
- `docs/BRAND-DIRECTION.md`: which faces are licensed and where each is used.

## Targets
- **Largest paint within 2.5s** on a throttled profile matching `market.networkBudget`.
- **Interaction latency under 200ms.**
- **Layout shift under 0.1.** Every image carries dimensions or a reserved aspect ratio.
- A lab score target agreed for the project rather than assumed.

## Inputs
The route, to audit and to request, plus the components it renders. And a production-like server, because a development server's timings are not the product.

## How to run
1. **Audit real routes, not the code alone**: the home page, a category page, an offering page, a segment page, and the conversion shell.
2. Run the audit against the throttled profile and walk sections 1 to 5. Mark each item PASS, FAIL or not applicable.
3. For each FAIL, state the exact problem and fix in impact order, biggest first, then re-measure.
4. Output the findings table.

## 1. Largest paint and image loading
- **The largest-paint element identified.** Often the hero image, sometimes a hero text block. A flat colour hero is the cheapest largest paint available and is frequently the right answer.
- **The hero is priority-loaded**: a real image element, eager, high fetch priority, plus a preload in the route head.
- **No render-blocking script above the fold.**
- **Every other image is lazy**, decoded asynchronously. The first slide of any carousel is eager, the rest lazy.
- **Real image elements with dimensions**: alt, dimensions or a reserved aspect ratio, and a source set with honest sizes where variants exist. No CSS background carrying content.
- **Formats and weight**: modern formats for renders, vector or optimised raster for marks. **Nothing over `assets.maxImageBytes` without a written reason.**
- Assets served from the origin or the CDN the config names. Do not invent a new one.

## 2. Fonts
- All faces self-hosted with the correct display strategy.
- **Preload the display face and the primary body weight, and nothing else.** Preloading everything is the same as preloading nothing.
- Subset where the tooling allows. Load a face used on one surface only on that surface if it can be split.
- **Zero requests to any third-party font host.** Grep to prove it.
- Fallback stacks defined so the swap costs minimal shift.

## 3. Server response time
Measure it, do not assume it. Time the response to first byte per route, warm and cold.
- Compare routes. **An outlier route is doing work in its loader that it should not**, usually a blocking fetch.
- The HTML payload should be sane. A content page shipping megabytes of serialised state is a defect.

## 4. Bundle audit
- Build, then read the emitted chunk sizes. Keep the entry chunk lean; per-route chunks stay small.
- **No new dependency without its compressed cost stated out loud.** No unused dependencies imported.
- Heavy interactive pieces load on their own routes or through dynamic imports, never in the shared entry.
- Flag any import that resurrects a dead dependency scheduled for pruning.

## 5. Layout shift and third-party cost
- **Every image and embed reserves its box.** Decorations are positioned or sized so they never push content. The font swap does not reflow the hero.
- Analytics loads non-blocking, after the shell.
- Payment and other heavy third-party scripts load only where they are needed, never on a content page.
- **Any new third-party script is a finding by default** and must justify its paint cost.

## Useful greps
Hunt: images without dimensions, a source set without paired sizes, missing lazy loading on non-hero images, content imagery hiding in CSS backgrounds, third-party font references, assets over the ceiling, and static viewport units on full-height surfaces.

## Output

| Item | Status | Fix | Owner |
|---|---|---|---|

Owners: **Cortex** for code, **Vigil** for asset re-export, **Fold** for responsive overflow, **Marlowe** for copy forcing a heavier surface, **Weave** for schema, **Vesper** for a design change a fix requires. Final sign-off is Gate's.

## Guardrails
- NEVER ship a hero unsized, or any asset over the ceiling without a written reason.
- NEVER serve a content image without dimensions or a reserved aspect ratio. That is layout shift, and it is the cheapest metric to protect and the most commonly lost.
- NEVER add a dependency without checking its cost.
- NEVER load a heavy third-party script on a page that does not need it.
- NEVER pull a font from a third-party host.
- **NEVER fix slowness by moving server-rendered content to a client fetch.** It kills SEO and gains nothing real.
- ALWAYS test against the throttled profile matching `market.networkBudget` before calling it done.

## Done definition
Every target met on the throttled profile. Server response measured per route and sane, with no blocking loader work on content pages. Bundles within budget with no unjustified dependency. All images sized and lazy where they should be, inside the ceiling. Fonts self-hosted with the display face preloaded. Third parties confined to where they belong. Findings logged, fixes applied or routed.
