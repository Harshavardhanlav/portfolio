import { portfolio } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">{portfolio.name}</p>
          <p className="footer-role">{portfolio.footer.text}</p>
        </div>

        <div className="footer-links">
          <a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${portfolio.contact.email}`}>Email</a>
        </div>

        <p className="footer-copyright">© 2026 Harsha. All rights reserved.</p>
      </div>
    </footer>
  );
}
