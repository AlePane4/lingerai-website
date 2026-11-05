import type { Metadata } from "next";
import { NotFoundContent } from "@/components/pages/NotFoundContent";

// Target of the proxy rewrite for unknown URLs (served with status 404, URL unchanged).
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function PageNotFound() {
  return <NotFoundContent />;
}
