import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollReveal & Modern Interaction Manager
 * - Manages scroll-triggered upward, blur, scale, and stagger reveals
 * - Controls interactive cursor spotlights on cards
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
        threshold: 0.1,
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(SELECTOR);
      elements.forEach((el) => {
        if (el.classList.contains('is-revealed')) return;

        const rect = el.getBoundingClientRect();
        // If element is already in the viewport upon mount/route load
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          setTimeout(() => {
            el.classList.add('is-revealed');
          }, 50);
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial scan
    observeElements();

    // Re-check after short intervals for React Suspense / lazy-loaded route chunks
    const t1 = setTimeout(observeElements, 100);
    const t2 = setTimeout(observeElements, 350);
    const t3 = setTimeout(observeElements, 700);

    // MutationObserver to auto-catch any dynamic content added to DOM
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}

/**
 * Reusable Wrapper component for individual elements:
 * <Reveal type="blur" delay="1"><div>...</div></Reveal>
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
