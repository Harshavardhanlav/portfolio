import "./About.css";

const ABOUT_CARDS = [
  {
    title: "My Goal",
    text: "To build impactful products and keep growing as a developer.",
    icon: "target",
  },
  {
    title: "Currently Learning",
    text: "DSA, Cloud Computing and advanced web technologies.",
    icon: "book",
  },
  {
    title: "What Drives Me",
    text: "Solving real problems through technology.",
    icon: "idea",
  },
];

function CardIcon({ type }) {
  if (type === "target") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="14" cy="18" r="9" />
        <circle cx="14" cy="18" r="4" />
        <path d="M14 18 25 7M20 7h5v5" />
      </svg>
    );
  }

  if (type === "book") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 8c-3-3-7-4-11-3v19c4-1 8 0 11 3M16 8c3-3 7-4 11-3v19c-4-1-8 0-11 3M16 8v19" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M11 22c-2-2-4-4-4-8a9 9 0 0 1 18 0c0 4-2 6-4 8M11 22h10M12 26h8M14 29h4" />
      <path d="M16 2V0M5 6 3 4M27 6l2-2M4 16H1M31 16h-3" />
    </svg>
  );
}

export default function About({ id = "about", className = "", nextHref = "#education", onNext }) {
  const rootClassName = `about-section${className ? ` ${className}` : ""}`;

  return (
    <section id={id} className={rootClassName} aria-labelledby={`${id}-title`}>
      <video className="about-section__video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
        <source src="/videos/about.mp4" type="video/mp4" />
      </video>
      <div className="about-section__atmosphere" aria-hidden="true" />

      <div className="about-section__layout">
        <aside className="about-section__index" aria-label="Section 2 of 6">
          <p className="about-section__count"><span className="about-section__count-current">02</span><span className="about-section__count-total">/ 06</span></p>
          <span className="about-section__index-line" aria-hidden="true" />
          <span className="about-section__index-slug" aria-hidden="true">/ 06</span>
        </aside>

        <div className="about-section__content">
          <p className="about-section__eyebrow">About Me</p>
          <h2 id={`${id}-title`} className="about-section__title"><span className="about-section__title-line">More Than</span><span className="about-section__title-line about-section__title-line--accent">Just Code</span></h2>
          <hr className="about-section__rule" />
          <div className="about-section__copy">
            <p>From Harsha, a passionate developer and curious learner who loves building real-world solutions through technology. My journey started with a simple interest in how websites and applications work, and it has grown into a deep passion for creating meaningful digital experiences.</p>
            <p>I completed my Diploma in Computer Engineering (CME), and now I&apos;m pursuing B.Tech in Computer Science and Engineering because it gives me the freedom to explore different areas of technology. I&apos;m currently focused on strengthening my problem-solving skills through DSA, learning Cloud Computing, and building full-stack projects that solve real-world problems.</p>
          </div>
        </div>

        <div className="about-section__cards" aria-label="About highlights">
          {ABOUT_CARDS.map((card) => (
            <article className="about-section__card" key={card.title}>
              <div className="about-section__card-icon"><CardIcon type={card.icon} /></div>
              <h3 className="about-section__card-title">{card.title}</h3>
              <p className="about-section__card-text">{card.text}</p>
            </article>
          ))}
        </div>

        <footer className="about-section__footer">
          <p className="about-section__tagline">Same curiosity. Higher goals.</p>
          <nav className="about-section__nav" aria-label="Portfolio sections">
            <span className="about-section__nav-current"><strong>02</strong> About</span>
            <a className="about-section__nav-next" href={nextHref} onClick={onNext}>Next — Education <span className="about-section__nav-arrow" aria-hidden="true">→</span></a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
