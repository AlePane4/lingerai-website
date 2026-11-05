import Image from "next/image";
import { products, type Product } from "@/data/products";
import styles from "./Media.module.css";

export type View = "front" | "back" | "detail";
const VIEW_INDEX: Record<View, number> = { front: 1, back: 2, detail: 3 };

interface MediaProps {
  product: Product;
  view?: View;
  /** Empty string in cards (the link already has name and price). */
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * 4:5 media container (design-system §3.22): Cemento background, the grid lives in the drawing.
 * Products/views without an SVG get a generic placeholder: grid, crop marks, site labels and the name.
 * No new garments are drawn here.
 */
export function Media({ product, view = "front", alt, priority, sizes, className }: MediaProps) {
  const src = view === "front" ? product.drawing : undefined;
  return (
    <div className={`${styles.media} ${className ?? ""}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={1000}
          unoptimized
          priority={priority}
          sizes={sizes}
          className={styles.img}
        />
      ) : (
        <GenericDrawing product={product} view={view} alt={alt} />
      )}
    </div>
  );
}

function GenericDrawing({ product, view, alt }: { product: Product; view: View; alt: string }) {
  const nn = String(products.findIndex((p) => p.id === product.id) + 1).padStart(2, "0");
  const grid: string[] = [];
  for (let x = 40; x <= 760; x += 80) grid.push(`M${x} 100V900`);
  for (let y = 100; y <= 900; y += 80) grid.push(`M40 ${y}H760`);
  const crop = "M40 20V60M20 40H60M760 20V60M740 40H780M40 940V980M20 960H60M760 940V980M740 960H780";
  const label = { fontFamily: "var(--font-mono), ui-monospace, monospace", fontSize: 26, fontWeight: 500, letterSpacing: "0.06em", fill: "#111111" };
  return (
    <svg
      viewBox="0 0 800 1000"
      className={styles.img}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
    >
      <path d={grid.join("")} stroke="#111111" strokeOpacity="0.15" strokeWidth="1" fill="none" />
      <path d={crop} stroke="#111111" strokeWidth="1.5" fill="none" />
      <g aria-hidden="true" style={label}>
        <text x="40" y="78">{`${product.name} — ${nn}/13 — 4:5`}</text>
        <text x="760" y="78" textAnchor="end">
          GRID / 01
        </text>
        <text x="40" y="950" dy="-14">{`LG-${nn} / ${product.name}`}</text>
        <text x="760" y="950" dy="-14" textAnchor="end">{`V${VIEW_INDEX[view]}/3`}</text>
        <text x="400" y="510" textAnchor="middle" style={{ fontSize: 28 }}>
          {product.name}
        </text>
      </g>
    </svg>
  );
}
