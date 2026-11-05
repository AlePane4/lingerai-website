"use client";

import Link from "next/link";
import { useRef, useState, type RefObject } from "react";
import { MAX_QTY, categories, colourKey } from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { useAnnouncer } from "@/components/ui/Announcer";
import { Media } from "@/components/product/Media";
import type { BagLine } from "@/lib/bagStore";
import { useBag } from "./BagProvider";
import { summarise, type ResolvedLine } from "./resolve";
import styles from "./BagContents.module.css";

interface Removed {
  key: string;
  line: BagLine;
  index: number;
  name: string;
}

interface Props {
  variant: "panel" | "page";
  titleId: string;
  titleRef?: RefObject<HTMLHeadingElement | null>;
  onClose?: () => void;
}

/** Bag lines, summary and empty state (design-system §3.14–3.15). Same component in panel and page. */
export function BagContents({ variant, titleId, titleRef, onClose }: Props) {
  const t = useT();
  const L = t.lang;
  const bag = useBag();
  const { announce } = useAnnouncer();
  const rootRef = useRef<HTMLDivElement>(null);
  const ownTitle = useRef<HTMLHeadingElement>(null);
  const title = titleRef ?? ownTitle;
  const [removed, setRemoved] = useState<Removed | null>(null);

  const { resolved, subtotal, hasUnavailable, count } = summarise(bag.lines);
  const Heading = variant === "page" ? "h1" : "h2";

  const nameOf = (r: ResolvedLine) => r.product?.name ?? r.line.id;
  const typeOf = (r: ResolvedLine) => (r.product ? t(r.product.typeKey).toLocaleLowerCase(L) : "");
  const vars = (r: ResolvedLine) => ({ name: nameOf(r), type: typeOf(r), size: r.line.size });

  const focusLater = (key: string | null) => {
    requestAnimationFrame(() => {
      const row = key ? rootRef.current?.querySelector<HTMLElement>(`[data-row="${CSS.escape(key)}"]`) : null;
      (row ?? title.current)?.focus();
    });
  };

  const changeQty = (r: ResolvedLine, delta: number) => {
    setRemoved(null);
    const next = r.line.qty + delta;
    if (next < 1) return; // below 1 → use "Remove"
    if (next > MAX_QTY) {
      announce(t("announce.qtyMax", { max: MAX_QTY }));
      return;
    }
    bag.setQty(r.key, next);
    announce(t("announce.qty", { qty: next, ...vars(r) }));
  };

  const removeLine = (r: ResolvedLine, i: number) => {
    const out = bag.remove(r.key);
    if (!out) return;
    setRemoved({ key: r.key, line: out.line, index: out.index, name: nameOf(r) });
    announce(t("announce.removed", vars(r)));
    focusLater(resolved[i + 1]?.key ?? null);
  };

  const undo = () => {
    if (!removed) return;
    bag.restore(removed.line, removed.index);
    const r = summarise([removed.line]).resolved[0];
    announce(t("announce.restored", vars(r)));
    focusLater(removed.key);
    setRemoved(null);
  };

  // Rows with the "removed" placeholder at its former position.
  const rows: ({ kind: "line"; r: ResolvedLine; i: number } | { kind: "removed"; rm: Removed })[] = resolved.map((r, i) => ({
    kind: "line" as const,
    r,
    i,
  }));
  if (removed) rows.splice(Math.min(removed.index, rows.length), 0, { kind: "removed", rm: removed });

  const closeOnLink = (e: React.MouseEvent) => {
    if (onClose && (e.target as HTMLElement).closest("a")) onClose();
  };

  return (
    <div ref={rootRef} className={`${styles.root} ${styles[variant]}`} onClick={closeOnLink}>
      <div className={styles.head}>
        <Heading
          id={titleId}
          ref={title}
          tabIndex={-1}
          className={`t-h2 ${styles.title}`}
          aria-label={bag.ready ? t.plural("bag.counter.sr", count) : t("bag.title")}
        >
          {t("bag.title")}{" "}
          <span className="t-data" aria-hidden="true">
            {bag.ready ? t("bag.counter.count", { count }) : t("bag.counter.loading")}
          </span>
        </Heading>
        {onClose && (
          <button type="button" className="btn-text" onClick={onClose}>
            {t("bag.close")}
          </button>
        )}
      </div>

      {bag.notice && (
        <p className={`t-meta ${styles.notice}`}>{t(bag.notice === "reset" ? "bag.reset" : "bag.storageBlocked")}</p>
      )}

      {bag.ready && (
        <>
          {rows.length > 0 && (
            <ul role="list" className={styles.list}>
              {rows.map((row) =>
                row.kind === "removed" ? (
                  <li key={`removed-${row.rm.key}`} className={styles.removed}>
                    <p className="t-meta">{t("bag.line.removed", { name: row.rm.name })}</p>
                    <button type="button" className="btn-text" aria-label={t("bag.line.undoSr", { name: row.rm.name })} onClick={undo}>
                      {t("bag.line.undo")}
                    </button>
                  </li>
                ) : (
                  <Line
                    key={row.r.key}
                    r={row.r}
                    isNew={variant === "panel" && bag.highlight === row.r.key}
                    onQty={(d) => changeQty(row.r, d)}
                    onRemove={() => removeLine(row.r, row.i)}
                  />
                ),
              )}
            </ul>
          )}

          {count === 0 ? (
            <div className={styles.empty}>
              <p>{t("bag.empty.body")}</p>
              <Link href={href(L, { kind: "drop" })} className="btn btn-secondary">
                {t("bag.empty.cta")}
              </Link>
              <p className="t-label">{t("bag.empty.categories")}</p>
              <ul role="list" className={styles.cats}>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={href(L, { kind: "category", category: c.id })} className="link-utility">
                      {t(c.navKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.summary}>
              <dl className={styles.totals}>
                <div className={styles.totalRow}>
                  <dt className="t-label">{t("bag.summary.subtotal")}</dt>
                  <dd className="t-data">{t.price(subtotal)}</dd>
                </div>
                <div className={styles.totalRow}>
                  <dt className="t-label">{t("bag.summary.shipping")}</dt>
                  <dd className="t-meta">{t("bag.summary.shippingValue")}</dd>
                </div>
                <div className={`${styles.totalRow} ${styles.grand}`}>
                  <dt className="t-label">{t("bag.summary.total")}</dt>
                  <dd className={styles.grandValue}>{t.price(subtotal)}</dd>
                </div>
              </dl>
              <p className="t-meta t-muted">{t("bag.summary.vatNote")}</p>
              {hasUnavailable ? (
                <p className={`t-meta ${styles.blocked}`}>{t("bag.blocked")}</p>
              ) : (
                <Link href={href(L, { kind: "page", page: "checkout" })} className="btn btn-primary btn-block">
                  {t("bag.checkout")}
                </Link>
              )}
              {onClose ? (
                <button type="button" className="btn-text" onClick={onClose}>
                  {t("bag.continue")}
                </button>
              ) : (
                <Link href={href(L, { kind: "drop" })} className="btn-text">
                  {t("bag.continue")}
                </Link>
              )}
              <p className="t-meta t-muted">{t("demo.bagNote")}</p>
            </div>
          )}
          {count === 0 && <p className="t-meta t-muted">{t("demo.bagNote")}</p>}
        </>
      )}
    </div>
  );
}

function Line({ r, isNew, onQty, onRemove }: { r: ResolvedLine; isNew: boolean; onQty: (delta: number) => void; onRemove: () => void }) {
  const t = useT();
  const L = t.lang;
  const p = r.product;
  const name = p?.name ?? r.line.id;
  const type = p ? t(p.typeKey) : "";
  const v = { name, type: type.toLocaleLowerCase(L), size: r.line.size };
  const colour = t(colourKey[r.line.colour]);
  const atMin = r.line.qty <= 1;
  const atMax = r.line.qty >= MAX_QTY;
  const productHref = p ? `${href(L, { kind: "product", id: p.id })}?color=${r.line.colour}` : undefined;

  return (
    <li data-row={r.key} tabIndex={-1} className={`${styles.line} ${isNew ? styles.isNew : ""} ${r.available ? "" : styles.unavailable}`}>
      <div className={styles.thumb}>{p && <Media product={p} alt="" sizes="64px" />}</div>
      <div className={styles.text}>
        {isNew && (
          <span className={`tag tag-signal t-label ${styles.addedTag}`} data-signal="">
            {t("bag.line.added")}
          </span>
        )}
        <p className={`t-name ${styles.name}`}>{productHref ? <Link href={productHref}>{name}</Link> : name}</p>
        {type && <p className="t-meta t-muted">{type}</p>}
        <p className="t-data">{t("bag.line.variant", { colour, size: r.line.size })}</p>
        {!r.available && <p className={`t-meta ${styles.unavailableNote}`}>{t("bag.line.unavailable")}</p>}
        <div className={styles.qtyRow}>
          {r.available ? (
            <div role="group" aria-label={t("bag.line.qty.legend")} className={styles.stepper}>
              <button
                type="button"
                className={styles.step}
                aria-label={t("bag.line.qty.decrease", v)}
                aria-disabled={atMin}
                onClick={() => !atMin && onQty(-1)}
              >
                <span aria-hidden="true">−</span>
              </button>
              <span className={`t-data ${styles.qty}`} data-testid="qty">
                {r.line.qty}
              </span>
              <button type="button" className={styles.step} aria-label={t("bag.line.qty.increase", v)} aria-disabled={atMax} onClick={() => onQty(1)}>
                <span aria-hidden="true">+</span>
              </button>
            </div>
          ) : (
            <span />
          )}
          <span className={`t-data ${styles.price}`}>{t.price(r.available ? r.total : r.unitPrice * r.line.qty)}</span>
        </div>
        {r.available && atMax && <p className="t-meta">{t("bag.line.qty.max", { max: MAX_QTY })}</p>}
        <button type="button" className="btn-text" aria-label={t("bag.line.removeSr", v)} onClick={onRemove}>
          {t("bag.line.remove")}
        </button>
      </div>
    </li>
  );
}
