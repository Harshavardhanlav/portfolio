import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight as ArrowUpRight,
  FaCheck as Check,
  FaEnvelope as Mail,
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaPaperPlane as Send,
} from "react-icons/fa6";
import "./Contact.css";

const contactLinks = [
  {
    label: "Email",
    value: "hprabandhakavi@gmail.com",
    href: "mailto:hprabandhakavi@gmail.com",
    Icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Harshavardhanlav",
    href: "https://github.com/Harshavardhanlav",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harsha-prabandhakavi-46ba6a3b1",
    href: "https://www.linkedin.com/in/harsha-prabandhakavi-46ba6a3b1/",
    Icon: Linkedin,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const statusTimerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
    },
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("ready");

    if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
    statusTimerRef.current = window.setTimeout(() => setStatus("idle"), 4500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`contact-section${isVisible ? " is-visible" : ""}`}
      aria-labelledby="contact-title"
    >
      <div className="contact-noise" aria-hidden="true" />
      <div className="contact-frame" aria-hidden="true">
        <span className="contact-frame__corner contact-frame__corner--top" />
        <span className="contact-frame__corner contact-frame__corner--bottom" />
      </div>

      <div className="contact-shell">
        <div className="contact-main">
          <div className="contact-copy contact-reveal">
            <div className="contact-kicker">
              <strong>07</strong>
              <span>/ 07</span>
              <i aria-hidden="true" />
              <span>Contact</span>
            </div>

            <h1 id="contact-title" className="contact-title">
              Let&apos;s build <em>something.</em>
            </h1>
            <p className="contact-intro">
              Have an idea, project, or opportunity in mind?
              <br />
              Let&apos;s connect and build something meaningful together.
            </p>

            <div className="contact-links" aria-label="Contact links">
              {contactLinks.map(({ label, value, href, Icon }, index) => (
                <a
                  className="contact-link"
                  href={href}
                  key={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  style={{ "--reveal-index": index }}
                >
                  <span className="contact-link__icon" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <span className="contact-link__text">
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </span>
                  <ArrowUpRight
                    className="contact-link__arrow"
                    aria-hidden="true"
                    size={16}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap contact-reveal">
            <div className="contact-form-heading">
              <Send size={16} aria-hidden="true" />
              <h2>Send a message</h2>
              <span aria-hidden="true" />
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                required
              />

              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell me about your idea, project, or opportunity..."
                required
              />

              <button className="contact-submit" type="submit">
                {status === "ready" ? (
                  <>
                    <Check size={17} aria-hidden="true" />
                    Message ready
                  </>
                ) : (
                  <>
                    <Send size={17} aria-hidden="true" />
                    Send message
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="contact-status" role="status" aria-live="polite">
                {status === "ready"
                  ? "Message ready — sending will be enabled soon."
                  : ""}
              </p>
            </form>
          </div>
        </div>

        <footer className="contact-footer contact-reveal">
          <div className="contact-signature">
            <strong>Harsha</strong>
            <span>CSE student · MERN stack developer</span>
          </div>
          <div className="contact-motto">
            <i aria-hidden="true" />
            <span>Building · Learning · Growing</span>
            <i aria-hidden="true" />
          </div>
          <p>© 2026 Harsha Prabandhakavi</p>
        </footer>
      </div>
    </section>
  );
}
