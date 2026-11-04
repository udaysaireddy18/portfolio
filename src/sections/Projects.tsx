import { useState } from "react";
import { projects } from "../data/portfolio";
import type { Project } from "../data/types";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { SectionHeading } from "../components/SectionHeading";
import { ArrowUpRightIcon, GithubIcon } from "../components/icons";
import "./projects.css";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Work"
          title={<span id="projects-heading">Featured Project</span>}
          lead="Real projects, built to learn. Open any card for the full showcase — overview, features, architecture and roadmap."
          aside={<span className="badge">{projects.length} featured</span>}
        />

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setActive}
              style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
            />
          ))}

          <article className="project-teaser reveal" style={{ ["--reveal-delay" as string]: "160ms" }}>
            <span className="project-teaser__kicker mono">Always building</span>
            <h3 className="project-teaser__title">
              Experiments, practice &amp; <span className="grad-text">open source.</span>
            </h3>
            <p className="project-teaser__text">
              New builds are in progress — small tools, data experiments and fullstack practice.
              Follow along while they take shape.
            </p>
            <a
              className="btn btn--soft btn--sm project-teaser__link"
              href="https://github.com/udaysaireddy18"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="btn__label">
                <GithubIcon width={15} height={15} />
                Visit GitHub
                <ArrowUpRightIcon width={14} height={14} />
              </span>
            </a>
            <div className="project-teaser__art" aria-hidden="true">
              <span className="project-teaser__tile" />
              <span className="project-teaser__tile" />
              <span className="project-teaser__tile" />
              <span className="project-teaser__tile" />
            </div>
          </article>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}