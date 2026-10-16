import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

export default function NotFound() {
  return (
    <div className="not-found-page section-padding text-center" style={{ minHeight: 'calc(100vh - 280px)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <GlassCard style={{ maxWidth: '640px', margin: '0 auto', padding: 'clamp(40px, 6vw, 70px) 32px', background: '#FFFFFF' }}>
          <div style={{ fontSize: 'clamp(5rem, 12vw, 8rem)', fontWeight: 500, color: 'var(--color-primary)', lineHeight: 1, fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
            404
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>
            Page Not Found
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
            The requested page does not exist or may have been relocated. Use the navigation links below to return to the portfolio.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Button to="/" variant="primary" size="md" icon={Home} iconPosition="left">
              Return Home
            </Button>
            <Button to="/works" variant="outline" size="md" icon={Search} iconPosition="left">
              Browse Selected Works
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
