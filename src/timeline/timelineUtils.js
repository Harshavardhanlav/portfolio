export const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export const lerp = (start, end, t) => start + (end - start) * t;

export const span = (value, start, end) => {
  const range = end - start;
  if (range === 0) return 0;
  return clamp((value - start) / range);
};

export const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export const damp = (current, target, lambda, dt) => {
  const factor = 1 - Math.exp(-lambda * dt);
  return lerp(current, target, factor);
};

export const easeInOutCubic = (value) => {
  if (value < 0.5) return 4 * value * value * value;
  return 1 - Math.pow(-2 * value + 2, 3) / 2;
};

export const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

export const easeOutExpo = (value) => {
  if (value >= 1) return 1;
  return 1 - 2 ** (-10 * value);
};

export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const ratio = (value - inMin) / (inMax - inMin || 1);
  return outMin + (outMax - outMin) * clamp(ratio);
};
