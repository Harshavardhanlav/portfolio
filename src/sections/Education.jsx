import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Education.css";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_DATA = [
  { id: "school", index: "01", year: "2022", category: "FOUNDATION", title: "G.V.M.C High School", location: "Gandhinagar, Anakapalle", description: "School Education", image: "/images/profile/education/school.png" },
  { id: "diploma", index: "02", year: "2022 – 2025", category: "DIPLOMA", title: "Government Polytechnic, Chodavaram", location: "Chodavaram", description: "Diploma in Computer Science Engineering", image: "/images/profile/education/diploma.png" },
  { id: "btech", index: "03", year: "2025 – 2028", category: "B.TECH", title: "Vignan's Institute of Information Technology", location: "Visakhapatnam", description: "B.Tech in Computer Science Engineering", note: "Lateral Entry", image: "/images/profile/education/btech.png" },
  { id: "current", index: "04", category: "CURRENTLY", title: "3RD YEAR", subtitle: "B.TECH CSE", isStatusCard: true },
];

const YEAR_MARKERS = ["2022", "2025", "2028"];

export default function Education() {
  const wrapperRef = useRef(null);
  const sceneRef = useRef(null);
  const cardsHostRef = useRef(null);
  const cardRefs = useRef([]);
  const arcGroupRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 900px)");
    const update = () => { setReducedMotion(motionQuery.matches); setIsCompact(widthQuery.matches); };
    update();
    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    return () => { motionQuery.removeEventListener("change", update); widthQuery.removeEventListener("change", update); };
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || isCompact) return undefined;
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const total = cards.length;
      if (!total) return;
      let spacingX = 320;
      let spacingZ = 70;
      const computeSpacing = () => {
        const rect = cards[0].getBoundingClientRect();
        spacingX = rect.width * 0.74;
        spacingZ = rect.width * 0.14;
      };
      const applyProgress = (progress) => {
        const activePosition = progress * (total - 1);
        cards.forEach((card, i) => {
          const delta = i - activePosition;
          const absDelta = Math.abs(delta);
          gsap.set(card, {
            x: delta * spacingX,
            z: -absDelta * spacingZ,
            scale: gsap.utils.clamp(0.6, 1, 1 - absDelta * 0.16),
            rotateY: gsap.utils.clamp(-14, 14, delta * -7),
            opacity: gsap.utils.clamp(0.15, 1, 1 - absDelta * 0.34),
            zIndex: Math.round(200 - absDelta * 10),
            filter: `brightness(${gsap.utils.clamp(0.32, 1, 1 - absDelta * 0.3)})`,
          });
        });
        if (arcGroupRef.current) gsap.set(arcGroupRef.current, { x: -activePosition * spacingX * 0.32 });
      };
      gsap.set(cards, { xPercent: -50, yPercent: -50 });
      computeSpacing();
      applyProgress(0);
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        pin: sceneRef.current,
        anticipatePin: 1,
        onRefresh: computeSpacing,
        onUpdate: (self) => applyProgress(self.progress),
      });
      return () => trigger.kill();
    }, wrapperRef);
    return () => ctx.revert();
  }, [reducedMotion, isCompact]);

  const setCardRef = (el, i) => { cardRefs.current[i] = el; };
  const isStatic = reducedMotion || isCompact;

  return (
    <section className={`edu-wrapper${isStatic ? " edu-wrapper--static" : ""}`} ref={wrapperRef} aria-label="Education">
      <div className="edu-scene" ref={sceneRef}>
        <div className="edu-atmosphere" aria-hidden="true" />
        <header className="edu-heading">
          <p className="edu-heading__count" aria-hidden="true"><span className="edu-heading__count-active">03</span><span className="edu-heading__count-slash">/</span><span className="edu-heading__count-total">06</span></p>
          <h2 className="edu-heading__title">Education</h2>
          <p className="edu-heading__subtitle">The journey so far</p>
          <div className="edu-heading__rule" aria-hidden="true" />
          <p className="edu-heading__note">Same roots.<br />Higher goals.<br />A brighter tomorrow.</p>
        </header>
        <div className="edu-arc-layer" aria-hidden="true">
          <svg className="edu-arc" viewBox="0 0 1600 420" preserveAspectRatio="none">
            <defs>
              <linearGradient id="eduArcGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(255,64,64,0)" /><stop offset="50%" stopColor="rgba(255,64,64,0.85)" /><stop offset="100%" stopColor="rgba(255,64,64,0)" /></linearGradient>
              <filter id="eduArcGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g ref={arcGroupRef}>
              <path d="M 40 340 Q 800 10 1560 340" fill="none" stroke="url(#eduArcGradient)" strokeWidth="2" filter="url(#eduArcGlow)" />
              {YEAR_MARKERS.map((year, i) => { const t = (i + 1) / (YEAR_MARKERS.length + 1); const x = 40 + t * 1520; const y = 340 - Math.sin(t * Math.PI) * 320; return <g key={year}><circle cx={x} cy={y} r="6.5" className="edu-arc__dot" /><text x={x} y={y - 22} textAnchor="middle" className="edu-arc__year">{year}</text></g>; })}
            </g>
          </svg>
        </div>
        <ol className="edu-cards" ref={cardsHostRef}>
          {EDUCATION_DATA.map((item, i) => <li key={item.id} ref={(el) => setCardRef(el, i)} className={`edu-card${item.isStatusCard ? " edu-card--status" : ""}`}>
            {!item.isStatusCard ? <>
              <div className="edu-card__image">{item.image ? <img src={item.image} alt="" aria-hidden="true" /> : <div className="edu-card__image-fallback" aria-hidden="true" />}</div>
              <div className="edu-card__body"><span className="edu-card__index" aria-hidden="true">{item.index}</span><p className="edu-card__year">{item.year}</p><h3 className="edu-card__title">{item.title}</h3><p className="edu-card__location">{item.location}</p><p className="edu-card__description">{item.description}</p>{item.note && <p className="edu-card__note">{item.note}</p>}</div>
            </> : <div className="edu-card__status-body"><span className="edu-card__index" aria-hidden="true">{item.index}</span><p className="edu-card__status-label">{item.category}</p><h3 className="edu-card__status-title">{item.title}</h3><div className="edu-card__status-rule" aria-hidden="true" /><p className="edu-card__status-subtitle">{item.subtitle}</p></div>}
          </li>)}
        </ol>
        <div className="edu-surface" aria-hidden="true" />
        <aside className="edu-scroll-indicator" aria-hidden="true"><span className="edu-scroll-indicator__icon" /><p>Scroll<br />to explore<br />my journey</p><span className="edu-scroll-indicator__line" /></aside>
        <footer className="edu-footnav" aria-hidden="true"><div className="edu-footnav__current"><span>03</span><span className="edu-footnav__rule" /><span>Education</span></div><div className="edu-footnav__next"><span>Next</span><span className="edu-footnav__rule" /><span>Experience</span><span className="edu-footnav__arrow">→</span></div></footer>
      </div>
    </section>
  );
}