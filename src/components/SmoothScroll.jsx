import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Lenis Smooth Scroll — wraps the entire app.
 * - Buttery smooth native-feel scroll with momentum
 * - Auto-resets scroll position to top on route change
 * - Works seamlessly with React Router
 */
export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,   // keep native on touch devices
      touchMultiplier: 2,
    });

    // Scroll to top on every route change
    lenis.scrollTo(0, { immediate: true });

    // RAF loop
    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
