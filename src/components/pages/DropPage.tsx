import { Suspense } from "react";
import { products, sortSoldOutLast } from "@/data/catalog";
import type { Translator } from "@/i18n/translate";
import { WallTitle } from "@/components/ui/WallTitle";
import { Arrowed } from "@/components/ui/Arrowed";
import { ProductGrid } from "@/components/product/ProductGrid";
import { DropCatalog } from "@/components/drop/DropCatalog";
import styles from "./DropPage.module.css";

export function DropPage({ t }: { t: Translator }) {
  const [l1, l2, l3] = t("drop.intro").split("\n");
  return (
    <>
      <header className={styles.head}>
        <WallTitle wall={t("drop.wall")} label={t("drop.label")} />
        <div className={styles.meta}>
          <div className={`t-body-l ${styles.intro}`}>
            <p>
              {l1}
              <br />
              {l2}
              <span className={styles.line3}>
                <br />
                {l3}
              </span>
            </p>
            {/* Mobile: two lines + "Read on" disclosure */}
            <details className={styles.more}>
              <summary className="link-utility">
                <Arrowed text={t("drop.readMore")} />
              </summary>
              <p>{l3}</p>
            </details>
          </div>
          <p className={`t-data ${styles.count}`}>
            <span aria-hidden="true">{t("drop.count", { count: products.length })}</span>
            <span className="sr-only">{t.plural("drop.count.sr", products.length)}</span>
          </p>
        </div>
      </header>
      {/* Without JS (or before hydration) the full grid is shown; filters need the URL on the client. */}
      <Suspense fallback={<ProductGrid items={sortSoldOutLast(products)} t={t} />}>
        <DropCatalog />
      </Suspense>
    </>
  );
}
