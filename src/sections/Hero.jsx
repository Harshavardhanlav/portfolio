import { useEffect, useMemo, useRef } from "react";
import { portfolio } from "../data/portfolio";
import "./Hero.css";

const readFirst = (...values) => values.find((value) => typeof value === "string" && value.trim());
const readSocial = (label) => portfolio?.social?.find((item) => item.label?.toLowerCase() === label.toLowerCase())?.href || "";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

function GitHubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8a9.3 9.3 0 0 0-2.94 18.12c.47.08.64-.2.64-.45v-1.8c-2.62.57-3.17-1.11-3.17-1.11-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.61.33-1.03.6-1.27-2.09-.24-4.29-1.05-4.29-4.66 0-1.03.37-1.87.98-2.53-.1-.24-.42-1.2.09-2.5 0 0 .8-.26 2.62.97A9.1 9.1 0 0 1 12 7.05a9 9 0 0 1 2.39.32c1.82-1.23 2.62-.97 2.62-.97.51 1.3.19 2.26.09 2.5.61.66.98 1.5.98 2.53 0 3.62-2.21 4.41-4.31 4.65.34.3.64.87.64 1.76v2.63c0 .25.17.54.65.45A9.3 9.3 0 0 0 12 2.8Z" /></svg>;
}

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.4H3.3V19h3.2V8.4ZM4.9 3a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 4.9 3ZM20.7 12.9c0-3.2-1.7-4.8-4-4.8-1.8 0-2.7 1-3.1 1.8V8.4h-3.2V19h3.2v-5.2c0-1.4.3-2.7 2-2.7 1.7 0 1.8 1.6 1.8 2.8V19h3.3v-6.1Z" /></svg>;
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5Zm1.5 1.5L12 13l7.5-6.5" /></svg>;
}

function ParticleCanvas({ reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest(".hero-section");
    if (!canvas || !section) return undefined;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let particles = [];

    const makeParticle = (fresh = false) => {
      const spark = Math.random() > 0.86;
      return { x: Math.random() * width, y: fresh ? Math.random() * height : height + Math.random() * 80, radius: spark ? Math.random() * 1.4 + 0.7 : Math.random() * 0.9 + 0.25, speedX: (Math.random() - 0.44) * (spark ? 0.48 : 0.18), speedY: -(Math.random() * (spark ? 0.8 : 0.28) + 0.08), alpha: Math.random() * 0.58 + 0.12, pulse: Math.random() * Math.PI * 2, spark };
    };

    const resize = () => {
      const box = section.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, box.width);
      height = Math.max(1, box.height);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: reducedMotion ? 18 : Math.min(70, Math.floor(width / 19)) }, () => makeParticle(true));
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.pulse += 0.025;
          if (particle.y < -30 || particle.x > width + 30 || particle.x < -30) particles[index] = makeParticle();
        }
        const flicker = reducedMotion ? 1 : 0.72 + Math.sin(particle.pulse + time * 0.001) * 0.28;
        context.beginPath();
        context.fillStyle = particle.spark ? `rgba(255, 95, 45, ${particle.alpha * flicker})` : `rgba(230, 18, 35, ${particle.alpha * flicker})`;
        context.shadowColor = particle.spark ? "rgba(255,70,20,.95)" : "rgba(235,0,35,.8)";
        context.shadowBlur = particle.spark ? 10 : 5;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        if (particle.spark) {
          context.beginPath();
          context.strokeStyle = `rgba(255, 72, 34, ${particle.alpha * 0.38})`;
          context.lineWidth = 0.65;
          context.moveTo(particle.x, particle.y + 1);
          context.lineTo(particle.x - particle.speedX * 13, particle.y - particle.speedY * 13);
          context.stroke();
        }
      });
      context.shadowBlur = 0;
      if (!reducedMotion && visible) frame = window.requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reducedMotion) frame = window.requestAnimationFrame(draw);
      else window.cancelAnimationFrame(frame);
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="hero-section__particles" aria-hidden="true" />;
}

export default function Hero() {
  const rootRef = useRef(null);
  const reducedMotion = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const source = portfolio?.hero || portfolio?.personal || portfolio || {};
  const name = readFirst(source.name, source.firstName, portfolio?.name) || "Harsha";
  const title = readFirst(source.title, source.role, portfolio?.title) || "CSE Student | MERN Stack Developer";
  const tagline = readFirst(source.tagline, source.eyebrow, portfolio?.tagline) || "Turning ideas into modern digital experiences.";
  const description = readFirst(source.description, source.bio, portfolio?.description, portfolio?.intro) || "I build modern web applications, explore new technologies, and love turning ideas into real-world solutions.";
  const email = readFirst(source.email, source.contact?.email, portfolio?.contact?.email, portfolio?.email, readSocial("Email")) || "";
  const github = readFirst(source.github, source.socials?.github, portfolio?.socials?.github, portfolio?.github, readSocial("GitHub")) || "";
  const linkedin = readFirst(source.linkedin, source.socials?.linkedin, portfolio?.socials?.linkedin, portfolio?.linkedin, readSocial("LinkedIn")) || "";

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return undefined;
    let pointerFrame = 0;
    const onPointerMove = (event) => {
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        const box = root.getBoundingClientRect();
        root.style.setProperty("--pointer-x", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
        root.style.setProperty("--pointer-y", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
      });
    };
    const onPointerLeave = () => { root.style.setProperty("--pointer-x", "0"); root.style.setProperty("--pointer-y", "0"); };
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);
    return () => { window.cancelAnimationFrame(pointerFrame); root.removeEventListener("pointermove", onPointerMove); root.removeEventListener("pointerleave", onPointerLeave); };
  }, [reducedMotion]);

  const scrollToWork = (event) => {
    const target = document.querySelector("#projects, #work");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={rootRef} className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-section__backlight" aria-hidden="true" /><div className="hero-section__fog hero-section__fog--rear" aria-hidden="true" /><div className="hero-section__fog hero-section__fog--mid" aria-hidden="true" /><div className="hero-section__fog hero-section__fog--front" aria-hidden="true" /><div className="hero-section__grain" aria-hidden="true" /><ParticleCanvas reducedMotion={reducedMotion} />
      <span className="hero-section__monogram" aria-hidden="true">HAR</span>
      <div className="hero-section__index" aria-label="Section 1 of 6"><strong>01</strong><span /><small>/ 06</small></div>
      <div className="hero-section__portrait-wrap" aria-hidden="true"><div className="hero-section__portrait-aura" /><img className="hero-section__portrait" src="/images/profile/hero.png" alt="" fetchPriority="high" draggable="false" /><div className="hero-section__portrait-shade" /></div>
      <div className="hero-section__content">
        <p className="hero-section__eyebrow hero-section__reveal"><span aria-hidden="true" />{tagline}</p>
        <h1 id="hero-title" className="hero-section__heading hero-section__reveal"><span>Hi, I’m</span><strong>{name}</strong></h1>
        <p className="hero-section__role hero-section__reveal">{title}</p><p className="hero-section__description hero-section__reveal">{description}</p>
        <div className="hero-section__actions hero-section__reveal"><a className="hero-section__button hero-section__button--primary" href="#projects" onClick={scrollToWork}>View my work <ArrowIcon /></a><a className="hero-section__button hero-section__button--secondary" href={email ? `mailto:${email}` : "#contact"}>Let’s connect</a></div>
        <nav className="hero-section__socials hero-section__reveal" aria-label="Social links">{github && <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /> <span>GitHub</span></a>}{linkedin && <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /> <span>LinkedIn</span></a>}{email && <a href={`mailto:${email}`} aria-label="Email"><MailIcon /> <span>Email</span></a>}</nav>
      </div>
      <a className="hero-section__scroll" href="#projects" onClick={scrollToWork} aria-label="Scroll to projects"><span className="hero-section__mouse"><i /></span><b>Scroll to explore</b></a>
      <div className="hero-section__technical" aria-hidden="true"><span>Code</span><span>Create</span><span>Learn</span><span>Grow</span></div><div className="hero-section__corner hero-section__corner--top" aria-hidden="true" /><div className="hero-section__corner hero-section__corner--bottom" aria-hidden="true" />
    </section>
  );
}
