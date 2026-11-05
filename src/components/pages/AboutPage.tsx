import Link from "next/link";
import { getProduct } from "@/data/catalog";
import type { Translator } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { WallTitle } from "@/components/ui/WallTitle";
import { Lines } from "@/components/ui/Arrowed";
import { Media } from "@/components/product/Media";
import styles from "./AboutPage.module.css";

const how = ["construction", "materials", "bodies"] as const;

export function AboutPage({ t }: { t: Translator }) {
  return (
    <div className={styles.page}>
      <div className="page-margin">
        <WallTitle wall={t("about.wall")} label={t("about.h1")} />
      </div>
      <div className={styles.grid}>
        <p className={`t-body-l ${styles.manifesto}`}>
          <Lines text={t("about.manifesto")} />
        </p>
        <div className={styles.media}>
          <Media product={getProduct("axisBrief")!} alt="" sizes="(min-width: 64rem) 33vw, 100vw" />
        </div>
      </div>
      <section aria-labelledby="about-how" className={`page-margin ${styles.how}`}>
        <h2 id="about-how" className="t-label">
          {t("about.how.title")}
        </h2>
        <ul role="list" className={styles.howList}>
          {how.map((k) => (
            <li key={k}>
              <h3 className="t-h3">{t(`about.how.${k}.title`)}</h3>
              <p>{t(`about.how.${k}.body`)}</p>
            </li>
          ))}
        </ul>
        <p className="t-meta">{t("about.demo")}</p>
        <Link href={href(t.lang, { kind: "drop" })} className="btn btn-secondary">
          {t("about.cta")}
        </Link>
      </section>
    </div>
  );
}
