import { useEffect } from "react";

/**
 * Tracks the pointer in two CSS custom properties (`--px`, `--py`) so a fixed
 * ambient glow can follow it. Work is throttled to one animation frame and the
 * effect is skipped entirely for touch-first devices and reduced-motion users.
 */
export function useCursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame = 0;
    let x = window.innerWidth * 0.7;
    let y = window.innerHeight * 0.2;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--px", `${x.toFixed(1)}px`);
      root.style.setProperty("--py", `${y.toFixed(1)}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root.style.removeProperty("--px");
      root.style.removeProperty("--py");
    };
  }, []);
}
