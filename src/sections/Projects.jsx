import { portfolio } from '../data/portfolio';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';

export default function Projects() {
  return (
    <section id="projects" className="content-section">
      <div className="section-shell reveal">
        <SectionTitle eyebrow="Projects" title="FEATURED PROJECTS" />

        <div className="projects-grid">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
