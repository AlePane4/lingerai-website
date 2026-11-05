import { LANG_COOKIE, type Locale } from "@/i18n/config";

/** Remember a language chosen by hand (privacy.browser.lang). */
export function saveLanguage(lang: Locale): void {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/** Forget every demo preference stored in the browser. */
export function clearDemoData(): void {
  try {
    window.localStorage.clear();
    window.sessionStorage.clear();
  } catch {
    // Storage unavailable: nothing to clear.
  }
  document.cookie = `${LANG_COOKIE}=; path=/; max-age=0`;
}
