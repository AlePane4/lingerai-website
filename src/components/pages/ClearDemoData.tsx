"use client";

import { useState } from "react";
import { clearDemoData } from "@/lib/browserPrefs";
import { useT } from "@/i18n/I18nProvider";
import { useAnnouncer } from "@/components/ui/Announcer";

/** Privacy: clears localStorage, sessionStorage and the language cookie. */
export function ClearDemoData() {
  const t = useT();
  const { announce } = useAnnouncer();
  const [done, setDone] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          clearDemoData();
          setDone(true);
          announce(t("privacy.delete.done"));
          // Stage B: also reset the in-memory bag.
        }}
      >
        {t("privacy.delete.button")}
      </button>
      {done && (
        <p className="t-meta" aria-hidden="true" style={{ marginTop: "var(--space-2)" }}>
          {t("privacy.delete.done")}
        </p>
      )}
    </div>
  );
}
