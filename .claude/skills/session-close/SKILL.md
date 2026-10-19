---
name: session-close
description: Use when work is done for the session, or when the user says "lock this in", "that's done", "commit", or "great". Updates the session log, confirms the definition of locked (type-check green, gate run, ledger updated, deploy checklist updated if relevant), saves memory entries for locked components, and outputs a one-line summary. Run it before context runs out, to avoid losing lock-in state.
---

# /session-close: the end-of-session close-out

Automates the administrative work that otherwise gets skipped exactly when context fills up, which is exactly when it matters most.

## Trigger phrases
"Lock this in", "that's done", "commit this", "let's wrap up", "session done", or "that's great" after completing a piece of work.

## Step 1: identify what was done
Read the last session-log entry to know what the previous session covered, then list from this one:
- Files created or modified.
- Decisions made: locked specs, approved copy, adopted patterns.
- Task items completed or advanced.
- **Bugs fixed and their root-cause diagnoses.** These are the most valuable thing in the log, because they prevent re-diagnosing the same class of bug in three weeks.

## Step 2: write the session-log entry

Prepend, newest at the top:

```markdown
## YYYY-MM-DD: [short session title]

**Shipped:**
- [name]: [what was built or fixed, and the key technical decision]

**Key decisions recorded:**
- [decision that affects future sessions]

**Pending (carry to next session):**
- [anything started but not finished, with the invariant still owed and its owner]
```

Rules: today's real date. A title of three to six words. **Trim to the last three sessions**, archiving older entries rather than deleting them.

## Step 3: reconcile the component library

Any genuinely reusable component built or promoted this session gets checked against the project's own component registry (wherever `docs/CODE-CONVENTIONS.md` or the design-system reference says the shared library is documented). **A new reusable block that ships without a library entry gets reinvented from scratch next session, by someone who had no way to know it already existed.** This is the specific failure this step exists to prevent — `/css-portable-extract` catches a pattern once it's been duplicated three times; this step catches a component the moment it's built, before the duplication ever happens. Grep the component directory against the registry and flag anything present in one but not the other.

## Step 4: the definition of locked, confirm rather than assume

Work is locked because it was **proven**, not because it was committed. For anything called shipped this session, confirm each item. **Anything unverified moves to Pending, not Shipped.** That distinction is the entire point of this step, and softening it makes the log worthless.

- [ ] **Type-check green.**
- [ ] **Build green** if code shipped, for the shipped state.
- [ ] **The gate ran**: `/ship-ready` passed for any page or SEO-affecting surface, with runtime proof recorded as counts rather than adjectives.
- [ ] **SEO slots intact**: H1, title and description, canonical in the project's form, alt text, internal links unharmed by late edits.
- [ ] **JSON-LD valid** and server-rendered, single-source FAQ, nothing from `truth.forbiddenClaims`.
- [ ] **Truth held**: no fabricated or approximated fact shipped, every value traced, copy passed the lint.
- [ ] **The freeze untouched**: no logic change inside `stack.frozenSubsystems` beyond approved restyles and approved fixes.
- [ ] **Ledger updated**: every SEO-affecting change this session has its row in `enforcement.ledgerFile`. If it is not in the ledger, it did not happen.
- [ ] **The deploy checklist updated** if anything touched build config, environment variables, fonts, redirects or the deploy shape.

## Step 5: save memory for locked components
For any surface finalised this session, check whether a memory entry already exists. If not, create one recording: the date locked, the files and their roles, the key architectural decisions and props contract, the canonical copy or a pointer to it, the most important constraint on the surface, why it was built this way, and what to do before modifying it. Then add a one-line pointer to the memory index.

## Step 6: commit
Per the project's working rules: an honest message saying what changed and why, with SEO-affecting commits referencing their ledger row. **Never add a git remote pointing at a client's own repository**; pushing back to a client repo is a manual, user-approved decision.

## Step 7: output summary
One line: what was locked in, ledger rows, memory entries, pending count.

## Done definition
- [ ] The definition of locked confirmed for all shipped work, with anything unverified logged as Pending rather than Shipped
- [ ] The session log has a new entry at the top with today's date
- [ ] Locked components have memory entries
- [ ] Work committed with an honest message
