"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { categories } from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { href, type Route } from "@/i18n/routes";
import { BagCounter } from "@/components/bag/BagCounter";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Arrowed } from "@/components/ui/Arrowed";
import styles from "./Header.module.css";

/** True when the pathname is the route or one of its children (category → product). */
export function useIsCurrent() {
  const pathname = usePathname();
  return (target: string, exact = false) =>
    exact ? pathname === target : pathname === target || pathname.startsWith(target + "/");
}

export function Header() {
  const t = useT();
  const isCurrent = useIsCurrent();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const pathname = usePathname();
  const home = href(t.lang, { kind: "home" });
  const drop: Route = { kind: "drop" };

  // Checkout: reduced header (logo, back to bag, language) — page-blueprints §7.
  if (pathname === href(t.lang, { kind: "page", page: "checkout" })) {
    return (
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link href={home} className={styles.logo} aria-label={t("a11y.logo")}>
            {t("common.brand")}
          </Link>
          <div className={styles.utils}>
            <Link href={href(t.lang, { kind: "page", page: "bag" })} className={styles.util}>
              <span>
                <Arrowed text={t("checkout.back")} />
              </span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link
            href={home}
            className={styles.logo}
            aria-label={t("a11y.logo")}
            aria-current={isCurrent(home, true) ? "page" : undefined}
          >
            {t("common.brand")}
          </Link>

          <nav aria-label={t("a11y.nav.main")} className={styles.nav}>
            <ul role="list" className={styles.navList}>
              {categories.map((c) => {
                const to = href(t.lang, { kind: "category", category: c.id });
                return (
                  <li key={c.id}>
                    <Link href={to} className={styles.navLink} aria-current={isCurrent(to) ? "page" : undefined}>
                      {t(c.navKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={href(t.lang, drop)}
              className={`${styles.navLink} ${styles.drop}`}
              aria-current={isCurrent(href(t.lang, drop)) ? "page" : undefined}
            >
              {t("nav.drop")}
            </Link>
          </nav>

          <div className={styles.utils}>
            <LanguageSwitcher className={styles.desktopOnly} />
            <button
              type="button"
              className={`${styles.util} ${styles.mobileOnly}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              {t("nav.menu.open")}
            </button>
            <BagCounter className={styles.util} main />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
