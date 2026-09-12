import { portfolio } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function Resume() {
  return (
    <section id="resume" className="content-section">
      <div className="section-shell reveal resume-section-shell">
        <SectionTitle eyebrow="Resume" title="MY RESUME" />

        <div className="resume-panel">
          <div className="resume-preview">
            <div className="resume-preview-header">
              <span>Harsha</span>
            </div>
            <div className="resume-preview-body">
              <div className="resume-preview-block" />
              <div className="resume-preview-block short" />
              <div className="resume-preview-block" />
              <div className="resume-preview-block short" />
            </div>
          </div>

          <div className="resume-copy">
            <p>Explore my education, experience, technical skills and projects.</p>
            <div className="resume-actions">
              <a className="button primary" href={portfolio.resume.file} target="_blank" rel="noreferrer">VIEW RESUME</a>
              <a className="button secondary" href={portfolio.resume.file} download="Harsha-Resume.pdf">DOWNLOAD RESUME</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
