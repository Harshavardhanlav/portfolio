import { portfolio } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function Experience() {
  return (
    <section id="experience" className="content-section">
      <div className="section-shell reveal">
        <SectionTitle eyebrow="Experience" title="INTERNSHIP & EXPERIENCE" />

        <div className="timeline">
          {portfolio.experience.map((item) => (
            <div key={item.company} className="timeline-item">
              <div className="timeline-node" />
              <div className="timeline-content experience-card">
                <div className="timeline-meta">
                  <span className="pill">{item.role}</span>
                  <span>{item.duration}</span>
                </div>
                <h3>{item.company}</h3>
                <h4>{item.location}</h4>
                <p className="experience-description">{item.description}</p>

                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="mini-list">
                  {item.projects.map((project) => (
                    <span key={project}>{project}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
