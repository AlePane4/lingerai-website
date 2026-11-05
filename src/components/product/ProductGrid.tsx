import type { Product } from "@/data/products";
import type { Translator } from "@/i18n/translate";
import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

/** Regular ruled grid (design-system §3.8): 2 / 3 / 4 columns, 1 large column for 1–2 pieces on mobile. */
export function ProductGrid({
  items,
  t,
  heading = "h3",
  priorityCount = 0,
  labelledBy,
}: {
  items: Product[];
  t: Translator;
  heading?: "h2" | "h3";
  priorityCount?: number;
  labelledBy?: string;
}) {
  const large = items.length <= 2;
  return (
    <ul role="list" className={`${styles.grid} ${large ? styles.few : ""}`} aria-labelledby={labelledBy}>
      {items.map((p, i) => (
        <li key={p.id} className={styles.cell}>
          <ProductCard product={p} t={t} heading={heading} large={large} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
