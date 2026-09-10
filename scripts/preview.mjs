#!/usr/bin/env node
// Minimal preview server that renders a Markdown file the way GitHub does,
// using `marked` for Markdown -> HTML and `github-markdown-css` for styling.
// Intended for local, visual review of the public profile before publishing.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { marked } from "marked";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

const target = process.argv[2] ?? "profile/README.md";
const host = process.env.PREVIEW_HOST ?? "0.0.0.0";
const port = Number(process.env.PREVIEW_PORT ?? process.env.PORT ?? 8080);

const cssPath = join(
  repoRoot,
  "node_modules",
  "github-markdown-css",
  "github-markdown.css",
);

function page(css, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Profile preview — ${target}</title>
    <style>
      body { margin: 0; background: #ffffff; }
      .markdown-body {
        box-sizing: border-box;
        max-width: 980px;
        margin: 0 auto;
        padding: 32px;
      }
      ${css}
    </style>
  </head>
  <body>
    <article class="markdown-body">${body}</article>
  </body>
</html>`;
}

const server = createServer(async (_req, res) => {
  try {
    const [source, css] = await Promise.all([
      readFile(resolve(repoRoot, target), "utf8"),
      readFile(cssPath, "utf8"),
    ]);
    const html = marked.parse(source, { gfm: true });
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(page(css, html));
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end(`Failed to render ${target}: ${error.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`Profile preview for ${target} at http://${host}:${port}`);
});
