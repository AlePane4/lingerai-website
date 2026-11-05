import type { CategoryId } from "@/data/products";
import { products } from "@/data/products";
import { getProduct } from "@/data/catalog";
import { locales, type Locale } from "./config";

export type PageId =
  | "bag"
  | "checkout"
  | "confirmation"
  | "sizeGuide"
  | "about"
  | "shipping"
  | "returns"
  | "contact"
  | "terms"
  | "privacy";

export type Route =
  | { kind: "home" }
  | { kind: "drop" }
  | { kind: "category"; category: CategoryId }
  | { kind: "product"; id: string }
  | { kind: "page"; page: PageId };

export const categorySlugs: Record<CategoryId, Record<Locale, string>> = {
  bras: { it: "reggiseni", en: "bras" },
  briefs: { it: "slip", en: "briefs" },
  bodysuits: { it: "body", en: "bodysuits" },
  slips: { it: "sottovesti", en: "slips" },
  accessories: { it: "accessori", en: "accessories" },
};

export const pageSlugs: Record<PageId, Record<Locale, string>> = {
  bag: { it: "borsa", en: "bag" },
  checkout: { it: "checkout", en: "checkout" },
  confirmation: { it: "checkout/conferma", en: "checkout/confirmation" },
  sizeGuide: { it: "guida-taglie", en: "size-guide" },
  about: { it: "chi-siamo", en: "about" },
  shipping: { it: "spedizioni", en: "shipping" },
  returns: { it: "resi", en: "returns" },
  contact: { it: "contatti", en: "contact" },
  terms: { it: "termini", en: "terms" },
  privacy: { it: "privacy", en: "privacy" },
};

/** Every page of the MVP. */
export const builtPages: PageId[] = ["bag", "checkout", "confirmation", "sizeGuide", "about", "shipping", "returns", "contact", "terms", "privacy"];

/** Pages kept out of search engines and the sitemap (personal / transactional). */
export const noindexPages: PageId[] = ["bag", "checkout", "confirmation"];

const DROP_SLUG = "drop/grid-01";

export function href(lang: Locale, route: Route): string {
  switch (route.kind) {
    case "home":
      return `/${lang}`;
    case "drop":
      return `/${lang}/${DROP_SLUG}`;
    case "category":
      return `/${lang}/${categorySlugs[route.category][lang]}`;
    case "product": {
      const p = getProduct(route.id);
      if (!p) return `/${lang}`;
      return `/${lang}/${categorySlugs[p.category][lang]}/${p.slug[lang]}`;
    }
    case "page":
      return `/${lang}/${pageSlugs[route.page][lang]}`;
  }
}

/** Resolve the path segments after /{lang}. Returns undefined for unknown paths. */
export function resolve(lang: Locale, segments: string[]): Route | undefined {
  let path: string;
  try {
    path = segments.map((s) => decodeURIComponent(s)).join("/");
  } catch {
    return undefined; // malformed escape sequence
  }
  if (path === "") return { kind: "home" };
  if (path === DROP_SLUG) return { kind: "drop" };
  for (const [id, slugs] of Object.entries(pageSlugs) as [PageId, Record<Locale, string>][]) {
    if (slugs[lang] === path) return { kind: "page", page: id };
  }
  const [cat, prod, ...rest] = path.split("/");
  const category = (Object.keys(categorySlugs) as CategoryId[]).find((c) => categorySlugs[c][lang] === cat);
  if (!category || rest.length) return undefined;
  if (!prod) return { kind: "category", category };
  const p = products.find((x) => x.category === category && x.slug[lang] === prod);
  return p ? { kind: "product", id: p.id } : undefined;
}

/** Equivalent pathname in another language (falls back to that language's home). */
export function translatePathname(pathname: string, target: Locale): string {
  const [, lang, ...segments] = pathname.split("/");
  if (!(locales as readonly string[]).includes(lang)) return `/${target}`;
  const route = resolve(lang as Locale, segments.filter(Boolean));
  return route ? href(target, route) : `/${target}`;
}

/** Every built route, for generateStaticParams and the sitemap. */
export function allRoutes(): Route[] {
  return [
    { kind: "drop" },
    ...(Object.keys(categorySlugs) as CategoryId[]).map((category) => ({ kind: "category" as const, category })),
    ...products.map((p) => ({ kind: "product" as const, id: p.id })),
    ...builtPages.map((page) => ({ kind: "page" as const, page })),
  ];
}

export function isBuilt(route: Route): boolean {
  return route.kind !== "page" || builtPages.includes(route.page);
}
