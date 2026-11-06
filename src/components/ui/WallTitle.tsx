import styles from "./WallTitle.module.css";

/**
 * Huge "wall" title (design-system §3.23). One h1: the giant type is aria-hidden,
 * the label carries the accessible name (visible from 768 px, sr-only below).
 * Edgy: an outlined "ghost" copy (aria-hidden) sits behind the whole title.
 */
export function WallTitle({ wall, label }: { wall: string; label: string }) {
  return (
    <div className={styles.wall}>
      <h1 className={styles.title}>
        <span className={styles.label}>{label}</span>
        <span className={styles.stack} aria-hidden="true">
          <span className={styles.ghost}>{wall}</span>
          <span className={styles.type}>{wall}</span>
        </span>
      </h1>
    </div>
  );
}
