// Tiny static server for the repo root, so the checks don't depend on python or a global tool.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const types = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".pdf": "application/pdf", ".json": "application/json",
};

export function serve(port = 0) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) return res.writeHead(404).end("Not found");
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) =>
    server.listen(port, "127.0.0.1", () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }))
  );
}

// Every HTML page of the site: index.html plus projects/*.html
export function pages() {
  const list = ["index.html"];
  const dir = path.join(root, "projects");
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).sort()) if (f.endsWith(".html")) list.push(`projects/${f}`);
  return list;
}

export const chromePath = process.env.CHROME_PATH || "/opt/pw-browsers/chromium";
export const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "out");
