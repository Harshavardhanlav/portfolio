import { useEffect, useRef, useState } from "react";
import { FaJava } from "react-icons/fa6";
import { SiC, SiCplusplus, SiCss, SiExpress, SiGit, SiGithub, SiGooglecloud, SiHtml5, SiJavascript, SiMongodb, SiNodedotjs, SiPython, SiReact } from "react-icons/si";
import "./Skills.css";

const VIDEO_SOURCE = "/videos/skills-background.mp4";

const categories = [
  { id: "programming", label: "Programming" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "tools", label: "Tools" },
  { id: "learning", label: "Currently Learning" },
];

const skills = [
  { id: "java", name: "Java", mark: "J", category: "programming", kicker: ["Building logic", "Solving problems"], description: "A versatile object-oriented language used for building robust applications and developing strong problem-solving skills.", areas: ["Object Oriented Programming", "Data Structures & Algorithms", "Problem Solving", "Real World Applications"] },
  { id: "python", name: "Python", mark: "Py", category: "programming", kicker: ["Clear syntax", "Versatile systems"], description: "A readable, versatile language for automation, data workflows, scripting and application development.", areas: ["Core Python", "Automation", "Data Processing", "Application Logic"] },
  { id: "c", name: "C", mark: "C", category: "programming", kicker: ["System foundations", "Memory control"], description: "A foundational language for understanding memory, data structures and efficient low-level programming.", areas: ["Pointers & Memory", "Data Structures", "Algorithms", "System Programming"] },
  { id: "cpp", name: "C++", mark: "C+", category: "programming", kicker: ["High performance", "Structured design"], description: "A high-performance language for object-oriented systems, competitive programming and efficient software.", areas: ["OOP", "STL", "Problem Solving", "Performance"] },
  { id: "html", name: "HTML", mark: "5", category: "frontend", kicker: ["Semantic structure", "Accessible content"], description: "The semantic foundation used to structure accessible, meaningful experiences on the web.", areas: ["Semantic Markup", "Accessibility", "Forms", "Document Structure"] },
  { id: "css", name: "CSS", mark: "3", category: "frontend", kicker: ["Visual systems", "Responsive layout"], description: "The visual language for responsive layouts, expressive interfaces and polished interaction states.", areas: ["Responsive Design", "Layouts", "Animation", "Design Systems"] },
  { id: "javascript", name: "JavaScript", mark: "JS", category: "frontend", kicker: ["Browser logic", "Dynamic behavior"], description: "The language powering dynamic web behavior, application logic and connected browser experiences.", areas: ["ES6+", "DOM", "Async Programming", "Web APIs"] },
  { id: "react", name: "React", mark: "⚛", category: "frontend", kicker: ["Interactive interfaces", "Reusable components"], description: "Building interactive interfaces with reusable components.", areas: ["Component-based Development", "Responsive Interfaces", "State Management", "API Integration"] },
  { id: "node", name: "Node.js", mark: "N", category: "backend", kicker: ["Server-side JavaScript", "Scalable services"], description: "Server-side JavaScript for scalable applications and APIs.", areas: ["REST APIs", "Asynchronous I/O", "Authentication", "Server Architecture"] },
  { id: "express", name: "Express.js", mark: "ex", category: "backend", kicker: ["Focused APIs", "Flexible routing"], description: "A minimal Node.js framework for building focused APIs and reliable server-side applications.", areas: ["Routing", "Middleware", "REST Services", "Error Handling"] },
  { id: "mongodb", name: "MongoDB", mark: "M", category: "database", kicker: ["Flexible data", "Modern applications"], description: "NoSQL database for modern application development.", areas: ["Document Modeling", "CRUD Operations", "Aggregation", "Data Design"] },
  { id: "atlas", name: "MongoDB Atlas", shortName: "Atlas", mark: "A", category: "database", kicker: ["Managed data", "Cloud scale"], description: "A managed cloud database platform for deploying, securing and scaling MongoDB workloads.", areas: ["Cloud Databases", "Deployment", "Monitoring", "Data Security"] },
  { id: "git", name: "Git", mark: "◆", category: "tools", kicker: ["Version control", "Confident delivery"], description: "Version control for managing and collaborating on software projects.", areas: ["Branching", "Merging", "Code History", "Team Workflows"] },
  { id: "github", name: "GitHub", mark: "GH", category: "tools", kicker: ["Code collaboration", "Shared workflows"], description: "A collaborative platform for reviewing, managing and delivering software projects with Git.", areas: ["Repositories", "Pull Requests", "Issues", "Collaboration"] },
  { id: "dsa", name: "DSA", mark: "↗", category: "learning", kicker: ["Algorithmic thinking", "Problem solving"], description: "Building strong algorithmic thinking and problem-solving skills.", areas: ["Data Structures", "Algorithms", "Complexity Analysis", "Coding Practice"] },
  { id: "cloud", name: "Cloud Computing", shortName: "Cloud", mark: "☁", category: "learning", kicker: ["Cloud foundations", "Modern deployment"], description: "Exploring cloud fundamentals, deployment and cloud services.", areas: ["Cloud Fundamentals", "Deployment", "Cloud Services", "Scalable Systems"] },
];

function categoryLabel(categoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? "";
}

function SkillIcon({ id }) {
  if (id === "dsa") return <svg viewBox="0 0 48 48" role="img" focusable="false"><path fill="none" stroke="#ff6675" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 37h32M11 34V11" /><path fill="none" stroke="#51c7ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m13 29 6-6 5 3 10-13" /><path fill="none" stroke="#51c7ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M29 13h5v5" /><path fill="#ff6675" d="M14 37h4v3h-4zM22 37h4v3h-4zM30 37h4v3h-4z" /></svg>;
  const icons = { java: FaJava, python: SiPython, c: SiC, cpp: SiCplusplus, html: SiHtml5, css: SiCss, javascript: SiJavascript, react: SiReact, node: SiNodedotjs, express: SiExpress, mongodb: SiMongodb, atlas: SiMongodb, git: SiGit, github: SiGithub, cloud: SiGooglecloud };
  const Icon = icons[id];
  if (Icon) return <Icon aria-hidden="true" focusable="false" />;
  return <svg viewBox="0 0 48 48" role="img" focusable="false"><path fill="none" stroke="#ff6675" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 37h32M11 34V11" /><path fill="none" stroke="#51c7ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m13 29 6-6 5 3 10-13" /><path fill="none" stroke="#51c7ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M29 13h5v5" /><path fill="#ff6675" d="M14 37h4v3h-4zM22 37h4v3h-4zM30 37h4v3h-4z" /></svg>;
}

function SkillNode({ skill, selected, emphasized, onSelect }) {
  return (
    <button type="button" className={`skills-node skills-node--${skill.id}${selected ? " is-selected" : ""}${emphasized ? " is-emphasized" : ""}`} onClick={() => onSelect(skill)} aria-label={`View ${skill.name} skill details`} aria-pressed={selected}>
      <span className={`skills-node__icon skills-node__icon--${skill.id}`} aria-hidden="true"><SkillIcon id={skill.id} /></span>
      <span className="skills-node__name">{skill.shortName ?? skill.name}</span>
    </button>
  );
}

function ResponsiveSkillCategory({ category }) {
  const categorySkills = skills.filter((skill) => skill.category === category.id);
  return (
    <article className="skills-responsive__category">
      <h3>{category.label}</h3>
      <div className="skills-responsive__items">
        {categorySkills.map((skill) => (
          <div className="skills-responsive__item" key={skill.id}>
            <span className={`skills-responsive__icon skills-node__icon--${skill.id}`} aria-hidden="true"><SkillIcon id={skill.id} /></span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [activeCategory, setActiveCategory] = useState("programming");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.18 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const playVideo = () => {
      video.muted = true;
      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch((error) => console.warn("Skills background video playback was blocked.", error));
      }
    };
    const reportVideoError = () => {
      console.error("Skills background video failed to load or play.", video.error);
    };

    video.addEventListener("canplay", playVideo, { once: true });
    video.addEventListener("error", reportVideoError);
    playVideo();

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("error", reportVideoError);
    };
  }, []);

  function selectSkill(skill) { setSelectedSkill(skill); setActiveCategory(skill.category); }

  return (
    <section ref={sectionRef} id="skills" className={`skills-scene${isVisible ? " is-visible" : ""}`} aria-labelledby="skills-title">
      <video ref={videoRef} className="skills-video" src={VIDEO_SOURCE} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
      <div className="skills-vignette" aria-hidden="true" />
      <header className="skills-heading"><div className="skills-count" aria-label="Section 5 of 6"><strong>05</strong><span>/ 06</span></div><div className="skills-heading__copy"><span className="skills-eyebrow">Skills</span><h2 id="skills-title">The Technology<span>Behind the Work.</span></h2><p>Tools today. Better solutions tomorrow.</p></div></header>
      <nav className="skills-categories" aria-label="Skill categories">{categories.map((category, index) => <button type="button" key={category.id} className={activeCategory === category.id ? "is-active" : ""} onClick={() => setActiveCategory(category.id)} aria-pressed={activeCategory === category.id}><span>{String(index + 1).padStart(2, "0")}</span>{category.label}</button>)}</nav>
      <div className="skills-orbit" aria-label="Technologies">{categories.map((category) => <div className={`skills-cluster skills-cluster--${category.id}${activeCategory === category.id ? " is-active" : ""}`} key={category.id}><span className="skills-cluster__label">{category.label}</span><div className="skills-cluster__nodes">{skills.filter((skill) => skill.category === category.id).map((skill) => <SkillNode key={skill.id} skill={skill} selected={selectedSkill.id === skill.id} emphasized={activeCategory === skill.category} onSelect={selectSkill} />)}</div></div>)}<div className="skills-globe-anchor"><div className="skills-identity" aria-label="Harsha, CSE Developer"><strong>HARSHA</strong><span>CSE DEVELOPER</span><em>LEARN&nbsp;&nbsp;|&nbsp;&nbsp;BUILD&nbsp;&nbsp;|&nbsp;&nbsp;GROW</em></div></div></div>
      <aside className="skills-detail" aria-live="polite" aria-atomic="true"><div className="skills-detail__corner skills-detail__corner--top" aria-hidden="true" /><div className="skills-detail__content" key={selectedSkill.id}><div className="skills-detail__meta"><span>{String(categories.findIndex((item) => item.id === selectedSkill.category) + 1).padStart(2, "0")}</span>{categoryLabel(selectedSkill.category)}</div><div className="skills-detail__title-row"><span className={`skills-detail__icon skills-detail__icon--${selectedSkill.id}`} aria-hidden="true"><SkillIcon id={selectedSkill.id} /></span><div><h3>{selectedSkill.name}</h3><p>{selectedSkill.kicker.join(" · ")}</p></div></div><p className="skills-detail__description">{selectedSkill.description}</p><ul>{selectedSkill.areas.map((area) => <li key={area}><span aria-hidden="true">✓</span>{area}</li>)}</ul><blockquote>“Good code creates opportunities.”</blockquote></div><div className="skills-detail__corner skills-detail__corner--bottom" aria-hidden="true" /></aside>
      <nav className="skills-footer" aria-label="Portfolio section navigation"><a href="#experience" className="skills-footer__link skills-footer__link--previous"><span aria-hidden="true">‹</span><span>Previous<strong>Experience</strong></span></a><p><span />Same curiosity. Higher goals.<span /></p><a href="#projects" className="skills-footer__link skills-footer__link--next"><span>Next<strong>Projects</strong></span><span aria-hidden="true">›</span></a></nav>
      <div className="skills-responsive" aria-label="Skills list">
        <header className="skills-responsive__heading">
          <span>MY SKILLS</span>
          <p>TOOLS TODAY. BETTER SOLUTIONS TOMORROW.</p>
        </header>
        <div className="skills-responsive__grid">
          {categories.map((category) => <ResponsiveSkillCategory key={category.id} category={category} />)}
        </div>
      </div>
    </section>
  );
}
