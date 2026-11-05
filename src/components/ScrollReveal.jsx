import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * High-Performance ScrollReveal Manager
 * - Uses lightweight IntersectionObserver with no layout thrashing
 * - Cleans up memory automatically
 */
export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const SELECTOR =
      '.reveal-up, .reveal-on-scroll, .reveal-stagger, .reveal-subtle, .reveal-blur, .reveal-scale, [data-reveal]';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const elements = document.querySelectorAll(SELECTOR);
    elements.forEach((el) => {
      if (el.classList.contains('is-revealed')) return;
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

/**
 * Reusable Wrapper component for individual elements
 */
export function Reveal({ children, delay, type = 'up', subtle, className = '', ...props }) {
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  const typeClass = subtle ? 'reveal-subtle' : `reveal-${type}`;
  return (
    <div className={`${typeClass} ${delayClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
