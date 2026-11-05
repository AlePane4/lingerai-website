import type { Product } from "@/data/products";
import { getProduct, isSizeSoldOut, sizesFor } from "@/data/catalog";
import type { BagLine } from "@/lib/bagStore";

export interface ResolvedLine {
  key: string;
  line: BagLine;
  product?: Product;
  /** false when the product, colour or size left the catalogue or sold out. */
  available: boolean;
  unitPrice: number;
  total: number;
}

export function lineKey(l: Pick<BagLine, "id" | "colour" | "size">): string {
  return `${l.id}|${l.colour}|${l.size}`;
}

export function resolveLine(line: BagLine): ResolvedLine {
  const product = getProduct(line.id);
  const available =
    !!product &&
    product.colours.some((c) => c.id === line.colour) &&
    sizesFor(product).includes(line.size) &&
    !isSizeSoldOut(product, line.colour, line.size);
  const unitPrice = product?.price ?? 0;
  return { key: lineKey(line), line, product, available, unitPrice, total: available ? unitPrice * line.qty : 0 };
}

export function summarise(lines: BagLine[]) {
  const resolved = lines.map(resolveLine);
  return {
    resolved,
    subtotal: resolved.reduce((n, r) => n + r.total, 0),
    hasUnavailable: resolved.some((r) => !r.available),
    count: lines.reduce((n, l) => n + l.qty, 0),
  };
}
