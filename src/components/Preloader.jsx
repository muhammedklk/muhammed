import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if session flag is set
    const hasVisited = sessionStorage.getItem('portfolio_preloader_seen');
    if (hasVisited) {
      if (onComplete) onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            sessionStorage.setItem('portfolio_preloader_seen', 'true');
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // If already seen, don't render
  if (sessionStorage.getItem('portfolio_preloader_seen')) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'var(--bg-canvas)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Soft central ambient glow */}
      <div 
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 92, 225, 0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        {/* Animated Sphere Motif */}
        <div 
          style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #d4baff 45%, #7C5CE1 90%)',
            boxShadow: '0 10px 25px rgba(124, 92, 225, 0.35)',
            animation: 'spherePulse 2s ease-in-out infinite'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 500, fontSize: '1.25rem', letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
            MUHAMMED K
          </span>
          <span style={{ color: 'var(--peach-500)', fontWeight: 500 }}>•</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            PORTFOLIO
          </span>
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--text-primary)', minWidth: '120px' }}>
          {progress}%
        </div>

        {/* Minimalist Progress Track */}
        <div 
          style={{
            width: '180px',
            height: '3px',
            background: 'rgba(0, 0, 0, 0.06)',
            borderRadius: '9999px',
            margin: '1.2rem auto 0',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--peach-400), var(--peach-500))',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      </div>
    </div>
  );
}
