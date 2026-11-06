"use client";

import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { REFERENCE_SIZE, measureValue } from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { Dialog } from "@/components/ui/Dialog";
import { Media, type View } from "./Media";
import styles from "./Gallery.module.css";

const VIEWS: View[] = ["front", "back", "detail"];
const viewKey: Record<View, string> = { front: "gallery.view.front", back: "gallery.view.back", detail: "gallery.view.detail" };

/** Legend under a view: numbered callouts + measurement table for the chosen size (design-system §3.22). */
function Legend({ product, size }: { product: Product; size: string | null }) {
  const t = useT();
  const L = t.lang;
  const ref = size ?? REFERENCE_SIZE[product.sizeSystem];
  return (
    <div className={styles.legend}>
      <h2 className="t-label">{t("legend.title")}</h2>
      <ol role="list" className={styles.callouts}>
        {product.callouts.map((c, i) => (
          <li key={i} className="t-meta">
            <span className="t-data">{i + 1}</span> — {c[L]}
          </li>
        ))}
      </ol>
      <table className={styles.table}>
        <caption className="t-label">
          {size ? t("legend.measures.caption", { size }) : t("legend.measures.captionDefault", { size: ref })}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="t-label">{t("legend.measures.colRef")}</th>
            <th scope="col" className="t-label">{t("legend.measures.colWhat")}</th>
            <th scope="col" className="t-label">{t("legend.measures.colValue", { unit: t("sizeGuide.unit.cmShort") })}</th>
          </tr>
        </thead>
        <tbody>
          {product.measures.map((m) => (
            <tr key={m.ref}>
              <th scope="row" className="t-data">{m.ref}</th>
              <td className="t-meta">{m.what[L]}</td>
              <td className="t-data">{measureValue(product, m, ref).toLocaleString(t.lang === "it" ? "it-IT" : "en-GB")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Gallery({ product, size }: { product: Product; size: string | null }) {
  const t = useT();
  const L = t.lang;
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState("");
  const [zoom, setZoom] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const total = VIEWS.length;
  const alt = (v: View) => product.alt[v][L];

  const go = (next: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: next * el.clientWidth, behavior: "auto" });
    setIndex(next);
    setLive(t("gallery.counter.sr", { current: next + 1, total }));
    // The arrow that led to the first/last view is unmounted: hand the focus to the other one.
    const focused = document.activeElement;
    if (next === 0 && focused === prevBtn.current) requestAnimationFrame(() => nextBtn.current?.focus());
    if (next === total - 1 && focused === nextBtn.current) requestAnimationFrame(() => prevBtn.current?.focus());
  };

  const view = VIEWS[index];

  return (
    <div className={styles.gallery}>
      <div
        ref={track}
        className={styles.track}
        tabIndex={0}
        role="region"
        aria-label={t("gallery.region", { name: product.name })}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
          if (i !== index && i >= 0 && i < total) setIndex(i);
        }}
      >
        {VIEWS.map((v, i) => (
          <figure key={v} className={styles.slide}>
            <Media product={product} view={v} alt={alt(v)} priority={i === 0} sizes="(min-width: 64rem) 58vw, 100vw" className={styles.media} />
            {/* Desktop: legend under the front view */}
            {i === 0 && (
              <figcaption className={styles.desktopLegend}>
                <Legend product={product} size={size} />
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <span className={styles.arrowSlot}>
          {index > 0 && (
            <button ref={prevBtn} type="button" className={styles.arrow} aria-label={t("gallery.prev")} onClick={() => go(index - 1)}>
              <span aria-hidden="true">←</span>
            </button>
          )}
        </span>
        <span className="t-ui" aria-hidden="true">
          {t("gallery.counter", { current: index + 1, total })}
        </span>
        <span className={styles.arrowSlot}>
          {index < total - 1 && (
            <button ref={nextBtn} type="button" className={styles.arrow} aria-label={t("gallery.next")} onClick={() => go(index + 1)}>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </span>
        <span className="sr-only" aria-live="polite">
          {live}
        </span>
      </div>

      <button
        type="button"
        className={`btn-text ${styles.zoomBtn}`}
        aria-label={t("gallery.zoom.openSr", { view: t(viewKey[view]) })}
        onClick={() => setZoom(true)}
      >
        {t("gallery.zoom.open")}
      </button>

      {/* Mobile: legend under the carousel, for the front view */}
      {index === 0 && (
        <div className={styles.mobileLegend}>
          <Legend product={product} size={size} />
        </div>
      )}

      <Dialog open={zoom} onClose={() => setZoom(false)} labelledBy="zoom-title" variant="full">
        <div className={styles.zoom}>
          <div className={styles.zoomHead}>
            <h2 id="zoom-title" className="t-ui">
              {t("gallery.zoom.title", { name: product.name, view: t(viewKey[view]) })}
            </h2>
            <button type="button" className="btn-text" onClick={() => setZoom(false)}>
              {t("gallery.zoom.close")}
            </button>
          </div>
          <p className="t-meta">{t("gallery.zoom.hint")}</p>
          <div className={styles.zoomMedia}>
            <Media product={product} view={view} alt={alt(view)} sizes="100vw" />
          </div>
          {index === 0 && <Legend product={product} size={size} />}
        </div>
      </Dialog>
    </div>
  );
}
