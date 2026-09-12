import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    title: 'MY GOAL',
    text: 'To build impactful products and keep growing as a developer.',
    icon: <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-4.24-4.24 2.12-2.12M5.12 18.88l2.12-2.12m0-9.76L5.12 4.64m13.76 14.24-2.12-2.12M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />,
  },
  {
    title: 'CURRENTLY LEARNING',
    text: 'DSA, Cloud Computing and advanced web technologies.',
    icon: <path d="m4 5 8-2 8 2-8 2-8-2Zm0 0v9c0 1.1 3.58 3 8 3s8-1.9 8-3V5m-13 8c-1.88.56-3 1.38-3 2.3C4 17.34 7.58 19 12 19s8-1.66 8-3.7c0-.92-1.12-1.74-3-2.3" />,
  },
  {
    title: 'WHAT DRIVES ME',
    text: 'Solving real problems through technology.',
    icon: <path d="M9 18h6m-5 3h4m-7.5-7.5a7 7 0 1 1 9 0c-1.16.86-1.5 1.76-1.5 2.5h-6c0-.74-.34-1.64-1.5-2.5ZM12 3v1" />,
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = section.querySelectorAll('[data-about-number], [data-about-eyebrow], [data-about-heading], [data-about-line], [data-about-copy], [data-about-card], [data-about-tagline]');

    if (reducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0, scaleX: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      });

      timeline
        .fromTo('[data-about-number]', { opacity: 1, x: -14 }, { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' })
        .fromTo('[data-about-eyebrow]', { opacity: 1, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
        .fromTo('[data-about-heading]', { opacity: 1, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.22')
        .fromTo('[data-about-line]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '-=0.26')
        .fromTo('[data-about-copy]', { opacity: 1, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.16')
        .fromTo('[data-about-card]', { opacity: 1, y: 20 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' }, '-=0.25')
        .fromTo('[data-about-tagline]', { opacity: 1 }, { opacity: 1, duration: 0.6 }, '-=0.18');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <video className="about-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/videos/about.mp4" type="video/mp4" />
      </video>
      <div className="about-video-overlay" aria-hidden="true" />

      <div className="about-section-index" data-about-number aria-hidden="true">
        <strong>02</strong>
        <span />
        <small>/ 06</small>
      </div>

      <div className="about-content">
        <div className="about-copy-column">
          <p className="about-eyebrow" data-about-eyebrow>ABOUT ME</p>
          <h2 data-about-heading><span>MORE THAN</span><em>JUST CODE</em></h2>
          <span className="about-accent-line" data-about-line aria-hidden="true" />
          <div className="about-copy">
            <p data-about-copy>
              I&apos;m Harsha, a passionate developer and a curious learner who loves building real-world solutions through technology. My journey started with a simple interest in how websites and applications work, and it has grown into a deep passion for creating meaningful digital experiences.
            </p>
            <p data-about-copy>
              I completed my Diploma in Computer Engineering (CME), and now I&apos;m pursuing B.Tech in Computer Science and Engineering because it gives me the freedom to explore different areas of technology. I&apos;m currently focused on strengthening my problem-solving skills through DSA, learning Cloud Computing, and building full-stack projects that solve real-world problems.
            </p>
          </div>
        </div>

        <div className="about-cards" aria-label="About me highlights">
          {aboutCards.map((card) => (
            <article className="about-card" data-about-card key={card.title}>
              <svg className="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {card.icon}
              </svg>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <p className="about-tagline" data-about-tagline>SAME CURIOSITY. HIGHER GOALS.</p>
      </div>
    </section>
  );
}
