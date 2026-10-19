---
name: brand-image
description: Produce ONE finished, on-brand asset via the creative panel and the approved image provider. Vega directs, Quill, Lux and Volt spec the layers, Iris fuses and executes, Vigil verifies against the locked grammar. Use when you need a single finished visual (hero, section motif, social share card, decorative composition, sub-brand scene). Returns the asset, the exact prompt, the model and the cost. Open to iteration.
---

# /brand-image: generate one on-brand image

The law for every pixel is `docs/BRAND-DIRECTION.md`, the image grammar and asset inventory sections. Rendering goes through the single provider configured in `imagery.provider`, using the toolkit at `$WEBSITE_PACK/tools/image-router/` with the key from the pack's gitignored `.env`.

**Nothing is final.** Every output is a proposal to react to.

**Budget.** `imagery.budgetUsd` is the ceiling. Under an autonomy charter, the charter's table is the authority instead. **Reuse first** against `docs/ASSET-LIBRARY.md`, sum all prior costs before generating, and log every call. If a call would breach the ceiling, reuse instead.

## Inputs
- **What**: the subject and its role.
- **Surface**: which sub-brand system from `identity.subBrands`. **Never mix two on one surface.**
- **Use and aspect**: where it goes, plus dimensions. Share cards have a fixed aspect the platform dictates. **2K minimum, always** — a finished brand asset never ships at 1K resolution, and 2K costs the same on most providers. **Confirm the provider's own accepted size list before generating**: a size outside its validated set errors outright rather than silently rounding to the nearest one, so check rather than guess a resolution.
- **Optional**: reference assets from the brand source, and any in-image text, which must be verbatim.

## The brand spine, applied every time
- **Grammar** from `BRAND-DIRECTION.md`: the ground treatment, framed rather than naked, how subjects sit and cast shadow, overlays at their rotation, how type meets image, the recurring motifs.
- **Palette**: the exact hexes in `palette.roles`. The accent is the payoff, never decoration, and `palette.contrastLaws` still applies inside an image.
- **The people rule**: `imagery.peopleTreatment`, exactly as written, in both directions. **Existing assets in `docs/ASSET-LIBRARY.md` are reused before anything new is generated**, because a regenerated figure never matches the one already shipped and the mismatch is more visible than either image alone.
- **Never**: anything in `imagery.sharedExclusions`, fabricated proof, invented brand names or gibberish text, or a name spelled against `identity.nameRule`.

## The pipeline: the creative panel
1. **Vega** frames the brief: asset type, surface, intent, which grammar devices lead.
2. **Quill (concept), Lux (capture), Volt (finish and tech)** each write their layer spec.
3. **Iris fuses** the three into ONE deterministic prompt and executes. Model routing comes from `imagery.models`: the text-and-objects model for anything with rendered text, for people, and for precise material textures; the premium model for atmospheric/mood backgrounds, consistent scenes, and reference work. **Validate on the free tier before spending.**
4. **Vigil verifies** the result against the locked grammar before it ships anywhere.

## Procedure
1. **Read** the image grammar in full, plus the toolkit's prompt-engineering manual.
2. **Write the prompt** with deterministic detail: subject form, composition, the frame device, exact hexes, lighting and shadow direction, full background content, and the reserved empty zones. **Unspecified means wrong**, because the model improvises whatever you leave out.
   - **Text law**: every visible string quoted verbatim, including blurred background signage, and drawn only from `imagery.approvedInSceneText`. **No generation until every implied text surface is enumerated and either quoted or explicitly declared illegible.** Scene text (signage, packaging, a mug, a screen) bakes into the raster at generation time — no post-generation compositing for this category. The one exception is a headline/CTA that must be pixel-perfect brand typography, which Volt composites in code instead; that never applies to in-scene text.
   - **No vague incidental detail.** A mug's logo, a whiteboard's scribble, a sign's crest: name the specific real detail or mark it explicitly out of focus/illegible. Left unresolved, the model defaults to a generic squiggle-mark — one of the most recognizable AI tells there is.
   - **Run the gate before spending**: `python $WEBSITE_PACK/tools/preflight.py --prompt "<the fused prompt>" --model <slug>`. It blocks on hype words, unquoted in-scene text, and text that is not on the approved list. Exit 1 means fix the prompt, not retry the generation.
   - Negative prompting varies by model. Some hallucinate under a pile of prohibitions, so prefer positive specification there; others handle a short suppression line well.
   - **Never use hype words** like ultra-realistic, 8K, cinematic, masterpiece, stunning or epic. They actively produce plastic.
3. **Generate.** Log model, size, cost and latency.
4. **Post-process** with the toolkit's Python tools. Cutouts key off their flat key-colour ground, then autocrop to a transparent optimised file. **Never regenerate to fix a crop.** Framing, size and background are code problems, and free ones.
5. **QA gate.** Reject and re-prompt unless all pass: on palette, right surface system, grammar devices present, people rendered per the locked treatment, text verbatim and legible, no generic-stock feel, no generic squiggle-marks on incidental surfaces, nothing excluded. **For anything claiming photographic realism, name camera and lens language explicitly and bake in one or two deliberate imperfections** (fine grain, gentle vignetting) — a perfectly clean render is one of the more reliable tells that an image is generated, and a slight, named imperfection reads as more real than flawless.
6. **Deliver**: the asset path, the exact final prompt, the model, the size and the cost. **Save the prompt**, because a prompt that produced a keeper is a reusable recipe and the biggest cost saver available.

## Output format
```
ASSET: <path>
MODEL: <slug>   SIZE: <WxH>   COST: $<x>
SURFACE: <which sub-brand system>
PROMPT (reproducible):
<the exact prompt>
NOTES: <what to try next, variants to consider>
```

## Iteration
Treat every result as a draft. **Change one variable at a time**, revalidate on the free tier, regenerate, and log the change. Surface two or three options when the direction is genuinely open.

## Dependencies
`$WEBSITE_PACK/tools/image-router/` · `docs/BRAND-DIRECTION.md` · `docs/BRAND-TRUTHS.md` · `docs/ASSET-LIBRARY.md` · the brand source directory · the skills `/generate-image` and `/visual-language-explore`.
