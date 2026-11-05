import type { Metadata } from "next";
import { getProduct } from "@/data/catalog";
import { htmlLang, locales, type Locale } from "./config";
import { getTranslator } from "./messages";
import { href, type Route } from "./routes";

/** Title, description and hreflang alternates (it / en-GB) for a route. */
export function routeMetadata(lang: Locale, route: Route): Metadata {
  const t = getTranslator(lang);
  let title = "";
  let description: string | undefined;
  let noindex = false;

  switch (route.kind) {
    case "home":
      title = t("meta.home.title");
      description = t("meta.home.description");
      break;
    case "drop":
      title = t("meta.drop.title");
      description = t("meta.drop.description");
      break;
    case "category": {
      const category = t(`category.${route.category}.title`);
      title = t("meta.category.title", { category });
      description = t("meta.category.description", { category, intro: t(`category.${route.category}.intro`) });
      break;
    }
    case "product": {
      const p = getProduct(route.id)!;
      title = t("meta.product.title", { name: p.name, type: t(p.typeKey).toLocaleLowerCase(lang) });
      description = t("meta.product.description", { description: p.description[lang] });
      break;
    }
    case "page": {
      const key = `meta.${route.page}.title`;
      title = t(key);
      const descKey = `meta.${route.page}.description`;
      description = t.has(descKey) ? t(descKey) : ["shipping", "returns", "terms", "contact", "privacy"].includes(route.page) ? t("info.disclaimer") : undefined;
      noindex = route.page === "bag" || route.page === "checkout" || route.page === "confirmation";
      break;
    }
  }

  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = href(l, route);
  languages["x-default"] = href("it", route);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: href(lang, route), languages },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, locale: lang === "it" ? "it_IT" : "en_GB", type: "website" },
  };
}
