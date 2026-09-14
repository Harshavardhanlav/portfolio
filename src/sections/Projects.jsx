import { useEffect, useState } from "react";
import "./Projects.css";

const PROJECT_IMAGES = {
  pokemon: "/images/projects/pokemon-bg.png",
  spendwise: "/images/projects/spendwise-bg.png",
  nexus: "/images/projects/nexus-bg.png",
  careerCompass: "/images/projects/career-compass-bg.png",
};

const projects = [
  {
    number: "01",
    title: "Pokémon Explorer",
    shortTitle: "Pokémon",
    type: "Frontend Project",
    image: PROJECT_IMAGES.pokemon,
    description:
      "A responsive React-based Pokémon exploration website that fetches Pokémon data from an external API and allows users to search, explore, and view detailed information including statistics, moves, types, weaknesses, and resistances.",
    technologies: ["React.js", "CSS3", "Pokémon API", "React Hooks"],
    features: ["Pokémon listing", "Search and filtering", "Pokémon details", "Statistics", "Moves", "Types", "Weaknesses and resistances", "Loading animation", "Responsive design"],
    liveDemo: "",
    github: "",
  },
  {
    number: "02",
    title: "SpendWise",
    shortTitle: "SpendWise",
    type: "Full-Stack MERN Project",
    image: PROJECT_IMAGES.spendwise,
    description:
      "A personal finance management platform for tracking income and expenses, managing budgets, analyzing spending, generating reports, and managing personal financial data securely.",
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "JWT", "HTML", "CSS"],
    features: ["Registration and login", "Email verification", "Forgot/reset password", "JWT authentication", "Income and expense tracking", "Categories", "Payment methods", "Budgets", "Dashboard", "Analytics", "Reports", "Data export", "Settings", "Currency management"],
    liveDemo: "",
    github: "",
  },
  {
    number: "03",
    title: "NEXUS",
    shortTitle: "NEXUS",
    type: "Full-Stack MERN Project",
    image: PROJECT_IMAGES.nexus,
    description:
      "A school management system designed to streamline school operations through separate admin and teacher portals, attendance management, geofencing, tasks, notices, academic calendar management, and reporting.",
    technologies: ["React", "Vite", "JavaScript", "CSS", "Node.js", "Express.js", "MongoDB", "MongoDB Atlas", "Browser Geolocation / Geofencing"],
    features: ["Admin portal", "Teacher portal", "Role-based access", "Teacher management", "Location-based attendance", "Geofencing", "Automatic absence cutoff", "Attendance history", "Reports", "Task tracking", "Notices", "Academic calendar", "Responsive interface"],
    liveDemo: "",
    github: "",
  },
  {
    number: "04",
    title: "Career Compass",
    shortTitle: "Career Compass",
    subtitle: "Smart Resume Analyzer & Career Guide",
    type: "AI-Powered Full-Stack MERN Project",
    image: PROJECT_IMAGES.careerCompass,
    description:
      "An AI-powered career guidance platform that analyzes a user's resume and provides personalized career recommendations, skill-gap analysis, learning resources, job and salary guidance, and a step-by-step career roadmap.",
    technologies: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Google Gemini API", "Multer", "PDF text extraction", "Jest", "Supertest", "Docker"],
    features: ["Resume analysis", "Career recommendations", "Job-role recommendations", "Skill-gap analysis", "Personalized career roadmap", "Learning resources", "Mock-test resources", "Job and salary guidance", "Personalized dashboard", "Authentication", "Google authentication", "Charts and data visualization"],
    liveDemo: "",
    github: "",
  },
];

function ProjectActions({ project }) {
  if (!project.liveDemo && !project.github) return null;

  return (
    <div className="projects__actions">
      {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noreferrer" className="projects__action projects__action--primary"><span aria-hidden="true">↗</span> Live demo</a>}
      {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="projects__action"><span aria-hidden="true">⌘</span> GitHub</a>}
    </div>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const activeProject = projects[activeIndex];

  const selectProject = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setTransitionKey((key) => key + 1);
  };

  const moveProject = (direction) => {
    selectProject((activeIndex + direction + projects.length) % projects.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") moveProject(-1);
      if (event.key === "ArrowRight") moveProject(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="projects__desktop">
        <div key={`background-${transitionKey}`} className="projects__scene" style={{ backgroundImage: `url(${activeProject.image})` }} role="img" aria-label={`${activeProject.title} project shown on a laptop in a cinematic red-lit setting`} />
        <div className="projects__shade" aria-hidden="true" />
        <header className="projects__heading"><div className="projects__section-index"><strong>06</strong><span>/ 06</span></div><div className="projects__heading-copy"><p>Selected work</p><h2 id="projects-title">Projects</h2><span>Ideas engineered into useful products.</span></div></header>
        <nav className="projects__rail" aria-label="Choose a project">{projects.map((project, index) => <button key={project.number} type="button" onClick={() => selectProject(index)} className={`projects__rail-item${activeIndex === index ? " is-active" : ""}`} aria-pressed={activeIndex === index}><span>{project.number}</span><span><strong>{project.shortTitle}</strong><small>{project.type}</small></span></button>)}</nav>
        <article key={`details-${transitionKey}`} className="projects__panel"><div className="projects__panel-topline"><span>Project_{activeProject.number}</span><span className="projects__status">Featured</span></div><h3>{activeProject.title}</h3>{activeProject.subtitle && <p className="projects__subtitle">{activeProject.subtitle}</p>}<p className="projects__type">{activeProject.type}</p><p className="projects__description">{activeProject.description}</p><div className="projects__technology-list" aria-label="Technologies">{activeProject.technologies.map((technology, index) => <span key={technology} style={{ "--reveal-order": index }}>{technology}</span>)}</div><div className="projects__feature-list" aria-label="Project features">{activeProject.features.slice(0, 7).map((feature) => <span key={feature}>{feature}</span>)}</div><ProjectActions project={activeProject} /></article>
        <div className="projects__controls"><button type="button" onClick={() => moveProject(-1)} aria-label="Show previous project"><span aria-hidden="true">←</span><span><small>Previous</small>{projects[(activeIndex - 1 + projects.length) % projects.length].shortTitle}</span></button><div className="projects__progress" aria-label={`Project ${activeIndex + 1} of ${projects.length}`}>{projects.map((project, index) => <button key={project.number} type="button" className={activeIndex === index ? "is-active" : ""} onClick={() => selectProject(index)} aria-label={`Show ${project.title}`} />)}</div><button type="button" onClick={() => moveProject(1)} aria-label="Show next project"><span><small>Next</small>{projects[(activeIndex + 1) % projects.length].shortTitle}</span><span aria-hidden="true">→</span></button></div>
      </div>
      <div className="projects__mobile"><header className="projects__mobile-heading"><p>Selected work</p><h2>Projects</h2></header><div className="projects__mobile-list">{projects.map((project) => <article className="projects__mobile-project" key={project.number}><div className="projects__mobile-title"><span>Project {project.number}</span><h3>{project.title}</h3></div><div className="projects__mobile-image"><img src={project.image} alt={`${project.title} project displayed on a laptop`} loading="lazy" /></div>{project.subtitle && <p className="projects__subtitle">{project.subtitle}</p>}<p className="projects__type">{project.type}</p><p className="projects__description">{project.description}</p><div className="projects__mobile-group"><h4>Technologies</h4><div className="projects__technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="projects__mobile-group"><h4>Features</h4><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><ProjectActions project={project} /></article>)}</div></div>
    </section>
  );
}
