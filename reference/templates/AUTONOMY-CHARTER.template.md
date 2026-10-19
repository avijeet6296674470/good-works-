# <FILL: BRAND NAME> — AUTONOMY CHARTER

Generate this **only** when the user has explicitly authorised an unattended
run. Without that authorisation this file must not exist, because its whole
purpose is to suspend the rules that normally require asking.

---

**Authorised by <FILL: who> on <FILL: date>.**

This charter is the authority document for the run. It **overrides, for this run
only**, the ask-before-generating rule and the no-unsolicited-changes rule.

**All other locks stand**: facts, the freeze, the brand laws, the banned words,
the truth rules. Autonomy is permission to decide without asking. It is not
permission to invent.

---

## 1. Scope and order

<FILL: exactly what is in the run, in the order it will be done. Name every item. An unattended run against a vague scope is how something unintended ships.>

**Explicitly out of scope**: <FILL: anything the run must not touch.>

## 2. Sources of truth per item

<FILL: the documents each item is built from, and the pipeline stages it passes through.>

**The run reads; it does not decide what is true.** Every fact still comes from
`docs/BRAND-TRUTHS.md`, and an unanswerable question is an escalation rather
than a judgement call.

## 3. Budget

**Hard ceiling: <FILL>.** Not a target, a ceiling.

| Item | Budget | Notes |
|---|---|---|
| <FILL> | <FILL> | <FILL> |
| Contingency | <FILL> | <FILL> |

**Before any paid call: sum every prior cost record for the run.** Not the
current item's spend, the run's. If a call would breach the ceiling, **reuse
instead and log the decision.**

**Reuse first**, against `docs/ASSET-LIBRARY.md`, on every item. Weight the
budget toward the pages that convert; the pages nobody lands on get zero and
reuse.

## 4. Who signs off

**Gate replaces the user as the final sign-off** for the duration of the run.
Every item still passes `/ship-ready` in full, with runtime proof. Autonomy
removes the asking, not the gate.

## 5. Escalation triggers: the ONLY reasons to stop

Stop the run and wait for the user if, and only if:

1. **A budget ceiling would be breached** and reuse cannot resolve it.
2. **The sources of truth contradict each other** on a fact that must ship.
3. **A freeze cannot be verified** after a change to a frozen path.
4. <FILL: any project-specific trigger.>

**Everything else is decided and logged, not escalated.** A run that stops for
every judgement call is not an unattended run, and a run that stops for nothing
is not safe. This list is the line, and it is short on purpose.

## 6. The log

The run keeps a record: what was done per item, what was generated and at what
cost, what was reused, every decision that would normally have been a question,
and every escalation considered and rejected.

**The user reads this at the end.** It is the only thing standing between an
autonomous run and an unauditable one, so it is written as the run goes, not
reconstructed afterwards.

## 7. When the run closes

- [ ] Every item passed its gate with runtime proof recorded as counts.
- [ ] Total spend reported against the ceiling.
- [ ] Every ledger row written.
- [ ] The decision log complete, including the decisions that went unasked.
- [ ] **Open questions surfaced rather than resolved by assumption.**
- [ ] This charter marked closed, with its date. **A charter left open is a standing grant of autonomy that nobody remembers giving.**
