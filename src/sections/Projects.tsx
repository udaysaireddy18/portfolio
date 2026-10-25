import { useState } from "react";
import { projects } from "../data/portfolio";
import type { Project } from "../data/types";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { SectionHeading } from "../components/SectionHeading";
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
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}