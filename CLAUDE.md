# PortfolioV2

Personal portfolio for Preet Talati. Static site: `index.html` + `index.css`, Bootstrap 5.2.3 from CDN, no build step.
Case study pages live in `projects/` (currently `projects/no2sql.html`). They link `../index.css` and add `.case-*` classes.
Feature specs live in `specs/`.
Assets live in `assets/` (`image.jpg` headshot, `Preet_Talati_Resume.pdf` for the hero download button).

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
- Work on a new branch, never directly on `main`. Open a PR only when asked.
- Before pushing a visual change, check it at 1280px and 375px wide with Playwright (Chromium at
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` in cloud sessions; serve with `python3 -m http.server`).
  Confirm there's no horizontal scroll and no JS errors (Bootstrap CDN errors are expected when the sandbox blocks the network).
  Send the screenshots to Preet before opening a PR.
- Use plan mode for multi-section rewrites; small copy edits can go straight to the change.
