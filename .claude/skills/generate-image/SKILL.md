---
name: generate-image
description: Generate any image through the approved provider. Covers hero shots, banners, social share cards, textures, ornaments, transparent cutouts and sub-brand scenes. Routes to the right model behind a single key, then post-processes (chroma key, crop, resize, convert). Use when the user asks to create, generate or make an image, illustration, graphic, cover, banner, icon or visual asset. One provider only.
user-invokable: true
args:
  - name: brief
    description: The visual brief, covering subject, mood, aspect ratio and intended use
    required: false
---

# /generate-image: the portable image path

The toolkit lives at `$WEBSITE_PACK/tools/image-router/`. Set `WEBSITE_PACK` once and it resolves from any project.

> **HARD RULE: one provider.** Every image goes through the configured router using its single key. **Never call a model vendor directly.** If the router is unavailable, stop and report; do not fall back. One router means cost is measurable in one place and an outage is a single known failure rather than four silent ones.

## Setup
The key lives in the pack's gitignored `.env`. **Read it from the environment; never hardcode it, never print it, never commit it.** If dependencies are missing, install them from the toolkit directory.

## Models
Route by job, using `imagery.models` in `brand.config.json`:

| Use case | Route to | Best for |
|---|---|---|
| Objects, cutouts, icons, **anything with rendered text**, and people | the text-and-objects model | Crisp geometry, reliable flat key grounds, exact text |
| Pipeline validation | the free tier | Proving a prompt or a batch script costs nothing |
| Textures, precise material surfaces | the text-and-objects model | Tileable, controllable, precise. **Never for text on top of a texture; keep that a separate composite.** |
| Atmospheric, mood or abstract backgrounds | the premium model | No precision requirement — the premium model's pull toward dramatic lighting suits mood work. Slower and pricier than a texture-model route; use deliberately. |
| Consistent scenes across a series, reference-image work | the premium model | The priciest. Use deliberately. |

**Never invent a model identifier.** A slug that looks obvious may not exist, and models frequently ship under an identifier that does not match their marketing name. Take them from the config.

## Cost discipline
- `imagery.budgetUsd` is the ceiling. Under an autonomy charter, the charter's table is the authority instead, with a hard run ceiling.
- **Reuse first.** Check `docs/ASSET-LIBRARY.md` before generating anything, and sum prior costs before firing.
- **Validate on the free tier first.** Prove the composition works, then re-run the winner on the paid model.
- **Log the cost of every call.** Keep a running total and report it with every delivery.
- **Never regenerate to fix a crop, size or background.** Framing is a post-processing problem, and post-processing is free. Regeneration is only for a wrong subject or a wrong style.

## Steps

1. **Clarify the brief if it is thin.** You need subject, intended use, aspect ratio, mood, and whether it must be a transparent cutout or match an existing asset. Ask only if genuinely missing; otherwise make a sensible on-grammar choice and state it.

2. **Ground in the brand.** Read the image grammar in `docs/BRAND-DIRECTION.md` and `imagery` in the config before prompting: the ground treatment, framed rather than naked, how subjects sit and cast shadow, the overlays, the motifs, and `peopleTreatment` if a person appears.

3. **Write a seven-part prompt**: SUBJECT, STYLE, COMPOSITION, LIGHTING, CAMERA, BACKGROUND, TECHNICAL, plus an EXCLUSIONS block from `imagery.sharedExclusions`. Name the exact hexes.
   - **Run the text pre-flight.** Every visible string, including blurred background signage, quoted verbatim and drawn only from `imagery.approvedInSceneText`. If a brief implies unspecified text, resolve it before generating rather than after.
   - **No vague incidental detail.** A mug's logo, a whiteboard's scribble, a sign's crest: name the specific real detail or mark it explicitly out of focus/illegible. Left unresolved, the model defaults to a generic squiggle-mark — one of the most recognizable AI tells there is.
   - For cutouts, request a flat key-colour field with the subject inside the central portion and no shadow on the key.
   - **Never use hype words** like ultra-realistic, 8K, cinematic, masterpiece or epic. They produce plastic.
   - **Then run the gate**: `python $WEBSITE_PACK/tools/preflight.py --prompt "<prompt>" --model <slug>`. Free, and it catches the four prompt rules mechanically. A blocked prompt is a prompt to fix, never a generation to retry.

4. **Generate.** Reference images route to the edit endpoint automatically. Batches run parallel with retry, never sequentially.

5. **Post-process** with the toolkit's Python tools: key, despill, crop, resize, convert, optimise. Composite pixel-perfect text, frames and overlays with code, never with the model. **Keep the raw and the master outside the shipping folder**; only optimised deliverables ship, inside `assets.maxImageBytes`.

6. **Review and deliver.** Reject generic output, off-palette colour, naked unframed rectangles, or people rendered against the locked treatment, and re-prompt. Report: final asset paths, models used, total spend, and the exact prompts for the keepers, which become reusable recipes.

**Size and ratio match the final use. No lazy squares.** Landscape for wide scenes, tall for standing figures. Downscale in post; never upscale.

Consult the toolkit's `REFERENCE.md` and manuals whenever unsure. No em or en dashes in anything you write, including prompts.
