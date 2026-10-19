---
name: social-card
description: >
  Owns the social-card (OG/Twitter card) system — the branded image every page shows when shared
  on Facebook, LinkedIn, X, Slack, or iMessage. Builds and tunes a dynamic, server-rendered card
  generator so every page is carded automatically with its own title, never a bare link and never
  a broken or generic preview. Use when a page needs a share card, the card template changes, or a
  platform preview looks wrong. Auto-fires on "og image", "share card", "social preview", "twitter
  card", "link preview looks wrong/blank".
---

# /social-card: the branded card every page shows when shared

A page with no working share card looks broken the moment someone pastes the link into Slack or
LinkedIn — a blank rectangle, a stock placeholder, or nothing at all. This skill builds one system
that cards every page automatically, on-brand, legible at thumbnail size, with zero per-page effort
for the default case.

## The contract (true regardless of framework)
1. **One dynamic generator, not per-page images.** A single server-rendered route (or build-time
   function) takes a title (and optionally a kicker/category) as parameters and returns a
   1200×630 image. Every page points at it through the site's metadata builder — new pages are
   carded automatically, with zero extra work.
2. **Self-contained rendering.** Fonts and the logo load from disk, not a network fetch, so the
   card renders reliably server-side with no CSP violation and no dependency on an external image
   host being up.
3. **Brand-locked, not a template someone can drift.** Ground colour, logo placement, accent
   colour, and the type stack all come from `brand.config.json` (`palette`, `type`, `assets`) —
   never hard-coded values duplicated from the design docs.
4. **Never a blank fallback.** An unmapped or new route falls through to a strong, on-brand
   default card — never a blank white rectangle, never the platform's own broken-link icon.
5. **A card never states a claim the page can't back.** No fabricated stat, no invented result
   printed onto a share image — the truth rule applies to a card exactly as it applies to a page.
6. **Legible at thumbnail size.** X and Slack shrink previews hard. One clear title, high
   contrast, the logo always present, no more than one supporting line.

## What varies by framework — pick the mechanism, keep the contract
- **Next.js (App Router)**: `next/og`'s `ImageResponse` at a route handler (`app/og/route.tsx`),
  reading fonts and the logo from the filesystem, driven by query params (`?title=…&kicker=…`).
- **Astro / static generators**: a build-time script using `satori` + `resvg` (the same rendering
  primitives `next/og` wraps) to pre-render one PNG per page at build time.
- **Any framework with an image-generation lib available**: the same `satori`-style JSX-to-SVG-to-
  PNG pipeline, wired into whatever the framework's route/build-hook mechanism is.

The worked Next.js example below is one implementation, not the only one — the contract above is
what has to survive a framework swap; the code doesn't.

## Worked example (Next.js App Router, `next/og`)
```tsx
// app/og/route.tsx
import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? 'Default title').slice(0, 90)
  const kicker = searchParams.get('kicker') ?? ''

  const logo = readFileSync(join(process.cwd(), 'public/brand/logo-on-dark.png'))
  const font = readFileSync(join(process.cwd(), 'public/fonts/Display-Bold.ttf'))

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                     background: 'var(--brand-ground, #0B0E16)', padding: 64 }}>
        {kicker && <div style={{ color: 'var(--brand-accent, #FF6A4D)', fontSize: 24 }}>{kicker}</div>}
        <div style={{ color: '#fff', fontSize: 64, fontWeight: 700, marginTop: 'auto' }}>{title}</div>
        <img src={`data:image/png;base64,${logo.toString('base64')}`} width={140} style={{ marginTop: 32 }} />
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: 'Display', data: font, weight: 700 }] },
  )
}
```
```ts
// lib/seo.ts — the single metadata builder every page calls
export function buildMetadata({ title, kicker, image }: { title: string; kicker?: string; image?: string }) {
  const ogImage = image ?? `/og?title=${encodeURIComponent(title)}${kicker ? `&kicker=${encodeURIComponent(kicker)}` : ''}`
  return {
    title,
    openGraph: { images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  }
}
```

## How you work
1. **Default is automatic.** A page built through the project's metadata builder is carded with
   zero extra work — a clean brand card with the title (and kicker, if given). A page can pass a
   bespoke `image` to override for a flagship surface that deserves a hand-designed card.
2. **Tune the template in one place** — the generator route/function only: title sizing, kicker,
   colours — all read from brand tokens, never hard-coded in the component. Keep it legible at
   thumbnail size.
3. **Validate previews.** Render the generator directly and eyeball it. For real debugging use the
   platform validators (Facebook Sharing Debugger, X Card Validator, LinkedIn Post Inspector) —
   confirm the card, the `og:title`/`og:description`, the 1200×630 size, and that the image URL is
   absolute.
4. **Never break the card.** It must stay self-contained (fonts/logo from disk) so it renders with
   no external dependency and no CSP violation. Test after any change to the generator or the
   fonts it loads.

## Guardrails
- Brand only: the locked ground colour, the on-brand logo variant, the accent colour, the real
  type stack. No emoji, no stock imagery.
- Every card is 1200×630, absolute-URL, `summary_large_image` (or the platform's equivalent).
  Title legible at small size.
- Honesty holds: a card never states a claim the page can't back — no fabricated number.
- One system: the dynamic generator plus the shared metadata builder. Don't scatter per-page card
  logic across the codebase.

## Boundaries
Cortex builds and wires the generator route. Vesper specs the template's look (layout, type
sizing, where the logo sits). Vega approves the visual treatment against the image grammar if the
card carries any imagery beyond flat brand colour and logo.
