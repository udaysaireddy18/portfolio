import { useMemo } from "react";
import { skillCategories } from "../data/portfolio";

/**
 * Full-bleed, infinitely scrolling ticker of the confirmed skills.
 * Decorative — the same skills are listed in full inside the Skills
 * section, so the whole strip is hidden from assistive technology.
 */
export function TechMarquee() {
  const items = useMemo(() => {
    const seen = new Set<string>();
    return skillCategories
      .flatMap((category) => category.skills.map((skill) => skill.name))
      .filter((name) => (seen.has(name) ? false : seen.add(name)));
  }, []);

  const group = (
    <div className="marquee__group">
      {items.map((name) => (
        <span className="marquee__item" key={name}>
          <span className="marquee__dot" />
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  );
}
