/**
 * Decorative hand-written note (Permanent Marker). Always aria-hidden, never carries
 * unique information: one per editorial page. Text comes from `handNotes.*` messages.
 */
export function HandNote({
  text,
  variant = "note",
  className,
}: {
  text: string;
  variant?: "note" | "stamp" | "stampIn";
  className?: string;
}) {
  const v = variant === "note" ? "" : variant === "stamp" ? " hand-stamp" : " hand-stamp hand-stamp-in";
  return (
    <span aria-hidden="true" className={`hand-note${v}${className ? ` ${className}` : ""}`}>
      {text}
    </span>
  );
}
