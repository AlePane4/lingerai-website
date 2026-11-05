import it from "@/messages/it.json";
import en from "@/messages/en.json";
import type { Locale } from "./config";
import { createTranslator, type Messages } from "./translate";

const dictionaries: Record<Locale, Messages> = { it, en };

export function getMessages(lang: Locale): Messages {
  return dictionaries[lang];
}

export function getTranslator(lang: Locale) {
  return createTranslator(lang, dictionaries[lang]);
}
