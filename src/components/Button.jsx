export default function Button({ children, variant = 'primary', href, onClick, className = '', type = 'button' }) {
  const classes = `button ${variant} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
