import Link from "next/link";
import { categories, categoryCount } from "@/data/catalog";
import type { CategoryId } from "@/data/products";
import type { Translator } from "@/i18n/translate";
import { pad2 } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import styles from "./CategoryList.module.css";

/** The 5 categories as big text entries with [04] counters (home, 404, empty states). */
export function CategoryList({ t, exclude, compact = false }: { t: Translator; exclude?: CategoryId; compact?: boolean }) {
  return (
    <ul role="list" className={`${styles.list} ${compact ? styles.compact : ""}`}>
      {categories
        .filter((c) => c.id !== exclude)
        .map((c) => {
          const n = categoryCount(c.id);
          const name = t(c.navKey);
          return (
            <li key={c.id}>
              <Link
                href={href(t.lang, { kind: "category", category: c.id })}
                className={styles.link}
                aria-label={t.plural("nav.count.sr", n, { category: name })}
              >
                <span className={styles.name}>{name}</span>
                <span className="t-data" aria-hidden="true">
                  {t("nav.count.visible", { count: pad2(n) })}
                </span>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
