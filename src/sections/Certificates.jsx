import "./Certificates.css";

const certificates = [
  {
    image: "/images/certificates/python-essentials.png",
    name: "Python Essentials",
    issuer: "Cisco Networking Academy",
  },
  {
    image: "/images/certificates/prompt-engineering.png",
    name: "Prompt Engineering",
    issuer: "Simplilearn",
  },
  {
    image: "/images/certificates/sihacks.png",
    name: "SIHacks",
    issuer: "Smart India Hackathon",
  },
  {
    image: "/images/certificates/technova.png",
    name: "TechNova",
    issuer: "TechNova",
  },
  {
    image: "/images/certificates/thoughtworks-apprenticeship.png",
    name: "Apprenticeship",
    issuer: "Thoughtworks",
  },
];

export default function Certificates() {
  return (
    <section className="certificates" id="certificates" aria-labelledby="certificates-title">
      <div className="certificates__shell">
        <header className="certificates__header">
          <p className="certificates__eyebrow">Continuous learning</p>
          <h2 id="certificates-title">CERTIFICATIONS</h2>
          <p className="certificates__intro">Proof of my continuous learning and dedication to growth.</p>
        </header>

        <div className="certificates__grid">
          {certificates.map((certificate) => (
            <article className="certificate-card" key={certificate.image}>
              <div className="certificate-card__image-wrap">
                <img src={certificate.image} alt={`${certificate.name} certificate`} loading="lazy" />
              </div>
              <h3>{certificate.name}</h3>
              <p>{certificate.issuer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
