---
name: spec-driven-dev
description: Spec-first workflow for building features, content rewrites, redesigns or any multi-step change, starting from a loose idea if needed (brainstorms options first). Gather all context up front, write a short spec with testable acceptance criteria, get it approved, then implement on a branch, verify against the spec and report. Use this whenever the user types /spec-driven-dev, asks to "spec this out", "plan before coding", "write a spec", or starts a change that touches several files or sections, needs decisions from the user, or depends on source material they're providing (resume, docs, designs), even if they don't say "spec".
---

# Spec-driven development

The goal is **one round of questions, one approved spec, one clean implementation**. Most wasted time in a change comes
from context arriving late: a fact that shows up after the plan is written forces a rewrite of both. This workflow front-loads
context, writes it down as a spec the user can correct cheaply, and builds only once the spec is right.

## Phase 1: Intake (one message, not a drip)

1. Read what already exists before asking anything: `CLAUDE.md` (root and nested), README, and any files or attachments the
   user gave you. Don't ask for anything those already answer.
2. If the request is empty or vague (e.g. just `/spec-driven-dev`), send **one** message asking for everything at once:
   - **Goal:** what should be different when this is done, and for whom?
   - **Source material:** files, resumes, designs, links, or facts that aren't in the repo yet. Ask them to include anything
     that has *changed recently*, because stale facts are the most common cause of rework.
   - **Constraints:** what must not change (design, APIs, tone, dependencies).
   - **Out of scope:** what they explicitly don't want touched.
   - **Branch/PR preference:** new branch? PR when done?
3. If the user answers only part of it, start with what you have. Don't keep re-asking. Put the gaps in the spec as
   assumptions they can correct.
4. If a source contradicts the repo (a resume says one date, the site says another), flag it in the spec. Don't pick silently.

## Phase 1b: Brainstorm (only when the request is an idea, not a feature)

If the user describes a goal instead of a feature ("make it more impressive", "what should I add?"), don't jump to a
spec. Offer 3–6 concrete directions tailored to their goal and codebase. For each, give what it is, why it helps, and the
rough effort. Rank them, recommend a starting set, and let the user pick. Then continue with Phase 2 for the chosen items
only. Several picked items can share one intake, but each gets its own spec and branch unless they touch the same files.

## Phase 2: Explore

Look at the code the change touches. Find existing patterns, classes, helpers and conventions to reuse, so the spec can name
them. Keep this proportional: a small site needs one read-through, while a large codebase may need a search subagent.

## Phase 3: Write the spec

Write the spec to `specs/<yyyy-mm-dd>-<short-slug>.md` in the repo, or to the plan file if plan mode is active. Keep it short
enough to scan in two minutes. Use this structure:

```markdown
# Spec: <title>

## Context
Why this change, what prompted it, the intended outcome (3–5 lines).

## Requirements
R1. <observable, testable statement>
R2. ...

## Decisions & assumptions
- Decided: <choice> (confirmed by user / from CLAUDE.md)
- Assumed: <choice> (correct me if wrong)

## Out of scope
- ...

## Changes
Per file or area: what changes and which existing pieces are reused.

## Acceptance criteria / verification
How each requirement will be checked: command, test, screenshot, grep.
```

Rules for a good spec:
- **Requirements must be checkable.** "Improve the About section" isn't; "About mentions X, Y, Z and no metric outside
  the approved list" is.
- **Don't invent facts.** For content work (copy, bios, resumes, docs) use only facts from the user's material. Where a
  number or detail would help but isn't known, write `[TODO: ...]` rather than guessing. Invented metrics are hard for the
  user to catch and embarrassing when someone else does.
- Mark every assumption as an assumption so the user can overrule it with one line.

## Phase 4: Resolve blockers, then get approval

- Ask only questions whose answer changes what you build. Batch them in **one** ask (max ~4). Put your recommendation first
  in each, so the user can accept defaults quickly.
- Then get approval: in plan mode use ExitPlanMode. Otherwise show the spec (link the file) and ask for a go-ahead.
- If the user adds new facts at any point, **update the spec first, then the code.** The spec stays the source of truth.

## Phase 5: Implement

- Work on a new branch off the latest default branch unless told otherwise. Don't commit to `main`.
- Follow the spec. If something in it turns out to be wrong or impossible, stop and say so. Don't quietly deviate.
- Match surrounding code style and reuse what Phase 2 found.

## Phase 6: Verify against the spec

- **Use the repo's own checks first.** Look in `CLAUDE.md`, package scripts or a `tools/` folder for existing commands
  (tests, linters, screenshot or audit scripts) and run those instead of writing one-off scripts. If you do have to write
  a check more than once, suggest adding it to the repo.
- Check each acceptance criterion and record the result (pass/fail with evidence).
- **Measure quality for anything user-facing.** For web pages, run an audit such as Lighthouse (performance,
  accessibility, best practices, SEO) and compare it with the scores before the change. A feature that lowers them
  isn't done.
- **Prove "no visual change" claims.** When a change is supposed to leave the look alone (removing a dependency,
  refactoring CSS), compare before and after, for example computed styles or screenshots of the old and new versions.
  Don't just eyeball it.
- For anything visual, render it (e.g. Playwright/Chromium at desktop ~1280px and mobile ~375px). Check for layout breakage
  and horizontal scroll, and **send the screenshots to the user before opening a PR**. Reviewing a picture is much cheaper
  for them than reviewing a merged change.
- Grep for things the spec said must be absent (removed claims, forbidden terms).

## Phase 7: Report and hand off

Commit and push the branch. For PRs and merging, follow the repo's rule in `CLAUDE.md` if it has one (for example "merge
after the user approves the screenshots"). If it doesn't, open a PR only when asked. At the approval step, ask once
whether they want you to merge on approval from now on, and offer to record the answer in `CLAUDE.md`. Never merge
before the user has approved the result. Then report briefly:
- Each requirement → done / verified how (one line each)
- Anything skipped or assumed, and why
- Branch name and link

Follow the repo's convention for finished specs. Some keep them as a decision log, others delete them after merge
(git keeps the history). If there's no convention, leave the spec in place and mention the choice.

Finally, if you learned durable facts (names, dates, rules, conventions) that future sessions would need, offer to add them
to `CLAUDE.md`, so nobody has to re-explain them next time.

## Follow-up edits

When the user reviews and sends changes, collect them all, apply them in one pass, update the spec if requirements
changed, re-verify what they affect, and push once. Small copy tweaks don't need a new spec; just make them.
