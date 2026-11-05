import type { Translator } from "@/i18n/translate";
import { SizeGuide } from "@/components/sizeguide/SizeGuide";
import styles from "./SizeGuidePage.module.css";

export function SizeGuidePage({ t }: { t: Translator }) {
  return (
    <div className={styles.page}>
      <h1 className="t-h1">{t("sizeGuide.title")}</h1>
      <p className="t-body-l">{t("sizeGuidePage.intro")}</p>
      <SizeGuide headingLevel="h2" />
    </div>
  );
}
