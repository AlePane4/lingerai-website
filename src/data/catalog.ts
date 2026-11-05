import { products, type CategoryId, type ColourId, type Product, type Measure } from "./products";

export const LETTER_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"] as const;
export const BANDS = [65, 70, 75, 80, 85, 90, 95] as const;
export const CUPS = ["A", "B", "C", "D", "E", "F", "G"] as const;
export const REFERENCE_SIZE = { letters: "M", bandCup: "75B" } as const;
/** Max quantity per size in the demo bag. */
export const MAX_QTY = 5;

export const categories: { id: CategoryId; navKey: string }[] = [
  { id: "bras", navKey: "nav.bras" },
  { id: "briefs", navKey: "nav.briefs" },
  { id: "bodysuits", navKey: "nav.bodysuits" },
  { id: "slips", navKey: "nav.slips" },
  { id: "accessories", navKey: "nav.accessories" },
];

export const colourKey: Record<ColourId, string> = {
  black: "colour.black",
  graphite: "colour.graphite",
  "skin-01": "colour.skin01",
  "skin-02": "colour.skin02",
  "skin-03": "colour.skin03",
  "optic-white": "colour.opticWhite",
};

/** Dark swatches get a light diagonal for "sold out" (design-system §1.2 [a11y]). */
export const darkSwatches: ColourId[] = ["black", "graphite", "skin-03"];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return sortSoldOutLast(products.filter((p) => p.category === category));
}

export function categoryCount(category: CategoryId): number {
  return products.filter((p) => p.category === category).length;
}

export function sizesFor(p: Product): string[] {
  if (p.sizeSystem === "letters") return [...LETTER_SIZES];
  return BANDS.flatMap((b) => CUPS.map((c) => `${b}${c}`));
}

export function isSizeSoldOut(p: Product, colour: ColourId, size: string): boolean {
  const v = p.colours.find((c) => c.id === colour);
  if (!v) return true;
  return v.soldOut.includes("*") || v.soldOut.includes(size);
}

export function isColourSoldOut(p: Product, colour: ColourId): boolean {
  return sizesFor(p).every((s) => isSizeSoldOut(p, colour, s));
}

export function isProductSoldOut(p: Product): boolean {
  return p.colours.every((c) => isColourSoldOut(p, c.id));
}

/** Another colour where the size is available, if any. */
export function altColourFor(p: Product, colour: ColourId, size: string): ColourId | undefined {
  return p.colours.find((c) => c.id !== colour && !isSizeSoldOut(p, c.id, size))?.id;
}

export function sortSoldOutLast(list: Product[]): Product[] {
  return [...list].sort((a, b) => Number(isProductSoldOut(a)) - Number(isProductSoldOut(b)));
}

/** Demo measurement in cm for a size. */
export function measureValue(p: Product, m: Measure, size: string): number {
  if ("step" in m) {
    const idx = LETTER_SIZES.indexOf(size as (typeof LETTER_SIZES)[number]);
    const ref = LETTER_SIZES.indexOf("M");
    return m.base + m.step * ((idx < 0 ? ref : idx) - ref);
  }
  const band = Number(size.slice(0, 2));
  const cup = CUPS.indexOf(size.slice(2) as (typeof CUPS)[number]);
  const bandIdx = BANDS.indexOf(band as (typeof BANDS)[number]);
  return m.base + m.stepBand * ((bandIdx < 0 ? 2 : bandIdx) - 2) + m.stepCup * ((cup < 0 ? 1 : cup) - 1);
}

export { products };
