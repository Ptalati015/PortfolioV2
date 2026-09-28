# PortfolioV2

Personal portfolio for Preet Talati. Static site: `index.html` + `index.css`, no framework and no build step. (Bootstrap was removed in Sep 2026. The few
styles it provided are copied at the top of `index.css` under `:where(.home)`; the home page's `<body>` has class `home`.)
Case study pages live in `projects/` (currently `projects/no2sql.html`). They link `../index.css` and add `.case-*` classes.
Feature specs live in `specs/` while in progress. Delete a spec once its PR is merged (git keeps the history); the folder
stays with a `.gitkeep`.
Assets live in `assets/` (`image.jpg` original headshot, served as `image-480.webp`/`image-960.webp`/`image-960.jpg` via
`<picture>`; regenerate those with Pillow if the photo changes, `Preet_Talati_Resume.pdf` for the hero download button).

## Audience and voice
- Written for recruiters and hiring managers for Software Engineer, Forward Deployed Engineer and Product Engineer roles.
  **Never name those titles on the page.** Show the traits instead: works directly with users/stakeholders, owns problems
  end to end (discovery → architecture → production), ships 0→1, integrates with enterprise systems, works inside security
  and compliance constraints.
- Bullets start with a bolded verb: `<strong>Built</strong> ...`. Use present tense for the current role and past tense for earlier ones.
- Plain, specific wording. No buzzword stacking.

## Facts (source of truth)
- **Use only facts from Preet's resume or this file. Never invent metrics.** Approved numbers: ~25% SQL query performance,
  40% app performance (metrics instrumentation at Gyfr), 10,000+ users, 50+ API routes, 100+ students (TA).
  Do not use the old claims: 30% IIS load times, 40% user retention, 40% deployment efficiency.
- **DLIFLC** (Defense Language Institute Foreign Language Center). Preet is a contractor there through **NexTech**, shown as
  a small note under the DLIFLC heading, not as the employer heading.
  - Senior Software Developer, Aug 2026 – Present. Title only: no "Project Lead", no "Promoted".
  - Software Developer, Aug 2024 – Aug 2026.
- **Gyfr** (fitness platform, web + mobile): CTO Feb 2025 – Aug 2026 (ended); Lead Software Developer Jun 2024 – Feb 2025.
- **UIC**: B.S. Computer Science, Summa Cum Laude, GPA 3.92/4.0; Teaching Assistant Jun 2023 – May 2024.
- Certifications: CompTIA Security+, Agile Foundations, The Complete 2024 Web Development Bootcamp.
- Database at DLIFLC is SQL Server (not MySQL).
- Public repos linked from project cards: No2SQL → `Ptalati015/No2SQL` (+ NuGet `No2SQL`), Weather MCP → `MCP_DEMO`,
  STAY SAFE → `stay-safe`, Traffic Crashes → `viz-data-chicago-traffic-people`. Poker, HTTP Server and MovieLens have no
  public repo, so they get no links.
- No2SQL facts come from its repo README and `docs/No2SQL_Specification.docx`. Its NuGet download count (1.1K+ as of
  Sep 2026) is labeled "on NuGet" because it changes.

## Design rules
- Text must pass WCAG AA contrast (4.5:1). The dark red `--secondary-color` is for backgrounds/accents only, never text.
- Keep the existing dark theme and orange→red palette (`--primary-color: #f27c22`, `--secondary-color: #8c1414`,
  `--gradient` in `index.css`). Don't introduce new colors.
- Reuse existing classes: `.card`, `.experience-item`, `.experience-subrole`, `.experience-note`, `.skill-item`, `.tech-tag`,
  `.cta-button` / `.cta-outline`.
- Multi-role employers use one `.experience-item` with a `.experience-company` heading and a `.experience-subrole` per role.
- Section order: Hero → About → How I Work → Experience → Projects → Skills → Contact.
- The hero has no tagline paragraph (removed on purpose). It has name, skill chips and two buttons.
- `.hero-content` is shifted left by `translateX(-7rem)` on wide screens. Anything wide added to the hero needs a
  `max-width`, or it clips on the left edge.

## Workflow
- Work on a new branch off the latest `main`, never directly on `main`.
- **Merge rule (approved by Preet):** once Preet approves the screenshots ("looks good", "ship it" or similar), open the
  PR and merge it into `main` without asking again. If the UI already opened a PR for the branch, merge that one. If Preet
  asks for changes, make them, re-check, send new screenshots, and wait for approval again. Never merge before approval.
- **Checks** (tools are pre-installed by `.claude/hooks/session-start.sh` in cloud sessions; locally run `npm install` in `tools/`):
  - `cd tools && npm run check`: renders every page (`index.html` + `projects/*.html`) at 1280px and 375px, saves
    screenshots to `tools/out/`, and fails on horizontal scroll or JS errors.
  - `cd tools && npm run lighthouse`: fails if accessibility, best practices or SEO fall below 100, or performance below 95.
  - Run both before pushing any change that affects the page, and send the screenshots from `tools/out/` to Preet.
- Accessibility is a requirement: new motion must be skipped under `prefers-reduced-motion`, new buttons need an
  accessible name, and decorative emoji get `aria-hidden="true"`.
- Use `/spec-driven-dev` (or plan mode) for new features and multi-section rewrites; small copy edits can go straight to
  the change.
