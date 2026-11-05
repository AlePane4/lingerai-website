import type { ColourId } from "@/data/products";

// Checkout draft and last demo order: sessionStorage only (this browser tab), never sent anywhere.
export const CHECKOUT_KEY = "lingerai-checkout";
export const ORDER_KEY = "lingerai-order";
const SEQ_KEY = "lingerai-order-seq";

export type ShippingMethod = "standard" | "express";

export interface CheckoutValues {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  method: ShippingMethod;
}

export interface CheckoutDraft {
  values: CheckoutValues;
  /** Field → message key, so errors are re-translated after a language switch. */
  errors: Record<string, string>;
}

export interface DemoOrder {
  id: string;
  date: string;
  lines: { id: string; colour: ColourId; size: string; qty: number; unitPrice: number }[];
  method: ShippingMethod;
  shipping: number;
  subtotal: number;
  total: number;
  values: CheckoutValues;
}

function read<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked: the demo keeps working, data just isn't kept.
  }
}

function remove(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function readDraft(): CheckoutDraft | null {
  const d = read<CheckoutDraft>(CHECKOUT_KEY);
  return d && typeof d === "object" && d.values && typeof d.values === "object" ? d : null;
}

export const saveDraft = (d: CheckoutDraft) => write(CHECKOUT_KEY, d);
export const clearDraft = () => remove(CHECKOUT_KEY);

/** Raw string, so useSyncExternalStore gets a stable snapshot. */
export function readOrderRaw(): string | null {
  try {
    return window.sessionStorage.getItem(ORDER_KEY);
  } catch {
    return null;
  }
}

export function parseOrder(raw: string | null): DemoOrder | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as DemoOrder;
    return o && typeof o.id === "string" && Array.isArray(o.lines) && o.values ? o : null;
  } catch {
    return null;
  }
}

export function saveOrder(order: Omit<DemoOrder, "id">): DemoOrder {
  const seq = (Number(read<number>(SEQ_KEY)) || 0) + 1;
  write(SEQ_KEY, seq);
  const full = { ...order, id: `DEMO-${String(seq).padStart(4, "0")}` };
  write(ORDER_KEY, full);
  return full;
}
