"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ColourId } from "@/data/products";
import { MAX_QTY } from "@/data/catalog";

// STAGE A STUB: in-memory bag. Stage B adds localStorage, the bag panel, sync between tabs.
// Stored shape follows docs/ux/purchase-flow.md §6: id + colour + size + qty, no copy or prices.
export interface BagLine {
  id: string;
  colour: ColourId;
  size: string;
  qty: number;
}

export type AddResult = { ok: true; count: number } | { ok: false; reason: "max" };

interface BagApi {
  /** false until the browser state has been read: the counter shows [·]. */
  ready: boolean;
  lines: BagLine[];
  count: number;
  add: (line: Omit<BagLine, "qty">) => AddResult;
}

const BagContext = createContext<BagApi | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<BagLine[]>([]);

  useEffect(() => {
    // Stage B: read localStorage here before flagging ready.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const count = lines.reduce((n, l) => n + l.qty, 0);

  const add = useCallback(
    (line: Omit<BagLine, "qty">): AddResult => {
      const existing = lines.find((l) => l.id === line.id && l.colour === line.colour && l.size === line.size);
      if (existing && existing.qty >= MAX_QTY) return { ok: false, reason: "max" };
      const next = existing
        ? lines.map((l) => (l === existing ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { ...line, qty: 1 }];
      setLines(next);
      return { ok: true, count: next.reduce((n, l) => n + l.qty, 0) };
    },
    [lines],
  );

  const api = useMemo(() => ({ ready, lines, count, add }), [ready, lines, count, add]);
  return <BagContext.Provider value={api}>{children}</BagContext.Provider>;
}

export function useBag(): BagApi {
  const api = useContext(BagContext);
  if (!api) throw new Error("useBag must be used inside <BagProvider>");
  return api;
}
