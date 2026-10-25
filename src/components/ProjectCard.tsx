import type { CSSProperties } from "react";
import type { Project } from "../data/types";
import { ArrowUpRightIcon, CheckIcon } from "./icons";
import { TiltCard } from "./TiltCard";
import "./project-card.css";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  style?: CSSProperties;
}

export function ProjectCard({ project, index, onOpen, style }: ProjectCardProps) {
  const previewTech = project.technologies.slice(0, 5);
  const extraTech = project.technologies.length - previewTech.length;

  return (
    <TiltCard as="article" className="project-card reveal" max={6} style={style}>
      <div className="project-card__inner glass">
        <span className="project-card__glow" aria-hidden="true" />

        <header className="project-card__head">
          <div>
            <p className="project-card__kicker mono">
              {project.featured ? "Featured project" : "Project"} · {project.year}
            </p>
            <h3 className="project-card__title">{project.name}</h3>
          </div>
          <span className="project-card__index mono" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </header>

        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__summary">{project.summary}</p>

        <ul className="project-card__reveal">
          {project.highlights.map((item) => (
            <li key={item}>
              <CheckIcon width={15} height={15} />
              {item}
            </li>
          ))}
        </ul>

        <ul className="project-card__tech" aria-label="Technologies">
          {previewTech.map((tech) => (
            <li key={tech} className="badge">
              {tech}
            </li>
          ))}
          {extraTech > 0 && <li className="badge badge--accent">+{extraTech}</li>}
          {project.techPending && <li className="badge badge--accent">more to confirm</li>}
        </ul>

        <div className="project-card__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onOpen(project)}>
            <span className="btn__label">
              View showcase
              <ArrowUpRightIcon width={16} height={16} />
            </span>
          </button>
          {project.github && (
            <a
              className="btn btn--ghost btn--sm"
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="btn__label">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}