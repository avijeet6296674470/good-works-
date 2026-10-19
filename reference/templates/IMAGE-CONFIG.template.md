# <FILL: BRAND NAME> — IMAGE CONFIG

The generation setup: the visual language as prompt language, the cast, the
exclusions, the model routing and the budget.

Pairs with the image grammar in `docs/BRAND-DIRECTION.md` section 5, which is the
law. This file is how that law becomes a prompt.

---

## 1. The visual language as prompt language

The words that go into every STYLE slot. **Not the design vocabulary, the
generation vocabulary**: they are different, and the translation is the work.

<FILL: the phrases that reliably produce this brand's look. Concrete and physical: materials, light behaviour, print or finish characteristics, posterisation, grain. Not adjectives like "premium" or "modern", which produce nothing.>

> **The single most useful rule in image generation**: hype words actively
> degrade output. "Ultra-realistic, 8K, cinematic, masterpiece, stunning, epic"
> produce plastic. Specify source, direction, hardness, temperature, falloff and
> material instead. Concrete physics beats every adjective.

## 2. The palette as prompt language

<FILL: each hex with the words that make a model actually hit it. A hex alone is a suggestion; a hex plus a named colour plus a material reference is an instruction.>

## 3. The cast

<FILL: the fixed subject set, if the brand renders recurring people or characters. One canonical reference generated per subject, then reused.>

**This is what makes people consistent across a series.** Without a canonical
reference, every generation produces a different person and the series reads as
stock. With one, the same face recurs and the brand looks like it has a world.

## 4. The shared exclusions block

Appended to every prompt. Also lives in `imagery.sharedExclusions`.

<FILL: the anti-pattern list, written from this brand's actual competitors and from the generic look you are avoiding. Be specific: "no generic AI-stock interiors" works, "no bad images" does not.>

## 5. In-image text

**Every visible word, including blurred background signage, is spelled verbatim
in the prompt.** Only these strings may appear:

<FILL: the approved set. Also in `imagery.approvedInSceneText`.>

**Before generating, enumerate every implied text surface** (signs, screens,
menus, labels, packaging) and either quote its exact string or state that it is
illegible and out of focus. **If any text is implied but unspecified, fix the
prompt rather than generating.**

Never bake a price, a rating or an invented name into an image. It becomes a
fabricated claim rendered at high resolution, and it costs another generation to
remove.

## 6. Model routing

| Job | Model | Notes |
|---|---|---|
| Objects, cutouts, anything with rendered text | <FILL> | <FILL> |
| Pipeline validation | <FILL: the free tier> | **Always validate a new script or batch here first.** |
| Textures, atmospheres | <FILL> | Never for text; it garbles it. |
| Consistent scenes, reference work | <FILL> | The priciest. Use deliberately. |
| People | <FILL> | <FILL: if the project locks people to one model, say so and why.> |

**Never guess a slug.** A model published under a marketing name frequently
ships under a different identifier, and an invented slug simply errors.

**Negative prompting differs by model.** Some hallucinate when stuffed with
prohibitions, so prefer positive specification there. Some handle a short
exclusions block well. Getting this backwards wastes money quietly.

## 7. Sizes

| Use | Dimensions |
|---|---|
| <FILL> | <FILL> |

**Match the final use. No lazy squares.** Landscape for wide scenes, tall for
standing figures. Downscale in post; never upscale.

## 8. Post-processing

<FILL: the local pipeline. Keying, despill, autocrop, resize, convert.>

**Cutout recipe**: <FILL: the key colour, the margin, whether the subject may touch the edge, and the exact tool chain. Record the recipe that worked, because the second-best key colour costs an hour of edge cleanup.>

**Never regenerate to fix a crop, a size or a colour cast.** Free steps are
free; paid steps are not. **Keep the raw and the master** outside the shipping
folder, permanently.

## 9. Budget

**Ceiling**: <FILL: `imagery.budgetUsd`>.

Log model, size and cost for every call, and report the running total. Dry-run
batches by printing every prompt before spending. **Every blind retry costs
money: debug the prompt first.**

Assume several times the list price per genuinely finished asset if you are
iterating. **Precise prompts are the cost control**, not cheaper models.
