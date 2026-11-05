"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { htmlLang, locales, type Locale } from "@/i18n/config";
import { saveLanguage } from "@/lib/browserPrefs";
import { useT } from "@/i18n/I18nProvider";
import { translatePathname } from "@/i18n/routes";
import styles from "./LanguageSwitcher.module.css";

/** IT / EN — each code links to the equivalent page, keeping the query string. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();

  const choose = (e: React.MouseEvent<HTMLAnchorElement>, lang: Locale, target: string) => {
    // A language chosen by hand wins over the browser language on the next visit to "/".
    saveLanguage(lang);
    const search = window.location.search;
    if (search && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      router.push(target + search);
    }
  };

  return (
    <span className={`${styles.switcher} ${className ?? ""}`}>
      {locales.map((lang, i) => {
        const target = translatePathname(pathname, lang);
        const active = lang === t.lang;
        return (
          <span key={lang} className={styles.item}>
            {i > 0 && (
              <span aria-hidden="true" className={styles.sep}>
                {t("lang.separator")}
              </span>
            )}
            <Link
              href={target}
              lang={htmlLang[lang]}
              hrefLang={htmlLang[lang]}
              aria-label={t(`lang.${lang}.label`)}
              aria-current={active ? "true" : undefined}
              className={`${styles.link} ${active ? styles.active : ""}`}
              onClick={(e) => choose(e, lang, target)}
            >
              {t(`lang.${lang}.short`)}
            </Link>
          </span>
        );
      })}
    </span>
  );
}
