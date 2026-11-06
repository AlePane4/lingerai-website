"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { colourKey, isSizeSoldOut, products, sizesFor } from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { useAnnouncer } from "@/components/ui/Announcer";
import { Dialog } from "@/components/ui/Dialog";
import { Arrowed } from "@/components/ui/Arrowed";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  applyFilters,
  bandCupOptions,
  categoryOptions,
  colourOptions,
  facetCount,
  letterOptions,
  parseFilters,
  serializeFilters,
  SORTS,
  type FilterState,
  type SortId,
} from "./filtering";
import styles from "./DropCatalog.module.css";

type Group = "category" | "size" | "color";

const sortLabel: Record<SortId, string> = {
  featured: "sort.featured",
  "price-asc": "sort.priceAsc.sr",
  "price-desc": "sort.priceDesc.sr",
};

export function DropCatalog() {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { announce } = useAnnouncer();
  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);
  const results = useMemo(() => applyFilters(filters), [filters]);
  const [openGroup, setOpenGroup] = useState<Group | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const firstRender = useRef(true);

  const update = (next: FilterState) => {
    router.replace(pathname + serializeFilters(next), { scroll: false });
  };
  const toggle = (group: Group, value: string) => {
    const current = filters[group] as string[];
    const values = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    update({ ...filters, [group]: values });
  };
  const reset = () => update({ ...filters, category: [], size: [], color: [] });

  // Result count announced with a 500 ms debounce (design-system §3.18).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const id = setTimeout(() => announce(t.plural("announce.results", results.length)), 500);
    return () => clearTimeout(id);
  }, [results.length, announce, t]);

  // Let the global scroll-padding account for the sticky filter bar (WCAG 2.4.11).
  useEffect(() => {
    document.documentElement.dataset.dropFilters = "";
    return () => {
      delete document.documentElement.dataset.dropFilters;
    };
  }, []);

  const valueLabel = (group: Group, v: string) =>
    group === "category" ? t(`nav.${v}`) : group === "color" ? t(colourKey[v as keyof typeof colourKey]) : v;

  const active: { group: Group; value: string }[] = (["category", "size", "color"] as Group[]).flatMap((g) =>
    (filters[g] as string[]).map((value) => ({ group: g, value })),
  );
  const activeCount = active.length;

  const groupTitle: Record<Group, string> = {
    category: t("filters.category"),
    size: t("filters.size"),
    color: t("filters.colour"),
  };

  const option = (group: Group, value: string, box = false) => {
    const checked = (filters[group] as string[]).includes(value);
    const count = facetCount(filters, group, value);
    if (count === 0 && !checked) return null;
    const label = valueLabel(group, value);
    return (
      <label key={value} className={box ? styles.box : styles.option}>
        <input
          type="checkbox"
          className={box ? "sr-only" : styles.check}
          checked={checked}
          onChange={() => toggle(group, value)}
          aria-label={t.plural("filters.option.sr", count, { value: label })}
        />
        {group === "color" && <span className={styles.swatch} style={{ background: `var(--swatch-${value})` }} aria-hidden="true" />}
        <span>{label}</span>
        <span className={styles.optCount} aria-hidden="true">
          [{count}]
        </span>
      </label>
    );
  };

  const groupBody = (group: Group): ReactNode => {
    if (group === "category") return <div className={styles.options}>{categoryOptions.map((v) => option("category", v))}</div>;
    if (group === "color") return <div className={styles.options}>{colourOptions.map((v) => option("color", v))}</div>;
    return (
      <>
        <fieldset className={styles.sizeGroup}>
          <legend className="t-label">{t("filters.size.groupBandCup")}</legend>
          <div className={styles.boxes}>{bandCupOptions.map((v) => option("size", v, true))}</div>
        </fieldset>
        <fieldset className={styles.sizeGroup}>
          <legend className="t-label">{t("filters.size.groupLetters")}</legend>
          <div className={styles.boxes}>{letterOptions.map((v) => option("size", v, true))}</div>
        </fieldset>
      </>
    );
  };

  const groupButtonLabel = (g: Group) => {
    const n = (filters[g] as string[]).length;
    return n ? t("filters.active", { label: groupTitle[g], count: n }) : groupTitle[g];
  };

  const sortSelect = (id: string) => (
    <label className={styles.sort} htmlFor={id}>
      <span>{t("sort.label")}</span>
      <select
        id={id}
        value={filters.sort}
        onChange={(e) => update({ ...filters, sort: e.target.value as SortId })}
        className={styles.select}
      >
        {SORTS.map((s) => (
          <option key={s} value={s}>
            {t(sortLabel[s])}
          </option>
        ))}
      </select>
    </label>
  );

  const resultsText = t.plural("filters.results", results.length);
  const firstSize = filters.size[0];
  const suggestion =
    results.length === 0 && firstSize
      ? products
          .flatMap((p) =>
            sizesFor(p).includes(firstSize)
              ? p.colours.filter((c) => !isSizeSoldOut(p, c.id, firstSize)).map((c) => `${p.name} ${t(colourKey[c.id]).toLocaleLowerCase(t.lang)}`)
              : [],
          )
          .join(", ")
      : "";

  return (
    <div>
      {/* Desktop bar */}
      <div className={styles.bar}>
        <div className={styles.desktop}>
          <div className={styles.groups}>
            {(["category", "size", "color"] as Group[]).map((g) => (
              <div key={g} className={styles.group}>
                <button
                  type="button"
                  className={`${styles.trigger} ${(filters[g] as string[]).length ? styles.triggerActive : ""}`}
                  aria-expanded={openGroup === g}
                  aria-controls={`filter-${g}`}
                  onClick={() => setOpenGroup(openGroup === g ? null : g)}
                >
                  {groupButtonLabel(g)} <span aria-hidden="true">{openGroup === g ? "▴" : "▾"}</span>
                </button>
                <div
                  id={`filter-${g}`}
                  className={styles.panel}
                  hidden={openGroup !== g}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setOpenGroup(null);
                      (e.currentTarget.previousElementSibling as HTMLElement | null)?.focus();
                    }
                  }}
                >
                  {g === "size" ? groupBody(g) : <fieldset><legend className="sr-only">{groupTitle[g]}</legend>{groupBody(g)}</fieldset>}
                </div>
              </div>
            ))}
          </div>
          {sortSelect("sort-desktop")}
        </div>

        {/* Mobile bar */}
        <div className={styles.mobile}>
          <button type="button" className={styles.trigger} aria-expanded={dialogOpen} onClick={() => setDialogOpen(true)}>
            {activeCount ? t("filters.openActive", { count: activeCount }) : t("filters.open")}
          </button>
          {sortSelect("sort-mobile")}
        </div>
      </div>

      <div className={styles.status}>
        {active.length > 0 && (
          <ul role="list" className={styles.chips}>
            {active.map((a) => (
              <li key={`${a.group}-${a.value}`}>
                <button
                  type="button"
                  className={styles.chip}
                  aria-label={t("filters.chip.remove", { value: valueLabel(a.group, a.value) })}
                  onClick={() => toggle(a.group, a.value)}
                >
                  {valueLabel(a.group, a.value)} <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="btn-text" onClick={reset}>
                {t("filters.reset")}
              </button>
            </li>
          </ul>
        )}
        <p className={`t-data ${styles.count}`}>{resultsText}</p>
      </div>

      {results.length > 0 ? (
        <ProductGrid items={results} t={t} priorityCount={2} />
      ) : (
        <div className={`page-margin ${styles.empty}`}>
          <p className="t-h2" aria-hidden="true">
            {t("filters.empty.title")}
          </p>
          <p className="t-body-l">
            {t("filters.empty.body", {
              filters: active
                .map((a) => (a.group === "size" ? a.value : valueLabel(a.group, a.value).toLocaleLowerCase(t.lang)))
                .join(" "),
            })}
          </p>
          {suggestion && <p>{t("filters.empty.suggestion", { value: firstSize, list: suggestion })}</p>}
          <button type="button" className="btn btn-secondary" onClick={reset}>
            {t("filters.resetFull")}
          </button>
        </div>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} labelledBy="filters-title" variant="bottom">
        <div className={styles.dialog}>
          <div className={styles.dialogHead}>
            <h2 id="filters-title" className="t-h2">
              {t("filters.title")}
            </h2>
            <button type="button" className="btn-text" onClick={() => setDialogOpen(false)}>
              {t("common.close")}
            </button>
          </div>
          <div className={styles.dialogBody}>
            {(["category", "size", "color"] as Group[]).map((g) => (
              <details key={g} className={styles.accordion} open={g === "size"}>
                <summary className={`t-ui ${styles.summary}`}>
                  <Arrowed text={groupButtonLabel(g)} />
                </summary>
                {g === "size" ? groupBody(g) : <fieldset><legend className="sr-only">{groupTitle[g]}</legend>{groupBody(g)}</fieldset>}
              </details>
            ))}
            <button type="button" className="btn-text" onClick={reset}>
              {t("filters.reset")}
            </button>
          </div>
          <div className={styles.dialogFoot}>
            <button type="button" className="btn btn-primary btn-block" onClick={() => setDialogOpen(false)}>
              {t.plural("filters.apply", results.length)}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
