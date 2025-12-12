import { useRef, useEffect } from 'react';

export function useAutoScroll(isActive, speed = 0.5) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isActive) return;

    let animationFrameId;
    let scrollAmount = 0;

    const scroll = () => {
      if (container) {
        scrollAmount += speed;
        if (scrollAmount >= (container.scrollWidth - container.clientWidth)) {
           if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 1)) {
             return;
           }
        }
        container.scrollLeft = scrollAmount;
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    if (container.scrollWidth > container.clientWidth) {
        animationFrameId = requestAnimationFrame(scroll);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, speed]);

  return scrollContainerRef;
}
