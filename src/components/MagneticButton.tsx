import { useRef, type ButtonHTMLAttributes, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./ui.css";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "soft";
  /** Max px the button drifts toward the cursor. */
  strength?: number;
}

/** Button with a magnetic hover pull. Disabled for reduced motion and coarse pointers. */
export function MagneticButton({
  children,
  variant = "primary",
  strength = 7,
  className = "",
  onClick,
  onPointerMove,
  onPointerLeave,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerMove?.(event);
    if (reduced || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * (strength / (rect.width / 2));
    const y = (event.clientY - rect.top - rect.height / 2) * (strength / (rect.height / 2));
    ref.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  };

  const handleLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerLeave?.(event);
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <button
      ref={ref}
      className={`btn btn--${variant} ${className}`.trim()}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      <span className="btn__label">{children}</span>
    </button>
  );
}

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "soft";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  strength?: number;
}

/** Same magnetic effect for anchor-based CTAs. */
export function MagneticLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  ariaLabel,
  strength = 7,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * (strength / (rect.width / 2));
    const y = (event.clientY - rect.top - rect.height / 2) * (strength / (rect.height / 2));
    ref.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`btn btn--${variant} ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
      }}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      <span className="btn__label">{children}</span>
    </a>
  );
}