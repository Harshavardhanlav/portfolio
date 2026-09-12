import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
  });

  let rafId = null;

  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  return {
    lenis,
    destroy() {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    },
  };
}

export function useCinematicReveal(targetRef, options = {}) {
  useEffect(() => {
    const el = targetRef.current;

    if (!el) return undefined;

    const config = {
      opacity: 0,
      y: 48,
      duration: 1.1,
      ease: 'power3.out',
      ...options,
    };

    const animation = gsap.fromTo(el, { opacity: 0, y: config.y }, {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      delay: config.delay ?? 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
        ...config.scrollTrigger,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [targetRef, options]);
}
