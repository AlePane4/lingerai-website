// Static build for GitHub Pages: https://alepane4.github.io/lingerai-website/
// Sets the env vars, runs `next build` (output: "export", see next.config.ts) and adds the root redirect page.
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = "/lingerai-website";
const env = { ...process.env, GITHUB_PAGES: "true", NEXT_PUBLIC_GITHUB_PAGES: "true", NEXT_PUBLIC_BASE_PATH: BASE };

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextBin, "build"], { env, stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

const out = join(process.cwd(), "out");

// "/" -> /it/ or /en/: saved language cookie, else browser language (it* -> it, else en).
const rootPage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>LINGERAI</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="1; url=${BASE}/it/">
<script>
(function () {
  var m = document.cookie.match(/(?:^|; )lingerai-lang=(it|en)/);
  var lang = m ? m[1] : /^it/i.test(navigator.language || "") ? "it" : "en";
  location.replace("${BASE}/" + lang + "/" + location.search + location.hash);
})();
</script>
</head>
<body>
<p><a href="${BASE}/it/">LINGERAI</a> &middot; <a href="${BASE}/it/">Italiano</a> &middot; <a href="${BASE}/en/">English</a></p>
</body>
</html>
`;
writeFileSync(join(out, "index.html"), rootPage);

// GitHub Pages serves /404.html for unknown URLs: use the branded English not-found page (Next only emits a bare default).
const notFound = join(out, "404.html");
const branded = join(out, "en", "page-not-found", "index.html");
if (existsSync(branded)) copyFileSync(branded, notFound);
if (!existsSync(join(out, ".nojekyll"))) writeFileSync(join(out, ".nojekyll"), "");
// The client prefetches route segments as dotted names (__next.$d$lang.$c$path.__PAGE__.txt) while the
// export writes them in nested folders (__next.$d$lang/$c$path/__PAGE__.txt): add the dotted copies,
// otherwise every prefetch is a 404 on a static host.
function addDottedSegmentFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      const walk = (d, prefix) => {
        for (const e of readdirSync(d, { withFileTypes: true })) {
          if (e.isDirectory()) walk(join(d, e.name), prefix + e.name + ".");
          else copyFileSync(join(d, e.name), join(dir, prefix + e.name));
        }
      };
      walk(full, entry.name + ".");
    } else if (entry.name !== "_next") addDottedSegmentFiles(full);
  }
}
addDottedSegmentFiles(out);
console.log("GitHub Pages build ready in out/");
