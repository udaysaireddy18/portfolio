import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  /** Optional element rendered on the right side (e.g. a counter badge). */
  aside?: ReactNode;
  id?: string;
}

export function SectionHeading({ eyebrow, title, lead, align = "start", aside, id }: SectionHeadingProps) {
  return (
    <div
      className={`section-heading reveal ${align === "center" ? "section-heading--center" : ""}`.trim()}
      style={align === "center" ? { alignItems: "center", textAlign: "center" } : undefined}
    >
      <div
        className="section-heading__top"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: align === "center" ? "center" : "space-between",
          gap: "1rem",
          width: "100%",
        }}
      >
        <p className="eyebrow">{eyebrow}</p>
        {aside}
      </div>
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      <span className="section-heading__rule" aria-hidden="true" />
      {lead ? <p className="section-heading__lead">{lead}</p> : null}
    </div>
  );
}