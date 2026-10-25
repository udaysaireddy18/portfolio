import { useEffect, useRef, useState, type ElementType } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  /** Base delay in ms before the first word animates. */
  delay?: number;
  /** Extra delay added per word. */
  step?: number;
}

/**
 * Reveals a line of text word by word when it scrolls into view.
 * The words remain real, readable text in the DOM, so assistive tech
 * reads the sentence normally. Reduced-motion users see it immediately
 * (handled in effects.css).
 */
export function SplitText({ text, className = "", as: Tag = "span", delay = 0, step = 60 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={`split ${inView ? "is-inview" : ""} ${className}`.trim()}>
      {words.map((word, index) => (
        <span className="split__word" key={`${word}-${index}`}>
          <span className="split__inner" style={{ ["--d" as string]: `${delay + index * step}ms` }}>
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
