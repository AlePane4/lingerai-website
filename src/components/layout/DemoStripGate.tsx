"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Hides the demo strip on checkout and confirmation: those pages carry their own
 * demo banner, so the notice is not shown twice (UX-4, user decision).
 */
export function DemoStripGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hidden = /^\/(it|en)\/checkout(\/|$)/.test(pathname);
  return hidden ? null : <>{children}</>;
}
