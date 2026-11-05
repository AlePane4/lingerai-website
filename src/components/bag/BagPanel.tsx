"use client";

import { useEffect, useRef } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { useAnnouncer } from "@/components/ui/Announcer";
import { useBag } from "./BagProvider";
import { BagContents } from "./BagContents";
import styles from "./BagPanel.module.css";

const TITLE_ID = "bag-panel-title";

/** Bag side panel: native modal dialog with its own status region (design-system §3.3, §3.14). */
export function BagPanel() {
  const bag = useBag();
  const { announce } = useAnnouncer();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const announced = useRef(0);
  const { panelOpen, pendingAnnouncement, addedAt } = bag;

  // Runs after the dialog (child) has opened and registered its status region.
  useEffect(() => {
    if (panelOpen && pendingAnnouncement && announced.current !== addedAt) {
      announced.current = addedAt;
      announce(pendingAnnouncement);
    }
  }, [panelOpen, pendingAnnouncement, addedAt, announce]);

  return (
    <Dialog
      open={panelOpen}
      onClose={bag.closePanel}
      labelledBy={TITLE_ID}
      variant="right"
      initialFocus={titleRef}
      className={styles.panel}
      fallbackFocus={() => document.querySelector<HTMLElement>("[data-bag-counter]")}
    >
      {panelOpen && <BagContents variant="panel" titleId={TITLE_ID} titleRef={titleRef} onClose={bag.closePanel} />}
    </Dialog>
  );
}
