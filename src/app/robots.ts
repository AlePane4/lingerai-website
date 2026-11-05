import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

// Demo: crawling is blocked. Flip ALLOW_INDEXING in src/lib/site.ts if the site is ever published.
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/it/borsa", "/en/bag", "/it/checkout", "/en/checkout"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
