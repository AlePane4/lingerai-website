"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ColourId, Product } from "@/data/products";
import {
  BANDS,
  MAX_QTY,
  CUPS,
  altColourFor,
  colourKey,
  darkSwatches,
  getProduct,
  isColourSoldOut,
  isProductSoldOut,
  isSizeSoldOut,
  sizesFor,
} from "@/data/catalog";
import { useT } from "@/i18n/I18nProvider";
import { href, type PageId } from "@/i18n/routes";
import { useAnnouncer } from "@/components/ui/Announcer";
import { Dialog } from "@/components/ui/Dialog";
import { Arrowed, TextWithArrowLink } from "@/components/ui/Arrowed";
import { useBag } from "@/components/bag/BagProvider";
import { SizeGuide } from "@/components/sizeguide/SizeGuide";
import { Gallery } from "./Gallery";
import { Media } from "./Media";
import styles from "./ProductDetail.module.css";

type SizeMessage = { kind: "error"; text: string } | { kind: "info"; text: string } | null;

function firstAvailableColour(p: Product): ColourId {
  return (p.colours.find((c) => !isColourSoldOut(p, c.id)) ?? p.colours[0]).id;
}

export function ProductDetail({ product, colourParam }: { product: Product; colourParam: string | null }) {
  const t = useT();
  const L = t.lang;
  const { announce } = useAnnouncer();
  const bag = useBag();

  const initialColour =
    colourParam && product.colours.some((c) => c.id === colourParam) ? (colourParam as ColourId) : firstAvailableColour(product);
  const [colour, setColour] = useState<ColourId>(initialColour);
  const [size, setSize] = useState<string | null>(null);
  const [message, setMessage] = useState<SizeMessage>(null);
  const [addMessage, setAddMessage] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const sizeGroupRef = useRef<HTMLFieldSetElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);

  const colourName = (c: ColourId) => t(colourKey[c]);
  const type = t(product.typeKey);
  const typeLower = type.toLocaleLowerCase(L);
  const sizes = sizesFor(product);
  const soldOutAll = isProductSoldOut(product);
  const colourSoldOut = isColourSoldOut(product, colour);
  const msgId = `size-msg-${product.id}`;
  const price = t.price(product.price);

  // Sticky add bar (mobile) when the main button leaves the screen.
  useEffect(() => {
    const el = addRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chooseColour = (c: ColourId) => {
    setColour(c);
    const url = new URL(window.location.href);
    url.searchParams.set("color", c);
    window.history.replaceState(window.history.state, "", url);
    const soldOut = isColourSoldOut(product, c);
    if (size && isSizeSoldOut(product, c, size)) {
      const text = t("product.size.deselected", { size, colour: colourName(c) });
      setSize(null);
      setMessage({ kind: "info", text });
      announce(text);
    } else {
      setMessage(null);
      announce(t(soldOut ? "announce.colourSoldOut" : "announce.colour", { colour: colourName(c) }));
    }
  };

  const chooseSize = (s: string) => {
    if (isSizeSoldOut(product, colour, s)) {
      // Keep the previous selection (radios select while moving with arrow keys).
      const alt = altColourFor(product, colour, s);
      setMessage({
        kind: "info",
        text: alt
          ? t("product.size.error.soldOutAlt", { size: s, colour: colourName(colour).toLocaleLowerCase(L), altColour: colourName(alt).toLocaleLowerCase(L) })
          : t("product.size.error.soldOut", { size: s, colour: colourName(colour).toLocaleLowerCase(L) }),
      });
      return;
    }
    setSize(s);
    setMessage(null);
    setAddMessage(null);
  };

  const add = () => {
    if (!size) {
      setMessage({ kind: "error", text: t("product.size.error.none") });
      // Focus the first available size: the linked message is read with it.
      const first = sizeGroupRef.current?.querySelector<HTMLInputElement>('input[aria-disabled="false"]');
      first?.focus();
      first?.scrollIntoView({ block: "center" });
      return;
    }
    // The count is only known after the add: the panel announces the message once it is open.
    const nextCount = bag.count + 1;
    const result = bag.add(
      { id: product.id, colour, size },
      t.plural("announce.added", nextCount, {
        name: product.name,
        type: typeLower,
        colour: colourName(colour).toLocaleLowerCase(L),
        size,
      }),
    );
    if (!result.ok) {
      setAddMessage(t("product.add.maxReached", { max: MAX_QTY }));
      announce(t("announce.qtyMax", { max: MAX_QTY }));
      return;
    }
    setAddMessage(null);
  };

  const soldOutSizes = colourSoldOut ? [] : sizes.filter((s) => isSizeSoldOut(product, colour, s));
  const describedBy = message ? msgId : undefined;

  const sizeBox = (s: string, visible: string) => {
    const out = isSizeSoldOut(product, colour, s);
    return (
      <label key={s} className={`${styles.size} ${out ? styles.sizeOut : ""}`}>
        <input
          type="radio"
          name={`size-${product.id}`}
          value={s}
          className="sr-only"
          checked={size === s}
          aria-disabled={out}
          aria-label={out ? t("product.size.optionSoldOut", { size: s }) : s}
          aria-describedby={describedBy}
          onChange={() => chooseSize(s)}
        />
        <span aria-hidden="true">{visible}</span>
      </label>
    );
  };

  const reassure: { key: string; page: PageId }[] = [
    { key: "product.reassure.shipping", page: "shipping" },
    { key: "product.reassure.returns", page: "returns" },
    ...(product.hygiene ? [{ key: "product.reassure.hygiene", page: "returns" as PageId }] : []),
  ];

  const keyData: { label: string; value: string }[] = [];
  if (product.key.sheerness) keyData.push({ label: t("product.key.sheerness"), value: product.key.sheerness[L] });
  if (product.key.underwire !== undefined) keyData.push({ label: t("product.key.underwire"), value: t(product.key.underwire ? "common.yes" : "common.no") });
  if (product.key.padding !== undefined) keyData.push({ label: t("product.key.padding"), value: t(product.key.padding ? "common.yes" : "common.no") });
  if (product.key.support) keyData.push({ label: t("product.key.support"), value: t(`product.key.support.${product.key.support}`) });
  if (product.key.gusset) keyData.push({ label: t("product.key.gusset"), value: product.key.gusset[L] });

  const partner = product.setWith ? getProduct(product.setWith) : undefined;
  const showSet = partner && !isProductSoldOut(partner);
  const partnerColour = partner?.colours.some((c) => c.id === colour) ? colour : undefined;

  const addLabel = size ? t("product.add.withSizePrice", { size, price }) : t("product.add.withPrice", { price });

  return (
    <div className={styles.layout}>
      <div className={styles.galleryCol}>
        <Gallery product={product} size={size} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={`t-meta t-muted ${styles.type}`}>{type}</p>
        <p className={`t-data ${styles.price}`}>{price}</p>
        <p className="t-meta t-muted">{t("price.vatNote")}</p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
          noValidate
        >
          <fieldset className={styles.fieldset}>
            {/* K2: "sold out" is written in the label too. */}
            <legend className={`t-label ${styles.legend}`}>
              {t(colourSoldOut ? "product.colour.selectedSoldOut" : "product.colour.selected", { colour: colourName(colour) })}
            </legend>
            <div className={styles.swatches}>
              {product.colours.map((c) => {
                const out = isColourSoldOut(product, c.id);
                return (
                  <label key={c.id} className={styles.swatchHit}>
                    <input
                      type="radio"
                      name={`colour-${product.id}`}
                      className="sr-only"
                      checked={colour === c.id}
                      onChange={() => chooseColour(c.id)}
                      aria-label={out ? t("product.colour.optionSoldOut", { colour: colourName(c.id) }) : colourName(c.id)}
                    />
                    <span
                      aria-hidden="true"
                      className={`${styles.swatch} ${out ? styles.swatchOut : ""} ${darkSwatches.includes(c.id) ? styles.dark : ""}`}
                      style={{ background: `var(--swatch-${c.id})` }}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset ref={sizeGroupRef} className={`${styles.fieldset} ${message?.kind === "error" ? styles.groupError : ""}`}>
            <legend className={`t-label ${styles.sizeLegend}`}>{t("product.size.legend")}</legend>
            <a
              href={href(L, { kind: "page", page: "sizeGuide" })}
              className={`link-utility ${styles.guideLink}`}
              onClick={(e) => {
                e.preventDefault();
                setGuideOpen(true);
              }}
            >
              <Arrowed text={t("product.size.guideLink")} />
            </a>

            {product.sizeSystem === "letters" ? (
              <div className={styles.sizeRow}>{sizes.map((s) => sizeBox(s, s))}</div>
            ) : (
              <div className={styles.bandGrid}>
                {BANDS.map((b) => (
                  <div key={b} role="group" aria-label={t("product.size.bandGroup", { band: b })} className={styles.bandRow}>
                    <span className={`t-data t-muted ${styles.band}`} aria-hidden="true">
                      {b}
                    </span>
                    {CUPS.map((c) => sizeBox(`${b}${c}`, c))}
                  </div>
                ))}
              </div>
            )}

            {soldOutSizes.length > 0 && (
              <p className="t-meta t-muted">
                {soldOutSizes.length === 1
                  ? t("product.size.soldOutNote", { size: soldOutSizes[0] })
                  : t("product.size.soldOutNote_many", { sizes: soldOutSizes.join(", ") })}
              </p>
            )}

            <p id={msgId} className={styles.message} hidden={!message}>
              {message?.kind === "error" && (
                <span className="tag tag-signal t-label" data-signal="">
                  {t("checkout.error.tag")}
                </span>
              )}{" "}
              {message?.text}
            </p>
          </fieldset>

          <p className="t-meta">{product.fit[L]}</p>

          {soldOutAll ? (
            <div className={styles.soldOutBox}>
              <p className="t-h3">{t("product.soldOut.title")}</p>
              <p className="t-meta">{t("product.soldOut.body")}</p>
              <Link href={href(L, { kind: "category", category: product.category })} className="link-utility">
                <Arrowed text={t("product.soldOut.similar")} />
              </Link>
            </div>
          ) : (
            <button ref={addRef} type="submit" className="btn btn-primary btn-block">
              {addLabel}
            </button>
          )}
          {addMessage && <p className="t-meta">{addMessage}</p>}
        </form>

        <ul role="list" className={styles.reassure}>
          {reassure.map((r) => (
            <li key={r.key}>
              <Link href={href(L, { kind: "page", page: r.page })} className={`t-meta ${styles.reassureLink}`}>
                {t(r.key)}
              </Link>
            </li>
          ))}
        </ul>

        {keyData.length > 0 && (
          <dl className={styles.keys}>
            {keyData.map((k) => (
              <div key={k.label} className={styles.keyRow}>
                <dt className="t-label">{k.label}</dt>
                <dd className="t-data">{k.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <section aria-labelledby={`desc-${product.id}`} className={styles.description}>
          <h2 id={`desc-${product.id}`} className="sr-only">
            {t("product.description.title")}
          </h2>
          <p>{product.description[L]}</p>
        </section>

        <div className={styles.accordion}>
          <details>
            <summary className={styles.summary}>
              <h2 className="t-h3">{t("product.accordion.composition")}</h2>
            </summary>
            <ul role="list" className={styles.list}>
              {product.composition.map((c, i) => (
                <li key={i}>{c[L]}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary className={styles.summary}>
              <h2 className="t-h3">{t("product.accordion.construction")}</h2>
            </summary>
            <ul role="list" className={styles.list}>
              {product.construction.map((c, i) => (
                <li key={i}>{c[L]}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary className={styles.summary}>
              <h2 className="t-h3">{t("product.accordion.fit")}</h2>
            </summary>
            <p className={styles.panelText}>{product.fit[L]}</p>
          </details>
          <details>
            <summary className={styles.summary}>
              <h2 className="t-h3">{t("product.accordion.care")}</h2>
            </summary>
            <div className={styles.panelText}>
              {product.care.map((k) => (
                <p key={k}>{t(k)}</p>
              ))}
            </div>
          </details>
          <details>
            <summary className={styles.summary}>
              <h2 className="t-h3">{t("product.accordion.returns")}</h2>
            </summary>
            <div className={styles.panelText}>
              <p>
                <TextWithArrowLink
                  text={t("product.returns.body")}
                  href={href(L, { kind: "page", page: "returns" })}
                  className="link-inline"
                />
              </p>
              {product.hygiene && <p>{t("product.returns.hygiene")}</p>}
            </div>
          </details>
        </div>

        {showSet && partner && (
          <section aria-labelledby={`set-${product.id}`} className={styles.set}>
            <h2 id={`set-${product.id}`} className="t-label">
              {t("product.set.title")}
            </h2>
            <Link
              href={href(L, { kind: "product", id: partner.id }) + (partnerColour ? `?color=${partnerColour}` : "")}
              className={styles.setCard}
            >
              <div className={styles.setThumb}>
                <Media product={partner} alt="" sizes="96px" />
              </div>
              <div className={styles.setText}>
                <span className="t-name">{partner.name}</span>
                <span className="t-meta t-muted">{t(partner.typeKey)}</span>
                <span className="t-data">{t.price(partner.price)}</span>
                <span className="link-utility">
                  <Arrowed text={t("product.set.link")} />
                </span>
              </div>
            </Link>
          </section>
        )}
      </div>

      {!soldOutAll && (
        <div className={`${styles.sticky} ${showSticky ? styles.stickyOn : ""}`} aria-hidden={!showSticky} inert={!showSticky}>
          <span className="t-meta">
            {size
              ? t("product.add.sticky.summary", { name: product.name, size, price })
              : `${product.name} · ${price}`}
          </span>
          <button type="button" className="btn btn-primary" onClick={add} tabIndex={showSticky ? 0 : -1}>
            {t("product.add.sticky.button")}
          </button>
        </div>
      )}

      <Dialog open={guideOpen} onClose={() => setGuideOpen(false)} labelledBy={`guide-${product.id}`} variant="right">
        <div className={styles.guide}>
          <div className={styles.guideHead}>
            <h2 id={`guide-${product.id}`} className="t-h2">
              {t("sizeGuide.title")}
            </h2>
            <button type="button" className="btn-text" onClick={() => setGuideOpen(false)}>
              {t("common.close")}
            </button>
          </div>
          <SizeGuide initialTab={product.sizeSystem} selectedSize={size} />
        </div>
      </Dialog>
    </div>
  );
}
