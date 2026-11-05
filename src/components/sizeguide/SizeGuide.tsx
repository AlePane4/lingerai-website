"use client";

import { useId, useState, type ReactNode } from "react";
import { bandTable, cupTable, letterTable } from "@/data/sizeGuide";
import type { SizeSystem } from "@/data/products";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { TextWithArrowLink } from "@/components/ui/Arrowed";
import styles from "./SizeGuide.module.css";

type Unit = "cm" | "inch";

/** Size guide content, shared by the panel (product page) and the /guida-taglie page. */
export function SizeGuide({
  initialTab = "bandCup",
  selectedSize,
  headingLevel = "h3",
}: {
  initialTab?: SizeSystem;
  selectedSize?: string | null;
  headingLevel?: "h2" | "h3";
}) {
  const t = useT();
  const uid = useId();
  const [tab, setTab] = useState<SizeSystem>(initialTab);
  const [unit, setUnit] = useState<Unit>("cm");
  const H = headingLevel;
  const unitShort = unit === "cm" ? t("sizeGuide.unit.cmShort") : t("sizeGuide.unit.inchShort");
  const num = new Intl.NumberFormat(t.lang === "it" ? "it-IT" : "en-GB", { maximumFractionDigits: 1 });
  const range = ([a, b]: [number, number]) =>
    unit === "cm" ? `${a}–${b}` : `${num.format(a / 2.54)}–${num.format(b / 2.54)}`;

  const selBand = selectedSize && /^\d/.test(selectedSize) ? Number(selectedSize.slice(0, 2)) : null;
  const selCup = selectedSize && /^\d/.test(selectedSize) ? selectedSize.slice(2) : null;

  const selected = (on: boolean) => (on ? <span className="sr-only">, {t("sizeGuide.table.selectedRow")}</span> : null);
  const scrollProps = { hint: t("sizeGuide.scrollHint"), label: t("sizeGuide.scrollRegion") };

  return (
    <div className={styles.guide}>
      <div className={styles.tabs}>
        {(["bandCup", "letters"] as SizeSystem[]).map((s) => (
          <button
            key={s}
            type="button"
            className={styles.tab}
            aria-pressed={tab === s}
            onClick={() => setTab(s)}
          >
            {t(s === "bandCup" ? "sizeGuide.tab.bras" : "sizeGuide.tab.letters")}
          </button>
        ))}
      </div>

      <section className={styles.block} aria-labelledby={`${uid}-howto`}>
        <H id={`${uid}-howto`} className="t-h3">
          {t("sizeGuide.howTo.title")}
        </H>
        <ul role="list" className={styles.howto}>
          {tab === "bandCup" ? (
            <>
              <li>{t("sizeGuide.howTo.underbust")}</li>
              <li>{t("sizeGuide.howTo.bust")}</li>
              <li>{t("sizeGuide.howTo.cup")}</li>
              <li>{t("sizeGuide.howTo.tip")}</li>
            </>
          ) : (
            <>
              <li>{t("sizeGuide.howTo.hips")}</li>
              <li>{t("sizeGuide.howTo.underbust")}</li>
            </>
          )}
        </ul>
      </section>

      <fieldset className={styles.units}>
        <legend className="t-label">{t("sizeGuide.unit.legend")}</legend>
        <div className={styles.segments}>
          {(["cm", "inch"] as Unit[]).map((u) => (
            <label key={u} className={styles.segment}>
              <input type="radio" name={`${uid}-unit`} className="sr-only" checked={unit === u} onChange={() => setUnit(u)} />
              <span>{t(u === "cm" ? "sizeGuide.unit.cm" : "sizeGuide.unit.inch")}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {tab === "bandCup" ? (
        <>
          <Scroll {...scrollProps}>
            <table className={styles.table}>
              <caption className="t-label">{t("sizeGuide.table.band.caption")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("sizeGuide.table.band.colUnderbust", { unit: unitShort })}</th>
                  <th scope="col">{t("sizeGuide.table.colEU")}</th>
                  <th scope="col">{t("sizeGuide.table.colIT")}</th>
                  <th scope="col">{t("sizeGuide.table.colUKUS")}</th>
                </tr>
              </thead>
              <tbody>
                {bandTable.map((r) => {
                  const on = selBand === r.eu;
                  return (
                    <tr key={r.eu} className={on ? styles.selected : undefined}>
                      <th scope="row">
                        {range(r.underbust)}
                        {selected(on)}
                      </th>
                      <td>{r.eu}</td>
                      <td>{r.it}</td>
                      <td>{r.ukus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Scroll>
          <Scroll {...scrollProps}>
            <table className={styles.table}>
              <caption className="t-label">{t("sizeGuide.table.cup.caption")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("sizeGuide.table.cup.colDiff", { unit: unitShort })}</th>
                  <th scope="col">{t("sizeGuide.table.colEUIT")}</th>
                  <th scope="col">{t("sizeGuide.table.colUK")}</th>
                  <th scope="col">{t("sizeGuide.table.colUS")}</th>
                </tr>
              </thead>
              <tbody>
                {cupTable.map((r) => {
                  const on = selCup === r.euit;
                  return (
                    <tr key={r.euit} className={on ? styles.selected : undefined}>
                      <th scope="row">
                        {range(r.diff)}
                        {selected(on)}
                      </th>
                      <td>{r.euit}</td>
                      <td>{r.uk}</td>
                      <td>{r.us}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Scroll>
          <p className="t-meta">{t("sizeGuide.note.betweenBand")}</p>
        </>
      ) : (
        <>
          <Scroll {...scrollProps}>
            <table className={styles.table}>
              <caption className="t-label">{t("sizeGuide.table.letters.caption")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("sizeGuide.table.letters.colSize")}</th>
                  <th scope="col">{t("sizeGuide.table.colIT")}</th>
                  <th scope="col">{t("sizeGuide.table.colEU")}</th>
                  <th scope="col">{t("sizeGuide.table.colUK")}</th>
                  <th scope="col">{t("sizeGuide.table.colUS")}</th>
                  <th scope="col">{t("sizeGuide.table.letters.colHips", { unit: unitShort })}</th>
                  <th scope="col">{t("sizeGuide.table.letters.colUnderbust", { unit: unitShort })}</th>
                </tr>
              </thead>
              <tbody>
                {letterTable.map((r) => {
                  const on = selectedSize === r.size;
                  return (
                    <tr key={r.size} className={on ? styles.selected : undefined}>
                      <th scope="row">
                        {r.size}
                        {selected(on)}
                      </th>
                      <td>{r.it}</td>
                      <td>{r.eu}</td>
                      <td>{r.uk}</td>
                      <td>{r.us}</td>
                      <td>{range(r.hips)}</td>
                      <td>{range(r.underbust)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Scroll>
          <p className="t-meta">{t("sizeGuide.note.betweenLetters")}</p>
        </>
      )}

      <p className="t-meta t-muted">{t("sizeGuide.note.indicative")}</p>
      <p className="t-meta">
        <TextWithArrowLink
          text={t("sizeGuide.returnsLink")}
          href={href(t.lang, { kind: "page", page: "returns" })}
          className="link-inline"
        />
      </p>
    </div>
  );
}

function Scroll({ children, label, hint }: { children: ReactNode; label: string; hint: string }) {
  return (
    <div className={styles.scrollWrap}>
      <p className={`t-label ${styles.hint}`} aria-hidden="true">
        {hint}
      </p>
      <div className={styles.scroll} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
