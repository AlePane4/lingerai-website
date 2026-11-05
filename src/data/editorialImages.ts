import type { CategoryId } from "./products";

/**
 * Editorial photos (hybrid images decision, 2026-11-05): home, drop, categories and About only.
 * Product pages keep the technical drawings. Source, licence and authors: docs/visual/image-sources.md.
 * All photos: Pexels License, greyscale conversion by visual-content.
 */
export interface EditorialImage {
  src: string;
  width: number;
  height: number;
  /** Translation key of the alt text (also used as the caption on the credits page). */
  altKey: string;
  author: string;
  sourceUrl: string;
}

const portrait = { width: 1500, height: 2000 } as const; // 3:4
const wide = { width: 2000, height: 1125 } as const; // 16:9

export const editorialImages = {
  homeHero: {
    src: "/images/editorial/home-hero-a.jpg",
    ...portrait,
    altKey: "home.hero.image.alt",
    author: "Uday Ahir",
    sourceUrl: "https://www.pexels.com/photo/fashionable-woman-in-black-outfit-beside-concrete-wall-39553402/",
  },
  homeEditorial: {
    src: "/images/editorial/home-editorial-a.jpg",
    ...portrait,
    altKey: "home.editorial.image.alt",
    author: "Hanna Pad",
    sourceUrl: "https://www.pexels.com/photo/close-up-shot-of-black-textile-on-white-box-7946629/",
  },
  dropHero: {
    src: "/images/editorial/drop-hero-a.jpg",
    ...wide,
    altKey: "drop.image.alt",
    author: "Uday Ahir",
    sourceUrl: "https://www.pexels.com/photo/person-walking-against-minimalist-concrete-wall-39567193/",
  },
  bras: {
    src: "/images/editorial/category-bras-a.jpg",
    ...portrait,
    altKey: "category.bras.image.alt",
    author: "ROCKETMANN TEAM",
    sourceUrl: "https://www.pexels.com/photo/woman-in-black-spaghetti-strap-top-9486627/",
  },
  briefs: {
    src: "/images/editorial/category-briefs-a.jpg",
    ...portrait,
    altKey: "category.briefs.image.alt",
    author: "Polina Tankilevitch",
    sourceUrl: "https://www.pexels.com/photo/a-woman-in-black-brassiere-and-black-panty-4519522/",
  },
  bodysuits: {
    src: "/images/editorial/category-bodysuits-a.jpg",
    ...portrait,
    altKey: "category.bodysuits.image.alt",
    author: "Roberto Hund",
    sourceUrl: "https://www.pexels.com/photo/positive-asian-woman-in-bodysuit-standing-in-light-studio-5311767/",
  },
  slips: {
    src: "/images/editorial/category-slips-b.jpg",
    ...portrait,
    altKey: "category.slips.image.alt",
    author: "Anna Shvets",
    sourceUrl: "https://www.pexels.com/photo/woman-in-black-slip-dress-holding-white-flower-3732660/",
  },
  accessories: {
    src: "/images/editorial/category-accessories-a.jpg",
    ...portrait,
    altKey: "category.accessories.image.alt",
    author: "Alina Skazka",
    sourceUrl: "https://www.pexels.com/photo/woman-fastening-a-harness-on-her-blouse-18841322/",
  },
  aboutPortrait: {
    src: "/images/editorial/about-portrait-a.jpg",
    ...portrait,
    altKey: "about.portrait.alt",
    author: "annmteu",
    sourceUrl: "https://www.pexels.com/photo/a-woman-with-short-hair-11395925/",
  },
  aboutAtelier: {
    src: "/images/editorial/about-atelier-a.jpg",
    ...wide,
    altKey: "about.atelier.alt",
    author: "Pavel Danilyuk",
    sourceUrl: "https://www.pexels.com/photo/a-person-cutting-a-black-fabric-with-a-pair-of-scissors-6461097/",
  },
} satisfies Record<string, EditorialImage>;

export const categoryImages: Record<CategoryId, EditorialImage> = {
  bras: editorialImages.bras,
  briefs: editorialImages.briefs,
  bodysuits: editorialImages.bodysuits,
  slips: editorialImages.slips,
  accessories: editorialImages.accessories,
};
