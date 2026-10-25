import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** The real roles from the profile, cycled one at a time. */
const ROLES = profile.professionalTitle
  .split("•")
  .map((role) => role.trim())
  .filter(Boolean);

/**
 * Rotates through the profile roles with a vertical slide.
 * Static (first role only) for reduced-motion users.
 */
export function RoleRotator() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || ROLES.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 3000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <span className="role-rotator" aria-hidden="true">
      <span key={index} className="role-rotator__item">
        {ROLES[index]}
      </span>
    </span>
  );
}
