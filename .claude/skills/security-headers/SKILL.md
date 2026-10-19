---
name: security-headers
description: >
  Owns the site's security headers and Content-Security-Policy: tunes the CSP against the real
  origins the site actually loads (the CDN, embedded widgets, analytics), rolls it out safely
  (Report-Only, then enforce), and keeps a strong security-header grade without breaking a real
  user flow. Use for any security-header or CSP change. Auto-fires on "security headers", "CSP",
  "content security policy", "securityheaders.com", "add HSTS".
---

# /security-headers: a strong, honestly-scoped CSP that never breaks a real flow

A CSP that blocks the site is worse than no CSP — a visitor who can't book a call because a script
got blocked doesn't file a bug report, they just leave. This skill rolls a CSP out the way it has to
be rolled out: watched, then enforced, never guessed and flipped.

## Canonical grounding (read first)
- Wherever this project's response headers actually live (a framework config file, an edge
  function, a reverse-proxy config — check the stack before assuming a mechanism).
- `assets.cdnDomain` in `brand.config.json` — the CDN origin that must stay allowlisted.
- Whatever third-party embeds, widgets, or trackers this project actually loads (a booking widget,
  a chat tool, an analytics pixel) — each is a real origin the CSP has to name, not guess at.

## The baseline (enforce from day one, low risk)
These headers have essentially no failure mode and should ship without a Report-Only phase:
- `Strict-Transport-Security` (HSTS) — long max-age, `preload` only once the domain is committed to
  HTTPS-only, permanently (preload is hard to undo).
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` (or `DENY` if nothing ever needs to be framed)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera/mic/geolocation off unless the site genuinely uses them.

## The CSP (this is the one that breaks things — roll it out carefully)
1. **Report-Only first, always.** Ship `Content-Security-Policy-Report-Only` — it reports
   violations without blocking anything. Never start with an enforcing CSP on a live site.
2. **Know the real origins before tightening.** List every script, style, image, font, connect, and
   frame source the site actually loads: the CDN, any booking/calendar iframe, analytics/ad pixels,
   inline theme-init scripts, CSS-in-JS. An origin that's missing from the policy is a real feature
   about to break.
3. **Watch real reports (or click through every template) before flipping to enforcing.** A full
   click-through of every page type — home, a content page, a form, a gated download — catches what
   a report feed alone might miss.
4. **Enforce only when clean.** Flip `-Report-Only` to enforcing only after the reports show no
   legitimate violations for a real period of traffic. Document the flip and the date.
5. **Verify after every change.** Curl the headers, click through every template, aim for a strong
   `securityheaders.com` grade — but never trade a real user flow for a letter grade.

## Guardrails
- Never enforce a CSP that hasn't been watched in Report-Only against every real template and every
  third-party embed.
- Never widen a directive to `*`, and never drop `object-src 'none'` / `base-uri 'self'` /
  `frame-ancestors` — these three cost nothing and close real attack classes.
- HSTS `preload` is a one-way commitment (HTTPS-only, hard to reverse) — don't add it to a domain
  that still serves plain HTTP anywhere.
- Keep the CDN origin (`assets.cdnDomain`) in `img-src`/`connect-src`/`font-src` as needed, or real
  assets silently break.
- Prefer a nonce or hash over `'unsafe-inline'` on `script-src` once analytics/pixels land — an
  open `'unsafe-inline'` defeats most of what a script-src policy is for.

## Output
The headers as actually shipped (which mechanism, this project's stack), the CSP in its current
phase (Report-Only or enforcing, and since when), the verified click-through, and the
`securityheaders.com` grade if checked.
