import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, isLocale, type Locale } from "@/i18n/config";
import { isBuilt, resolve } from "@/i18n/routes";

const NOT_FOUND_SEGMENT = "page-not-found";

// "/" -> the language chosen by hand (cookie) or the browser language (it* -> it, else en).
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;
  const first = (request.headers.get("accept-language") ?? "").split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("it") ? "it" : first ? "en" : "it";
}

function notFound(request: NextRequest, lang: Locale) {
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}/${NOT_FOUND_SEGMENT}`;
  return NextResponse.rewrite(url, { status: 404 });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first = "", ...segments] = pathname.split("/");

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}`;
    return NextResponse.redirect(url);
  }

  // No language prefix: English 404 (sitemap §2, "altro → 404 EN").
  if (!isLocale(first)) return notFound(request, "en");

  // Unknown or not-yet-built pages get the localized 404 with a real 404 status.
  const parts = segments.filter(Boolean);
  if (parts.length === 1 && parts[0] === NOT_FOUND_SEGMENT) return notFound(request, first);
  const route = resolve(first, parts);
  if (!route || !isBuilt(route)) return notFound(request, first);
  return NextResponse.next();
}

export const config = {
  // Skip Next internals and files with an extension (public assets).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
