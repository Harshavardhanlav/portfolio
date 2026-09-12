import { portfolio } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function Skills() {
  return (
    <section id="skills" className="content-section">
      <div className="section-shell reveal">
        <SectionTitle eyebrow="Skills" title="SKILLS & TECHNOLOGIES" />

        <div className="skills-grid">
          {portfolio.skills.categories.map((category) => (
            <div key={category.label} className="skill-group">
              <h3>{category.label}</h3>
              <div className="skill-tags">
                {category.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
