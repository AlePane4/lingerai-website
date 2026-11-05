import Link from "next/link";
import type { Translator } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { Arrowed } from "@/components/ui/Arrowed";
import styles from "./DemoStrip.module.css";

/** Demo notice on every page: signal orange with #111 text, not sticky, never role="alert" [R12]. */
export function DemoStrip({ t }: { t: Translator }) {
  return (
    <aside aria-label={t("a11y.demoNotice")} className={styles.strip} data-signal="">
      <p className={styles.text}>
        {t("demo.strip.text")}{" "}
        <Link href={href(t.lang, { kind: "page", page: "terms" })} className={styles.link}>
          <Arrowed text={t("demo.strip.link")} />
        </Link>
      </p>
    </aside>
  );
}
