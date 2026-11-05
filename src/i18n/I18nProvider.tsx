"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import { createTranslator, type Messages, type Translator } from "./translate";

const I18nContext = createContext<Translator | null>(null);

export function I18nProvider({
  lang,
  messages,
  children,
}: {
  lang: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const t = useMemo(() => createTranslator(lang, messages), [lang, messages]);
  return <I18nContext.Provider value={t}>{children}</I18nContext.Provider>;
}

export function useT(): Translator {
  const t = useContext(I18nContext);
  if (!t) throw new Error("useT must be used inside <I18nProvider>");
  return t;
}
