export default function SectionTitle({ eyebrow, title, align = 'left' }) {
  return (
    <div className={`section-title ${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-heading">{title}</h2>
    </div>
  );
}
