import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'JavaScript', short: 'JS', className: 'experience-tech--js' },
  { name: 'React', short: '<>', className: 'experience-tech--react' },
  { name: 'Node.js', short: 'N', className: 'experience-tech--node' },
  { name: 'DSA', short: '{}', className: 'experience-tech--dsa' },
  { name: 'Teamwork', short: '+', className: 'experience-tech--team' },
];

function ThoughtworksMark({ compact = false }) {
  return (
    <div className={`experience-wordmark${compact ? ' experience-wordmark--compact' : ''}`} aria-label="Thoughtworks">
      <span className="experience-wordmark__slash" aria-hidden="true" />
      <span>Thoughtworks</span>
    </div>
  );
}

function TechnologyItem({ item, index }) {
  return (
    <li className={`experience-tech ${item.className}`} style={{ '--tech-index': index }}>
      <div className="experience-tech__icon" aria-hidden="true"><span>{item.short}</span></div>
      <span className="experience-tech__name">{item.name}</span>
    </li>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(section.querySelectorAll('[data-experience-reveal]'), { autoAlpha: 1, clearProps: 'transform' });
      return undefined;
    }

    const onPointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      section.style.setProperty('--pointer-x', x.toFixed(3));
      section.style.setProperty('--pointer-y', y.toFixed(3));
    };

    const onPointerLeave = () => {
      section.style.setProperty('--pointer-x', '0');
      section.style.setProperty('--pointer-y', '0');
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave);

    const context = gsap.context(() => {
      const reveal = section.querySelectorAll('[data-experience-reveal]');
      const titleLines = section.querySelectorAll('.experience-title-line');
      const technologies = section.querySelectorAll('.experience-tech');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          end: 'bottom 72%',
          scrub: 0.8,
        },
      });

      gsap.set(reveal, { autoAlpha: 0, y: 20 });
      gsap.set(titleLines, { y: 30 });
      gsap.set(technologies, { y: 15, scale: 0.96 });
      gsap.set('.experience-console', { y: 32, scale: 0.97 });
      gsap.set('.experience-description', { x: -18 });
      gsap.set('.experience-navigation', { y: 14 });

      timeline
        .to('.experience-scene__glow', { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'power2.out' }, 0)
        .to('.experience-scene__fog', { autoAlpha: 1, y: 0, duration: 0.2 }, 0)
        .to('.experience-index', { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.2)
        .to('.experience-title-block', { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.2)
        .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.15, ease: 'power3.out' }, 0.32)
        .to('.experience-subtitle', { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.55)
        .to('.experience-console', { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: 'power3.out' }, 0.65)
        .to(technologies, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.16, ease: 'power2.out' }, 0.75)
        .to('.experience-description', { autoAlpha: 1, x: 0, duration: 0.12, ease: 'power2.out' }, 0.86)
        .to('.experience-navigation', { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.95)
        .fromTo('.experience-console__sweep', { xPercent: 0, autoAlpha: 0 }, { xPercent: 1300, autoAlpha: 1, duration: 0.14, ease: 'power1.inOut' }, 0.78);

      gsap.to('.experience-scene', { y: 18, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.experience-scene__glow', { y: 28, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.experience-title-block', { y: -8, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.experience-console', { y: -5, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, section);

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="experience-section" id="experience" aria-labelledby="experience-title">
      <div className="experience-scene" aria-hidden="true">
        <div className="experience-scene__glow" />
        <div className="experience-scene__grid" />
        <div className="experience-scene__light experience-scene__light--one" />
        <div className="experience-scene__light experience-scene__light--two" />
        <div className="experience-scene__fog experience-scene__fog--one" />
        <div className="experience-scene__fog experience-scene__fog--two" />
        <div className="experience-particles">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--particle': index }} />)}</div>
      </div>

      <div className="experience-vignette" aria-hidden="true" />
      <div className="experience-shell">
        <header className="experience-heading">
          <div className="experience-index" data-experience-reveal aria-label="Section 4 of 6"><strong>04</strong><span className="experience-index__rule" /><small>/ 06</small></div>
          <div className="experience-title-block" data-experience-reveal>
            <p className="experience-eyebrow" data-experience-reveal>EXPERIENCE</p>
            <h1 id="experience-title"><span className="experience-title-line" data-experience-reveal>APPRENTICESHIP</span><strong className="experience-title-line" data-experience-reveal>AT THOUGHTWORKS</strong></h1>
            <p className="experience-subtitle" data-experience-reveal>LEARNING TODAY. IMPACTING TOMORROW.</p>
          </div>
        </header>

        <article className="experience-console" data-experience-reveal>
          <span className="experience-console__sweep" aria-hidden="true" /><span className="experience-console__corner experience-console__corner--top" aria-hidden="true" /><span className="experience-console__corner experience-console__corner--bottom" aria-hidden="true" />
          <div className="experience-company">
            <ThoughtworksMark />
            <div className="experience-company__identity"><h2>THOUGHTWORKS TECHNOLOGIES INDIA PVT. LTD.</h2><p>Apprenticeship</p></div>
            <dl className="experience-meta">
              <div><dt aria-hidden="true">[ ]</dt><dd>June 2024 -<br />November 2024</dd></div>
              <div><dt aria-hidden="true">~</dt><dd>6 Months</dd></div>
              <div><dt aria-hidden="true">+</dt><dd>Online + Offline</dd></div>
            </dl>
          </div>
          <div className="experience-technologies"><h2>KEY TECHNOLOGIES</h2><ul>{technologies.map((item, index) => <TechnologyItem key={item.name} item={item} index={index} />)}</ul></div>
        </article>

        <div className="experience-description" data-experience-reveal><p>Completed a 6-month online and offline apprenticeship focused on practical development and problem-solving. Worked with JavaScript, React and Node.js through hands-on projects, practiced DSA through coding exercises and live tests, and developed teamwork and logical-thinking skills through collaborative activities.</p></div>

        <nav className="experience-navigation" data-experience-reveal aria-label="Portfolio section navigation">
          <a className="experience-nav-link experience-nav-link--previous" href="#education" aria-label="Previous section: Education"><span className="experience-nav-arrow" aria-hidden="true">&lt;</span><span><small>PREVIOUS</small><strong>EDUCATION</strong></span></a>
          <div className="experience-tagline" aria-hidden="true"><i /><span>SAME CURIOSITY. HIGHER GOALS.</span><i /></div>
          <a className="experience-nav-link experience-nav-link--next" href="#skills" aria-label="Next section: Skills"><span><small>NEXT</small><strong>SKILLS</strong></span><span className="experience-nav-arrow" aria-hidden="true">&gt;</span></a>
        </nav>
      </div>
    </section>
  );
}
