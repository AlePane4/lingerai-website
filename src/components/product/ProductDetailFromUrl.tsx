"use client";

import { useSearchParams } from "next/navigation";
import type { Product } from "@/data/products";
import { ProductDetail } from "./ProductDetail";

/** Reads ?color= (shared links, "complete the set"). Rendered inside <Suspense>. */
export function ProductDetailFromUrl({ product }: { product: Product }) {
  const colour = useSearchParams().get("color");
  return <ProductDetail key={colour ?? "default"} product={product} colourParam={colour} />;
}
