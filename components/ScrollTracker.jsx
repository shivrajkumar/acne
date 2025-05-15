// components/ScrollTracker.tsx
'use client';
import { useEffect, useRef } from 'react';
import { logGtmEvent } from './generic/Gtm';

const ScrollTracker = () => {
  const milestones = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((percent) => {
        if (scrollPercent >= percent && !milestones.current.has(percent)) {
          milestones.current.add(percent);
          logGtmEvent({ event: `scroll_depth_${percent}`, value: percent, location: window.location.pathname });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default ScrollTracker;
