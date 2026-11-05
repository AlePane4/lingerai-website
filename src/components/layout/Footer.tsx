import Link from "next/link";
import type { Translator } from "@/i18n/translate";
import { href, type Route } from "@/i18n/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Footer.module.css";

const groups: { title: string; links: { key: string; route: Route }[] }[] = [
  {
    title: "footer.group.service",
    links: [
      { key: "nav.shipping", route: { kind: "page", page: "shipping" } },
      { key: "nav.returns", route: { kind: "page", page: "returns" } },
      { key: "nav.sizeGuide", route: { kind: "page", page: "sizeGuide" } },
      { key: "nav.contact", route: { kind: "page", page: "contact" } },
    ],
  },
  {
    title: "footer.group.brand",
    links: [
      { key: "nav.drop", route: { kind: "drop" } },
      { key: "nav.about", route: { kind: "page", page: "about" } },
    ],
  },
  {
    title: "footer.group.legal",
    links: [
      { key: "nav.terms", route: { kind: "page", page: "terms" } },
      { key: "nav.privacy", route: { kind: "page", page: "privacy" } },
    ],
  },
];

export function Footer({ t }: { t: Translator }) {
  return (
    <footer className={styles.footer}>
      <nav aria-label={t("a11y.nav.footer")} className={styles.groups}>
        {groups.map((g) => (
          <div key={g.title} className={styles.group}>
            <h2 className="t-label">{t(g.title)}</h2>
            <ul role="list">
              {g.links.map((l) => (
                <li key={l.key}>
                  <Link href={href(t.lang, l.route)} className={styles.link}>
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.group}>
          <h2 className="t-label">{t("footer.group.language")}</h2>
          <LanguageSwitcher />
        </div>
      </nav>
      <div className={styles.bottom}>
        <p className="t-meta">{t("demo.footer")}</p>
        <p className="t-meta">{t("footer.copyright", { year: 2026 })}</p>
      </div>
    </footer>
  );
}
