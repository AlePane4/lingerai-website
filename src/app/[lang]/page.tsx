import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getTranslator } from "@/i18n/messages";
import { routeMetadata } from "@/i18n/metadata";
import { HomePage } from "@/components/pages/HomePage";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return routeMetadata(lang, { kind: "home" });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage t={getTranslator(lang)} />;
}
