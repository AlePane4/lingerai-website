"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { useBag } from "@/components/bag/BagProvider";
import { summarise } from "@/components/bag/resolve";
import { CheckoutForm } from "./CheckoutForm";
import { CHECKOUT_BANNER_ID } from "./ids";
import styles from "./Checkout.module.css";


/** Demo checkout, one page (page-blueprints §7). The demo banner is the first node of <main>. */
export function CheckoutPage() {
  const t = useT();
  const bag = useBag();
  const [placing, setPlacing] = useState(false);
  const { resolved, subtotal, hasUnavailable } = summarise(bag.lines);

  let body: React.ReactNode = null;
  if (placing) {
    body = <p className="t-meta">{t("checkout.submitting")}</p>;
  } else if (!bag.ready) {
    body = <p className="t-meta t-muted">{t("common.loading")}</p>;
  } else if (bag.lines.length === 0) {
    body = (
      <div className={styles.stateBox}>
        <p>{t("checkout.empty.body")}</p>
        <Link href={href(t.lang, { kind: "drop" })} className="btn btn-secondary">
          {t("checkout.empty.cta")}
        </Link>
      </div>
    );
  } else if (hasUnavailable) {
    body = (
      <div className={styles.stateBox}>
        <p>{t("checkout.unavailable")}</p>
        <Link href={href(t.lang, { kind: "page", page: "bag" })} className="btn btn-secondary">
          {t("bag.title")}
        </Link>
      </div>
    );
  } else {
    body = <CheckoutForm resolved={resolved} subtotal={subtotal} onPlaced={() => setPlacing(true)} />;
  }

  return (
    <div className={styles.page}>
      <p id={CHECKOUT_BANNER_ID} className={styles.banner} data-signal="">
        {t("demo.banner.checkout")}
      </p>
      <h1 className={`t-h2 ${styles.title}`}>{t("checkout.title")}</h1>
      {body}
    </div>
  );
}
