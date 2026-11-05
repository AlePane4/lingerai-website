"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { WallTitle } from "@/components/ui/WallTitle";
import { lineKey } from "@/components/bag/resolve";
import { parseOrder, readOrderRaw } from "@/lib/demoSession";
import { OrderSummary } from "./OrderSummary";
import styles from "./Checkout.module.css";

const noop = () => () => {};
const LOADING = "\u0000loading";

/** dd.mm.yyyy (page-blueprints §8: DEMO-0001 · 05.11.2026). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** Demo confirmation (page-blueprints §8). Reads the last order from this tab's sessionStorage. */
export function ConfirmationPage() {
  const t = useT();
  const L = t.lang;
  // Server/hydration: "loading"; client: the stored order (a reload shows the same summary).
  const raw = useSyncExternalStore(noop, readOrderRaw, () => LOADING);
  const order = useMemo(() => (raw === LOADING ? null : parseOrder(raw)), [raw]);

  if (raw === LOADING) return <div className={styles.page} />;

  if (!order) {
    return (
      <div className={`${styles.page} ${styles.stateBox}`}>
        <h1 className="t-h2">{t("confirmation.none")}</h1>
        <Link href={href(L, { kind: "drop" })} className="btn btn-primary">
          {t("confirmation.none.cta")}
        </Link>
      </div>
    );
  }

  const v = order.values;
  const cityLine = [v.postalCode, v.city, v.country === "IT" && v.province ? `(${v.province})` : ""].filter(Boolean).join(" ");

  return (
    <div className={styles.page}>
      <p className={styles.banner} data-signal="">
        {t("demo.banner.confirmation")}
      </p>
      <WallTitle wall={t("confirmation.wall")} label={t("confirmation.h1")} />
      <div className={styles.confirmation}>
        <div className={styles.confirmText}>
          <p className="t-data">{t("confirmation.order", { orderId: order.id, date: formatDate(order.date) })}</p>
          <p className="t-body-l">{t("confirmation.isDemo")}</p>
          <p>{t("confirmation.noEmail")}</p>
          <p>{t("confirmation.bagEmptied")}</p>

          <section aria-labelledby="confirmation-address" className={styles.address}>
            <p className="t-meta">{t("confirmation.dataNote")}</p>
            <h2 id="confirmation-address" className="t-label">
              {t("confirmation.deliveryTo")}
            </h2>
            <address className={styles.addressBlock}>
              {`${v.firstName} ${v.lastName}`}
              <br />
              {v.address1}
              {v.address2 && (
                <>
                  <br />
                  {v.address2}
                </>
              )}
              <br />
              {cityLine}
              <br />
              {t.has(`country.${v.country}`) ? t(`country.${v.country}`) : v.country}
              <br />
              {v.email}
              {v.phone && (
                <>
                  <br />
                  {v.phone}
                </>
              )}
            </address>
            <p className="t-meta">
              <span className="t-label">{t("confirmation.method")}</span> {t(`checkout.method.${order.method}.name`)}
            </p>
          </section>

          <Link href={href(L, { kind: "drop" })} className="btn btn-primary">
            {t("confirmation.cta")}
          </Link>
        </div>

        <OrderSummary
          className={styles.aside}
          lines={order.lines.map((l) => ({ key: lineKey(l), ...l, total: l.unitPrice * l.qty }))}
          subtotal={order.subtotal}
          shipping={order.shipping}
        />
      </div>
    </div>
  );
}
