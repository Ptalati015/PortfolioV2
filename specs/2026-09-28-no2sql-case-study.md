# Spec: No2SQL case study, project proof links, "How I work"

## Context
The portfolio lists what Preet built but doesn't show how he thinks. Recruiters for engineering roles that involve owning
problems and working directly with users respond to judgment (tradeoffs, decisions) and proof (links they can click). This
change adds one deep case study (No2SQL, the strongest project), links to real repos and packages on the project cards, and a
short "How I work" section that tells the discover → ship story using real examples from the resume.

Sources: the No2SQL repo (README, `docs/No2SQL_Specification.docx`, source code), the NuGet page, Preet's public GitHub
repos, and `CLAUDE.md`.

## Requirements
R1. A new page `projects/no2sql.html` presents a No2SQL case study with these sections: Problem · Approach ·
    Architecture · Key decisions · Results.
R2. The case study only states facts found in the No2SQL repo, NuGet page or resume (see "Facts used" below).
R3. The case study page uses the site's existing theme (`index.css`, same colors) and has a clear way back to the portfolio.
R4. The No2SQL card on the home page links to: **Case study**, **GitHub**, **NuGet**.
R5. Project cards that have a public repo link to it: MCP Server Weather Insights → `MCP_DEMO`, STAY SAFE → `stay-safe`,
    Traffic Crashes Analysis → `viz-data-chicago-traffic-people`. Cards without a public repo show no links.
R6. External links open in a new tab with `rel="noopener"`.
R7. A "How I work" section sits between About and Experience with 4 steps (Discover → Scope → Build → Ship & iterate).
    Each step has one line and one real example taken from the resume or the site.
R8. Layout works at 1280px and 375px wide with no horizontal scroll and no JS errors, on both pages.

## Facts used in the case study (all from the repo, spec doc or NuGet)
- Problem: migrating MongoDB → SQL means hand-inspecting collections, guessing which fields are foreign keys, and
  hand-writing CREATE TABLE and INSERT scripts and ER diagrams.
- Inference: samples up to 300 documents per collection. It flags ID-like fields by name pattern (`*_id` / `*Id`), normalizes
  ID values, and matches them against other collections' primary keys. Confidence = matched values ÷ total values.
- Overrides: users can correct or add relationships (`GenerateSqlSchemaAdvanced`), because inference is heuristic.
- Seeders: two-pass streaming. Pass 1 finds a deterministic column order, pass 2 emits independent INSERT chunks with
  bounded memory. Nested arrays and documents are stored as JSON.
- Output: MySQL DDL with foreign keys, INSERT seeds, and ERDs in Mermaid, PlantUML and GraphViz DOT.
- Security: optional database allowlist, system databases (`admin`, `config`, `local`) blocked by default, identifier
  validation (format, max length 128), and prompt-injection marker detection.
- Architecture: .NET 10 MCP host (stdio) plus 5 libraries: Core (analysis), Sql (scripts), Visuals (ERDs), Utils, and a Test
  harness. Works with GitHub Copilot, VS Code and Claude Desktop.
- Delivery: self-contained native executables inside the NuGet package (no .NET install needed) for win-x64, win-arm64,
  linux-x64, linux-arm64, linux-musl-x64 and osx-arm64. MIT licensed.
- CI gates: release build, vulnerable-package scan, gitleaks secret scan, a "no .pdb files in package" check, and MCP manifest
  verification.
- Results: 10 MCP tools, 5 published versions (0.1.0 → 1.0.3, May–Jun 2026), 1.1K+ NuGet downloads.

## Decisions & assumptions
- Decided: the case study is a separate page (shareable URL, room for detail), not a popup.
- Assumed: the architecture diagram is built in HTML/CSS boxes (no image files), styled with the site colors.
- Decided (user): the download count is shown as "1.1K+ downloads (NuGet)". It will change over time, so it's labeled with its source.
- Decided (user): the page opens with the product problem, with no personal backstory.
- Decided (user): no "What's next" section.
- Assumed: Poker, HTTP Server and MovieLens get no links (no public repos; probably coursework).
- Assumed: the nav stays as is (no new "How I work" nav link) to keep it short.

## Out of scope
- Case studies for other projects (Gyfr, DLIFLC); those come next once this format is approved.
- Filter chips, analytics, new images or screenshots.
- Any change to colors, fonts or existing section content.

## Changes
- `projects/no2sql.html` (new): links `../index.css` and `../favicon.ico`. Minimal header (PT logo + "← Back to portfolio").
  Content uses the existing `.section`, `.container`, `.card`, `.experience-achievements` and `.tech-tag` classes. Header
  links to GitHub and NuGet.
- `index.html`:
  - Add a `.project-links` row to the 4 cards listed in R4/R5.
  - Add a `#how-i-work` section after About with 4 `.skill-item`-style step cards.
- `index.css`: add `.project-links`/`.project-link` (outline pill in the primary color, like `.skill-chip`), `.steps` grid,
  `.step-number`, `.case-*` diagram boxes, and a back-link style. Only existing color variables are used.
- `CLAUDE.md`: note the new page and the project → repo mapping.

## Acceptance criteria / verification
- R1, R3: open `projects/no2sql.html`, check all section headings are present and the back link returns to `index.html`.
- R2: manual check of each claim against the facts list above. Grep for numbers not in that list.
- R4, R5: count `.project-link` elements per card (No2SQL 3, Weather 1, STAY SAFE 1, Traffic 1, others 0). Each URL is
  checked with a request that returns 200.
- R6: grep that every `target="_blank"` has `rel="noopener"`.
- R7: section order is About → How I work → Experience. Each example traces to the resume or `CLAUDE.md`.
- R8: Playwright screenshots of both pages at 1280 and 375 widths, with scrollWidth equal to innerWidth and no page errors.
  Screenshots are sent to Preet before any PR.
