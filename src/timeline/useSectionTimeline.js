import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { clamp } from './timelineUtils';
import { DEFAULT_BEATS, buildBeatProgress } from './timelineData';

gsap.registerPlugin(ScrollTrigger);

export function useSectionTimeline({
  sectionRef,
  beats = DEFAULT_BEATS,
  start = 'top 80%',
  end = 'bottom top',
  scrub = false,
  once = false,
  immediate = false,
} = {}) {
  const progressRef = useRef(0);
  const beatProgressRef = useRef({});
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const section = sectionRef?.current;
    if (!section) return undefined;

    const updateProgress = (value) => {
      progressRef.current = clamp(value, 0, 1);
      beatProgressRef.current = buildBeatProgress(progressRef.current, beats);
    };

    const context = gsap.context(() => {
      if (reducedMotionRef.current) {
        updateProgress(immediate ? 1 : 1);
        return undefined;
      }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start,
        end,
        scrub,
        once,
        onUpdate: (self) => updateProgress(self.progress),
        onRefresh: (self) => updateProgress(self.progress),
      });

      updateProgress(0);

      return () => {
        trigger.kill();
      };
    }, section);

    return () => {
      context.revert();
    };
  }, [sectionRef, beats, start, end, scrub, once, immediate]);

  const getProgress = () => progressRef.current;
  const getBeatProgress = (name) => beatProgressRef.current[name] ?? 0;

  return {
    progressRef,
    beatProgressRef,
    getProgress,
    getBeatProgress,
    get progress() {
      return progressRef.current;
    },
    get beatProgress() {
      return { ...beatProgressRef.current };
    },
  };
}
