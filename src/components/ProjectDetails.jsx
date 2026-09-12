export default function ProjectDetails({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close project details">
          ×
        </button>

        <div className="project-modal-header">
          <span className="project-number">PROJECT {project.number}</span>
          <h3>{project.title}</h3>
        </div>

        <p className="project-modal-description">{project.description}</p>

        <div className="project-detail-grid">
          <div>
            <h4>Overview</h4>
            <p>{project.shortDescription}</p>
          </div>
          <div>
            <h4>Key Features</h4>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-modal-tech">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-modal-actions">
          <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
        </div>
      </div>
    </div>
  );
}
