import type { ReactNode } from "react";
import type { Translator } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { TextWithArrowLink } from "@/components/ui/Arrowed";
import { ClearDemoData } from "./ClearDemoData";
import styles from "./InfoPage.module.css";

export type InfoPageId = "shipping" | "returns" | "contact" | "terms" | "privacy";

interface Section {
  id: string;
  title: string;
  body: ReactNode;
}

const UPDATED = "05.11.2026";

function sections(page: InfoPageId, t: Translator): Section[] {
  const p = (key: string) => <p>{t(key)}</p>;
  const privacyLink = href(t.lang, { kind: "page", page: "privacy" });
  switch (page) {
    case "shipping":
      return [
        { id: "where", title: t("shipping.where.title"), body: p("shipping.where.body") },
        {
          id: "methods",
          title: t("shipping.methods.title"),
          body: (
            <>
              <ul role="list">
                <li>{t("shipping.methods.standard")}</li>
                <li>{t("shipping.methods.express")}</li>
              </ul>
              {p("shipping.methods.note")}
            </>
          ),
        },
        { id: "tracking", title: t("shipping.tracking.title"), body: p("shipping.tracking.body") },
      ];
    case "returns":
      return [
        { id: "window", title: t("returns.window.title"), body: p("returns.window.body") },
        { id: "hygiene", title: t("returns.hygiene.title"), body: p("returns.hygiene.body") },
        { id: "how", title: t("returns.how.title"), body: p("returns.how.body") },
        {
          id: "refund",
          title: t("returns.refund.title"),
          body: (
            <>
              {p("returns.refund.body")}
              <p className="t-meta t-muted">{t("returns.legal")}</p>
            </>
          ),
        },
      ];
    case "terms":
      return [
        { id: "what", title: t("terms.what.title"), body: p("terms.what.body") },
        { id: "sale", title: t("terms.sale.title"), body: p("terms.sale.body") },
        { id: "content", title: t("terms.content.title"), body: p("terms.content.body") },
        { id: "ip", title: t("terms.ip.title"), body: p("terms.ip.body") },
        {
          id: "data",
          title: t("terms.data.title"),
          body: (
            <p>
              <TextWithArrowLink text={t("terms.data.body")} href={privacyLink} className="link-inline" />
            </p>
          ),
        },
      ];
    case "privacy":
      return [
        { id: "sent", title: t("privacy.sent.title"), body: p("privacy.sent.body") },
        {
          id: "browser",
          title: t("privacy.browser.title"),
          body: (
            <>
              {p("privacy.browser.intro")}
              <ul role="list">
                <li>{t("privacy.browser.bag")}</li>
                <li>{t("privacy.browser.lang")}</li>
                <li>{t("privacy.browser.session")}</li>
              </ul>
            </>
          ),
        },
        // Placeholder by design until the analytics service is chosen (docs/copy/pages.md §13).
        { id: "analytics", title: t("privacy.analytics.title"), body: p("privacy.analytics.body") },
        {
          id: "delete",
          title: t("privacy.delete.title"),
          body: (
            <>
              {p("privacy.delete.body")}
              <ClearDemoData />
            </>
          ),
        },
      ];
    case "contact":
      return [
        {
          id: "email",
          title: t("contact.email.label"),
          body: (
            <>
              <p className="t-data">{t("contact.email.value")}</p>
              <p className="t-meta t-muted">{t("contact.email.note")}</p>
            </>
          ),
        },
      ];
  }
}

export function InfoPage({ t, page }: { t: Translator; page: InfoPageId }) {
  const list = sections(page, t);
  const intro = page === "contact" ? t("contact.intro") : null;
  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <h1 className="t-h1">{t(`${page}.title`)}</h1>
        <p className="t-meta t-muted">{t("info.updated", { date: UPDATED })}</p>
        <p className={styles.disclaimer}>{t("info.disclaimer")}</p>
        {intro && <p className="t-body-l">{intro}</p>}
      </header>

      {list.length > 3 && (
        <nav aria-labelledby="toc" className={styles.toc}>
          <h2 id="toc" className="t-label">
            {t("info.toc")}
          </h2>
          <ul role="list">
            {list.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={styles.tocLink}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className={styles.body}>
        {list.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={styles.section}>
            <h2 id={`${s.id}-title`} className="t-h3">
              {s.title}
            </h2>
            {s.body}
          </section>
        ))}
        {page !== "contact" && (
          <p className={styles.questions}>
            <TextWithArrowLink
              text={t("info.questions")}
              href={href(t.lang, { kind: "page", page: "contact" })}
              className="link-inline"
            />
          </p>
        )}
      </div>
    </article>
  );
}
