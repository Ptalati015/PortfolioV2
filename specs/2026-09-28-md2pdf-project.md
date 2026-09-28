# Spec: Add MD2PDF to Projects

## Context
Preet built MD2PDF, an in-browser Markdown-to-PDF editor, to stop bouncing between third-party converters and AI tools
(extra steps, privacy tradeoffs). It's live and public, a user-facing product he designed from a real annoyance, which is
exactly the "own the problem end to end" story the site tells. It gets a project card with proof links.

Sources: Preet's post (message on 2026-09-28), the repo `Ptalati015/MD2PDF` (code checked), and the live site
https://md2pdf-io.vercel.app/.

## Requirements
R1. A new MD2PDF card in the Projects grid, placed per the decision below, using the existing `.card` markup.
R2. 3–4 outcome-first bullets, plain wording, no emoji, each backed by the code:
    - Why: fully in-browser, so nothing is uploaded and no data leaves the machine.
    - Live split editor with synchronized scrolling between Markdown and an A4 preview; Split, Focus-editor and Preview layouts.
    - Safety and output quality: GitHub-flavored Markdown sanitized with DOMPurify against XSS; page breaks that
      don't split a heading or list item across pages.
    - Usability: drag-and-drop a `.md` file for instant export, custom text colors, and a step-by-step first-run guide.
R3. Tech tags: React 19, TypeScript, Tailwind CSS, Vite, Marked, jsPDF, DOMPurify.
R4. Links: **Live demo** → https://md2pdf-io.vercel.app/ and **GitHub** → https://github.com/Ptalati015/MD2PDF
    (both `target="_blank" rel="noopener"`, existing `.project-link` style).
R5. The Skills section's Frontend group adds Tailwind CSS and Vite. Both are now shown in real work.
R7. `projects/md2pdf.html` case study: sections Problem · Approach · Architecture · Key decisions · Results. The card
    links to it ("Case study →"). No metrics are invented; Results lists shipped capabilities, not usage numbers.
R6. `npm run check` and `npm run lighthouse` pass (Lighthouse stays at 100/100/100/100).

## Facts checked in the code
Synced scroll (`App.tsx`), DOMPurify sanitize with GFM (`useMarkdownParser.ts`), color apply/remove (`Toolbar.tsx`),
heading and list-item page-break avoidance (`utils/pagination.ts`), `.md` drop zone (`FileDropZone.tsx`),
guide steps (`FeatureGuideModal.tsx`), and PDF export via html2canvas and jsPDF, A4 (`usePdfGenerator.ts`).

## Decisions & assumptions
- Decided (user): placed **second**, right after No2SQL.
- Decided (user): card **and** a case study page `projects/md2pdf.html`, same format as No2SQL (Problem, Approach,
  Architecture, Key decisions, Results) and using only facts found in the code or Preet's post.
- Assumed: the LinkedIn short link (`lnkd.in/...`) isn't used. The direct Vercel URL is clearer and doesn't redirect.
- Decided (user): Preet confirmed the live URL works.
- "Interactive toolbar" is covered by the bullets rather than claimed on its own (it's a hard claim to make concrete).

## Out of scope
- Changes to the MD2PDF repo itself (see notes for Preet in the report).

## Changes
- `index.html`: new card after `<!-- No2SQL -->`; Tailwind CSS and Vite added to the Frontend skills list.
- `CLAUDE.md`: add MD2PDF → `Ptalati015/MD2PDF` + the live URL to the repo mapping.

## Acceptance criteria / verification
- R1–R4: the card is second in `#projects .card`, has 2 `.project-link`s with the right hrefs, and no emoji inside it.
- R5: the Frontend list includes "Tailwind CSS" and "Vite".
- R6: `cd tools && npm run check && npm run lighthouse` exit 0. Screenshots sent before merging.
