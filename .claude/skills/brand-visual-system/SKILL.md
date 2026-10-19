---
name: brand-visual-system
description: The project's visual and motion design language for every surface: colour, type, sub-brand systems, composition and motion. Use when authoring or reviewing any visual asset or UI surface to keep it on-brand and consistent. The machine-readable source of truth is docs/BRAND-DIRECTION.md plus the project's design tokens; this skill is the method for applying and reviewing them, and the checklist for what a complete visual system must define.
---

# Brand visual system: apply it and review against it

The law is `docs/BRAND-DIRECTION.md`. The tokens are in the file `enforcement.tokenFiles` names. `brand.config.json` carries the machine-readable version: `palette`, `type`, `identity.subBrands`, `imagery`.

This skill does two jobs: it tells you **what a complete visual system must define**, so you can tell when a project's is missing something, and it gives you the **review pass** for any surface.

## What a complete visual system defines

If any of these is missing, the system is incomplete and the gap will be filled by whoever ships next, differently each time. Naming the gaps is half the value of this skill.

**1. The north star, in one sentence.** What the brand looks like, plus the thing it must never be mistaken for. A north star with no negative half is not usable, because "modern and clean" describes almost every site ever built.

**2. Colour, with roles and a contrast law.** Not a swatch list: `palette.roles` maps semantic roles to hexes, and **`palette.contrastLaws` records the pairings that are forbidden even though both colours are on-brand.** Almost every palette has at least one colour that fails as text on light, and if it is not written down a designer discovers it at review.

**The accent rule matters most.** The accent is the payoff: it marks the one thing that matters on a surface, never decoration. If two things glow, neither does.

In code, colours come from tokens only.

**3. Type, with roles.** A display face, a body face, and whatever third role the brand needs, each with what it is for and, critically, **what it is not for**. A display or script face used for body copy is the fastest way to make a premium brand look amateur. Record the licence position too.

**4. Sub-brand systems, with the wall between them.** Each entry in `identity.subBrands` gets its own surfaces, type treatment, graphics and mood. **Two systems never share one surface.** This is the rule people break by accident, because each individual asset is genuine.

**5. Composition rules.** How images sit (framed or naked, and most strong systems frame), how subjects are grounded, what overlays exist and at what rotation, how type meets image, and the recurring motifs. A plain unframed rectangle is a defect in most systems and nobody notices until it is written down.

**6. The people rule.** `imagery.peopleTreatment`, stated positively and negatively. This is the highest-stakes line in the whole system, because generative models have a strong default look and shipping it makes a brand look like every other brand that shipped it.

**7. Motion.** Usually the most under-specified. The useful version names the restraint: how long, how much, what is forbidden, and **one orchestrated moment per page rather than scattered effects**. Reduced motion is respected always. Where a sub-brand may break the restraint, say so explicitly and confine it to that system.

**8. The marks and the strings.** The name exactly as written per `identity.nameRule`, the lockups, and the rule that marks are never recoloured, stretched, skewed or reconstructed, with the correct variant for each background.

## The review pass for a surface

1. **Does it read as this brand at a glance?** Right sub-brand system, right variant. If you have to look twice, it fails.
2. **One clear message and one accent payoff?**
3. **Tokens only, contrast law respected, banned words absent?**
4. **Motion subtle and reduced-motion safe?**
5. **Assets are the locked masters in the right variant?**
6. **Did you actually look at the rendered result?** Not the spec, not the code. The rendered thing.

## Do and do not

**Do**: use the system's own devices, one accent payoff per surface, real brand assets before generated ones, and existing assets before new ones.

**Do not**: em or en dashes anywhere; gradient mush; a look the north star explicitly rejects; mixing two sub-brand systems; anything in `imagery.sharedExclusions`; fabricated proof; raw colour values in code.

## When the system does not answer the question
Say so, and route it to Vega rather than inventing an answer that then becomes precedent. **An undefined rule filled in silently is how a design system drifts**, and the drift is invisible for months and then everywhere at once.
