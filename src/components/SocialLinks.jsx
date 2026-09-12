export default function SocialLinks({ links, className = 'social-list' }) {
  return (
    <div className={className} aria-label="Social links">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.ariaLabel}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
