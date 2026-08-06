import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, ArrowLeft, Sparkles } from '../admin/components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

const Maintenance = ({ pageName = 'This Page', message }) => {
  const { settings } = usePortfolio();
  const navigate = useNavigate();

  const displayMessage = message || settings?.maintenanceMessage || `${pageName} is currently undergoing scheduled updates and maintenance. Please check back shortly!`;
  const contactEmail = settings?.contactEmail || 'hello@developer.com';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
        color: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '24px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Keyframe Micro-Animations */}
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.9; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Ambient Floating Decorative Badges */}
      <div style={{ position: 'absolute', top: '12%', left: '10%', animation: 'floatIcon 6s ease-in-out infinite', opacity: 0.4, fontSize: '32px' }}>✨</div>
      <div style={{ position: 'absolute', bottom: '15%', right: '12%', animation: 'floatIcon 7s ease-in-out infinite 1s', opacity: 0.4, fontSize: '36px' }}>🛠️</div>
      <div style={{ position: 'absolute', top: '20%', right: '15%', animation: 'floatIcon 8s ease-in-out infinite 2s', opacity: 0.35, fontSize: '28px' }}>⚡</div>
      <div style={{ position: 'absolute', bottom: '20%', left: '14%', animation: 'floatIcon 5.5s ease-in-out infinite 0.5s', opacity: 0.35, fontSize: '30px' }}>🔒</div>

      {/* Main Light Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '32px',
          padding: '52px 40px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Animated Central Icon with Pulsing Outer Ring */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '30px',
              background: 'rgba(210, 234, 38, 0.45)',
              animation: 'pulseRing 3s ease-in-out infinite',
              filter: 'blur(8px)'
            }}
          />
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '24px',
              background: '#0f172a',
              color: '#d2ea26',
              display: 'inline-flex',
              alignItems: 'center',
              justify: 'center',
              position: 'relative',
              boxShadow: '0 12px 24px rgba(15, 23, 42, 0.2)',
              animation: 'floatIcon 4s ease-in-out infinite'
            }}
          >
            <ShieldAlert size={38} />
          </div>
        </div>

        {/* Animated Status Pill */}
        <div style={{ marginBottom: '18px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(15, 23, 42, 0.06)',
              color: '#0f172a',
              fontSize: '11.5px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            <Sparkles size={14} color="#849a00" style={{ animation: 'spinSlow 10s linear infinite' }} />
            Page Maintenance in Progress
          </span>
        </div>

        {/* Main Light Heading */}
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.03em' }}>
          {pageName} Under Maintenance
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 36px 0', lineHeight: 1.6 }}>
          {displayMessage}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '36px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              background: '#0f172a',
              color: '#ffffff',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(15, 23, 42, 0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} color="#d2ea26" />
            <span>Go Back to Home</span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '13px 22px',
              background: '#f1f5f9',
              color: '#334155',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '14px',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Previous Page</span>
          </button>
        </div>

        {/* Direct Contact Bar */}
        <div style={{ padding: '16px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '13px', color: '#475569', marginBottom: '28px' }}>
          <Mail size={16} color="#0f172a" />
          <span>Direct Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#0f172a', fontWeight: '700', textDecoration: 'none' }}>{contactEmail}</a></span>
        </div>

        {/* Admin Footer Link */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <a href="/admin/login" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} />
            <span>Administrator Access</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
