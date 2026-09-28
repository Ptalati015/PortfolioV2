// Runs Lighthouse on every page and prints the four category scores.
// Fails if accessibility, best practices or SEO drop below 100, or performance below 95.
// Usage: npm run lighthouse       (from tools/)
import fs from "node:fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { serve, pages, chromePath, outDir } from "./serve.mjs";

const minimums = { performance: 95, accessibility: 100, "best-practices": 100, seo: 100 };
fs.mkdirSync(outDir, { recursive: true });
const { server, base } = await serve();
const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ["--headless=new", "--no-sandbox"] });
let failed = false;

for (const page of pages()) {
  const result = await lighthouse(`${base}/${page}`, {
    port: chrome.port,
    output: "html",
    logLevel: "error",
    onlyCategories: Object.keys(minimums),
  });
  fs.writeFileSync(`${outDir}/lighthouse-${page.replace(/[\/.]/g, "_")}.html`, result.report);
  const scores = Object.fromEntries(
    Object.values(result.lhr.categories).map((c) => [c.id, Math.round(c.score * 100)])
  );
  const low = Object.entries(minimums).filter(([id, min]) => scores[id] < min);
  if (low.length) failed = true;
  console.log(
    `${low.length ? "FAIL" : "PASS"}  ${page}  ` +
      Object.entries(scores).map(([id, s]) => `${id} ${s}`).join(" · ")
  );
}

await chrome.kill();
server.close();
console.log(`Full reports: ${outDir}`);
process.exit(failed ? 1 : 0);
