import { portfolio } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function Achievements() {
  return (
    <section id="achievements" className="content-section">
      <div className="section-shell reveal">
        <SectionTitle eyebrow="Achievements" title="CERTIFICATIONS & RECOGNITION" />

        <div className="achievement-grid">
          {portfolio.achievements.map((item) => (
            <div key={item.title} className="achievement-card">
              <div className="achievement-badge">{item.type}</div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span>{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
