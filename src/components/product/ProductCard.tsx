import Link from "next/link";
import type { Product } from "@/data/products";
import { darkSwatches, isColourSoldOut, isProductSoldOut } from "@/data/catalog";
import type { Translator } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { Media } from "./Media";
import styles from "./ProductCard.module.css";

type HeadingLevel = "h2" | "h3";

/** Standard product card (design-system §3.7): the whole card is one link, one tab stop. */
export function ProductCard({
  product,
  t,
  heading = "h3",
  large = false,
  priority = false,
}: {
  product: Product;
  t: Translator;
  heading?: HeadingLevel;
  large?: boolean;
  priority?: boolean;
}) {
  const Heading = heading;
  const soldOut = isProductSoldOut(product);
  return (
    <Link href={href(t.lang, { kind: "product", id: product.id })} className={`${styles.card} ${large ? styles.large : ""}`}>
      <div className={styles.mediaWrap}>
        {product.lowStock && !soldOut && (
          <span className={`${styles.badge} tag`} data-signal="">
            {t("card.lowStock")}
          </span>
        )}
        <Media
          product={product}
          alt=""
          priority={priority}
          sizes={large ? "(min-width: 48rem) 50vw, 100vw" : "(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"}
        />
      </div>
      {/* Every image is still a placeholder drawing. */}
      <span className={`t-label ${styles.caption}`} aria-hidden="true">
        {t("card.placeholderCaption")}
      </span>
      <Heading className={`t-name ${styles.name}`}>{product.name}</Heading>
      <span className={`t-meta t-muted ${styles.type}`}>{t(product.typeKey)}</span>
      <span className={`t-data ${styles.price}`}>{t.price(product.price)}</span>
      <span className={styles.colours}>
        <span className={styles.swatches} aria-hidden="true">
          {product.colours.map((c) => (
            <span
              key={c.id}
              className={`${styles.swatch} ${isColourSoldOut(product, c.id) ? styles.struck : ""} ${darkSwatches.includes(c.id) ? styles.dark : ""}`}
              style={{ background: `var(--swatch-${c.id})` }}
            />
          ))}
        </span>
        <span className="t-meta t-muted">{t.plural("card.colours", product.colours.length)}</span>
      </span>
      {soldOut && <span className={`t-label tag ${styles.soldOut}`}>{t("card.soldOut")}</span>}
    </Link>
  );
}
