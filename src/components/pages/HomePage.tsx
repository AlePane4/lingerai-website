import Link from "next/link";
import { products, sortSoldOutLast } from "@/data/catalog";
import { editorialImages } from "@/data/editorialImages";
import type { Translator } from "@/i18n/translate";
import { href, type PageId } from "@/i18n/routes";
import { HandNote } from "@/components/ui/HandNote";
import { WallTitle } from "@/components/ui/WallTitle";
import { Arrowed } from "@/components/ui/Arrowed";
import { EditorialPhoto } from "@/components/ui/EditorialPhoto";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryList } from "./CategoryList";
import styles from "./HomePage.module.css";

const reassure: { key: string; page?: PageId }[] = [
  { key: "home.reassure.shipping", page: "shipping" },
  { key: "home.reassure.returns", page: "returns" },
  { key: "home.reassure.materials" },
  { key: "home.reassure.demo", page: "terms" },
];

export function HomePage({ t }: { t: Translator }) {
  const featured = sortSoldOutLast(products).slice(0, 8);
  const drop = href(t.lang, { kind: "drop" });

  return (
    <>
      <section className={`${styles.hero} zine`}>
        <div className={`${styles.wall} page-margin`}>
          <WallTitle wall={t("home.hero.wall")} label={t("home.hero.label")} />
        </div>
        <div className={styles.heroBody}>
          <div className={styles.heroMedia}>
            {/* Mobile: compact thumbnail beside sub + CTA, only on screens tall enough to keep the first cards visible (UX R1). */}
            <EditorialPhoto
              image={editorialImages.homeHero}
              alt={t(editorialImages.homeHero.altKey)}
              preload
              tape="left"
              red
              sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 50vw, 30vw"
            />
          </div>
          <div className={styles.heroText}>
            <p className={styles.claim}>
              <span className="hl">{t("home.hero.claim")}</span>
            </p>
            <div className={styles.actions}>
              <p className={`t-body-l ${styles.sub}`}>{t("home.hero.sub")}</p>
              <Link href={drop} className="btn btn-secondary">
                {t("home.hero.cta")}
              </Link>
            </div>
            <HandNote text={t("handNotes.home")} className={styles.note} />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="home-drop">
        <h2 id="home-drop" className={`t-label page-margin ${styles.sectionTitle}`}>
          {t("home.drop.title")}
        </h2>
        <ProductGrid items={featured} t={t} priorityCount={2} />
        <p className={`page-margin ${styles.all}`}>
          <Link href={drop} className="link-utility">
            <Arrowed text={t("home.drop.all", { count: products.length })} />
          </Link>
        </p>
      </section>

      <section className={`${styles.section} page-margin`} aria-labelledby="home-categories">
        <h2 id="home-categories" className={`t-label ${styles.sectionTitle}`}>
          {t("home.categories.title")}
        </h2>
        <CategoryList t={t} />
      </section>

      <section className={`${styles.section} ${styles.editorial} page-margin`} aria-labelledby="home-editorial">
        <div className={styles.editorialMedia}>
          <EditorialPhoto
            image={editorialImages.homeEditorial}
            alt={t(editorialImages.homeEditorial.altKey)}
            tape="right"
            sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
          />
        </div>
        <div className={styles.editorialText}>
          <h2 id="home-editorial" className="t-label">
            {t("home.editorial.label")}
          </h2>
          <p className="t-body-l">{t("home.editorial.body")}</p>
          <Link href={href(t.lang, { kind: "page", page: "sizeGuide" })} className="link-utility">
            <Arrowed text={t("home.editorial.link")} />
          </Link>
        </div>
      </section>

      <div className={`${styles.editorial2} page-margin`}>
        <EditorialPhoto
          image={editorialImages.homeEditorial2}
          alt={t(editorialImages.homeEditorial2.altKey)}
          sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 75vw"
          className={styles.editorial2Media}
        />
      </div>

      <section className={`${styles.section} page-margin`}>
        <ul role="list" className={styles.reassure}>
          {reassure.map((r) => (
            <li key={r.key} className="t-ui">
              {r.page ? <Link href={href(t.lang, { kind: "page", page: r.page })}>{t(r.key)}</Link> : t(r.key)}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
