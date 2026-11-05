"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

// One global role="status" region, plus one region inside each open <dialog>
// (with showModal everything outside the dialog leaves the accessibility tree).
interface AnnouncerApi {
  announce: (message: string) => void;
  register: (el: HTMLElement) => () => void;
}

const AnnouncerContext = createContext<AnnouncerApi | null>(null);

export function AnnouncerProvider({ children }: { children: ReactNode }) {
  const globalRef = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLElement[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const announce = useCallback((message: string) => {
    const target = stack.current[stack.current.length - 1] ?? globalRef.current;
    if (!target) return;
    target.textContent = "";
    clearTimeout(timer.current);
    // The region already exists; inserting the text a tick later makes repeats audible.
    timer.current = setTimeout(() => {
      target.textContent = message;
    }, 50);
  }, []);

  const register = useCallback((el: HTMLElement) => {
    stack.current.push(el);
    return () => {
      stack.current = stack.current.filter((x) => x !== el);
    };
  }, []);

  const api = useMemo(() => ({ announce, register }), [announce, register]);

  return (
    <AnnouncerContext.Provider value={api}>
      {children}
      <div ref={globalRef} role="status" className="sr-only" />
    </AnnouncerContext.Provider>
  );
}

export function useAnnouncer(): AnnouncerApi {
  const api = useContext(AnnouncerContext);
  if (!api) throw new Error("useAnnouncer must be used inside <AnnouncerProvider>");
  return api;
}

/** Status region placed inside a dialog; registered only while the dialog is open. */
export function DialogStatusRegion({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { register } = useAnnouncer();
  useEffect(() => {
    if (!active || !ref.current) return;
    return register(ref.current);
  }, [active, register]);
  return <div ref={ref} role="status" className="sr-only" />;
}
