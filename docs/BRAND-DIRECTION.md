# Avijeet Thakur: BRAND DIRECTION

The design law. `brand.config.json` carries the machine-readable half. Section numbers are stable, agents cite them.

Origin: the "Jobsite spec sheet" system built for an earlier client project, retargeted to a developer portfolio. Tokens and component rules carry over. Nothing of that client's content does. Palette and background re-chosen 2026-10-19 after owner feedback ("do not just copy-paste"). The layout language is kept; red and the grid background are dropped.

---

## 1. Palette

Changed 2026-10-19: the owner rejected the red accent and the grid background as a straight copy of the earlier project. Structure kept, palette and background are this site's own.

| Role | Name | Hex | Used for |
|---|---|---|---|
| Background | Mist | #EEF1F5 | Light bands |
| Surface | Paper | #FFFFFF | Cards |
| Text / dark band | Midnight | #0B1220 | Header, hero, dark bands, body on light |
| Muted | Slate | #5B6573 | Meta text on light |
| **Accent** | Volt | #C6F432 | **The payoff. The primary action, eyebrows on dark, key chips. One per viewport.** |
| Accent alt | Sky | #5CC8FF | Background glow only |
| Dark surface | Graphite / Steel | #131C2E / #2A3650 | Cards and rules on dark |

**Background treatment.** Dark bands use soft Volt and Sky glows plus a fine diagonal line texture, not a grid. Real project screenshots sit in a tilted browser frame.

**The accent rule.** Volt marks the one thing that matters on a surface: the primary action.

### The contrast law
| Pairing | Verdict |
|---|---|
| Midnight on Volt | Allowed, button fill |
| Volt on Midnight | Allowed, eyebrows and numerals |
| Volt text on Mist or Paper | Forbidden |
| Sky as text | Forbidden |
| Slate on Midnight | Forbidden, use #A9B4C6 |

Colours live in `src/css/site.css` `:root` only.

## 2. Typography

| Role | Face | Used for | Never used for |
|---|---|---|---|
| Display | Oswald 600, uppercase | H1 to H3, buttons | Body copy, long text |
| Body | Barlow 400/500/600 | Copy, FAQ answers | Headlines |
| Mono | JetBrains Mono 500, uppercase, 0.04em | Labels, chips, eyebrows, metrics captions | Paragraphs |

Scale (desktop/mobile): h1 48/34, h2 34/26, h3 22/20, body 17/16, label 13/12.
Licence: all three are SIL Open Font Licence; self-hosting is allowed. **Currently loaded from Google Fonts: a grandfathered exception until the files are self-hosted.**

## 3. Voice
| Mode | Used for | Example |
|---|---|---|
| Plain proof | Results and case studies | Two WordPress sites, 30 to 40 pages each. Leads up 55%, inquiries up 27%. |
| Direct build | Service pages, process | I take the Figma file and ship a fast, responsive site with SEO in place. |
| Calm advice | Consulting, FAQ | Start with the page that earns the most enquiries, then fix speed. |

Person: first singular. Reading level: grade 8. Register: plain English.
Humour: none on service pages. Copy formula: Hook, Promise, Proof, Path.

## 4. Sub-brand systems
None. Single master brand.

## 4b. The energy layer
Quiet and measured, like a spec sheet: rules, grids, numbers. Volume comes from scale and one red action, not effects. A dark grid-texture hero is the single "loud" device.

## 5. The image grammar
1. Ground: Ink with 48px grid at 8% white for hero and CTA; Concrete and Paper elsewhere.
2. Real work shown as real screenshots in browser-frame cards. No AI-rendered fake client work.
3. Corners 4px, 1px rules, one soft shadow `0 4px 12px rgba(14,15,17,.08)`.
4. People: none required. A real photograph of Avijeet may be added to About; no stock people.
5. Absolutely never: stock photos of people at laptops, gradient blobs, isometric 3D illustrations, glassmorphism, device mockups of work that does not exist.

Text-in-image: only text on screenshots of real sites.

## 6. Asset inventory
See `docs/ASSET-LIBRARY.md`. Reuse before generation.

## 7. Motion
200ms ease for functional transitions only. No scroll animation. Reduced motion always respected.

## Changing this document
| Changing | Costs |
|---|---|
| Voice mode or copy formula | A copy pass |
| Accent or a palette role | Every component, share cards, a design review |
| Type faces | Every page and the performance budget |

Record every change with date and approver.
