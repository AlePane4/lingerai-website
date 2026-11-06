import Link from "next/link";
import { editorialImages } from "@/data/editorialImages";
import type { Translator } from "@/i18n/translate";
import { href } from "@/i18n/routes";
import { HandNote } from "@/components/ui/HandNote";
import { WallTitle } from "@/components/ui/WallTitle";
import { Lines } from "@/components/ui/Arrowed";
import { EditorialPhoto } from "@/components/ui/EditorialPhoto";
import styles from "./AboutPage.module.css";

const how = ["construction", "materials", "bodies"] as const;

export function AboutPage({ t }: { t: Translator }) {
  return (
    <div className={`${styles.page} zine`}>
      <div className="page-margin">
        <WallTitle wall={t("about.wall")} label={t("about.h1")} />
      </div>
      <div className={styles.grid}>
        <p className={`t-body-l ${styles.manifesto}`}>
          <Lines text={t("about.manifesto")} />
          <HandNote text={t("handNotes.about")} className={styles.note} />
        </p>
        <div className={styles.media}>
          <EditorialPhoto
            image={editorialImages.aboutPortrait}
            alt={t(editorialImages.aboutPortrait.altKey)}
            tape="left"
            red
            sizes="(min-width: 64rem) 33vw, 100vw"
          />
        </div>
      </div>
      <section aria-labelledby="about-how" className={`page-margin ${styles.how}`}>
        <h2 id="about-how" className="t-label">
          {t("about.how.title")}
        </h2>
        <EditorialPhoto
          image={editorialImages.aboutAtelier}
          alt={t(editorialImages.aboutAtelier.altKey)}
          sizes="(min-width: 64rem) 66vw, 100vw"
          className={styles.atelier}
        />
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
