import React, { useEffect, useRef, useState } from 'react';
import '../styles/cursor.css';

/**
 * Modern High-Performance Custom Cursor
 * - Instant precision center dot (no lag)
 * - Buttery-smooth lerp trailing ring (120fps RAF, 0 React re-renders)
 * - Magnetic scale on hover over links, buttons & 3D canvas
 * - Click spring compression feedback
 * - Auto-disabled on mobile touch devices
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Mutable coordinates to avoid triggering React virtual DOM renders on mousemove
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isHover = useRef(false);
  const isCanvasHover = useRef(false);
  const isClick = useRef(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device uses touch pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        dot.classList.remove('custom-cursor-hidden');
        ringEl.classList.remove('custom-cursor-hidden');
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
      }

      // Check interactive targets
      const target = e.target;
      const interactiveEl = target.closest(
        'a, button, input, textarea, select, [role="button"], .interactive, .pill-badge, .service-pill-btn, .project-card, .btn-talk-dark, .btn-glass, .hero-talk-btn, .ref-contact-btn'
      );
      const isCanvas = target.closest('.hero-canvas-container canvas, .hero-canvas-container');

      const hovering = !!interactiveEl;
      if (hovering !== isHover.current) {
        isHover.current = hovering;
        if (hovering) {
          dot.classList.add('is-hovering');
          ringEl.classList.add('is-hovering');
        } else {
          dot.classList.remove('is-hovering');
          ringEl.classList.remove('is-hovering');
        }
      }

      const canvasHovering = !!isCanvas;
      if (canvasHovering !== isCanvasHover.current) {
        isCanvasHover.current = canvasHovering;
        if (canvasHovering) {
          ringEl.classList.add('is-canvas');
        } else {
          ringEl.classList.remove('is-canvas');
        }
      }
    };

    const onMouseDown = () => {
      isClick.current = true;
      dot.classList.add('is-clicking');
      ringEl.classList.add('is-clicking');
    };

    const onMouseUp = () => {
      isClick.current = false;
      dot.classList.remove('is-clicking');
      ringEl.classList.remove('is-clicking');
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      dot.classList.add('custom-cursor-hidden');
      ringEl.classList.add('custom-cursor-hidden');
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      dot.classList.remove('custom-cursor-hidden');
      ringEl.classList.remove('custom-cursor-hidden');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance RAF loop with spring lerp interpolation
    let animId;
    const renderLoop = () => {
      if (isVisible.current) {
        // Dot snaps instantly to mouse position
        dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;

        // Ring follows with smooth damping lerp (0.16)
        ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.16;

        ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Precision Center Dot */}
      <div ref={dotRef} className="custom-cursor-dot custom-cursor-hidden" />
      {/* Smooth Trailing Follower Ring */}
      <div ref={ringRef} className="custom-cursor-ring custom-cursor-hidden" />
    </div>
  );
}
