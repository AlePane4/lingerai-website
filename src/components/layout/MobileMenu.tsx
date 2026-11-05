"use client";

import Link from "next/link";
import { categories, categoryCount } from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { pad2 } from "@/i18n/translate";
import { href, type PageId } from "@/i18n/routes";
import { Dialog } from "@/components/ui/Dialog";
import { Arrowed } from "@/components/ui/Arrowed";
import { BagCounter } from "@/components/bag/BagCounter";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./MobileMenu.module.css";

const servicePages: { page: PageId; key: string }[] = [
  { page: "sizeGuide", key: "nav.sizeGuide" },
  { page: "about", key: "nav.about" },
  { page: "shipping", key: "nav.shipping" },
  { page: "returns", key: "nav.returns" },
  { page: "contact", key: "nav.contact" },
];

/** Full-screen menu (< 1024 px) as a modal <dialog> [R9]. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const titleId = "mobile-menu-title";

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId} variant="full">
      <div id="mobile-menu" className={styles.menu} onClick={(e) => (e.target as HTMLElement).closest("a") && onClose()}>
        <div className={styles.top}>
          <span id={titleId} className="sr-only">
            {t("a11y.menuDialog")}
          </span>
          <Link href={href(t.lang, { kind: "home" })} className={styles.logo} aria-label={t("a11y.logo")}>
            {t("common.brand")}
          </Link>
          <div className={styles.topUtils}>
            <BagCounter className={styles.util} />
            <button type="button" className={styles.util} onClick={onClose}>
              {t("nav.menu.close")}
            </button>
          </div>
        </div>

        <div className={styles.row}>
          <LanguageSwitcher />
        </div>

        <nav aria-label={t("a11y.nav.main")}>
          <ul role="list" className={styles.list}>
            <li>
              <Link href={href(t.lang, { kind: "drop" })} className={styles.big}>
                <Arrowed text={t("nav.dropArrow")} />
              </Link>
            </li>
            {categories.map((c) => {
              const n = categoryCount(c.id);
              const name = t(c.navKey);
              return (
                <li key={c.id}>
                  <Link
                    href={href(t.lang, { kind: "category", category: c.id })}
                    className={styles.big}
                    aria-label={t.plural("nav.count.sr", n, { category: name })}
                  >
                    <span>{name}</span>
                    <span className="t-data" aria-hidden="true">
                      {t("nav.count.visible", { count: pad2(n) })}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul role="list" className={styles.service}>
            {servicePages.map((s) => (
              <li key={s.page}>
                <Link href={href(t.lang, { kind: "page", page: s.page })} className={styles.util}>
                  {t(s.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Dialog>
  );
}
