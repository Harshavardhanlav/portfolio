import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '../data/portfolio';
import SocialLinks from '../components/SocialLinks';
import HeroAtmosphere3D from '../components/HeroAtmosphere3D';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const visualRef = useRef(null);
  const wordRef = useRef(null);
  const moveRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (!prefersReducedMotion) {
        tl.fromTo(
          visualRef.current,
          { opacity: 1, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.05 },
        )
          .fromTo(
            '.hero-copy > *',
            { y: 24 },
            { y: 0, duration: 0.9, stagger: 0.08 },
            '-=0.6',
          )
          .fromTo(
            '.hero-actions, .social-list',
            { y: 18 },
            { y: 0, duration: 0.7, stagger: 0.12 },
            '-=0.5',
          );

        gsap.to(visualRef.current, {
          yPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to(wordRef.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      } else {
        gsap.set(['.hero-copy > *', '.hero-actions', '.social-list', '.hero-visual-wrap'], { opacity: 1, y: 0, scale: 1 });
      }

      gsap.to(moveRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero-section">
      <div className="hero-noise" />
      <div className="hero-backdrop" aria-hidden="true">
        <div ref={wordRef} className="hero-large-word">HAR</div>
      </div>

      <HeroAtmosphere3D />

      <div className="hero-section-index" aria-hidden="true">
        <strong>01</strong>
        <span className="hero-index-line" />
        <span>/ 06</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">TURNING IDEAS INTO MODERN DIGITAL EXPERIENCES</p>
          <p className="hero-intro-label">HI, I'M</p>
          <h1 ref={titleRef}>{portfolio.name}</h1>
          <p className="hero-subtitle">{portfolio.fullName}</p>
          <p className="hero-role">{portfolio.title}</p>
          <p className="hero-description">I build modern web applications, explore new technologies, and love turning ideas into real-world solutions.</p>

          <div className="hero-actions">
            <a className="hero-button hero-button-primary" href="#projects">VIEW MY WORK <span aria-hidden="true">→</span></a>
            <a className="hero-button hero-button-secondary" href="#contact">LET'S CONNECT</a>
          </div>

          <SocialLinks links={portfolio.social} />
        </div>

        <div ref={visualRef} className="hero-visual-wrap">
          <div className="hero-image-atmosphere" aria-hidden="true" />
          <img
            className="hero-portrait"
            src="/images/profile/hero.png"
            alt="Harsha Prabandhakavi"
          />
        </div>
      </div>

      <div ref={moveRef} className="scroll-indicator">
        <span className="scroll-mouse" aria-hidden="true" />
        <span>SCROLL TO EXPLORE</span>
      </div>

      <div className="hero-glow-line" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
