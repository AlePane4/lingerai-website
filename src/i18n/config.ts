export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

/** Value of <html lang> and hreflang per locale. */
export const htmlLang: Record<Locale, string> = { it: "it", en: "en-GB" };
/** Locale used by Intl formatters. */
export const intlLocale: Record<Locale, string> = { it: "it-IT", en: "en-GB" };
/** Cookie remembering a language chosen by hand (see docs/copy/pages.md, privacy.browser.lang). */
export const LANG_COOKIE = "lingerai-lang";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(lang: Locale): Locale {
  return lang === "it" ? "en" : "it";
}
