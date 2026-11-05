import type { Locale } from "./config";
import { intlLocale } from "./config";

export type Messages = Record<string, string>;
export type Vars = Record<string, string | number>;

/** Replace {name} placeholders. Unknown placeholders are left as is. */
export function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, name: string) =>
    name in vars ? String(vars[name]) : m,
  );
}

export interface Translator {
  lang: Locale;
  /** Simple lookup with interpolation. Missing keys throw in development builds. */
  (key: string, vars?: Vars): string;
  /** Plural lookup: key_one / key_other chosen with Intl.PluralRules (0 -> other). */
  plural: (key: string, count: number, vars?: Vars) => string;
  has: (key: string) => boolean;
  price: (value: number) => string;
}

const priceFormatters = new Map<Locale, Intl.NumberFormat>();

export function formatPrice(lang: Locale, value: number): string {
  let f = priceFormatters.get(lang);
  if (!f) {
    f = new Intl.NumberFormat(intlLocale[lang], {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    priceFormatters.set(lang, f);
  }
  return f.format(value);
}

export function createTranslator(lang: Locale, messages: Messages): Translator {
  const rules = new Intl.PluralRules(intlLocale[lang]);
  const lookup = (key: string): string => {
    const value = messages[key];
    if (value === undefined) {
      // No mixed-language fallback: a missing key is a bug (docs/ux/purchase-flow.md §7).
      throw new Error(`Missing translation "${key}" for "${lang}"`);
    }
    return value;
  };
  const t = ((key: string, vars?: Vars) => interpolate(lookup(key), vars)) as Translator;
  t.lang = lang;
  t.plural = (key, count, vars) => {
    const category = count === 0 ? "other" : rules.select(count);
    const k = messages[`${key}_${category}`] !== undefined ? `${key}_${category}` : `${key}_other`;
    return interpolate(lookup(k), { count, ...vars });
  };
  t.has = (key) => messages[key] !== undefined;
  t.price = (value) => formatPrice(lang, value);
  return t;
}

/** Two-digit counters such as [04] (formatting lives in code, not in copy). */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
