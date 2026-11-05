"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { categories } from "@/data/catalog";
import { useBag } from "./BagProvider";
import styles from "./BagPage.module.css";

// STAGE A: title + empty state only. Lines, summary and checkout arrive in stage B.
export function BagPage() {
  const t = useT();
  const { ready, count } = useBag();
  return (
    <div className={styles.page}>
      <h1 className="t-h2" aria-label={ready ? t.plural("bag.counter.sr", count) : t("bag.title")}>
        {t("bag.title")}{" "}
        <span className="t-data" aria-hidden="true">
          {ready ? t("bag.counter.count", { count }) : t("bag.counter.loading")}
        </span>
      </h1>
      {ready && count === 0 && (
        <div className={styles.empty}>
          <p>{t("bag.empty.body")}</p>
          <Link href={href(t.lang, { kind: "drop" })} className="btn btn-secondary">
            {t("bag.empty.cta")}
          </Link>
          <p className="t-label">{t("bag.empty.categories")}</p>
          <ul role="list" className={styles.cats}>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={href(t.lang, { kind: "category", category: c.id })} className="link-utility">
                  {t(c.navKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="t-meta t-muted">{t("demo.bagNote")}</p>
    </div>
  );
}
