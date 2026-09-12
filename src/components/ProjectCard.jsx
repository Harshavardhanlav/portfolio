import { useState } from 'react';
import ProjectDetails from './ProjectDetails';

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article className="project-card reveal">
        <div className="project-visual">
          <div className="project-visual-pattern" />
          <span>PROJECT {project.number}</span>
        </div>

        <div className="project-body">
          <h3>{project.title}</h3>
          <p>{project.shortDescription}</p>

          <div className="project-tech">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <button type="button" className="project-button" onClick={() => setIsOpen(true)}>
            View Project
          </button>
        </div>
      </article>

      {isOpen && <ProjectDetails project={project} onClose={() => setIsOpen(false)} />}
    </>
  );
}
