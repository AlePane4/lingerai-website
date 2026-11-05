import Link from "next/link";
import { Fragment } from "react";
import type { Translator } from "@/i18n/translate";

export interface Crumb {
  label: string;
  href?: string;
}

/** Text-only breadcrumb: LINGERAI / REGGISENI / AXIS. The last item is the current page. */
export function Breadcrumb({ items, t, className }: { items: Crumb[]; t: Translator; className?: string }) {
  return (
    <nav aria-label={t("a11y.nav.breadcrumb")} className={`breadcrumb t-ui ${className ?? ""}`}>
      <ol>
        {items.map((c, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <li aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
                {t("breadcrumb.separator")}
              </li>
            )}
            <li>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
