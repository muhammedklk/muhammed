import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  document.title = '404 — Page Not Found · Muhammed K';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 1rem',
    }}>
      <div>
        <div style={{
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 500,
          letterSpacing: '-0.06em',
          color: 'var(--border-subtle)',
          lineHeight: 1,
          marginBottom: '1.5rem',
          userSelect: 'none',
        }}>404</div>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '0.8rem',
        }}>
          Looks like this page got lost in the design process.
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '2.5rem',
          fontSize: '1rem',
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-talk-dark" id="notfound-home-btn">
            <Home size={16} />
            <span>Go Home</span>
          </Link>
          <Link to="/works" className="btn-glass" id="notfound-works-btn">
            <ArrowLeft size={15} />
            <span>Browse Works</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
