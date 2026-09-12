export function TimelineProgress({
  timeline,
  className = '',
  style,
  trackStyle,
  fillStyle,
  ariaLabel = 'Timeline progress',
}) {
  const progress = timeline?.progress ?? 0;

  return (
    <div
      className={className || 'timeline-progress'}
      aria-label={ariaLabel}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={Math.min(Math.max(progress, 0), 1)}
      style={{
        position: 'relative',
        width: '100%',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
        ...trackStyle,
        ...style,
      }}
    >
      <div
        style={{
          width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, rgba(239, 62, 67, 0.9), rgba(255, 176, 136, 0.95))',
          transformOrigin: 'left center',
          ...fillStyle,
        }}
      />
    </div>
  );
}
