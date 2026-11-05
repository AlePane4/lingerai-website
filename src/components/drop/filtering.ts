import { BANDS, CUPS, LETTER_SIZES, isProductSoldOut, isSizeSoldOut, products, sizesFor } from "@/data/catalog";
import type { CategoryId, ColourId, Product } from "@/data/products";

export type SortId = "featured" | "price-asc" | "price-desc";
export const SORTS: SortId[] = ["featured", "price-asc", "price-desc"];

export interface FilterState {
  category: CategoryId[];
  size: string[];
  color: ColourId[];
  sort: SortId;
}

export const EMPTY: FilterState = { category: [], size: [], color: [], sort: "featured" };

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

/** URL keys and values are English in both languages (sitemap §1.5). */
export function parseFilters(params: URLSearchParams): FilterState {
  const sort = params.get("sort") as SortId | null;
  return {
    category: list(params.get("category")) as CategoryId[],
    size: list(params.get("size")),
    color: list(params.get("color")) as ColourId[],
    sort: sort && SORTS.includes(sort) ? sort : "featured",
  };
}

export function serializeFilters(f: FilterState): string {
  const p = new URLSearchParams();
  if (f.category.length) p.set("category", f.category.join(","));
  if (f.size.length) p.set("size", f.size.join(","));
  if (f.color.length) p.set("color", f.color.join(","));
  if (f.sort !== "featured") p.set("sort", f.sort);
  const s = p.toString().replace(/%2C/g, ",");
  return s ? `?${s}` : "";
}

function matchesCategory(p: Product, f: FilterState) {
  return !f.category.length || f.category.includes(p.category);
}
function matchesColour(p: Product, f: FilterState) {
  return !f.color.length || p.colours.some((c) => f.color.includes(c.id));
}
/** Size filter = available in that size (in a selected colour, if any). */
function matchesSize(p: Product, f: FilterState) {
  if (!f.size.length) return true;
  const colours = p.colours.filter((c) => !f.color.length || f.color.includes(c.id));
  return f.size.some((s) => sizesFor(p).includes(s) && colours.some((c) => !isSizeSoldOut(p, c.id, s)));
}

export function applyFilters(f: FilterState): Product[] {
  const out = products.filter((p) => matchesCategory(p, f) && matchesColour(p, f) && matchesSize(p, f));
  const sorted =
    f.sort === "price-asc"
      ? [...out].sort((a, b) => a.price - b.price)
      : f.sort === "price-desc"
        ? [...out].sort((a, b) => b.price - a.price)
        : out;
  // Sold-out pieces always last, editorial order otherwise.
  return [...sorted].sort((a, b) => Number(isProductSoldOut(a)) - Number(isProductSoldOut(b)));
}

/** Facet count: products matching the other groups plus this option. */
export function facetCount(f: FilterState, group: "category" | "size" | "color", value: string): number {
  const probe: FilterState = { ...f, [group]: [value] };
  return applyFilters(probe).length;
}

export const categoryOptions: CategoryId[] = ["bras", "briefs", "bodysuits", "slips", "accessories"];
export const colourOptions: ColourId[] = ["black", "graphite", "skin-01", "skin-02", "skin-03", "optic-white"];
export const letterOptions: string[] = [...LETTER_SIZES];
export const bandCupOptions: string[] = BANDS.flatMap((b) => CUPS.map((c) => `${b}${c}`));
