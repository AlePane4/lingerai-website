import type { Translator } from "@/i18n/translate";
import { editorialImages } from "@/data/editorialImages";
import styles from "./CreditsPage.module.css";

const PEXELS_LICENSE = "https://www.pexels.com/license/";

/** Photo credits: one row per editorial photo used on the site (docs/visual/image-sources.md). */
export function CreditsPage({ t }: { t: Translator }) {
  const photos = Object.values(editorialImages);
  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <h1 className="t-h1">{t("credits.title")}</h1>
        <p>{t("credits.intro")}</p>
        <p>
          <a href={PEXELS_LICENSE} className="link-utility" rel="noopener noreferrer">
            {t("credits.license")}
          </a>
        </p>
      </header>
      <ol role="list" className={styles.list}>
        {photos.map((photo) => {
          const caption = t(photo.altKey);
          return (
            <li key={photo.src} className={styles.item}>
              <p>{caption}</p>
              <dl className={styles.meta}>
                <dt className="t-label">{t("credits.author.label")}</dt>
                <dd className="t-data">{photo.author}</dd>
              </dl>
              <a href={photo.sourceUrl} className="link-utility" rel="noopener noreferrer">
                {t("credits.source")}
                <span className="sr-only">: {caption}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
