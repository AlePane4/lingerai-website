import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { getMessages, getTranslator } from "@/i18n/messages";
import { I18nProvider } from "@/i18n/I18nProvider";
import { AnnouncerProvider } from "@/components/ui/Announcer";
import { BagProvider } from "@/components/bag/BagProvider";
import { DemoStrip } from "@/components/layout/DemoStrip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { archivo, jetbrainsMono } from "@/styles/fonts";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";
import "@/styles/globals.css";


export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Demo: no indexing anywhere (see src/lib/site.ts to change it).
  robots: ALLOW_INDEXING ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#e6e4df",
};

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getTranslator(lang);

  return (
    <html lang={htmlLang[lang]} className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Skip link first in the DOM, before the demo strip [a11y §3.1]. */}
        <a href="#main" className="skip-link">
          {t("a11y.skipToContent")}
        </a>
        <I18nProvider lang={lang} messages={getMessages(lang)}>
          <AnnouncerProvider>
            <BagProvider>
              <DemoStrip t={t} />
              <Header />
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <Footer t={t} />
            </BagProvider>
          </AnnouncerProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
