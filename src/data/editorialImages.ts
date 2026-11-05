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
    src: "/images/editorial/home-hero-grunge-a.jpg",
    width: 1200,
    height: 1600,
    altKey: "home.hero.image.alt",
    author: "Manuel Cortés",
    sourceUrl: "https://www.pexels.com/photo/striking-black-and-white-portrait-of-woman-35486481/",
  },
  homeEditorial: {
    src: "/images/editorial/home-editorial-a.jpg",
    ...portrait,
    altKey: "home.editorial.image.alt",
    author: "Hanna Pad",
    sourceUrl: "https://www.pexels.com/photo/close-up-shot-of-black-textile-on-white-box-7946629/",
  },
  homeEditorial2: {
    src: "/images/editorial/home-editorial-2-c.jpg",
    ...portrait,
    altKey: "home.editorial2.image.alt",
    author: "Jaycee300s",
    sourceUrl: "https://www.pexels.com/photo/woman-in-jacket-and-boots-on-street-20408642/",
  },
  dropHero: {
    src: "/images/editorial/drop-hero-a.jpg",
    ...wide,
    altKey: "drop.image.alt",
    author: "Uday Ahir",
    sourceUrl: "https://www.pexels.com/photo/person-walking-against-minimalist-concrete-wall-39567193/",
  },
  dropGallery1: {
    src: "/images/editorial/drop-gallery-1.jpg",
    ...portrait,
    altKey: "drop.gallery.1.alt",
    author: "Jon Champaigne",
    sourceUrl: "https://www.pexels.com/photo/monochrome-portrait-with-dramatic-shadows-in-tucson-31533899/",
  },
  dropGallery2: {
    src: "/images/editorial/drop-gallery-2.jpg",
    ...portrait,
    altKey: "drop.gallery.2.alt",
    author: "kehinde solomon o ogunsanya",
    sourceUrl: "https://www.pexels.com/photo/alluring-young-black-woman-standing-in-room-and-looking-up-4541883/",
  },
  dropGallery3: {
    src: "/images/editorial/drop-gallery-3.jpg",
    width: 1200,
    height: 1600,
    altKey: "drop.gallery.3.alt",
    author: "Mert Coşkun",
    sourceUrl: "https://www.pexels.com/photo/artistic-black-and-white-portrait-of-woman-in-fishnet-tights-32127476/",
  },
  dropGallery4: {
    src: "/images/editorial/drop-gallery-4.jpg",
    ...portrait,
    altKey: "drop.gallery.4.alt",
    author: "Delia Rayma",
    sourceUrl: "https://www.pexels.com/photo/a-long-exposure-portrait-of-a-woman-7699976/",
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

/** Editorial strip on the drop page, in this order. */
export const dropGallery: EditorialImage[] = [
  editorialImages.dropGallery1,
  editorialImages.dropGallery2,
  editorialImages.dropGallery3,
  editorialImages.dropGallery4,
];

export const categoryImages: Record<CategoryId, EditorialImage> = {
  bras: editorialImages.bras,
  briefs: editorialImages.briefs,
  bodysuits: editorialImages.bodysuits,
  slips: editorialImages.slips,
  accessories: editorialImages.accessories,
};
