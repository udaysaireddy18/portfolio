import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";
import { SectionHeading } from "../components/SectionHeading";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CodeIcon, SparkIcon } from "../components/icons";
import "./about.css";

const CODE_LINES: { text: string; tokens: { t: string; c: string }[] }[] = [
  {
    text: "const developer = {",
    tokens: [
      { t: "const", c: "kw" },
      { t: " developer", c: "var" },
      { t: " = ", c: "plain" },
      { t: "{", c: "plain" },
    ],
  },
  {
    text: "  name: \"Uday Sai Reddy\",",
    tokens: [
      { t: "  name", c: "prop" },
      { t: ": ", c: "plain" },
      { t: '"Uday Sai Reddy"', c: "str" },
      { t: ",", c: "plain" },
    ],
  },
  {
    text: "  stack: [\"C\", \"C++\", \"Python\", \"JS\"],",
    tokens: [
      { t: "  stack", c: "prop" },
      { t: ": [", c: "plain" },
      { t: '"C", "C++", "Python", "JS"', c: "str" },
      { t: "],", c: "plain" },
    ],
  },
  {
    text: "  focus: \"backend + data\",",
    tokens: [
      { t: "  focus", c: "prop" },
      { t: ": ", c: "plain" },
      { t: '"backend + data"', c: "str" },
      { t: ",", c: "plain" },
    ],
  },
  {
    text: "  lens: \"storytelling through frames\",",
    tokens: [
      { t: "  lens", c: "prop" },
      { t: ": ", c: "plain" },
      { t: '"storytelling through frames"', c: "str" },
    ],
  },
  {
    text: "};",
    tokens: [{ t: "};", c: "plain" }],
  },
];

function CodeStream() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced ? CODE_LINES.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= CODE_LINES.length) window.clearInterval(id);
    }, 420);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="about__editor glass" role="img" aria-label="Code snippet describing the developer profile: languages C, C++, Python and JavaScript, focus on backend and data.">
      <div className="about__editor-bar">
        <span className="about__dot" aria-hidden="true" />
        <span className="about__dot" aria-hidden="true" />
        <span className="about__dot" aria-hidden="true" />
        <span className="about__editor-file mono">profile.js</span>
      </div>
      <pre className="about__code mono" aria-hidden="true">
        {CODE_LINES.slice(0, visible).map((line, index) => (
          <span className="about__code-line" key={line.text}>
            <span className="about__code-num">{index + 1}</span>
            <span className="about__code-text">
              {line.tokens.map((token, i) => (
                <span className={`tk tk--${token.c}`} key={`${line.text}-${i}`}>
                  {token.t}
                </span>
              ))}
              {index === visible - 1 && visible < CODE_LINES.length && (
                <span className="about__caret" />
              )}
            </span>
          </span>
        ))}
      </pre>
      <div className="about__editor-foot">
        <span className="badge badge--accent">
          <SparkIcon width={13} height={13} />
          learning in public
        </span>
      </div>
    </div>
  );
}

/** Animated camera aperture — photography half of the identity, no stock photos. */
function Aperture() {
  return (
    <div className="about__aperture" data-parallax="0.05" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="about__aperture-svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="ap-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blue-400)" />
            <stop offset="100%" stopColor="var(--lav-400)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="var(--border)" strokeWidth="1" />
        <g className="about__blades">
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d="M100 100 L100 22 A78 78 0 0 1 167.5 61 Z"
              fill="url(#ap-grad)"
              opacity={0.16}
              transform={`rotate(${i * 60} 100 100)`}
            />
          ))}
        </g>
        <circle cx="100" cy="100" r="46" fill="none" stroke="url(#ap-grad)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="7" fill="url(#ap-grad)" />
      </svg>
    </div>
  );
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container about">
        <SectionHeading
          eyebrow="About"
          title={<span id="about-heading">About Me</span>}
          lead={profile.about[0]}
        />

        <div className="about__grid">
          <div className="about__text reveal reveal--left">
            {profile.about.map((paragraph, index) => (
              <p key={paragraph} className="about__paragraph">
                {index === 1 && (
                  <span className="about__callout">
                    <CodeIcon width={16} height={16} />
                    Currently building, breaking and rebuilding — every project teaches something.
                  </span>
                )}
                {paragraph}
              </p>
            ))}

            <dl className="about__facts">
              <div>
                <dt>Role</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Software development &amp; data</dd>
              </div>
              <div>
                <dt>Creative</dt>
                <dd>Photography &amp; editing</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </div>

          <div className="about__visual reveal reveal--right">
            <Aperture />
            <CodeStream />
          </div>
        </div>
      </div>
    </section>
  );
}