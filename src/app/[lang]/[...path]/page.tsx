import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/data/catalog";
import { isLocale, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/messages";
import { routeMetadata } from "@/i18n/metadata";
import { allRoutes, href, isBuilt, resolve, type Route } from "@/i18n/routes";
import { DropPage } from "@/components/pages/DropPage";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { ProductPage } from "@/components/pages/ProductPage";
import { InfoPage } from "@/components/pages/InfoPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { SizeGuidePage } from "@/components/pages/SizeGuidePage";
import { BagPage } from "@/components/bag/BagPage";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import { ConfirmationPage } from "@/components/checkout/ConfirmationPage";

type Props = { params: Promise<{ lang: string; path: string[] }> };


// Every page is generated at build time from the local catalogue (translated slugs, see i18n/routes.ts).
export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale;
  return allRoutes().map((route) => ({ path: href(lang, route).split("/").slice(2) }));
}

async function getRoute(params: Props["params"]): Promise<{ lang: Locale; route: Route } | undefined> {
  const { lang, path } = await params;
  if (!isLocale(lang)) return undefined;
  const route = resolve(lang, path);
  if (!route || route.kind === "home" || !isBuilt(route)) return undefined;
  return { lang, route };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await getRoute(params);
  return found ? routeMetadata(found.lang, found.route) : {};
}

export default async function CatchAll({ params }: Props) {
  const found = await getRoute(params);
  if (!found) notFound();
  const { lang, route } = found;
  const t = getTranslator(lang);

  switch (route.kind) {
    case "drop":
      return <DropPage t={t} />;
    case "category":
      return <CategoryPage t={t} category={route.category} />;
    case "product":
      return <ProductPage t={t} product={getProduct(route.id)!} />;
    case "page":
      switch (route.page) {
        case "about":
          return <AboutPage t={t} />;
        case "sizeGuide":
          return <SizeGuidePage t={t} />;
        case "bag":
          return <BagPage />;
        case "checkout":
          return <CheckoutPage />;
        case "confirmation":
          return <ConfirmationPage />;
        case "shipping":
        case "returns":
        case "contact":
        case "terms":
        case "privacy":
          return <InfoPage t={t} page={route.page} />;
        default:
          notFound();
      }
  }
  notFound();
}
