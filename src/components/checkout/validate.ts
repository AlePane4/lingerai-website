import { COUNTRIES, PROVINCES } from "@/data/checkout";
import type { CheckoutValues } from "@/lib/demoSession";

export type FieldName = keyof CheckoutValues | "terms";

/** Field order = order of the error summary. */
export const FIELD_ORDER: FieldName[] = [
  "email",
  "firstName",
  "lastName",
  "address1",
  "postalCode",
  "city",
  "province",
  "country",
  "phone",
  "method",
  "terms",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POSTCODE_IT = /^\d{5}$/;
const POSTCODE_GB = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const POSTCODE_OTHER = /^[A-Z0-9][A-Z0-9 -]{2,9}$/i;
const PHONE = /^\+?[\d ]{6,20}$/;

/** Returns the message key of the error, or null when the field is valid. */
export function validateField(field: FieldName, v: CheckoutValues, terms: boolean): string | null {
  const val = field === "terms" ? "" : String(v[field] ?? "").trim();
  switch (field) {
    case "email":
      if (!val) return "checkout.error.email.required";
      return EMAIL.test(val) ? null : "checkout.error.email.invalid";
    case "firstName":
    case "lastName":
    case "address1":
    case "city":
      return val ? null : `checkout.error.${field}.required`;
    case "postalCode":
      if (!val) return "checkout.error.postalCode.required";
      if (v.country === "IT") return POSTCODE_IT.test(val) ? null : "checkout.error.postalCode.invalidIT";
      if (v.country === "GB") return POSTCODE_GB.test(val) ? null : "checkout.error.postalCode.invalidGB";
      return POSTCODE_OTHER.test(val) ? null : "checkout.error.postalCode.invalid";
    case "province":
      if (v.country !== "IT") return null;
      return PROVINCES.some((p) => p.code === val) ? null : "checkout.error.province.required";
    case "country":
      return (COUNTRIES as readonly string[]).includes(val) ? null : "checkout.error.country.required";
    case "phone":
      return !val || PHONE.test(val) ? null : "checkout.error.phone.invalid";
    case "method":
      return val === "standard" || val === "express" ? null : "checkout.error.method.required";
    case "terms":
      return terms ? null : "checkout.error.terms.required";
    case "address2":
      return null;
  }
}

export function validateAll(v: CheckoutValues, terms: boolean): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of FIELD_ORDER) {
    const e = validateField(f, v, terms);
    if (e) errors[f] = e;
  }
  return errors;
}
