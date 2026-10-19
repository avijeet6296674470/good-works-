# Avijeet Thakur portfolio: operating manual

Static portfolio for Avijeet Thakur (full-stack, WordPress and Shopify developer, SEO, AI automation, consulting). Two audiences: recruiters land on `/` (owner writes it), clients land on keyword-targeted service pages under `/services/`. Domain not decided yet. Hosting target: AWS EC2 with an Elastic IP; domain at Namecheap (DNS A record planned).

## Read first
1. `brand.config.json`: identity, palette, type, voice, enforcement. Everything defers to it.
2. `docs/BRAND-TRUTHS.md`: the ONLY publishable facts. Open questions at the bottom must be answered by Avijeet, never guessed.
3. `docs/BANNED-WORDS.md`: no em or en dashes, no machine vocabulary, no agency "we".
4. `docs/BRAND-DIRECTION.md`: palette, type, voice, image grammar.
5. `docs/CODE-CONVENTIONS.md`: tokens only, SEO invariants, hygiene.
6. `docs/CONTENT-PLAN.md` and `docs/KEYWORD-MAP.md`: page list, one keyword per URL.

## How it builds
`src/data/site.json` + `src/data/services.json` + `src/template.html` + `src/css/site.css`, then `node build.mjs` writes `dist/`. Preview: `node serve.mjs` on http://localhost:4173. To add a service page, add an entry to `services.json`.

## Locked decisions
- 2026-10-19: Palette is Midnight / Mist / Volt lime (accent) / Sky glow; NO red. Backgrounds use glows and diagonal lines, not a grid. Layout structure from the earlier client project is kept, the look is not copied. Real screenshots of the live client sites (src/img, JPEG under 130KB) are the imagery.
- 2026-10-19: Hero = black copy panel left, rotating screenshots right (crossfade every 4.8s, fade mask, slow zoom). Owner-supplied recent work: Blue Hen (avijeetthakur.xyz) and Joyful Smiles (staging link, no public URL shown).
- 2026-10-19: Videos: 7 owner YouTube walkthroughs (src/data/videos.json, owner-written descriptions, em dashes removed). First autoplays muted when scrolled into view.
- 2026-10-19: Owner rule: no location text anywhere on the site (no city, country, "based in", "remote").
- 2026-10-19: Static HTML, no framework. One template for all service pages, ported from the Rugged Print "Spec Stack" landing template (iteration 1, the one the owner picked): dark header, breadcrumb bar, grid-texture hero with framed snapshot, offer strip, proof strip, alternating Concrete/Paper/Ink bands, finder tiles, mono-label buttons.
- 2026-10-19: Vertical overlay `agency`: proof first, no self-reported ratings, no testimonials until supplied.
- 2026-10-19: Facts come from the CV only. Result figures are held as "CV-sourced, baseline unconfirmed" until the open questions are answered.

## Working rules
- Ask before inventing any fact. Unanswered fields stay `""`.
- No `.env`, CV or LinkedIn export in git. Ask before pushing to any remote.
- Never copy content, photos or brand facts from the Rugged Print project.
- Image work goes through ImageRouter only, and fake client work is never generated.
- Every SEO-affecting change gets a row in `docs/CHANGE-LOG.md`.

## The pack
32 agents (`.claude/agents`), 64 skills (`.claude/skills`), `reference/` and `playbook/`. Manual: `docs/WEBSITE-PACK-MANUAL.md`. Orchestrator: `/page-build`. Final gate: `/ship-ready`. Check claims: `/bullshit-detector`.
Hooks need Python (not installed). They are parked in `.claude/settings.pack-hooks.json.disabled`.

## Still open
Domain, audience countries, contact route, result baselines, client-name permissions, real screenshots, self-hosted fonts, which design direction.
