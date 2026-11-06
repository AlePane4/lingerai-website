"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { COUNTRIES, EXPRESS_PRICE, PROVINCES } from "@/data/checkout";
import { useT } from "@/i18n/I18nProvider";
import { href } from "@/i18n/routes";
import { useAnnouncer } from "@/components/ui/Announcer";
import { Rich } from "@/components/ui/Arrowed";
import { useBag } from "@/components/bag/BagProvider";
import type { ResolvedLine } from "@/components/bag/resolve";
import { clearDraft, readDraft, saveDraft, saveOrder, type CheckoutValues, type ShippingMethod } from "@/lib/demoSession";
import { OrderSummary } from "./OrderSummary";
import { FIELD_ORDER, validateAll, validateField, type FieldName } from "./validate";
import { CHECKOUT_BANNER_ID } from "./ids";
import styles from "./Checkout.module.css";

const SUBMIT_DELAY = 800;

function emptyValues(lang: string): CheckoutValues {
  return {
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    province: "",
    country: lang === "it" ? "IT" : "GB",
    phone: "",
    method: "standard",
  };
}

const fieldId = (f: FieldName) => `checkout-${f}`;

interface Props {
  resolved: ResolvedLine[];
  subtotal: number;
  onPlaced: () => void;
}

export function CheckoutForm({ resolved, subtotal, onPlaced }: Props) {
  const t = useT();
  const L = t.lang;
  const router = useRouter();
  const bag = useBag();
  const { announce } = useAnnouncer();
  // Mounted only on the client (after the bag is read), so sessionStorage can seed the state.
  const [values, setValues] = useState<CheckoutValues>(() => ({ ...emptyValues(L), ...readDraft()?.values }));
  const [errors, setErrors] = useState<Record<string, string>>(() => readDraft()?.errors ?? {});
  const [terms, setTerms] = useState(false);
  const [showSummary, setShowSummary] = useState(() => Object.keys(readDraft()?.errors ?? {}).length > 0);
  const [submitting, setSubmitting] = useState(false);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const focusSummary = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (focusSummary.current) {
      focusSummary.current = false;
      summaryRef.current?.focus();
    }
  });

  const commit = (v: CheckoutValues, e: Record<string, string>) => {
    setValues(v);
    setErrors(e);
    saveDraft({ values: v, errors: e });
  };

  const withError = (e: Record<string, string>, f: FieldName, key: string | null) => {
    const next = { ...e };
    if (key) next[f] = key;
    else delete next[f];
    return next;
  };

  const change = (f: keyof CheckoutValues, value: string) => {
    const v = { ...values, [f]: value } as CheckoutValues;
    let e = errors;
    // An error disappears as soon as the value is valid (never added while typing).
    if (e[f] && !validateField(f, v, terms)) e = withError(e, f, null);
    if (f === "country") {
      if (value !== "IT") v.province = "";
      e = withError(withError(e, "province", null), "postalCode", e.postalCode ? validateField("postalCode", v, terms) : null);
    }
    commit(v, e);
  };

  const blur = (f: FieldName) => {
    const key = validateField(f, values, terms);
    // Validate on leaving the field only if something was typed (no errors just for tabbing through).
    const val = f === "terms" ? "" : String(values[f as keyof CheckoutValues] ?? "");
    if (key && !val.trim() && !errors[f]) return;
    // Announce an error that appears (or changes) on leaving the field; identical ones are not repeated.
    if (key && key !== errors[f]) announce(t(key));
    commit(values, withError(errors, f, key));
  };

  const fillSample = () => {
    const sample: CheckoutValues = {
      email: t("sample.email"),
      firstName: t("sample.firstName"),
      lastName: t("sample.lastName"),
      address1: t("sample.address1"),
      address2: t("sample.address2"),
      postalCode: t("sample.postalCode"),
      city: t("sample.city"),
      province: L === "it" ? t("sample.province") : "",
      country: t("sample.country"),
      phone: t("sample.phone"),
      method: values.method,
    };
    // The terms box is never ticked for the user, not even here (legal-compliance M3).
    const e: Record<string, string> = {};
    if (errors.terms) e.terms = errors.terms;
    commit(sample, e);
    announce(t("announce.sampleFilled"));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting) return;
    const e = validateAll(values, terms);
    commit(values, e);
    if (Object.keys(e).length) {
      setShowSummary(true);
      focusSummary.current = true;
      return;
    }
    setShowSummary(false);
    setSubmitting(true);
    announce(t("announce.submitting"));
    timer.current = setTimeout(() => {
      const shipping = values.method === "express" ? EXPRESS_PRICE : 0;
      const now = new Date();
      saveOrder({
        date: now.toISOString(),
        lines: resolved.map((r) => ({ ...r.line, unitPrice: r.unitPrice })),
        method: values.method,
        shipping,
        subtotal,
        total: subtotal + shipping,
        values,
      });
      clearDraft();
      onPlaced();
      bag.clear();
      router.push(href(L, { kind: "page", page: "confirmation" }));
    }, SUBMIT_DELAY);
  };

  const shipping = values.method === "express" ? EXPRESS_PRICE : 0;
  const total = subtotal + shipping;
  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const countries = [...COUNTRIES].sort((a, b) => t(`country.${a}`).localeCompare(t(`country.${b}`), L));

  const describe = (f: FieldName, hint?: boolean) =>
    [errors[f] ? `${fieldId(f)}-error` : "", hint ? `${fieldId(f)}-hint` : ""].filter(Boolean).join(" ") || undefined;

  const errorText = (f: FieldName) =>
    errors[f] ? (
      <p id={`${fieldId(f)}-error`} className={styles.error}>
        <span className="tag tag-signal t-label" data-signal="">
          {t("checkout.error.tag")}
        </span>{" "}
        {t(errors[f])}
      </p>
    ) : null;

  const text = (
    f: keyof CheckoutValues,
    opts: { label: string; autoComplete: string; type?: string; hint?: string; inputMode?: "numeric" | "email" | "tel"; required?: boolean; placeholder?: string; wide?: boolean },
  ): ReactNode => (
    <div className={`${styles.field} ${opts.wide ? styles.wide : ""}`}>
      <label htmlFor={fieldId(f)} className="t-label">
        {opts.label}
      </label>
      <input
        id={fieldId(f)}
        name={f}
        type={opts.type ?? "text"}
        className={styles.input}
        value={values[f]}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        placeholder={opts.placeholder}
        required={opts.required !== false}
        aria-invalid={errors[f] ? true : undefined}
        aria-describedby={describe(f, !!opts.hint)}
        onChange={(e) => change(f, e.target.value)}
        onBlur={() => blur(f)}
      />
      {errorText(f)}
      {opts.hint && (
        <p id={`${fieldId(f)}-hint`} className="t-meta t-muted">
          {opts.hint}
        </p>
      )}
    </div>
  );

  return (
    <div className={styles.layout}>
      <OrderSummary
        className={styles.aside}
        collapsible
        lines={resolved.map((r) => ({ key: r.key, ...r.line, total: r.total }))}
        subtotal={subtotal}
        shipping={shipping}
      />

      <form className={styles.form} noValidate aria-describedby={CHECKOUT_BANNER_ID} onSubmit={submit}>
        <div className={styles.sample}>
          <p className={styles.warning}>{t("checkout.dataWarning")}</p>
          <button type="button" className="btn btn-secondary" onClick={fillSample} aria-describedby="checkout-sample-hint">
            {t("checkout.fillSample")}
          </button>
          <p id="checkout-sample-hint" className="t-meta t-muted">
            {t("checkout.fillSample.hint")}
          </p>
        </div>

        <div className={styles.notes}>
          <p className="t-meta">{t("checkout.requiredNote")}</p>
          <p className="t-meta t-muted">{t("checkout.sessionNote")}</p>
        </div>

        {showSummary && errorList.length > 0 && (
          <div className={styles.errorSummary}>
            <h2 ref={summaryRef} tabIndex={-1} className="t-h3">
              {t.plural("checkout.error.summary", errorList.length)}
            </h2>
            <ul>
              {errorList.map((f) => (
                <li key={f}>
                  <a
                    href={`#${fieldId(f)}`}
                    className="link-inline"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(fieldId(f));
                      el?.focus();
                      el?.scrollIntoView({ block: "center" });
                    }}
                  >
                    {t(errors[f])}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className={styles.fieldset}>
          <legend className="t-h3">{t("checkout.section.contact")}</legend>
          {text("email", {
            label: t("checkout.field.email.label"),
            type: "email",
            autoComplete: "email",
            inputMode: "email",
            hint: t("checkout.field.email.hint"),
            placeholder: t("checkout.field.email.placeholder"),
            wide: true,
          })}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className="t-h3">{t("checkout.section.delivery")}</legend>
          <div className={styles.fields}>
            {text("firstName", { label: t("checkout.field.firstName.label"), autoComplete: "shipping given-name" })}
            {text("lastName", { label: t("checkout.field.lastName.label"), autoComplete: "shipping family-name" })}
            {text("address1", { label: t("checkout.field.address1.label"), autoComplete: "shipping address-line1", hint: t("checkout.field.address1.hint"), wide: true })}
            {text("address2", { label: t("checkout.field.address2.label"), autoComplete: "shipping address-line2", required: false, wide: true })}

            <div className={`${styles.field} ${styles.wide}`}>
              <label htmlFor={fieldId("country")} className="t-label">
                {t("checkout.field.country.label")}
              </label>
              <select
                id={fieldId("country")}
                name="country"
                className={styles.input}
                value={values.country}
                autoComplete="shipping country"
                required
                aria-invalid={errors.country ? true : undefined}
                aria-describedby={describe("country")}
                onChange={(e) => change("country", e.target.value)}
                onBlur={() => blur("country")}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {t(`country.${c}`)}
                  </option>
                ))}
              </select>
              {errorText("country")}
            </div>

            {text("postalCode", {
              label: t("checkout.field.postalCode.label"),
              autoComplete: "shipping postal-code",
              inputMode: values.country === "IT" ? "numeric" : undefined,
            })}
            {text("city", { label: t("checkout.field.city.label"), autoComplete: "shipping address-level2" })}

            {values.country === "IT" && (
              <div className={styles.field}>
                <label htmlFor={fieldId("province")} className="t-label">
                  {t("checkout.field.province.label")}
                </label>
                <select
                  id={fieldId("province")}
                  name="province"
                  className={styles.input}
                  value={values.province}
                  autoComplete="shipping address-level1"
                  required
                  aria-invalid={errors.province ? true : undefined}
                  aria-describedby={describe("province")}
                  onChange={(e) => change("province", e.target.value)}
                  onBlur={() => blur("province")}
                >
                  <option value="">{t("checkout.field.province.placeholder")}</option>
                  {PROVINCES.map((p) => (
                    <option key={p.code} value={p.code}>
                      {`${p.name} (${p.code})`}
                    </option>
                  ))}
                </select>
                {errorText("province")}
              </div>
            )}

            {text("phone", {
              label: t("checkout.field.phone.label"),
              type: "tel",
              autoComplete: "shipping tel",
              inputMode: "tel",
              hint: t("checkout.field.phone.hint"),
              required: false,
            })}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset} aria-describedby={describe("method")}>
          <legend className="t-h3">{t("checkout.section.method")}</legend>
          {(["standard", "express"] as ShippingMethod[]).map((m) => (
            <label key={m} className={styles.choice}>
              <input
                type="radio"
                name="method"
                value={m}
                checked={values.method === m}
                onChange={() => change("method", m)}
                className={styles.radio}
              />
              <span className={styles.choiceText}>
                <span className="t-ui">{t(`checkout.method.${m}.name`)}</span>
                <span className="t-meta t-muted">{t(`checkout.method.${m}.time`)}</span>
              </span>
              <span className="t-data">{m === "express" ? t("checkout.method.express.price", { price: t.price(EXPRESS_PRICE) }) : t("checkout.method.standard.price")}</span>
            </label>
          ))}
          {errorText("method")}
          <p className="t-meta t-muted">{t("checkout.method.note")}</p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className="t-h3">{t("checkout.section.payment")}</legend>
          <label className={styles.choice}>
            <input type="radio" name="payment" value="simulated" checked readOnly className={styles.radio} aria-describedby="checkout-payment-hint" />
            <span className="t-ui">{t("checkout.payment.option")}</span>
          </label>
          <p id="checkout-payment-hint" className="t-meta t-muted">
            {t("checkout.payment.hint")}
          </p>
        </fieldset>

        <div className={styles.terms}>
          <div className={styles.choice}>
            <input
              id={fieldId("terms")}
              type="checkbox"
              name="terms"
              className={styles.checkbox}
              checked={terms}
              required
              aria-invalid={errors.terms ? true : undefined}
              aria-describedby={describe("terms")}
              onChange={(e) => {
                setTerms(e.target.checked);
                if (e.target.checked && errors.terms) commit(values, withError(errors, "terms", null));
              }}
            />
            <label htmlFor={fieldId("terms")}>
              <Rich
                text={t("checkout.terms.label")}
                tags={{
                  terms: (chunk) => (
                    <Link href={href(L, { kind: "page", page: "terms" })} className="link-inline">
                      {chunk}
                    </Link>
                  ),
                }}
              />
            </label>
          </div>
          {errorText("terms")}
          <p className="t-meta">
            <Rich
              text={t("checkout.privacyLink")}
              tags={{
                privacy: (chunk) => (
                  <Link href={href(L, { kind: "page", page: "privacy" })} className="link-inline">
                    {chunk}
                  </Link>
                ),
              }}
            />
          </p>
        </div>

        <button type="submit" className="btn btn-primary btn-block" aria-disabled={submitting || undefined}>
          {submitting ? t("checkout.submitting") : t("checkout.submit", { total: t.price(total) })}
        </button>
      </form>
    </div>
  );
}
