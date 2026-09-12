import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [0, 0.35, 0.7, 1];

const education = [
  { number: '01', year: '2022', category: 'FOUNDATION', title: 'G.V.M.C High School', location: 'Gandhinagar, Anakapalle', description: 'School Education', image: '/images/education/school.jpg', alt: 'Atmospheric school campus at dusk' },
  { number: '02', year: '2022 – 2025', category: 'DIPLOMA', title: 'Government Polytechnic, Chodavaram', description: 'Diploma in Computer Science Engineering', image: '/images/education/diploma.jpg', alt: 'Atmospheric polytechnic campus at dusk' },
  { number: '03', year: '2025 – 2028', category: 'B.TECH', title: "Vignan's Institute of Information Technology", location: 'Duvvada, Visakhapatnam', description: 'B.Tech in Computer Science Engineering', additional: 'Lateral Entry', image: '/images/education/btech.jpg', alt: 'Atmospheric engineering institute campus at dusk' },
  { number: '04', category: 'CURRENTLY', title: '3RD YEAR', description: 'B.TECH CSE', isStatusCard: true },
];

const clamp = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

function progressToIndex(progress) {
  for (let index = 0; index < milestones.length - 1; index += 1) {
    const start = milestones[index];
    const end = milestones[index + 1];
    if (progress > end) continue;
    return index + smoothstep((progress - start) / (end - start));
  }
  return milestones.length - 1;
}

export default function Education() {
  const sectionRef = useRef(null);
  const worldRef = useRef(null);
  const arcRef = useRef(null);
  const cardRefs = useRef([]);
  const reflectionRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const world = worldRef.current;
    if (!section || !world) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;

    const renderProgress = (rawProgress) => {
      const sceneProgress = clamp(rawProgress);
      const journeyIndex = progressToIndex(sceneProgress);
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth < 1024;
      const spacing = mobile ? 282 : tablet ? 330 : 390;
      const nearest = Math.round(journeyIndex);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = index - journeyIndex;
        const magnitude = Math.min(Math.abs(distance), 2.3);
        card.dataset.active = String(index === nearest);
        gsap.set(card, {
          x: distance * spacing,
          y: magnitude * (mobile ? 20 : 27),
          z: -magnitude * (mobile ? 65 : 145),
          scale: 1 - Math.min(magnitude * (mobile ? 0.09 : 0.12), 0.25),
          rotateY: distance < -0.08 ? 9 : distance > 0.08 ? -9 : 0,
          rotateZ: distance * (mobile ? -0.25 : -0.7),
          opacity: Math.max(0.28, 1 - magnitude * 0.25),
          filter: `brightness(${Math.max(0.38, 1 - magnitude * 0.28)})`,
          zIndex: 20 - Math.round(magnitude * 5),
          force3D: true,
        });

        const reflection = reflectionRefs.current[index];
        if (reflection) {
          gsap.set(reflection, {
            x: distance * spacing,
            opacity: Math.max(0.02, 0.14 - magnitude * 0.045),
            scale: 1 - Math.min(magnitude * 0.08, 0.2),
            force3D: true,
          });
        }
      });

      gsap.set(world, { x: (0.5 - sceneProgress) * (mobile ? 12 : 34) });
      if (arcRef.current) gsap.set(arcRef.current, { x: -journeyIndex * spacing * 0.17 });
    };

    renderProgress(0);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.65,
      invalidateOnRefresh: true,
      onUpdate: (self) => renderProgress(self.progress),
    });

    const onResize = () => renderProgress(trigger.progress);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="education" aria-labelledby="education-title">
      <div className="education__sticky">
        <div className="education__atmosphere" aria-hidden="true">
          <span className="education__bloom" />
          <span className="education__haze" />
          {Array.from({ length: 16 }, (_, index) => <i key={index} style={{ '--particle': index }} />)}
        </div>

        <header className="education__heading">
          <p className="education__counter"><strong>03</strong><span>/</span>06</p>
          <h1 id="education-title">Education</h1>
          <p className="education__kicker">The journey so far</p>
          <div className="education__manifesto" aria-hidden="true"><span /><p>Same roots.<br />Higher goals.<br />A brighter tomorrow.</p></div>
        </header>

        <div className="education__scroll-cue" aria-hidden="true"><span className="education__mouse"><i /></span><p>Scroll<br />to explore<br />my journey</p><span className="education__cue-line" /></div>

        <svg ref={arcRef} className="education__arc" viewBox="0 0 1900 440" aria-hidden="true">
          <defs><filter id="arc-glow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          <path className="education__arc-shadow" d="M40 410 Q820 -70 1860 320" />
          <path className="education__arc-line" d="M40 410 Q820 -70 1860 320" />
          <g className="education__milestone education__milestone--one"><circle cx="680" cy="89" r="6" /><text x="680" y="62">2022</text></g>
          <g className="education__milestone education__milestone--two"><circle cx="1080" cy="76" r="6" /><text x="1080" y="49">2025</text></g>
          <g className="education__milestone education__milestone--three"><circle cx="1465" cy="144" r="6" /><text x="1465" y="117">2028</text></g>
        </svg>

        <div className="education__surface" aria-hidden="true">
          <span className="education__surface-plane" />
          <svg viewBox="0 0 1600 420" preserveAspectRatio="none"><path d="M-80 320 C260 235 470 340 810 278 S1280 185 1680 300" /><path d="M-120 390 C280 310 470 385 870 342 S1320 270 1720 365" /><path d="M260 430 C390 320 590 280 760 205" /></svg>
        </div>

        <div ref={worldRef} className="education__world">
          <div className="education__cards" aria-label="Education milestones">
            {education.map((item, index) => <article key={item.number} ref={(node) => { cardRefs.current[index] = node; }} className={`education-card education-card--${index + 1}`}>
              <span className="education-card__number">{item.number}</span>
              {'image' in item ? <div className="education-card__image-wrap"><img src={item.image} alt={item.alt} width="1280" height="768" loading={index === 0 ? 'eager' : 'lazy'} /></div> : <div className="education-card__status-mark" aria-hidden="true">03</div>}
              <div className="education-card__body"><p className="education-card__category">{item.category}</p>{'year' in item && <p className="education-card__year">{item.year}</p>}<h2>{item.title}</h2>{'location' in item && <p className="education-card__location">⌖ {item.location}</p>}<p className="education-card__description">{item.description}</p>{'additional' in item && <p className="education-card__additional">{item.additional}</p>}</div>
              <span className="education-card__contact" aria-hidden="true" />
            </article>)}
          </div>

          <div className="education__reflections" aria-hidden="true">
            {education.map((item, index) => <div key={item.number} ref={(node) => { reflectionRefs.current[index] = node; }} className="education__reflection">{'image' in item && <img src={item.image} alt="" width="1280" height="768" loading="lazy" />}</div>)}
          </div>
        </div>

        <footer className="education__footer" aria-hidden="true"><div><strong>03</strong><span />Education</div><div>Next<span />Experience<b>→</b></div></footer>
      </div>
    </section>
  );
}
