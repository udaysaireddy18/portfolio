import { useCallback, useEffect, useId, useRef } from "react";
import type { Project } from "../data/types";
import { CheckIcon, CloseIcon, LayersIcon, SparkIcon } from "./icons";
import "./project-modal.css";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Key features" },
  { id: "technologies", label: "Technologies" },
  { id: "architecture", label: "Architecture" },
  { id: "media", label: "Media" },
  { id: "roadmap", label: "Future improvements" },
] as const;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const open = project !== null;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [open, onClose],
  );

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (!project) return;
    bodyRef.current?.scrollTo({ top: 0 });
  }, [project]);

  if (!project) return null;

  const scrollTo = (id: string) => {
    bodyRef.current?.querySelector(`#pm-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pm" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="pm__dialog glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="pm__head">
          <div className="pm__head-text">
            <p className="pm__kicker mono">{project.featured ? "Featured project" : "Project"}</p>
            <h3 className="pm__title" id={titleId}>
              {project.name}
            </h3>
            <p className="pm__tagline">{project.tagline}</p>
          </div>

          <div className="pm__head-actions">
            {project.github && (
              <a className="btn btn--soft btn--sm" href={project.github} target="_blank" rel="noreferrer noopener">
                <span className="btn__label">GitHub</span>
              </a>
            )}
            {project.demo ? (
              <a className="btn btn--primary btn--sm" href={project.demo} target="_blank" rel="noreferrer noopener">
                <span className="btn__label">Live demo</span>
              </a>
            ) : (
              <span className="btn btn--sm pm__btn-disabled" aria-disabled="true">
                <span className="btn__label">Live demo — coming soon</span>
              </span>
            )}
            <button ref={closeRef} type="button" className="pm__close" onClick={onClose} aria-label="Close project showcase">
              <CloseIcon />
            </button>
          </div>
        </header>

        <nav className="pm__jump" aria-label="Project sections">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className="pm__jump-btn"
              onClick={() => scrollTo(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="pm__body" ref={bodyRef}>
          {/* 1 — Overview */}
          <section className="pm__section" id="pm-overview" aria-labelledby={`${titleId}-ov`}>
            <h4 className="pm__h" id={`${titleId}-ov`}>
              Project overview
            </h4>
            <p className="pm__p">{project.summary}</p>
            <ul className="pm__highlights">
              {project.highlights.map((item) => (
                <li key={item}>
                  <CheckIcon width={16} height={16} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 2 — Key features */}
          <section className="pm__section" id="pm-features" aria-labelledby={`${titleId}-ft`}>
            <h4 className="pm__h" id={`${titleId}-ft`}>
              Key features
            </h4>
            <ul className="pm__features">
              {project.features.map((feature, i) => (
                <li key={feature}>
                  <span className="pm__feature-num mono">{String(i + 1).padStart(2, "0")}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3 — Technologies */}
          <section className="pm__section" id="pm-technologies" aria-labelledby={`${titleId}-tc`}>
            <h4 className="pm__h" id={`${titleId}-tc`}>
              Technologies
            </h4>
            <ul className="pm__tech">
              {project.technologies.map((tech) => (
                <li key={tech} className="badge">
                  {tech}
                </li>
              ))}
            </ul>
            <p className="pm__note">
              <SparkIcon width={15} height={15} />
              {project.techPending
                ? 'TODO — confirm the complete stack and add it in src/data/portfolio.ts (project "technologies").'
                : "Verified from the project repository."}
            </p>
          </section>

          {/* 4 — Architecture */}
          {project.architecture && (
            <section className="pm__section" id="pm-architecture" aria-labelledby={`${titleId}-ar`}>
              <h4 className="pm__h" id={`${titleId}-ar`}>
                Project architecture
              </h4>
              <div className="pm__arch">
                <ul className="pm__arch-nodes">
                  {project.architecture.nodes.map((node) => (
                    <li key={node.label}>
                      <span className="pm__arch-label">
                        <LayersIcon width={15} height={15} />
                        {node.label}
                      </span>
                      <span className="pm__arch-detail">{node.detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="pm__arch-flow" aria-label="Data flow">
                  {project.architecture.flow.map((edge) => (
                    <span key={`${edge.from}-${edge.to}`} className="pm__flow-chip mono">
                      {edge.from} <span aria-hidden="true">&rarr;</span> {edge.to}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 5 — Media / screenshots */}
          <section className="pm__section" id="pm-media" aria-labelledby={`${titleId}-md`}>
            <h4 className="pm__h" id={`${titleId}-md`}>
              Screenshots
            </h4>
            {project.screenshots.length > 0 ? (
              <div className="pm__shots">
                {project.screenshots.map((src) => (
                  <figure key={src} className="pm__shot">
                    <img src={src} alt={`${project.name} interface screenshot`} loading="lazy" />
                  </figure>
                ))}
              </div>
            ) : (
              <div className="pm__placeholder">
                <p className="pm__placeholder-title">Screenshots coming soon.</p>
                <p className="pm__placeholder-text">
                  Add images to <code>public/projects/{project.id}/</code> and list their paths in the{" "}
                  <code>screenshots</code> array for this project. This block fills itself automatically.
                </p>
              </div>
            )}
          </section>

          {/* 6 — Future improvements */}
          <section className="pm__section" id="pm-roadmap" aria-labelledby={`${titleId}-rm`}>
            <h4 className="pm__h" id={`${titleId}-rm`}>
              Future improvements
            </h4>
            <ul className="pm__roadmap">
              {project.futureImprovements.map((item) => (
                <li key={item}>
                  <span className="pm__roadmap-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}