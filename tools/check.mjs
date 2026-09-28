// Renders every page at desktop (1280px) and mobile (375px) widths.
// Saves full-page screenshots to tools/out/ and fails on horizontal scroll or JS errors.
// Usage: npm run check            (from tools/)
import fs from "node:fs";
import { chromium } from "playwright";
import { serve, pages, chromePath, outDir } from "./serve.mjs";

fs.mkdirSync(outDir, { recursive: true });
const { server, base } = await serve();
const browser = await chromium.launch({ executablePath: chromePath });
const widths = { desktop: 1280, mobile: 375 };
let failed = false;

for (const page of pages()) {
  for (const [label, width] of Object.entries(widths)) {
    // Reduced motion shows the final state immediately, so screenshots aren't caught mid-animation.
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(`${base}/${page}`, { waitUntil: "networkidle" });
    const [scrollWidth, innerWidth] = await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
    const shot = `${outDir}/${page.replace(/[\/.]/g, "_")}-${label}.png`;
    await p.screenshot({ path: shot, fullPage: true });
    const ok = scrollWidth <= innerWidth && errors.length === 0;
    if (!ok) failed = true;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${page} @ ${width}px` +
        (scrollWidth > innerWidth ? `  horizontal scroll (${scrollWidth} > ${innerWidth})` : "") +
        (errors.length ? `  JS errors: ${errors.join(" | ")}` : "")
    );
    await ctx.close();
  }
}

await browser.close();
server.close();
console.log(`Screenshots: ${outDir}`);
process.exit(failed ? 1 : 0);
