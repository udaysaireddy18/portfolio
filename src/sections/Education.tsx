import { education } from "../data/portfolio";
import { SectionHeading } from "../components/SectionHeading";
import { AwardIcon, CheckBadgeIcon, CheckIcon, GraduationCapIcon } from "../components/icons";
import "./education.css";

const STATUS_LABEL = { current: "Current", completed: "Completed" } as const;

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title={<span id="education-heading">Academic Path</span>}
          lead="Where the foundations come from — and what I'm learning right now."
          aside={<span className="badge">{education.length} qualifications</span>}
        />

        <ol className="edu__timeline reveal">
          {education.map((item, index) => (
            <li
              className={`edu__item reveal ${item.status === "completed" ? "edu__item--done" : ""}`}
              key={item.id}
              style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
            >
              <span className="edu__marker" aria-hidden="true">
                <span className="edu__marker-dot" />
              </span>

              <article className="edu__card glass" tabIndex={0}>
                <div className="edu__card-glow" aria-hidden="true" />

                <header className="edu__card-head">
                  <span className="edu__cap" aria-hidden="true">
                    <GraduationCapIcon width={22} height={22} />
                  </span>

                  <div className="edu__head-text">
                    <p className="edu__degree">{item.degree}</p>
                    <h3 className="edu__field">{item.field}</h3>
                    <p className="edu__institution">{item.institution}</p>
                  </div>

                  <div className="edu__meta">
                    <span className={`badge ${item.status === "current" ? "badge--accent" : "badge--done"}`}>
                      {item.status === "current" ? (
                        <span className="badge__dot" aria-hidden="true" />
                      ) : (
                        <CheckBadgeIcon width={13} height={13} />
                      )}
                      {STATUS_LABEL[item.status]}
                    </span>
                    <span className="badge mono">{item.period}</span>
                  </div>
                </header>

                <ul className="edu__highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>
                      <CheckIcon width={15} height={15} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}

          {/* Add more entries to `education` in src/data/portfolio.ts */}
          <li className="edu__item edu__item--ghost reveal" style={{ ["--reveal-delay" as string]: "180ms" }}>
            <span className="edu__marker" aria-hidden="true">
              <span className="edu__marker-dot" />
            </span>
            <div className="edu__ghost">
              <AwardIcon width={17} height={17} />
              <span>
                <strong>Next milestone:</strong> deeper CS coursework, internships and open-source contributions.
              </span>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}