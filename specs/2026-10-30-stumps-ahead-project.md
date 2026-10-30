# Spec: Add Stumps Ahead to Projects

## Context
Preet built Stumps Ahead, a mobile-browser T20 cricket game, by running a team of Claude Code agents in named roles
(product, developers, security, QA, research, docs) while he set priorities and approved every merge. The game is a
finished, playable product, and the way it was built shows something recruiters now look for: directing AI agents like a
lead (spec, owners, review gates, releases) instead of just prompting. It gets a card and a case study, and the Skills
section names the practice.

Sources: the private repo `Ptalati015/Stumps_Ahead` (README, SPEC.md, ROADMAP.md, CHANGELOG.md, source and tests, read
2026-10-30) and Preet's answers in this session.

## Requirements
R1. A Stumps Ahead card second in Projects (after No2SQL; MD2PDF moves to third), using the existing `.card` markup.
R2. Card bullets, plain wording, no emoji: what the game is; built with an orchestrated team of Claude Code agents with
    Preet approving merges; delivery pace (v1.0 two days after the first commit, then 16 releases in three days through
    65 merged pull requests); quality and safety (pure seeded engine, 175 tests, strict CSP, fictional names checked
    against real cricketers).
R3. Card links: **Case study →** (`projects/stumpsahead.html`) and **Live demo** (https://stumpsahead.vercel.app/).
    No GitHub link: the repo is private.
R4. Case study `projects/stumpsahead.html` in the No2SQL/MD2PDF format: The goal · How it was built (the agent team) ·
    How the orchestration works (key decisions) · Architecture · Results. All numbers come from the repo (below).
R5. Skills → AI & LLM names the practice: "Multi-agent orchestration (Claude Code)".
R6. `npm run check` and `npm run lighthouse` pass (Lighthouse stays at 100/100/100/100 on every page).

## Facts checked in the repo
- First commit 2026-10-22; v1.0.0 on 2026-10-24; 16 releases (1.0.0 → 1.4.8.2) dated 2026-10-24 to 2026-10-26;
  65 merged pull requests; 278 commits; full history (not shallow).
- 175 tests, all passing on Node 22 (`node --test tests/*.test.js`, run 2026-10-30).
- Roles (README + SPEC): Karen (product and spec, roadmap), Ayush (match engine and play screen), Joel (teams, names
  and UI screens), Dan (developer: mock-ups and animation polish), Mark (security and copyright), Violet (QA),
  Researcher (ideas backlog), Julie (docs, bug triage, release checks). Talati picks each release, adds requirements,
  approves merges to `main`.
- SPEC §6: interface contract and file ownership so developers work in parallel on separate branches; contract changes
  only by a spec PR. §8: release-blocker checklist. §9 plan to a 9am deadline; §10 cut list. Each release section has
  "Done when (Violet and Mark)".
- All randomness through `js/engine/rng.js` (seeded); engine modules are pure (no DOM) and tested in Node.
- Plain HTML, CSS and JavaScript ES modules, no framework, no runtime dependencies; match scene drawn with SVG;
  esbuild minified build with no source maps; Vercel with strict CSP, HSTS, nosniff, no framing.
- Seven nations, 14 real home grounds (two each, plain names, no sponsors); squads of 15 with fictional names
  generated every session; generator rejects a denylist of real cricketer surnames; QA script checks generated names.
- QA: `qa/smoke.mjs` headless mobile smoke test (Playwright); `qa/QA_CHECKLIST.md`.

## Decisions & assumptions
- Decided (Preet): second after No2SQL; card + case study; name Claude Code and the roles; add to Skills only.
- Unverified: the live URL can't be reached from the sandbox. It's the URL in the repo README; Preet should confirm it
  loads.
- Assumed: no personal "why I built it" story (none in the repo). The goal section uses the spec's stated goal and
  deadline.

## Out of scope
- Changes to the Stumps Ahead repo. About and How I Work sections.

## Changes
- `index.html`: new card after `<!-- No2SQL -->`; AI & LLM skills list updated.
- `projects/stumpsahead.html`: new case study page reusing `.case-*`, `.flow`, `.stats`, `.skills-grid` classes.
- `CLAUDE.md`: Stumps Ahead facts (private repo, live URL, where facts come from).

## Acceptance criteria / verification
- R1–R3: card is second in `#projects .card`; two `.project-link`s with the right hrefs; no emoji in the card.
- R4: page has the five sections; every number matches the facts list.
- R5: AI & LLM list contains "Multi-agent orchestration (Claude Code)".
- R6: `cd tools && npm run check && npm run lighthouse` exit 0; screenshots sent before merging.
