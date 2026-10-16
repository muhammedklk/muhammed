import React from 'react';
import { Link } from 'react-router-dom';

export default function AvailableBadge() {
  return (
    <Link 
      to="/contact" 
      className="available-work-floating-badge"
      aria-label="Muhammed K is available for work. Click to contact."
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 990,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        padding: '8px 16px',
        borderRadius: '9999px',
        background: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <span 
        style={{
          position: 'relative',
          display: 'flex',
          width: '8px',
          height: '8px'
        }}
      >
        <span 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: '#10b981',
            opacity: 0.75,
            animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
        <span 
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981'
          }}
        />
      </span>
      <span 
        style={{
          fontSize: '0.78rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          color: 'var(--text-primary)'
        }}
      >
        Available for Work
      </span>
    </Link>
  );
}
