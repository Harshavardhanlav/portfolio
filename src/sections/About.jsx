import { portfolio } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function About() {
  return (
    <section id="about" className="content-section about-section">
      <div className="section-shell reveal">
        <SectionTitle eyebrow="About" title="ABOUT ME" />

        <div className="about-grid">
          <div className="about-intro">
            <p className="lead">{portfolio.about.statement}</p>
            <p>{portfolio.about.supporting}</p>
          </div>

          <div className="about-keywords">
            {portfolio.about.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
