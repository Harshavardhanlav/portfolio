import { forwardRef, useRef } from 'react';

import { useSectionTimeline } from './useSectionTimeline';

export const SectionTimeline = forwardRef(function SectionTimeline(
  {
    as: Component = 'section',
    beats,
    children,
    className = '',
    start,
    end,
    scrub,
    once,
    immediate,
    ...props
  },
  forwardedRef,
) {
  const localRef = useRef(null);

  const setRefs = (node) => {
    localRef.current = node;

    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  const timeline = useSectionTimeline({
    sectionRef: localRef,
    beats,
    start,
    end,
    scrub,
    once,
    immediate,
  });

  const resolvedChildren = typeof children === 'function' ? children(timeline) : children;

  return (
    <Component ref={setRefs} className={className} {...props}>
      {resolvedChildren}
    </Component>
  );
});
