export const DEFAULT_BEATS = {
  intro: { start: 0.0, duration: 0.15 },
  heading: { start: 0.12, duration: 0.2 },
  content: { start: 0.3, duration: 0.3 },
  cards: { start: 0.55, duration: 0.3 },
  settle: { start: 0.85, duration: 0.15 },
};

export function buildBeatProgress(progress, beats = DEFAULT_BEATS) {
  const entries = Object.entries(beats);

  return entries.reduce((accumulator, [name, beat]) => {
    const start = beat.start ?? 0;
    const duration = beat.duration ?? 0;
    const end = start + duration;
    accumulator[name] = duration > 0 ? Math.min(Math.max((progress - start) / duration, 0), 1) : progress >= start ? 1 : 0;

    if (progress > end) {
      accumulator[name] = 1;
    }

    if (progress < start) {
      accumulator[name] = 0;
    }

    return accumulator;
  }, {});
}

export function getBeatState(progress, beats = DEFAULT_BEATS) {
  const entries = buildBeatProgress(progress, beats);

  return Object.fromEntries(
    Object.entries(entries).map(([name, value]) => [name, { progress: value, active: value > 0 }]),
  );
}
