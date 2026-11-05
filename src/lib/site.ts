/** Public base URL (set NEXT_PUBLIC_SITE_URL when the demo gets a real address). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/**
 * The demo stays local or password-protected (docs/decisions.md): search engines must NOT index it.
 * To publish the site for real: set ALLOW_INDEXING to true (robots.txt then allows crawling and
 * pages lose the global "noindex"), set NEXT_PUBLIC_SITE_URL, and review privacy/terms first.
 */
export const ALLOW_INDEXING = false;
