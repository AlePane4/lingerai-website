/** True only in the static GitHub Pages build (see scripts/build-pages.mjs). */
export const IS_GITHUB_PAGES = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

/** Sub-path the site is served from ("" locally, "/lingerai-website" on GitHub Pages). */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix a root-relative asset path with the base path (next/link and next/image-with-loader do it, plain strings do not). */
export function withBase(path: string): string {
  return path.startsWith("/") && !path.startsWith(BASE_PATH + "/") ? BASE_PATH + path : path;
}

/** Public base URL (set NEXT_PUBLIC_SITE_URL when the demo gets a real address). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (IS_GITHUB_PAGES ? "https://alepane4.github.io/lingerai-website" : "http://localhost:3000")
).replace(/\/$/, "");

/**
 * The demo stays local or password-protected (docs/decisions.md): search engines must NOT index it.
 * To publish the site for real: set ALLOW_INDEXING to true (robots.txt then allows crawling and
 * pages lose the global "noindex"), set NEXT_PUBLIC_SITE_URL, and review privacy/terms first.
 */
export const ALLOW_INDEXING = false;
