import type { ColourId } from "@/data/products";
import { MAX_QTY, colourKey } from "@/data/catalog";

// Bag persisted in localStorage (docs/ux/purchase-flow.md §6): only id + colour + size + qty.
// Names and prices are always read from the catalogue in the current language.

export const BAG_KEY = "lingerai-bag";
const VERSION = 1;

export interface BagLine {
  id: string;
  colour: ColourId;
  size: string;
  qty: number;
}

export type BagNotice = "reset" | "storageBlocked" | null;

export interface BagSnapshot {
  lines: BagLine[];
  notice: BagNotice;
}

let snapshot: BagSnapshot | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

const isColour = (v: unknown): v is ColourId => typeof v === "string" && v in colourKey;

/** Parse stored JSON. Returns undefined when the data cannot be trusted at all. */
export function parseBag(raw: string | null): BagLine[] | undefined {
  if (raw === null) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return undefined;
  }
  if (!data || typeof data !== "object") return undefined;
  const { v, lines } = data as { v?: unknown; lines?: unknown };
  if (v !== VERSION || !Array.isArray(lines)) return undefined;
  const out: BagLine[] = [];
  for (const item of lines) {
    if (!item || typeof item !== "object") return undefined;
    const { id, colour, size, qty } = item as Record<string, unknown>;
    if (typeof id !== "string" || typeof size !== "string" || !isColour(colour)) return undefined;
    if (typeof qty !== "number" || !Number.isFinite(qty)) return undefined;
    const q = Math.min(MAX_QTY, Math.max(1, Math.round(qty)));
    const same = out.find((l) => l.id === id && l.colour === colour && l.size === size);
    if (same) same.qty = Math.min(MAX_QTY, same.qty + q);
    else out.push({ id, colour, size, qty: q });
  }
  return out;
}

function readStorage(): BagSnapshot {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(BAG_KEY);
  } catch {
    return { lines: [], notice: "storageBlocked" };
  }
  const lines = parseBag(raw);
  if (lines) return { lines, notice: null };
  // Corrupted data: empty the bag without a technical error (page-blueprints §6).
  try {
    window.localStorage.removeItem(BAG_KEY);
  } catch {
    // ignore
  }
  return { lines: [], notice: "reset" };
}

function persist(lines: BagLine[]): BagNotice {
  try {
    if (lines.length === 0) window.localStorage.removeItem(BAG_KEY);
    else window.localStorage.setItem(BAG_KEY, JSON.stringify({ v: VERSION, lines }));
    return null;
  } catch {
    return "storageBlocked";
  }
}

export const bagStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      // Another tab changed the bag (or cleared the storage): reload.
      if (e.key === BAG_KEY || e.key === null) {
        snapshot = readStorage();
        emit();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): BagSnapshot {
    if (!snapshot) snapshot = readStorage();
    return snapshot;
  },
  /** On the server and during hydration the bag is "not read yet". */
  getServerSnapshot(): BagSnapshot | null {
    return null;
  },
  set(lines: BagLine[]): void {
    // A failed write keeps the bag in memory and tells the user it won't survive a reload.
    snapshot = { lines, notice: persist(lines) };
    emit();
  },
  clearNotice(): void {
    if (snapshot?.notice) {
      snapshot = { ...snapshot, notice: null };
      emit();
    }
  },
  /** After "Clear demo data": forget the in-memory copy too. */
  reset(): void {
    persist([]);
    snapshot = { lines: [], notice: null };
    emit();
  },
};
