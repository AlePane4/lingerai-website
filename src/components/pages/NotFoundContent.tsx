"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { HandNote } from "@/components/ui/HandNote";
import { WallTitle } from "@/components/ui/WallTitle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { CategoryList } from "./CategoryList";
import styles from "./NotFoundContent.module.css";

/** Localized 404 (design-system §3.20): language comes from the [lang] layout. */
export function NotFoundContent() {
  const t = useT();
  return (
    <div className={`${styles.page} zine`}>
      <title>{t("meta.notFound.title")}</title>
      <WallTitle wall={t("notFound.wall")} label={t("notFound.h1")} />
      <p className="t-body-l">{t("notFound.line")}</p>
      <HandNote text={t("handNotes.notFound")} className={styles.note} />
      <Link href={href(t.lang, { kind: "drop" })} className="btn btn-primary">
        {t("notFound.cta")}
      </Link>
      <div className={styles.cats}>
        <p className="t-label">{t("notFound.categories")}</p>
        <CategoryList t={t} compact />
      </div>
      <LanguageSwitcher />
    </div>
  );
}
