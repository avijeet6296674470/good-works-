# <FILL: BRAND NAME> — BRAND DIRECTION

The design law. Palette, typography, voice, sub-brands, image grammar.

`brand.config.json` carries the machine-readable half (`palette`, `type`,
`voice`, `identity.subBrands`, `imagery`). This file is the reasoning and the
detail no config field can hold.

Section numbers are stable, because agents cite them.

---

## 1. Palette

| Role | Name | Hex | Used for |
|---|---|---|---|
| Background | <FILL> | <FILL> | <FILL> |
| Surface | <FILL> | <FILL> | <FILL> |
| Text | <FILL> | <FILL> | <FILL> |
| Muted | <FILL> | <FILL> | <FILL> |
| **Accent** | <FILL> | <FILL> | **The payoff. One per surface.** |
| Accent alt | <FILL> | <FILL> | <FILL> |

**The accent rule.** The accent marks the one thing that matters on a surface:
the primary action, the price, the single number the page is about. Never
decoration. **If two things glow, neither does.**

### The contrast law

| Pairing | Verdict |
|---|---|
| <FILL: colour on background> | <FILL: allowed / large text only / graphic only / forbidden> |

> **Why this table exists.** Almost every palette contains at least one colour
> that is beautiful and fails as body text. If it is not written down, a
> designer discovers it at review, or worse, does not. Every row here also goes
> into `palette.contrastLaws`.

Body text meets 4.5 to 1 against its background. Verify it rather than
estimating; the eye is unreliable at exactly the ratios that matter.

**In code, colours come from tokens only.** The hexes live here and in the token
file, nowhere else.

## 2. Typography

| Role | Face | Used for | Never used for |
|---|---|---|---|
| Display | <FILL> | <FILL> | <FILL> |
| Body | <FILL> | <FILL> | <FILL> |
| <FILL: third role> | <FILL> | <FILL> | <FILL> |

**The "never used for" column is the load-bearing one.** A display or script
face applied to body copy is the fastest way to make a considered brand look
amateur, and it always happens because the face looks good in the specimen.

Licence position: <FILL: whether the project may self-host each face. Record it, because "we assumed it was fine" is how a font invoice arrives.>

## 3. Voice

<FILL: two to four named modes. More than four is not a voice, it is the absence of one.>

| Mode | Used for | Example, in the brand's own words |
|---|---|---|
| <FILL> | <FILL> | <FILL> |

**Person**: <FILL>. **Reading level**: <FILL>. **Register**: <FILL, from `market.languageRegister`>.

**Humour policy**: <FILL: whether, what kind, and the rate limit.>

> A brand with wordplay needs a stated cap. Without one, every heading becomes a
> joke by the third page and the jokes stop landing.

**The copy formula**: <FILL: the repeatable shape of a headline or a section on this brand.>

**The approved line bank**: <FILL: taglines and campaign lines, or a pointer to the bank in BRAND-TRUTHS section 7. New lines join the bank before they ship.>

## 4. Sub-brand systems

<FILL: one column per system in `identity.subBrands`. If there is only the master brand, say so and delete the table.>

| | <FILL: master> | <FILL: sub-brand> |
|---|---|---|
| Surfaces | <FILL> | <FILL> |
| Type | <FILL> | <FILL> |
| Graphics | <FILL> | <FILL> |
| Mood | <FILL> | <FILL> |

**Two systems never share one surface.** This is a wall, not a preference. The
rule gets broken by accident, because each asset is individually correct and
only the combination is wrong.

## 4b. The energy layer

<FILL: if the brand mandates a volume that the default restraint does not describe, define it here: what "loud" means, which devices carry it, and what it still may not break. If the brand is quiet, say so, because that is equally a decision and equally worth stating.>

**Loud but constructed.** Volume comes from scale, placement and the brand's own
devices. It never excuses gradient mush, system mixing, a second accent payoff,
or a breach of the contrast law.

## 5. The image grammar

**The law for every image.** Read it before writing any prompt.

1. **The ground**: <FILL: flat colour fields, photographic environments, texture. Named, with hexes.>
2. **Framed or naked**: <FILL: most strong systems frame their imagery. If this one does, a plain unframed rectangle is a defect and should be stated as one.>
3. **How subjects sit**: <FILL: cut out, in scene, held, floating. With what shadow logic.>
4. **Overlays**: <FILL: which decorative assets, at what rotation, in what stacking order.>
5. **Type over image**: <FILL: which faces, how many, what may sit behind what.>
6. **Recurring motifs**: <FILL>
7. **THE PEOPLE RULE**: <FILL: stated positively and negatively. What people must look like, and what they must never look like. This is the highest-stakes line in the document, because the models have a strong default and that default is what makes a site read as templated. Also: group sizes, where each treatment applies, and which model people route to.>
8. **Sub-brand variants**: <FILL: how each system's imagery differs.>

**Text-in-image law.** Every visible word, **including blurred background
signage**, is spelled verbatim in the prompt. Only strings on the approved list
may appear:

<FILL: the approved in-image text set. Also goes into `imagery.approvedInSceneText`.>

**Never let a model guess text.** An invented word on a brand surface is a
fabricated claim rendered at high resolution, and fixing it costs another
generation.

**Absolutely never**: <FILL: the anti-pattern list. Write it from this brand's actual competitors and from the generic look you are trying not to produce. This list is the most useful part of the section, and it is the part that gets skipped.>

## 6. Asset inventory

<FILL: a summary. The full inventory lives in `docs/ASSET-LIBRARY.md`.>

**Reuse before generation, always.** A regenerated version of an existing asset
never matches the one already shipped, and the mismatch is more visible than
either image would have been alone.

## 7. Motion

<FILL: the restraint. How long, how much, what is forbidden.>

**One orchestrated moment per page beats scattered effects.** Reduced motion is
respected always. <FILL: where a sub-brand may break the restraint, and only there.>

---

## Changing this document

Some sections are cheap to change and some are not. Know which before opening a
debate:

| Changing | Costs |
|---|---|
| A voice mode or the copy formula | A copy pass |
| The accent, or a palette role | Every generated image, the share cards, a full design review |
| The people rule | Every image containing a person |
| A sub-brand's system | Every surface it touches |
| The image grammar | The entire asset library |

Record every change with its date and who approved it. A design law with no
history gets relitigated monthly.
