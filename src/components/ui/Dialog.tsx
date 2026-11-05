"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { DialogStatusRegion } from "./Announcer";
import styles from "./Dialog.module.css";

export type DialogVariant = "right" | "full" | "bottom";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  variant?: DialogVariant;
  /** Element focused when the dialog opens (defaults to the first focusable). */
  initialFocus?: RefObject<HTMLElement | null>;
  className?: string;
  /** Focus target on close when the opener is gone or hidden (e.g. inside a closed menu). */
  fallbackFocus?: () => HTMLElement | null;
  children: ReactNode;
}

// Native modal <dialog>: focus trap, Esc and inert background come from the browser.
export function Dialog({ open, onClose, labelledBy, variant = "right", initialFocus, className, fallbackFocus, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const fallbackRef = useRef(fallbackFocus);
  useEffect(() => {
    fallbackRef.current = fallbackFocus;
  }, [fallbackFocus]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      opener.current = document.activeElement as HTMLElement | null;
      el.showModal();
      document.documentElement.dataset.scrollLock = "";
      initialFocus?.current?.focus();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open, initialFocus]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const onClosed = () => {
      delete document.documentElement.dataset.scrollLock;
      const back = opener.current;
      if (back && document.contains(back) && !back.closest("dialog:not([open])")) back.focus();
      else fallbackRef.current?.()?.focus();
    };
    el.addEventListener("cancel", onCancel);
    el.addEventListener("close", onClosed);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("close", onClosed);
    };
  }, [onClose]);

  // Close on unmount (e.g. client navigation) so the page never stays inert.
  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el?.open) el.close();
      delete document.documentElement.dataset.scrollLock;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={`${styles.dialog} ${styles[variant]} ${className ?? ""}`}
      onClick={(e) => {
        // A click on the backdrop (outside the panel box) closes the dialog.
        if (e.target === ref.current) onClose();
      }}
    >
      <div className={styles.inner}>{children}</div>
      <DialogStatusRegion active={open} />
    </dialog>
  );
}
