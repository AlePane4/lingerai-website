"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { useBag } from "./BagProvider";

/** BORSA [n] — link to the bag page, intercepted to open the panel (design-system §3.3). */
export function BagCounter({ className, main = false }: { className?: string; main?: boolean }) {
  const t = useT();
  const { ready, count, openPanel, panelOpen, addedAt } = useBag();
  const ref = useRef<HTMLAnchorElement>(null);
  // Adds made before this counter mounted (e.g. reduced checkout header) must not animate.
  const mountedAt = useRef(addedAt);
  const label = ready ? t.plural("bag.counter.sr", count) : t("bag.counter.label");

  // After an add, invert once for --dur-hold (removed with reduced motion).
  useEffect(() => {
    const el = ref.current;
    if (!addedAt || addedAt === mountedAt.current || !el || typeof el.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--c-ink").trim();
    const concrete = css.getPropertyValue("--c-concrete").trim();
    const frame = { backgroundColor: ink, color: concrete };
    el.animate([frame, frame], { duration: 600 });
  }, [addedAt]);

  return (
    <Link
      ref={ref}
      href={href(t.lang, { kind: "page", page: "bag" })}
      className={className}
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={panelOpen}
      data-bag-counter={main ? "" : undefined}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        openPanel();
      }}
    >
      {t("bag.counter.label")}{" "}
      <span aria-hidden="true" className="t-data" style={{ fontSize: "inherit" }}>
        {ready ? t("bag.counter.count", { count }) : t("bag.counter.loading")}
      </span>
    </Link>
  );
}
