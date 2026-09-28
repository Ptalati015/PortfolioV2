# Spec: Performance and accessibility pass

## Context
A technical reviewer who runs Lighthouse (Google's site-quality audit) or tabs through the site should find it fast,
readable and usable without a mouse. Baseline Lighthouse, run locally on 2026-09-28:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home (`index.html`) | 95 | 93 | 96 | 100 |
| Case study (`projects/no2sql.html`) | 100 | 95 | 100 | 100 |

Real problems found:
- **Contrast:** dark red text (`#8c1414`) on tech tags and company names measures about 1.7–2.0:1; the minimum is 4.5:1.
- **Photo:** the 1440×1024 photo (162 KB) displays at about 430px wide and has no width/height attributes.
- **Bootstrap from CDN:** it blocks rendering for about 0.46s. Its JavaScript is unused, and its CSS only changes heading
  weight and nav spacing.
- **Motion:** the typing effect, cursor glow, parallax, fade-ins and smooth scrolling ignore the "reduce motion" setting.
- **Keyboard and screen readers:** the ☰ and ↑ buttons have no labels, the hidden ↑ button can still receive keyboard
  focus, there's no skip link or `main` landmark, and there's no visible focus style.

## Requirements
R1. Every text element passes WCAG AA contrast (4.5:1, or 3:1 for large text). Lighthouse `color-contrast` passes on both pages.
R2. The hero photo is served at display size: responsive `srcset` with WebP at 480w and 960w, plus a JPEG fallback,
    with `width`/`height` set, `alt` text, and `fetchpriority="high"`. The original stays in the repo.
R3. Unused Bootstrap JavaScript is removed. Bootstrap CSS is handled per the user's decision (see below).
R4. With `prefers-reduced-motion: reduce`:
    - the name shows immediately (no typing effect)
    - no cursor glow or parallax
    - no fade-in or hover-lift animations
    - scrolling jumps instead of animating
    With motion allowed, everything behaves as it does today.
R5. The cursor glow only runs on devices with a real mouse (`pointer: fine`), not on touch screens.
R6. Keyboard use:
    - a "Skip to content" link appears on first Tab
    - every interactive element shows a visible focus ring
    - the ☰ button has `aria-label`, `aria-expanded` and `aria-controls`; Escape closes the menu
    - the hidden ↑ button can't be reached by Tab
    - nav links move focus to their section and leave room for the fixed header
R7. Screen readers:
    - the name heading is read as "Preet Talati" even during the typing effect
    - decorative emoji in section headings are hidden (`aria-hidden`)
    - both pages have a `main` landmark
R8. Lighthouse targets on both pages: Accessibility 100, Best practices 100, SEO 100, Performance ≥ 95. Measured the
    same way as the baseline.
R9. The site looks the same as today (same colors, fonts, layout), except for the approved contrast fix and the
    Bootstrap decision.

## Decisions & assumptions
- Decided (user): tech tags keep their dark-red pill background with light gray text (`--text-gray`-family, ≥ 12:1); company names become light gray/white. Orange stays the accent.
- Decided (user): remove Bootstrap entirely and copy the styles it currently provides (heading weight, nav spacing, etc.), so the live look is unchanged apart from the contrast fix.
- Assumed: image variants are generated once with Pillow and committed (no build step, per `CLAUDE.md`).
- Assumed: hosting-level items (gzip compression, cache headers, CSS minification) are out of scope. They depend on the host
  (GitHub Pages already compresses) and would need a build step.
- Assumed: the site's own smooth-scroll JavaScript is replaced with CSS `scroll-behavior` plus `scroll-margin-top`. This keeps
  the smooth scroll, respects reduced motion, and lets anchor links move keyboard focus.

## Out of scope
- New content or sections; deleting the unused `portfolio_clip.mp3` (it isn't loaded by any page, so it doesn't affect speed).
- Server compression and caching, minification, font changes.

## Changes
- `index.html`:
  - remove Bootstrap JS (and the CSS if approved)
  - add a skip link and a `<main id="main">` wrapper
  - hero `<picture>` with `srcset`/`width`/`height`
  - ARIA on the ☰ and ↑ buttons, `aria-hidden` on heading emoji
  - rework the inline script: reduced-motion checks, `pointer: fine` check for the cursor glow, passive scroll listeners,
    Escape closes the menu, drop the JS smooth-scroll
- `projects/no2sql.html`: skip link, `aria-hidden` on decorative arrows (already done), `main id`.
- `index.css`:
  - `:focus-visible` ring in the primary color, `.skip-link`, `scroll-margin-top` on sections
  - `@media (prefers-reduced-motion: reduce)` block
  - hidden ↑ button gets `visibility: hidden`
  - contrast color fix
  - Bootstrap replacement rules if it's removed
- `assets/`: `image-480.webp`, `image-960.webp`, `image-960.jpg`.

## Acceptance criteria / verification
- R1, R8: rerun Lighthouse on both pages and record the new scores next to the baseline. `color-contrast` passes.
- R2: the `<picture>` markup exists and the browser downloads a ≤ 960w variant at 1280px wide (checked via Playwright
  network log).
- R3: grep shows no `bootstrap.bundle` (and no Bootstrap CSS if removed).
- R4, R5: Playwright with `reducedMotion: 'reduce'`: the h1 text is "Preet Talati" immediately, there's no `.cursor` element
  after moving the mouse, and computed `animation-name` on `.card` is `none`. With default motion: the typing effect still
  runs.
- R6: Playwright keyboard test: the first Tab focuses the skip link, Enter moves focus to `#main`, the ☰ button toggles
  `aria-expanded` and Escape closes the menu, and the hidden ↑ button isn't in the Tab order at the top of the page.
- R7: check the h1 `aria-label` and the emoji `aria-hidden` in the DOM.
- R9: before/after screenshots at 1280 and 375 on both pages, sent to Preet.

## Results (2026-09-28)
| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, before → after | 95 → **100** | 93 → **100** | 96 → **100** | 100 → **100** |
| Case study, before → after | 100 → **100** | 95 → **100** | 100 → **100** | 100 → **100** |

- R1 ✅ `color-contrast` passes (tags `#b0b0b0` on dark red ≈ 7:1; company names white).
- R2 ✅ `<picture>` with 480w/960w WebP; desktop and mobile both fetch `image-480.webp` (30 KB vs 162 KB).
- R3 ✅ no `bootstrap` references remain.
- R4/R5 ✅ with reduced motion the name is immediate, no cursor glow, no parallax, `animation-name: none`, `scroll-behavior: auto`.
  With motion allowed the typing effect and glow still run. No glow on touch devices.
- R6 ✅ the first Tab lands on the skip link (orange focus ring) and Enter focuses `#main`. The menu toggles `aria-expanded`,
  Escape closes it and returns focus to ☰, and choosing a link closes it. The hidden ↑ button isn't in the Tab order.
- R7 ✅ the h1 is labeled "Preet Talati" throughout, emoji are `aria-hidden`, and both pages have one `main`.
- R8 ✅ scores above (two runs each, identical).
- R9 ✅ a computed-style diff against the live site (Bootstrap loaded) on every element shows only the approved color
  changes plus a sub-pixel image-height rounding.
- Note: `scroll-margin-top` wasn't needed. Sections already have 6rem top padding, which clears the fixed header.
- Remaining Lighthouse suggestions are host-level (gzip, cache TTL) or need a build step (minification), so they're out of scope.
