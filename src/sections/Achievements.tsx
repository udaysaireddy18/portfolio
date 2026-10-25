import { useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { certificationCategories, certifications } from "../data/portfolio";
import type { Certification, CertificationCategory } from "../data/types";
import { CertificateViewer } from "../components/CertificateViewer";
import { SectionHeading } from "../components/SectionHeading";
import {
  ArrowUpRightIcon,
  AwardIcon,
  CameraIcon,
  CheckBadgeIcon,
  CloudIcon,
  CodeIcon,
  CpuIcon,
  ChartIcon,
  DatabaseIcon,
  EyeIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  TrophyIcon,
  GlobeIcon,
} from "../components/icons";
import "./achievements.css";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const CATEGORY_ICONS: Record<CertificationCategory, IconComponent> = {
  programming: CodeIcon,
  web: GlobeIcon,
  ai: CpuIcon,
  data: ChartIcon,
  cloud: CloudIcon,
  database: DatabaseIcon,
  workshops: TrophyIcon,
  media: CameraIcon,
  other: AwardIcon,
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Sort key for ISO-like dates; entries without a parsable date fall to the end. */
function dateScore(value: string | undefined): number {
  const match = (value ?? "").trim().match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return Number.NEGATIVE_INFINITY;
  return Number(match[1]) * 100 + Number(match[2] ?? 0);
}

/**
 * Accepts "2025-03-18", "2025-03", "2025" or free text ("March 2025").
 * Returns the label to display, or null when nothing was provided.
 */
function formatCompletionDate(value: string | undefined): string | null {
  const raw = (value ?? "").trim();
  if (!raw) return null;

  const yearMonth = raw.match(/^(\d{4})-(\d{1,2})$/);
  if (yearMonth) {
    const month = MONTHS[Number(yearMonth[2]) - 1];
    return month ? `${month} ${yearMonth[1]}` : yearMonth[1];
  }

  if (/^\d{4}$/.test(raw)) return raw;

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  }

  return raw;
}

export function Achievements() {
  const [viewing, setViewing] = useState<Certification | null>(null);

  const entries = useMemo(
    () => [...certifications].sort((a, b) => dateScore(b.completionDate) - dateScore(a.completionDate)),
    [],
  );
  const hasEntries = entries.length > 0;

  return (
    <section className="section section--tight" id="achievements" aria-labelledby="achievements-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Credentials"
          title={<span id="achievements-heading">Certifications &amp; Achievements</span>}
          lead="Continuous learning, practical skills, and milestones that shape my journey in technology."
          aside={
            <span className="badge">
              <CheckBadgeIcon width={13} height={13} />
              {hasEntries ? `${entries.length} certificates` : "awaiting entries"}
            </span>
          }
        />

        {/* Announced politely so screen-reader users hear the count. */}
        <p className="sr-only" role="status" aria-live="polite">
          {hasEntries
            ? `${entries.length} certificates and achievements.`
            : "No certificates added yet."}
        </p>

        {hasEntries ? (
          <ol className="cert__grid reveal">
            {entries.map((cert, index) => {
              const Icon = CATEGORY_ICONS[cert.category] ?? AwardIcon;
              const dateLabel = formatCompletionDate(cert.completionDate);
              const hasDocument = Boolean(cert.certificateImage || cert.certificatePdf);
              const isoDate = /^\d{4}-\d{2}(-\d{2})?$/.test((cert.completionDate ?? "").trim())
                ? cert.completionDate.trim()
                : undefined;

              return (
                <li
                  className="cert__card glass"
                  key={cert.id}
                  style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
                >
                  <div className="cert__top">
                    <span className="icon-tile" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="badge badge--accent cert__category">
                      {certificationCategories[cert.category] ?? "Other Achievements"}
                    </span>
                  </div>

                  <h3 className="cert__name">{cert.title}</h3>

                  <p className="cert__meta">
                    <span className="cert__issuer">{cert.issuer}</span>
                    {dateLabel && (
                      <>
                        <span className="cert__meta-dot" aria-hidden="true" />
                        {isoDate ? (
                          <time className="mono" dateTime={isoDate}>
                            {dateLabel}
                          </time>
                        ) : (
                          <span className="mono">{dateLabel}</span>
                        )}
                      </>
                    )}
                  </p>

                  {cert.description && <p className="cert__desc">{cert.description}</p>}

                  <div className="cert__actions">
                    {hasDocument ? (
                      <button
                        type="button"
                        className="btn btn--soft btn--sm"
                        onClick={() => setViewing(cert)}
                        aria-label={`View certificate: ${cert.title} from ${cert.issuer}`}
                      >
                        <span className="btn__label">
                          <EyeIcon width={15} height={15} />
                          View certificate
                        </span>
                      </button>
                    ) : null}

                    {cert.verificationUrl && (
                      <a
                        className="btn btn--ghost btn--sm"
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Verify ${cert.title} on ${cert.issuer} (opens in a new tab)`}
                      >
                        <span className="btn__label">
                          <ShieldCheckIcon width={15} height={15} />
                          Verify
                          <ArrowUpRightIcon width={14} height={14} />
                        </span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="pending cert__empty reveal">
            <div className="cert__empty-art" aria-hidden="true">
              <span className="cert__empty-ring" />
              <span className="cert__empty-ring cert__empty-ring--inner" />
              <span className="icon-tile cert__empty-cap">
                <GraduationCapIcon width={30} height={30} />
              </span>
            </div>
            <p className="pending__title">No certificates added yet.</p>
            <p className="pending__text">
              Certificates and achievements will appear here as I continue learning and developing my
              skills.
            </p>
            <p className="pending__hint">
              Add entries in <code>src/data/portfolio.ts</code> &rarr; <code>certifications</code>
            </p>
          </div>
        )}
      </div>

      <CertificateViewer
        key={viewing?.id ?? "closed"}
        certificate={viewing}
        onClose={() => setViewing(null)}
      />
    </section>
  );
}