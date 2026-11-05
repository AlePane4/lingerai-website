"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { useBag } from "./BagProvider";

/** BORSA [n] — link to the bag page (stage B: intercepted to open the panel). */
export function BagCounter({ className }: { className?: string }) {
  const t = useT();
  const { ready, count } = useBag();
  const label = ready ? t.plural("bag.counter.sr", count) : t("bag.counter.label");
  return (
    <Link href={href(t.lang, { kind: "page", page: "bag" })} className={className} aria-label={label}>
      {t("bag.counter.label")}{" "}
      <span aria-hidden="true" className="t-data" style={{ fontSize: "inherit" }}>
        {ready ? t("bag.counter.count", { count }) : t("bag.counter.loading")}
      </span>
    </Link>
  );
}
