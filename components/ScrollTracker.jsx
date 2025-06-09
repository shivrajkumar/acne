'use client';

import { useEffect } from 'react';

const ScrollTracker = () => {
  useEffect(() => {
    const milestones = new Set();
    let hasScrolled = false;

    const handleScroll = () => {
      // Set flag to true on first actual scroll
      if (!hasScrolled) {
        hasScrolled = true;
        milestones.clear(); // Reset milestones
      }

      try {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const windowHeight = window.innerHeight;

        const scrollPercent = Math.round(((scrollTop + windowHeight) / docHeight) * 100);

        const scrollMilestones = [25, 50, 75, 100];

        scrollMilestones.forEach((percent) => {
          if (hasScrolled && scrollPercent >= percent && !milestones.has(percent)) {
            milestones.add(percent);

            // Ensure dataLayer exists before pushing
            if (window.dataLayer) {
              window.dataLayer.push({
                event: `Scroll_Depth_${percent}%`,
                scrollDepth: percent
              });

            } else {
              console.warn('dataLayer not available');
            }
          }
        });
      } catch (error) {
        console.error('Scroll tracking error:', error);
      }
    };

    // Throttle function to prevent excessive event firing
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    }

    // Add throttled scroll event listener
    const throttledHandleScroll = throttle(handleScroll, 200);

    // Add event listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return null;
};

export default ScrollTracker;