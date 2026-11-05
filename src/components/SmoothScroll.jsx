import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Optimized Lenis Smooth Scroll
 * - Single persistent instance (no teardown lag on route change)
 * - Instant scroll reset on navigation
 * - Hardware-accelerated RAF loop
 */
export default function SmoothScroll() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false, // native momentum on mobile touch
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Instant scroll-to-top on route change without destroying Lenis
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
