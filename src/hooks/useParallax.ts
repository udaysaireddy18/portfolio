import { useEffect } from "react";

/**
 * Scroll-linked parallax. Every element marked `data-parallax="<speed>"`
 * gets a `--parallax-y` custom property updated on scroll, where `speed`
 * is a small multiplier (e.g. 0.08 drifts gently, -0.05 drifts the other way).
 *
 * Motion is written to a CSS variable so the elements keep their own
 * transform/animation (composed via the individual `translate` property).
 * No-ops for reduced-motion users and when no targets exist.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (nodes.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      for (const el of nodes) {
        const speed = Number.parseFloat(el.dataset.parallax || "0.08");
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - viewportCenter) * -speed;
        el.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
