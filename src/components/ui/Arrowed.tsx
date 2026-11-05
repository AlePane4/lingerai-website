import Link from "next/link";
import { Fragment } from "react";

const GLYPH = /^[→←↑↓▾▴×]$/;

/** Copy with → ← ↑ ↓ ▾ ▴ × glyphs hidden from screen readers (ui-strings §0 "Frecce"). */
export function Arrowed({ text }: { text: string }) {
  const parts = text.split(/([→←↑↓▾▴×])/);
  return (
    <>
      {parts.map((part, i) =>
        GLYPH.test(part) ? (
          <span key={i} aria-hidden="true">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Splits "Sentence. → Link" into the sentence followed by an inline link. */
export function TextWithArrowLink({ text, href, className }: { text: string; href: string; className?: string }) {
  const idx = text.lastIndexOf("→");
  if (idx < 0) return <>{text}</>;
  const before = text.slice(0, idx).trimEnd();
  const label = text.slice(idx + 1).trim();
  return (
    <>
      {before}{" "}
      <Link href={href} className={className}>
        <span aria-hidden="true">→ </span>
        {label}
      </Link>
    </>
  );
}

/** Copy with \n line breaks. */
export function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
