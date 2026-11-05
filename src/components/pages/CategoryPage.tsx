import Link from "next/link";
import { categories, getProductsByCategory, products } from "@/data/catalog";
import type { CategoryId } from "@/data/products";
import type { Translator } from "@/i18n/translate";
import { pad2 } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import styles from "./CategoryPage.module.css";

export function CategoryPage({ t, category }: { t: Translator; category: CategoryId }) {
  const items = getProductsByCategory(category);
  const title = t(`category.${category}.title`);
  const idx = categories.findIndex((c) => c.id === category);
  const prev = categories[(idx + categories.length - 1) % categories.length];
  const next = categories[(idx + 1) % categories.length];
  const [prevTpl, nextTpl] = t("category.prevNext").split(" · ");
  const dropName = t("nav.drop");

  return (
    <div className={styles.page}>
      <Breadcrumb t={t} items={[{ label: t("breadcrumb.home"), href: href(t.lang, { kind: "home" }) }, { label: title }]} />
      <header className={styles.head}>
        <h1 className={`t-h1 ${styles.title}`}>
          {title}{" "}
          <span className={`t-data ${styles.count}`} aria-hidden="true">
            {t("nav.count.visible", { count: pad2(items.length) })}
          </span>
          <span className="sr-only">, {t.plural("drop.count.sr", items.length)}</span>
        </h1>
        <p className={`t-meta ${styles.intro}`}>{t(`category.${category}.intro`)}</p>
      </header>

      {items.length > 0 ? (
        <ProductGrid items={items} t={t} heading="h2" priorityCount={2} />
      ) : (
        <p className="page-margin">{t("category.empty")}</p>
      )}

      <nav aria-labelledby="see-also" className={`page-margin ${styles.seeAlso}`}>
        <h2 id="see-also" className="t-label">
          {t("category.seeAlso")}
        </h2>
        <ul role="list" className={styles.seeList}>
          <li>
            <Link href={href(t.lang, { kind: "category", category: prev.id })} className="link-utility">
              <span aria-hidden="true">←</span>
              {prevTpl.replace("←", "").replace("{prev}", t(prev.navKey)).trim()}
            </Link>
          </li>
          <li>
            <Link href={href(t.lang, { kind: "category", category: next.id })} className="link-utility">
              {nextTpl.replace("→", "").replace("{next}", t(next.navKey)).trim()}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
          <li>
            <Link
              href={href(t.lang, { kind: "drop" })}
              className="link-utility"
              aria-label={t.plural("nav.count.sr", products.length, { category: dropName })}
            >
              {dropName}{" "}
              <span className="t-data" aria-hidden="true">
                {t("nav.count.visible", { count: pad2(products.length) })}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
