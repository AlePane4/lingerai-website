import type { Translator } from "@/i18n/translate";
import { editorialImages, productPhotoCredits } from "@/data/editorialImages";
import { products } from "@/data/products";
import styles from "./CreditsPage.module.css";

const PEXELS_LICENSE = "https://www.pexels.com/license/";

/** Photo credits: one row per editorial and product photo used on the site (docs/visual/image-sources.md). */
export function CreditsPage({ t }: { t: Translator }) {
  const editorial = Object.values(editorialImages).map((photo) => ({
    src: photo.src,
    caption: t(photo.altKey),
    author: photo.author,
    sourceUrl: photo.sourceUrl,
  }));
  const productPhotos = productPhotoCredits.flatMap((credit) => {
    const product = products.find((p) => p.images.some((img) => img.src === credit.src));
    const image = product?.images.find((img) => img.src === credit.src);
    if (!product || !image) return [];
    return [{ src: credit.src, caption: `${product.name} — ${image.alt[t.lang]}`, author: credit.author, sourceUrl: credit.sourceUrl }];
  });
  const photos = [...editorial, ...productPhotos];
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
          const caption = photo.caption;
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
