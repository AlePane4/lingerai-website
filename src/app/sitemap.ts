import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { allRoutes, href, noindexPages, type Route } from "@/i18n/routes";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Every indexable page in IT and EN, with hreflang alternates (it, en-GB, x-default → it).
export default function sitemap(): MetadataRoute.Sitemap {
  const home: Route = { kind: "home" };
  const routes: Route[] = [home, ...allRoutes()].filter(
    (r) => r.kind !== "page" || !noindexPages.includes(r.page),
  );
  return routes.flatMap((route) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[htmlLang[l]] = SITE_URL + href(l, route);
    languages["x-default"] = SITE_URL + href("it", route);
    return locales.map((lang) => ({
      url: SITE_URL + href(lang, route),
      alternates: { languages },
    }));
  });
}
