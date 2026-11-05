"use client";

import { BagContents } from "./BagContents";
import styles from "./BagPage.module.css";

/** Fallback bag page (/it/borsa, /en/bag): same component as the panel, in the page. */
export function BagPage() {
  return (
    <div className={styles.page}>
      <BagContents variant="page" titleId="bag-page-title" />
    </div>
  );
}
