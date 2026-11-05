"use client";

import { useId, useState, type ReactNode } from "react";
import type { ColourId } from "@/data/products";
import { colourKey, getProduct } from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { Arrowed } from "@/components/ui/Arrowed";
import styles from "./Checkout.module.css";

export interface SummaryLine {
  key: string;
  id: string;
  colour: ColourId;
  size: string;
  qty: number;
  total: number;
}

interface Props {
  lines: SummaryLine[];
  subtotal: number;
  /** 0 = free. */
  shipping: number;
  /** Mobile: closed disclosure "Summary — total ▾" (design-system §3.17). */
  collapsible?: boolean;
  header?: ReactNode;
  className?: string;
}

export function OrderSummary({ lines, subtotal, shipping, collapsible = false, header, className }: Props) {
  const t = useT();
  const id = useId();
  const [open, setOpen] = useState(false);
  const total = subtotal + shipping;

  return (
    <section aria-labelledby={`${id}-title`} className={`${styles.summary} ${className ?? ""}`}>
      {collapsible && (
        <button
          type="button"
          className={`btn btn-secondary btn-block ${styles.summaryToggle}`}
          aria-expanded={open}
          aria-controls={`${id}-body`}
          onClick={() => setOpen((o) => !o)}
        >
          <Arrowed text={`${t("checkout.summary.toggle", { total: t.price(total) })} ${open ? "▴" : "▾"}`} />
        </button>
      )}
      <div id={`${id}-body`} className={`${styles.summaryBody} ${collapsible && !open ? styles.summaryClosed : ""}`}>
        <h2 id={`${id}-title`} className="t-label">
          {t("checkout.summary.title")}
        </h2>
        {header}
        <p className="t-meta t-muted">{t.plural("checkout.summary.items", lines.reduce((n, l) => n + l.qty, 0))}</p>
        <ul role="list" className={styles.summaryLines}>
          {lines.map((l) => {
            const p = getProduct(l.id);
            return (
              <li key={l.key} className={styles.summaryLine}>
                <div>
                  <p className="t-name">{p?.name ?? l.id}</p>
                  {p && <p className="t-meta t-muted">{t(p.typeKey)}</p>}
                  <p className="t-data">{t("checkout.summary.line", { colour: t(colourKey[l.colour]), size: l.size, qty: l.qty })}</p>
                </div>
                <p className="t-data">{t.price(l.total)}</p>
              </li>
            );
          })}
        </ul>
        <dl className={styles.summaryTotals}>
          <div>
            <dt className="t-label">{t("checkout.summary.subtotal")}</dt>
            <dd className="t-data">{t.price(subtotal)}</dd>
          </div>
          <div>
            <dt className="t-label">{t("checkout.summary.shipping")}</dt>
            <dd className="t-data">{shipping ? t.price(shipping) : t("checkout.summary.shippingFree")}</dd>
          </div>
          <div className={styles.summaryGrand}>
            <dt className="t-label">{t("checkout.summary.total")}</dt>
            <dd>{t.price(total)}</dd>
          </div>
        </dl>
        <p className="t-meta t-muted">{t("checkout.summary.demoNote")}</p>
      </div>
    </section>
  );
}
