import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Max tilt in degrees. Keep small for a premium feel. */
  max?: number;
  /** Optional glow that follows the cursor via CSS custom props. */
  glow?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Subtle 3D tilt + cursor-tracking glow.
 * Writes --mx / --my / --rx / --ry so CSS can render a reactive border highlight.
 */
export function TiltCard({
  children,
  className = "",
  style,
  max = 7,
  glow = true,
  as = "div",
}: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const Tag = as;

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    ref.current.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    ref.current.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
    ref.current.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
    ref.current.style.setProperty("--mx", "50%");
    ref.current.style.setProperty("--my", "50%");
  };

  return (
    <Tag
      ref={ref as never}
      className={`tilt-card ${glow ? "tilt-card--glow" : ""} ${className}`.trim()}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <div className="tilt-card__surface">{children}</div>
    </Tag>
  );
}