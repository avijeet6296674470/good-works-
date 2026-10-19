# Authoring agents, skills and hooks

The standing default. Every new agent, skill and hook follows it without being
re-specified.

Read this before creating any, and read two existing ones of the same kind
first. The pack's consistency is most of what makes it work: an agent that looks
different reads as less authoritative, whatever it says.

---

## Agents: named specialists with a point of view

An agent is **a fully realised character, not a job description.** Roughly 60 to
80 lines. Thin stubs produce thin work, because a model given "you are an SEO
expert" has nothing to be opinionated with.

**The structure, in this order:**

```
---
name: kebab-case-name
description: >
  When to use this agent, what it owns, its trigger words, and its
  boundary against the agents it is most confused with.
tools: <the minimum it actually needs>
model: opus
---

# Name, the Role

[Two or three sentences framing the job. What this agent sees that others miss.]

## Canonical grounding (read before any work)
[The config fields and documents it reads, each with what it takes from them.]

## Story and experience
[A track record that explains why this agent is opinionated, and about what.]

## What X owns
## How X works        [numbered, and actually sequential]
## Guardrails         [what it refuses]
## Boundaries         [the neighbouring agents, and the line between them]

[A closing line stating the agent's single test.]
```

**The two sections people skip, which are the two that matter:**

**Story and experience** is not decoration. It is what turns generic competence
into a specific view. Ground it in **craft rather than market**: a track record
of problems solved, not a geography. "Fifteen years on consumer sites where the
visitor is on a mid-range phone" travels; naming a city does not.

**Boundaries** is what stops two agents doing the same job differently. Every
overlap that has ever caused confusion gets a line. The recurring ones:

- Who decides *which* schema a page carries against who *builds* the JSON-LD.
- Who owns the SEO *slot* against who writes the *text* that fills it.
- Who decides a section *exists* against who decides *where it sits* against who decides *how it looks*.

**Guardrails are refusals, not preferences.** "Prefer tokens" is advice. "Never
a raw colour outside the token file" is a guardrail. Write the second kind.

## Skills: orchestrators with a done definition

A skill sequences agents and ends in a verifiable state.

```
---
name: kebab-case-name
description: >
  When to use it, what it does, what it produces, and its trigger words.
  Written so the router can match it.
---

# /name: what it does

[The framing, and the one question the skill answers.]

## Canonical grounding (read first)
## When to invoke
## Inputs
## Steps            [numbered, each naming its owning agent]
## Output           [the actual shape]
## Guardrails
## Done definition  [a checklist, every item verifiable]
```

**The done definition is the skill.** Everything above it is method; that list is
what makes finished mean something. **Every item must be checkable by someone who
did not do the work**: "responsive verified" is not; "zero horizontal overflow at
every width, verified programmatically" is.

**Prefer skills to agents.** A skill orchestrates the right order, and the order
is what gets skipped when working freehand.

## Hooks: config-driven, fail open

Hooks are Python, so they run identically on Windows and POSIX.

**Three rules:**

1. **Read the config, do not hardcode the rules.** Everything project-specific comes from `enforcement` in `brand.config.json`. A hook with a project's rules in its source is a hook the next project has to fork.
2. **Fail open.** Cannot parse the input, cannot find the config, hit an unexpected shape: exit zero and let the work through. A guard that blocks all editing because of its own bug is worse than no guard.
3. **Therefore: test it.** Failing open means a broken hook is indistinguishable from a passing one. `tools/test_hooks.py` exists for this, and a new rule without a test is a rule that will silently stop firing.

Never use an absolute path in `settings.json`. Use the project-directory
variable, or the hook breaks the moment the project moves, silently.

---

## The house style, for everything

**No em or en dashes.** Anywhere, including in a document about writing
documents. Ranges use "to".

**Write the reason, not just the rule.** A rule with no reason attached gets
deleted by whoever finds it inconvenient, and they will be right to, because
they cannot tell it from an arbitrary preference.

**Be concrete.** "Ensure good performance" is not actionable. "The largest-paint
element is eager and prioritised; everything else is lazy" is.

**Name the failure the rule prevents.** The most useful line in most of these
documents is the one explaining what goes wrong without it, because that is what
makes someone follow it under pressure.

**No brand, no locale, no framework.** Everything project-specific comes from
`brand.config.json`. If a sentence would be wrong on a different client, a
different country or a different stack, it belongs in the config or in a
vertical overlay, not here.

## Before adding anything

1. **Does something already cover this?** A near-duplicate skill is worse than no skill, because the router picks between them arbitrarily and the two drift apart.
2. **Does it declare dependencies that exist?** Run `tools/check_dead_deps.py`. A skill that calls a script nobody wrote reads as a pass right up until someone trusts it.
3. **Does it reference agents that are in the roster?** Routing to an agent that does not exist fails silently.
4. **Does it name its readers, if it is a document?** A document nothing reads is decoration with a maintenance cost.
