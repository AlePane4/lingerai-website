import { withBase } from "@/lib/site";
import Image from "next/image";
import type { EditorialImage } from "@/data/editorialImages";
import styles from "./EditorialPhoto.module.css";

interface EditorialPhotoProps {
  image: EditorialImage;
  /** Alt in the page language (from the translation files). */
  alt: string;
  sizes: string;
  /** Only for the hero visible on first paint. */
  preload?: boolean;
  className?: string;
  /** Decorative adhesive tape on a top corner (editorial zones only). */
  tape?: "left" | "right";
  /** Red photocopy strip (multiply) over the photo: hero and About only. */
  red?: boolean;
}

/**
 * Editorial photo in a fixed-ratio container (design-system §3.22: 3:4 or 16:9).
 * The ratio is reserved before loading, so there is no layout shift.
 * Edgy: photocopy treatment is CSS only (grayscale, contrast, static grain). No text over the photo.
 */
export function EditorialPhoto({ image, alt, sizes, preload, className, tape, red }: EditorialPhotoProps) {
  const wide = image.width > image.height;
  return (
    <div
      className={`${styles.media} ${wide ? styles.wide : styles.editorial} ${className ?? ""}`}
      data-tape={tape}
      data-red={red ? "" : undefined}
    >
      <Image src={withBase(image.src)} alt={alt} fill sizes={sizes} preload={preload} className={styles.img} />
    </div>
  );
}
