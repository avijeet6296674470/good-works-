---
name: visual-language-explore
description: Explore WITHIN the locked visual grammar by generating a BATCH of distinct treatments for a motif. Use to compare treatments BEFORE committing an asset; produces a moodboard of options to react to, not a single final. Directed by Vega, executed by Iris.
---

# /visual-language-explore: batch exploration inside the locked grammar

Generate a spread of distinct treatments for a motif so the options can be seen and chosen between, before anything is finished. This is the divergent step: **breadth over polish.** Winners get finished by `/brand-image`.

**The grammar is locked.** Exploration happens WITHIN the image grammar in `docs/BRAND-DIRECTION.md`, never outside it. We are not inventing a new visual language; we are choosing between valid executions of the existing one. An exploration that drifts outside the grammar has produced options that cannot be used, which is worse than producing none.

## When to use
- A surface needs options: which frame device, which overlay treatment, which ground colour, which accent motif, or which pose and group treatment within the locked people rule.
- Stress-testing whether a treatment holds across aspect ratios and surfaces. A device that works in landscape and dies in portrait is worth finding now.
- Building out a sub-brand's range before committing pages to it.
- Ranging any new asset type before it commits to a hero.

## Cost discipline
Exploration runs on the cheapest viable tier: the **free tier** for object, graphic and text-bearing takes, and the text-and-objects model at low volume for texture takes where the free tier won't do. Paid, premium-model takes are reserved for finishing a winner, and that step belongs to `/brand-image`. Log cost per call and per round against `imagery.budgetUsd`.

Check `docs/ASSET-LIBRARY.md` before generating new figures. Existing assets are free options, and they are also the only ones guaranteed to match what has already shipped.

## Procedure
1. **Frame the motif (Vega).** State the single idea being explored and **the axes to vary**: quiet against loud, graphic against illustrated, macro against wide, which device leads. Pick four to six **deliberately different** takes. Near-duplicates waste the round and produce a menu with one item on it.
2. **Brief each take** as a one-line creative intent, and hand to Iris.
3. **Iris builds each prompt**: the full seven-part structure, exact hexes baked in, grammar devices named explicitly. **The text law applies even in exploration**: any visible text spelled verbatim and drawn only from `imagery.approvedInSceneText`. Adjust negative prompting to the model.
4. **Generate the batch** through the single provider, at proper ratios so composition can actually be judged. Run as a labelled set and log the total.
5. **Contact-sheet the results** into a dated exploration folder with a short index listing each take's intent and the exact prompt used. **Archive every round**, so choices stay reversible and a rejected direction can be revisited without regenerating it.
6. **Vega's read.** Rank them, say what works and what is dead in each, recommend one or two to push, and name what to vary next round. Present to the user.

## Output
```
MOTIF: <what is being explored>   ROUND: <n>   TAKES: 4-6   COST: $<x>
For each take:
  TAKE <n>: <intent>
  ASSET: <path>   MODEL / SIZE
  PROMPT: <exact prompt>
VEGA'S READ: <alive / dead / recommend / vary next>
```

## The iteration loop
Round 1 is wide divergence within the grammar. The user reacts. Round 2 narrows toward the winners, varying one or two axes. When a direction is clearly right, hand the winner to `/brand-image` to finish.

## Guardrails
- Breadth first, but never outside the locked grammar. No new palettes, no treatments the north star rejects, nothing in `imagery.sharedExclusions`, and people only per `imagery.peopleTreatment`.
- Never mix two sub-brand systems in one take.
- Everything through the one provider, on the cheap tier, cost logged. Label everything and keep every prompt reproducible.
- **Nothing here is final.** It is a menu to choose from, and presenting it as anything else invites a premature lock.

## Dependencies
`$WEBSITE_PACK/tools/image-router/` · `docs/BRAND-DIRECTION.md` · `docs/ASSET-LIBRARY.md` · the brand source directory · the skills `/brand-image` and `/generate-image`.
