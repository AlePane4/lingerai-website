"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { MAX_QTY } from "@/data/catalog";
import { bagStore, type BagLine, type BagNotice } from "@/lib/bagStore";
import { lineKey } from "./resolve";
import { BagPanel } from "./BagPanel";

export type { BagLine };
export type AddResult = { ok: true; count: number } | { ok: false; reason: "max" };

const EMPTY: BagLine[] = [];

interface BagApi {
  /** false on the server and during hydration: the counter shows [·]. */
  ready: boolean;
  lines: BagLine[];
  count: number;
  notice: BagNotice;
  clearNotice: () => void;
  /** Adds one piece, opens the panel with the line highlighted and announces `announcement`. */
  add: (line: Omit<BagLine, "qty">, announcement?: string) => AddResult;
  setQty: (key: string, qty: number) => void;
  /** Removes a line; returns it with its position, for "Undo". */
  remove: (key: string) => { line: BagLine; index: number } | undefined;
  restore: (line: BagLine, index: number) => void;
  clear: () => void;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  /** Key of the line just added (tag "Added" until the panel closes). */
  highlight: string | null;
  /** Message to announce inside the panel once it is open (paired with addedAt). */
  pendingAnnouncement: string | null;
  /** Changes on every successful add (BORSA inversion, announcement id). */
  addedAt: number;
}

const BagContext = createContext<BagApi | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const snap = useSyncExternalStore(bagStore.subscribe, bagStore.getSnapshot, bagStore.getServerSnapshot);
  const [panelOpen, setPanelOpen] = useState(false);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [pendingAnnouncement, setPending] = useState<string | null>(null);
  const [addedAt, setAddedAt] = useState(0);

  const lines = snap?.lines ?? EMPTY;
  const count = lines.reduce((n, l) => n + l.qty, 0);

  // Mutations read the store synchronously, so rapid clicks never use a stale copy.
  const current = () => bagStore.getSnapshot().lines;

  const add = useCallback((line: Omit<BagLine, "qty">, announcement?: string): AddResult => {
    const all = current();
    const key = lineKey(line);
    const existing = all.find((l) => lineKey(l) === key);
    if (existing && existing.qty >= MAX_QTY) return { ok: false, reason: "max" };
    const next = existing ? all.map((l) => (l === existing ? { ...l, qty: l.qty + 1 } : l)) : [...all, { ...line, qty: 1 }];
    bagStore.set(next);
    setHighlight(key);
    setPending(announcement ?? null);
    setAddedAt(Date.now());
    setPanelOpen(true);
    return { ok: true, count: next.reduce((n, l) => n + l.qty, 0) };
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    const q = Math.min(MAX_QTY, Math.max(1, qty));
    bagStore.set(current().map((l) => (lineKey(l) === key ? { ...l, qty: q } : l)));
  }, []);

  const remove = useCallback((key: string) => {
    const all = current();
    const index = all.findIndex((l) => lineKey(l) === key);
    if (index < 0) return undefined;
    bagStore.set(all.filter((_, i) => i !== index));
    return { line: all[index], index };
  }, []);

  const restore = useCallback((line: BagLine, index: number) => {
    const all = current();
    const key = lineKey(line);
    const existing = all.find((l) => lineKey(l) === key);
    if (existing) {
      bagStore.set(all.map((l) => (l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + line.qty) } : l)));
    } else {
      const next = [...all];
      next.splice(Math.min(index, next.length), 0, line);
      bagStore.set(next);
    }
  }, []);

  const clear = useCallback(() => bagStore.reset(), []);
  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setHighlight(null);
  }, []);

  const api = useMemo<BagApi>(
    () => ({
      ready: snap !== null,
      lines,
      count,
      notice: snap?.notice ?? null,
      clearNotice: bagStore.clearNotice,
      add,
      setQty,
      remove,
      restore,
      clear,
      panelOpen,
      openPanel,
      closePanel,
      highlight,
      pendingAnnouncement,
      addedAt,
    }),
    [snap, lines, count, add, setQty, remove, restore, clear, panelOpen, openPanel, closePanel, highlight, pendingAnnouncement, addedAt],
  );

  return (
    <BagContext.Provider value={api}>
      {children}
      <BagPanel />
    </BagContext.Provider>
  );
}

export function useBag(): BagApi {
  const api = useContext(BagContext);
  if (!api) throw new Error("useBag must be used inside <BagProvider>");
  return api;
}
