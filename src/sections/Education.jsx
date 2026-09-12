import { portfolio } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function Education() {
  return (
    <section id="education" className="content-section">
      <div className="section-shell reveal">
        <SectionTitle eyebrow="Education" title="EDUCATION" />

        <div className="timeline education-timeline">
          {portfolio.education.map((item) => (
            <div key={`${item.type}-${item.institution}`} className="timeline-item education-item">
              <div className="timeline-node" />
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="pill">{item.type}</span>
                  <span>{item.period}</span>
                </div>
                <h3>{item.branch}</h3>
                <h4>{item.institution}</h4>
                <p className="status">{item.status}</p>
                {item.note ? <p>{item.note}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
