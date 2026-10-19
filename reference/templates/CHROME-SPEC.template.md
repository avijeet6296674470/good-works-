# <FILL: BRAND NAME> — CHROME SPEC

The sitewide furniture: header, navigation, footer, breadcrumbs, the 404, and the
conversion apparatus that appears on every page.

Authored and maintained by Atlas. Cortex builds from it.

> **Why the chrome gets its own document.** It is the only thing on every page,
> so a decision here is multiplied by the whole site, and it is the thing most
> often designed last and bolted on. The commonest symptom is a floating action
> button that covers content, which happens because nowhere in the page design
> was a place reserved for the conversion path.
>
> **Conversion furniture is structural.** It gets planned with the page, not
> after it.

---

## 1. Header

**Desktop**: <FILL: layout, what sits where, the logo variant, the actions and their hierarchy, behaviour on scroll.>

**Mobile**: <FILL: what survives, what moves into the drawer, and the height budget. Header height is expensive on a phone and it is spent before any content is seen.>

**The drawer**: <FILL: how it opens, what it contains, the order, how it closes, and how focus is handled. Reachable one-handed.>

## 2. Navigation

<FILL: the items, their order, and the reasoning. Which are links and which are groups.>

**The order is a decision, not an inheritance.** Navigation order is read as a
statement about priority, and it is usually copied from whatever the previous
site had.

## 3. Footer

<FILL: the columns and their contents.>

- **Contact details byte-identical** to the fact file. Never retyped.
- <FILL: hours, quick links, legal, social. Only social profiles that exist.>
- **Mobile treatment**: <FILL. A footer that is a single stacked column on a phone becomes enormous, and it is the last thing anyone tests. Specify the multi-column collapse.>

## 4. Breadcrumbs

<FILL: where they appear, the format, and the rule that the visible trail matches the markup exactly.>

## 5. The conversion furniture

From the vertical overlay's section 6.

**The persistent contact path**: <FILL: which channels, at what parity. The channels the market actually uses, from `market`, not the ones that are conventional elsewhere.>

**The mobile rail**: <FILL: when it appears (a scroll fraction, not a timer), how many actions (two at most), which is dominant, target sizes, safe-area handling.>

**Never**: covers content, covers a form field or a submit control, appears inside a checkout, bounces, or nags. <FILL: any project-specific exclusion.>

**Prices visible early**: <FILL: where. Hidden pricing does not increase enquiries; it removes the people who would have converted.>

## 6. Thumb-zone doctrine

Primary actions live in the lower half of the viewport on mobile. Drawer actions
are reachable one-handed. The rail is the always-available path, **so nothing
else needs to be sticky.**

## 7. The 404 and other terminal pages

<FILL: what a 404 says, what it offers, and how it gets the visitor back to a real page. It must return a real 404 status, not a 200 with an apology, or it gets indexed as a page.>

## 8. What the chrome must never do

- <FILL: no entry popups, no fabricated urgency, no interstitials before content, no autoplay.>
- **Trust is the conversion strategy.** It is also the only one that survives a second visit.

---

## Accessibility floor

- Every interactive element reachable and operable by keyboard, in a sensible order.
- Focus visible on everything focusable.
- The drawer traps focus while open and returns it on close.
- Touch targets at 44px minimum, larger on the conversion path.
- Reduced motion respected.
