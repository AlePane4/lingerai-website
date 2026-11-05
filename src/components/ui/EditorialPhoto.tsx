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
}

/**
 * Editorial photo in a fixed-ratio container (design-system §3.22: 3:4 or 16:9).
 * The ratio is reserved before loading (Cemento background), so there is no layout shift.
 * No text is ever laid over the photo.
 */
export function EditorialPhoto({ image, alt, sizes, preload, className }: EditorialPhotoProps) {
  const wide = image.width > image.height;
  return (
    <div className={`${styles.media} ${wide ? styles.wide : styles.editorial} ${className ?? ""}`}>
      <Image src={image.src} alt={alt} fill sizes={sizes} preload={preload} className={styles.img} />
    </div>
  );
}
