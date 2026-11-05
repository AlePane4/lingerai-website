import { Suspense } from "react";
import { products, sortSoldOutLast } from "@/data/catalog";
import type { Product } from "@/data/products";
import type { Translator } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductDetailFromUrl } from "@/components/product/ProductDetailFromUrl";
import { ProductGrid } from "@/components/product/ProductGrid";
import styles from "./ProductPage.module.css";

export function ProductPage({ t, product }: { t: Translator; product: Product }) {
  const related = sortSoldOutLast(products.filter((p) => p.id !== product.id && p.id !== product.setWith)).slice(0, 4);
  return (
    <div className={styles.page}>
      <Breadcrumb
        t={t}
        className={styles.crumb}
        items={[
          { label: t(`category.${product.category}.title`), href: href(t.lang, { kind: "category", category: product.category }) },
          { label: product.name },
        ]}
      />
      <Suspense fallback={<ProductDetail product={product} colourParam={null} />}>
        <ProductDetailFromUrl product={product} />
      </Suspense>
      <section aria-labelledby="related" className={styles.related}>
        <h2 id="related" className={`t-label page-margin ${styles.relatedTitle}`}>
          {t("product.related.title")}
        </h2>
        <ProductGrid items={related} t={t} />
      </section>
    </div>
  );
}
