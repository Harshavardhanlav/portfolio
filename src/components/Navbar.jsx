import { useEffect, useState } from 'react';
import { portfolio } from '../data/portfolio';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateNav = () => {
      const header = document.querySelector('.topbar');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    };

    updateNav();
    window.addEventListener('scroll', updateNav);
    return () => window.removeEventListener('scroll', updateNav);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand-mark">H</span>
        <span className="brand-name">{portfolio.name}</span>
      </div>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
        {portfolio.nav.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="nav-cta" href={portfolio.resume.file} target="_blank" rel="noreferrer">
          Download CV
        </a>
        <button
          type="button"
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((state) => !state)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
